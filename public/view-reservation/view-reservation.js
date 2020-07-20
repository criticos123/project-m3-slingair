const url = new URL(window.location);
const id = url.searchParams.get("id");
// 1 need fetch (get) pass id as a url param
// 2 add new endpoint to server that will expect and id and respond with the reservation info for that id.
fetch("/reservation/" + id)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    document.getElementById("flight").innerText = data.flight;
    document.getElementById("seat").innerText = data.seat;
    document.getElementById("name").innerText =
      data.givenName + " " + data.surname;
    document.getElementById("email").innerText = data.email;
  });
