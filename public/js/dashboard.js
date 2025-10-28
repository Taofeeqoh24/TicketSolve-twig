const mainContent = document.getElementById('mainContent');
const totalTicketsEl = document.getElementById('totalTickets');
const openTicketsEl = document.getElementById('openTickets');
const closedTicketsEl = document.getElementById('closedTickets');

function getDashboardHTML() {
  return `
    <h5 class="text-center mt-2">Dashboard</h5>
    <h4 class="text-sm mt-4 p-6">Ticket Summary</h4>
    <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 p-6">
      <div class="summary-box bg-[#16A34A]">
        <h2 class="summary-header">TOTAL TICKETS</h2>
        <p id="totalTickets" class="text-4xl">0</p>
      </div>
      <div class="summary-box bg-[#F59E0B]">
        <h2 class="summary-header">OPEN TICKETS</h2>
        <p id="openTickets" class="text-4xl">0</p>
      </div>
      <div class="summary-box bg-[#6B7280]">
        <h2 class="summary-header">RESOLVED TICKETS</h2>
        <p id="closedTickets" class="text-4xl">0</p>
      </div>
    </div>
  `;
}

// Render dashboard summary
function renderDashboard() {
  mainContent.innerHTML = getDashboardHTML();
  const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
  const openCount = tickets.filter(t => t.status === 'open').length;
  const closedCount = tickets.filter(t => t.status === 'closed').length;

  document.getElementById('totalTickets').textContent = tickets.length;
  document.getElementById('openTickets').textContent = openCount;
  document.getElementById('closedTickets').textContent = closedCount;
}

// Render ticket form
function renderTicketForm() {
  fetch('/templates/pages/ticketform.twig')
    .then(res => res.text())
    .then(html => {
      mainContent.innerHTML = html;
      attachTicketFormListener();
    });
}

// Attach ticket form submit listener
function attachTicketFormListener() {
  const ticketForm = document.getElementById('ticketForm');
  ticketForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const status = document.getElementById('status').value;

    if (!title) return alert('Title is required');
    if (!status) return alert('Status is required');

    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    tickets.push({ id: Date.now(), title, description, status });
    localStorage.setItem('tickets', JSON.stringify(tickets));

    alert('Ticket created successfully!');
    renderDashboard(); // Back to dashboard after submit
  });
}

// Tab click handlers
document.getElementById('tab-dashboard').addEventListener('click', renderDashboard);
document.getElementById('tab-tickets').addEventListener('click', renderTicketForm);

function renderMyTickets() {
  fetch('/templates/pages/mytickets.twig')
    .then(res => res.text())
    .then(html => {
      mainContent.innerHTML = html;

      const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
      const container = document.getElementById('ticketsContainer');
      const modal = document.getElementById('editModal');
      const editForm = document.getElementById('editForm');

      if (tickets.length === 0) {
        container.innerHTML = `<p class="text-gray-600">No tickets yet.</p>`;
        return;
      }

      container.innerHTML = tickets.map(ticket => `
        <div class="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <h2 class="text-lg font-semibold">${ticket.title}</h2>
          <p class="text-sm text-gray-600 mb-2">${ticket.description}</p>
          <span class="inline-block text-xs font-semibold px-2 py-1 rounded ${
            ticket.status === "open"
              ? "bg-green-100 text-green-700"
              : ticket.status === "in_progress"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }">${ticket.status.replace("_", " ")}</span>
          <div class="flex justify-end gap-2 mt-4">
            <button class="editBtn px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600" data-id="${ticket.id}">Edit</button>
            <button class="deleteBtn px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600" data-id="${ticket.id}">Delete</button>
          </div>
        </div>
      `).join('');

      // Handle Delete
      container.querySelectorAll('.deleteBtn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = parseInt(e.target.dataset.id);
          if (confirm("Are you sure you want to delete this ticket?")) {
            const updated = tickets.filter(t => t.id !== id);
            localStorage.setItem('tickets', JSON.stringify(updated));
            renderMyTickets();
            alert("Ticket deleted successfully!");
          }
        });
      });

      // Handle Edit
      container.querySelectorAll('.editBtn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = parseInt(e.target.dataset.id);
          const ticket = tickets.find(t => t.id === id);

          document.getElementById('editTitle').value = ticket.title;
          document.getElementById('editDescription').value = ticket.description;
          document.getElementById('editStatus').value = ticket.status;

          modal.classList.remove('hidden');

          editForm.onsubmit = (event) => {
            event.preventDefault();

            ticket.title = document.getElementById('editTitle').value.trim();
            ticket.description = document.getElementById('editDescription').value.trim();
            ticket.status = document.getElementById('editStatus').value;

            localStorage.setItem('tickets', JSON.stringify(tickets));
            modal.classList.add('hidden');
            renderMyTickets();
            alert("Ticket updated successfully!");
          };

          document.getElementById('cancelEdit').onclick = () => {
            modal.classList.add('hidden');
          };
        });
      });
    });
}

document.getElementById('tab-my-tickets').addEventListener('click', renderMyTickets);

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
  if (window.confirm('Are you sure you want to logout?')) {
    localStorage.removeItem("user");
    window.location.href = 'index.php?page=landing';
  }
});

// Initial render
renderDashboard();


