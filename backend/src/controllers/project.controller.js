import { ApiResponse } from "../helper/ApiResponse.js";
import { ApiError } from "../helper/ApiError.js";
import { Project } from '../models/project-task.model.js'
import { generateTaskWithAI } from "../helper/generateTask.js";
import { taskGenerator } from "../helper/taskGenerator.js";
import {User} from "../models/user.model.js"
import axios from 'axios'

export const createProject = async (req, res) => {
  try {
    const { name, objective, description, githubLink, techStack } = req.body;

    if ([name, objective, description, githubLink].some((field) => field.trim() === "")) {
      throw new ApiError(400, "All fields are required");
    }

    const generatedTasks =
      (await taskGenerator({ name, objective, description, techStack })) || [];

    console.log("Generated tasks:", generatedTasks);

    const project = await Project.create({
      userId: req.user._id,
      name,
      objective,
      description,
      githubLink,
      techStack,
      task: generatedTasks,
    });

    if (!project) {
      throw new ApiError(500, "Something went wrong while creating project");
    }

    if(githubLink){
      const user = await User.findById(req.user._id).select("+githubLink")
      if(user?.githubAccessToken){
        const [owner, repo] = githubLink.replace("https://github.com/", "").split("/")

        await axios.post(
          `https://api.github.com/repos/${owner}/${repo}/hooks`,
          {
            name: "web",
            active: true,
            events: ["push"],
            config: {
              url: "http://localhost:7777/api/github/webhook",
              content_type: "json",
            },
          },
          {
            headers: {
              Authorization: `Bearer ${user.githubAccessToken}`
            }
          }
        )
      }
    }

    return res
      .status(201)
      .json(new ApiResponse(201, project, "Project created successfully with generated tasks"));
  } catch (error) {
    console.error("Create project error:", error);

    if (error instanceof ApiError) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
        errors: error.errors || [],
      });
    }

    return res.status(500).json(new ApiError(500, "Internal server error"));
  }
};

export const getAllProjects = async (req,res) => {
  try {

    const userId = req.user._id;
    
    const projects = await Project.find({ userId })
      .select("name  description techStack status")
      .sort({ createdAt: -1 })
      .lean();

    if(!projects){
      throw new ApiError(500, "Error while fetching projects")
    }

    return res.status(200).json(
      new ApiResponse(200, projects, "Fetched project")
    )

  } catch (error) {
    if (error instanceof ApiError) {
        return res.status(error.statusCoude).json({
          success: false,
          message: error.message,
          errors: error.errors || [],
        });
      }
      return res.status(500).json(new ApiError(500, "Internal server error"));
  }
}

export const getProject = async (req,res) => {
  try {
    const {id} = req.params
    const userId = req.user._id
    const project = await Project.findOne({_id: id, userId})
    if(!project){
      throw new ApiError(404, "Project not found")
    }

    return res.status(200).json(
      new ApiResponse(200, project, "Fetched project")
    )

  } catch (error) {
    if (error instanceof ApiError) {
        return res.status(error.statusCoude).json({
          success: false,
          message: error.message,
          errors: error.errors || [],
        });
      }
      return res.status(500).json(new ApiError(500, "Internal server error"));
  }
}

export const deleteProject = async (req,res) => {
  try {
    const {id} = req.params
    const userId = req.user._id
    const project = await Project.findOneAndDelete({_id:id, userId})

    if(!project){
      throw new ApiError(404, "Project not found or not authorized")
    }

    return res.status(200).json(
      new ApiResponse(200, "Project Deleted Successfully")
    )

  } catch (error) {
    if (error instanceof ApiError) {
        return res.status(error.statusCoude).json({
          success: false,
          message: error.message,
          errors: error.errors || [],
        });
      }
      return res.status(500).json(new ApiError(500, "Internal server error"));
  }
}

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // ✅ Validate status
    const allowedStatuses = ["pending", "in_progress", "completed"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // ✅ Update project
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedProject) {
      throw new ApiError(404, "Project not found or not authorized");
    }

    // ✅ Return proper response (include updated project)
    return res
      .status(200)
      .json(new ApiResponse(200, updatedProject, "Status updated successfully"));
  } catch (error) {
    // ❌ Fix typo (statusCoude → statusCode)
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        errors: error.errors || [],
      });
    }

    console.error("Error updating status:", error);
    return res
      .status(500)
      .json(new ApiError(500, "Internal server error"));
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["pending", "in_progress", "completed"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const project = await Project.findOne({ "task._id": taskId });
    if (!project) {
      throw new ApiError(404, "Task not found or project not found");
    }

    const task = project.task.id(taskId);
    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    task.status = status;

    await project.save();

    return res
      .status(200)
      .json(new ApiResponse(200, task, "Task status updated successfully"));
  } catch (error) {
    console.error("Error updating task status:", error);

    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        errors: error.errors || [],
      });
    }

    return res
      .status(500)
      .json(new ApiError(500, "Internal server error"));
  }
};
