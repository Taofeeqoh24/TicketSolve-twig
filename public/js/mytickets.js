document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("ticketList");
  const tickets = JSON.parse(localStorage.getItem("tickets")) || [];

  if (tickets.length === 0) {
    list.innerHTML = "<p>No tickets created yet.</p>";
    return;
  }

  list.innerHTML = tickets.map(t => `
    <div class="border p-4 rounded shadow-sm">
      <h3 class="font-bold">${t.title}</h3>
      <p>${t.description || "No description"}</p>
      <p class="text-sm text-gray-500">Status: ${t.status}</p>
    </div>
  `).join("");
});
