import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {githubWebhook} from "../controllers/webhook.controller.js"
import {githubCallback} from "../controllers/github.controller.js"

const router = Router()

router.get("/auth", (req, res) => {
  const redirectUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=https://irretrievable-kody-tardily.ngrok-free.dev/api/github/callback&scope=repo,user`;
  res.redirect(redirectUrl);
});
router.get("/callback",verifyJWT, githubCallback);
router.route("/webhook").post( githubWebhook)

export default router