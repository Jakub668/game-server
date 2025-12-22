import { WebSocketServer } from "ws";

const PORT = process.env.PORT || 3000;

const wss = new WebSocketServer({ port: PORT });

console.log("Serwer WS działa na porcie", PORT);

wss.on("connection", ws => {
  console.log("Gracz połączony");

  ws.send(JSON.stringify({ type: "hello" }));

  ws.on("message", msg => {
    console.log("MSG:", msg.toString());
  });
});
