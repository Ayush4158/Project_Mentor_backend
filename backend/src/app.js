import express from "express"
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cors(
  {
    origin: ['*', 'https://irretrievable-kody-tardily.ngrok-free.dev'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
  }
))
app.use(cookieParser())
app.use(express.json())
app.use(express.json({ type: ["application/json", "application/*+json"] }));
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

import userRouter from "./routes/user.routes.js"
import projectRoute from "./routes/project.routes.js"
import userPerformanceRoute from "./routes/userPerformance.routes.js"
import intellioRoute from "./routes/intellio.route.js"
import githubRoute from "./routes/github.route.js"

app.use('/api/user', userRouter)
app.use('/api/project', projectRoute)
app.use('/api/user-performance', userPerformanceRoute)
app.use('/api/ai_assistance', intellioRoute)
app.use('/api/github', githubRoute)
// app.use('/api/github/webhook', (req,res) => {
//   console.log('Webhook success: ',req.body)
//   res.status(200).send("Webhook received successfully");
// })

export {app}
