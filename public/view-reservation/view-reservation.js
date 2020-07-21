const url = new URL(window.location);
const id = url.searchParams.get("email");
console.log(id);
fetch("/reservation/" + id)
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("flight").innerText = data.flight;
    document.getElementById("seat").innerText = data.seat;
    document.getElementById("name").innerText =
      data.givenName + " " + data.surname;
    document.getElementById("email").innerText = data.email;
  });
