document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("ticketForm");
  const titleInput = document.getElementById("title");
  const statusInput = document.getElementById("status");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const description = document.getElementById("description").value.trim();
    const status = statusInput.value;

    // Simple validation
    if (!title) {
      document.getElementById("error-title").textContent = "Title is required.";
      return;
    } else {
      document.getElementById("error-title").textContent = "";
    }

    if (!status) {
      document.getElementById("error-status").textContent = "Select a valid status.";
      return;
    } else {
      document.getElementById("error-status").textContent = "";
    }

    const newTicket = {
      id: Date.now(),
      title,
      description,
      status,
    };

    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    tickets.push(newTicket);
    localStorage.setItem("tickets", JSON.stringify(tickets));

    alert("Ticket created successfully!");
    form.reset();

    setTimeout(() => {
     window.location.href = "index.php?page=tickets";
    }, 500);
   
    
  });
});
