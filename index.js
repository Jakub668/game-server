import { WebSocketServer } from "ws";
import { randomUUID } from "crypto";

const PORT = process.env.PORT;
const TICK_RATE = 50; // ms

const wss = new WebSocketServer({ port: PORT });
const players = new Map();

console.log("Serwer WS działa na porcie", PORT);

wss.on("connection", ws => {
  const id = randomUUID();

  players.set(id, {
    x: Math.random() * 5,
    z: Math.random() * 5,
    vx: 0,
    vz: 0
  });

  // wysyłamy ID gracza
  ws.send(JSON.stringify({
    type: "init",
    id
  }));

  ws.on("message", msg => {
    const data = JSON.parse(msg);

    if (data.type === "input") {
      const p = players.get(id);
      if (!p) return;

      p.vx = data.x;
      p.vz = data.z;
    }
  });

  ws.on("close", () => {
    players.delete(id);
  });
});

// GAME LOOP
setInterval(() => {
  for (const p of players.values()) {
    p.x += p.vx * 0.1;
    p.z += p.vz * 0.1;
  }

  const snapshot = {
    type: "state",
    players: Object.fromEntries(players)
  };

  const payload = JSON.stringify(snapshot);

  wss.clients.forEach(client => {
    if (client.readyState === 1) {
      client.send(payload);
    }
  });
}, TICK_RATE);

