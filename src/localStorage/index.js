export function storeItem(name, payload) {
  if (!name || typeof payload !== "object") {
    console.log("Local storage not sent what is needed");
    return;
  }

  const payloadAsString = JSON.stringify(payload);
  localStorage.setItem(name, payloadAsString);
}

export function getItem(name) {
  return JSON.parse(localStorage.getItem(name));
}
