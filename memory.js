const memory = {};

export function saveMessage(user, msg) {
  memory[user] ??= [];
  memory[user].push(msg);
  memory[user] = memory[user].slice(-100);
}

export function getMemory(user) {
  return memory[user] || [];
}
