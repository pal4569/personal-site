const API = import.meta.env.VITE_SERVER_URL;

export async function getItems() {
  const res = await fetch(`${API_URL}/blogs`);
  return res.json();
}

export async function createItem(name) {
  const res = await fetch(`${API}/api/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });
  return res.json();
}
