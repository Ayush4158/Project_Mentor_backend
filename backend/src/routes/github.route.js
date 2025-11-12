import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {githubWebhook} from "../controllers/webhook.controller.js"
import {githubCallback} from "../controllers/github.controller.js"

const router = Router()

router.get("/github/auth", (req, res) => {
  const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scope=repo,user`;
  res.redirect(redirectUrl);
});
router.get("/github/callback", githubCallback);
router.route("/webhook").post(verifyJWT, githubWebhook)

export default router