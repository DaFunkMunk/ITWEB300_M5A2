const ticketStorage = [];
let ticketCounter = 1;

function displayTicket(ticket) {
  $("#reqDate").text(ticket.requestDate);
  $("#empId").text(ticket.employeeId);
  $("#fullName").text(`${ticket.firstName} ${ticket.lastName}`);
  $("#problem").text(ticket.problemDescription);
  $("#status").text(ticket.status);
  $("#response").text(ticket.response);
  $("#ticketDetails").show();
}

function renderAllTickets() {
  const html = ticketStorage.map(ticket => `
    <div style="margin-bottom: 10px; border-bottom: 1px dashed #ccc; padding-bottom: 5px;">
      <strong>${ticket.ticketNumber}</strong>: ${ticket.firstName} ${ticket.lastName}<br>
      Problem: ${ticket.problemDescription}<br>
      Status: ${ticket.status} | Response: ${ticket.response}<br>
      Submitted: ${ticket.requestDate}
    </div>
  `).join("");

  $("#allTickets").html(html || "<p>No tickets submitted yet.</p>");
}

function submitTicket(ticketData) {
  const ticket = {
    ticketNumber: "TICKET-" + ticketCounter++,
    requestDate: new Date().toLocaleString(),
    employeeId: ticketData.employeeId,
    firstName: ticketData.firstName,
    lastName: ticketData.lastName,
    problemDescription: ticketData.problemDescription,
    status: "Open",
    response: "Pending"
  };

  ticketStorage.push(ticket);

  $("#submitResult").text("Ticket submitted successfully.");
  $("#ticketForm")[0].reset();

  displayTicket(ticket);
  renderAllTickets(); // Refresh full ticket list
}

function getTicketByEmployeeId(empId) {
  const matches = ticketStorage.filter(t => t.employeeId === empId);

  if (matches.length > 0) {
    $("#lookupError").empty();

    const latest = matches[matches.length - 1];
    displayTicket(latest);

    const listHtml = matches.map(ticket => `
      <div style="margin-bottom: 10px; border-bottom: 1px dashed #ccc; padding-bottom: 5px;">
        <strong>${ticket.ticketNumber}</strong>: ${ticket.firstName} ${ticket.lastName}<br>
        Problem: ${ticket.problemDescription}<br>
        Status: ${ticket.status} | Response: ${ticket.response}<br>
        Submitted: ${ticket.requestDate}
      </div>
    `).join("");

    $("#ticketList").html(listHtml);
  } else {
    $("#ticketDetails").hide();
    $("#ticketList").empty();
    $("#lookupError").html("<p style='color:red;'>No tickets found for that Employee ID.</p>");
  }
}

$(document).ready(function () {
  $("#ticketForm").on("submit", function (e) {
    e.preventDefault();
    const ticketData = {
      employeeId: $("#newEmpId").val().trim(),
      firstName: $("#newFName").val().trim(),
      lastName: $("#newLName").val().trim(),
      problemDescription: $("#newProblem").val().trim()
    };
    submitTicket(ticketData);
  });

  $("#lookupBtn").on("click", function () {
    const empId = $("#ticketLookupInput").val().trim();
    if (empId) {
      getTicketByEmployeeId(empId);
    }
  });
});
