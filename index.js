import express from "express";
import dotenv from "dotenv";
import { askOpenAI } from "./openai.js";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/chat", async (req,res)=>{
  const { text, profile, system, memory=[] } = req.body;

  const messages = [
    { role:"system", content: system || `Jesteś AI ${profile.name}` },
    ...memory,
    { role:"user", content:text }
  ];

  const answer = await askOpenAI(messages);

  res.json({
    text: answer,
    tts: profile.tts
  });
});

app.listen(3000);

