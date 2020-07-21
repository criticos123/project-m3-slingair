const flightInput = document.getElementById("flight");
const buttonEmail = document.getElementById("emailButton");
const resereveEmail = document.getElementById("Email");
const seatsDiv = document.getElementById("seats-section");
const confirmButton = document.getElementById("confirm-button");
const getName = document.getElementById("givenName");
const getSurname = document.getElementById("surname");
const getEmail = document.getElementById("email");

let selection = "";
const renderSeats = (seatInfo) => {
  document.querySelector(".form-container").style.display = "block";
  console.log(seatInfo.flightInfo);
  const alpha = ["A", "B", "C", "D", "E", "F"];
  for (let r = 1; r < 11; r++) {
    const row = document.createElement("ol");
    row.classList.add("row");
    row.classList.add("fuselage");
    seatsDiv.appendChild(row);
    for (let s = 1; s < 7; s++) {
      const seatNumber = `${r}${alpha[s - 1]}`;
      const seat = document.createElement("li");

      // Two types of seats to render
      const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`;
      const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`;

      // TODO: render the seat availability based on the data...
      const seatFind = seatInfo.flightInfo.find((seat) => {
        if (seat.id === seatNumber) {
          return true;
        }
      });
      if (seatFind.isAvailable) {
        seat.innerHTML = seatAvailable;
      } else {
        seat.innerHTML = seatOccupied;
      }
      row.appendChild(seat);
    }
  }

  let seatMap = document.forms["seats"].elements["seat"];
  seatMap.forEach((seat) => {
    seat.onclick = () => {
      selection = seat.value;
      seatMap.forEach((x) => {
        if (x.value !== seat.value) {
          document.getElementById(x.value).classList.remove("selected");
        }
      });
      document.getElementById(seat.value).classList.add("selected");
      document.getElementById("seat-number").innerText = `(${selection})`;
      confirmButton.disabled = false;
    };
  });
};
const startingContent = (event) => {
  fetch("/flights")
    .then((res) => res.json())
    .then((data) => {
      data.flightNumbers.forEach((number) => {
        const optionTags = document.createElement("option");
        optionTags.innerText = number;
        flightInput.appendChild(optionTags);
      });
    });
};
startingContent();
const toggleFormContent = (event) => {
  const flightNumber = flightInput.value;
  console.log("toggleFormContent: ", flightNumber);
  fetch(`/flights/${flightNumber}`)
    .then((res) => res.json())
    .then((data) => {
      renderSeats(data);
    });
  // TODO: contact the server to get the seating availability
  //      - only contact the server if the flight number is this format 'SA###'.
  //      - Do I need to create an error message if the number is not valid?

  // TODO: Pass the response data to renderSeats to create the appropriate seat-type.
};
const viewReservation = (event) => {
  window.location.href = `/view-reservation?email=${resereveEmail.value}`;
};
const handleConfirmSeat = (event) => {
  event.preventDefault();
  const personInfo = {
    flight: flightInput.value,
    seat: selection,
    givenName: getName.value,
    surname: getSurname.value,
    email: getEmail.value,
  };
  // TODO: everything in here!
  fetch("/users", {
    method: "POST",
    body: JSON.stringify(personInfo),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      window.location.href = `/confirmed?id=${data.id}`;
    });
};
flightInput.addEventListener("change", toggleFormContent);
