
const API_BASE_URL = "http://localhost:8080/api";

export async function getWorkers() {
  const response = await fetch(`${API_BASE_URL}/workers`);

  if (!response.ok) {
    throw new Error("Failed to fetch workers");
  }

  return response.json();
}

export async function registerWorker(worker) {
  const response = await fetch(`${API_BASE_URL}/workers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(worker),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to register worker");
  }

  return response.json();
}
