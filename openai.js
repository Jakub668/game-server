import fetch from "node-fetch";

export async function askOpenAI(messages) {
  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method:"POST",
    headers:{
      "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      model:"gpt-5.2",
      messages
    })
  });

  const j = await r.json();
  return j.choices[0].message.content;
}
