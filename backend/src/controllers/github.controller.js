import axios from "axios";
import { User } from "../models/User.js";

export const githubCallback = async (req, res) => {
  const code = req.query.code;
  const userId = req.user?._id;

  try {
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

    // 2️⃣ Fetch GitHub user profile
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const githubUsername = userResponse.data.login;

    // 3️⃣ Save GitHub info into user model
    await User.findByIdAndUpdate(userId, {
      githubUsername,
      githubAccessToken: accessToken,
    });

    // 4️⃣ Redirect user back to frontend
    res.redirect("http://localhost:5173/dashboard");
  } catch (error) {
    console.error("GitHub OAuth failed:", error);
    res.status(500).json({ message: "GitHub connection failed" });
  }
};
