const API_URL = "http://localhost:5000";

export async function getItems() {
  const res = await fetch(`${API_URL}/items`);
  return res.json();
}

export async function createItem(name) {
  const res = await fetch(`${API_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });
  return res.json();
}
