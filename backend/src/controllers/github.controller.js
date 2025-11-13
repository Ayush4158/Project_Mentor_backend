import axios from "axios";
import { User } from "../models/user.model.js";

export const githubCallback = async (req, res) => {
  const code = req.query.code;
  const userId = req.user?._id;

  try {
    console.log("github inside")
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: "application/json" },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    const userResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const githubUsername = userResponse.data.login;

    const user = await User.findByIdAndUpdate(userId, {
      githubUsername,
      githubAccessToken: accessToken,
    }, {new: true});
    

    res.redirect("http://localhost:5173");
  } catch (error) {
    console.error("GitHub OAuth failed:", error);
    res.status(500).json({ message: "GitHub connection failed" });
  }
};
