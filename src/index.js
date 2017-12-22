const theatreId = 1;

document.addEventListener("DOMContentLoaded", fetchGetShowings())

function fetchGetShowings(){
    let showings = document.getElementById("showings")
    showings.innerHTML = ""
  fetch("http://localhost:3000/theatres/1")
  .then(res => res.json())
  .then(json => {

    showings.innerHTML = ""
    json.showings.forEach(showing => {
      let liTag = document.createElement("li")
      liTag.innerText = `${showing.film.title}`
      // console.log(ptag)
      let buyTicket = document.createElement("button")
      buyTicket.type = "button"
      liTag.id = `${showing.id}`
      buyTicket.innerText = "Purchase Ticket"
      showings.appendChild(liTag)

      // let list = document.getElementById(`${showing.id}`)
      //
      liTag.appendChild(buyTicket)
      // list.appendChild(buyTicket)
      buyTicket.addEventListener("click", () => purchaseTicket(event, showing))
      // console.log(showing)

    })
  })
}
//
function purchaseTicket(event, showing){
  let data = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({
      showing_id: showing.id,
    })
  }

  fetch(`http://localhost:3000/tickets`, data)
  .then(res => res.json())
  .then(json => {
    if (json.error!== undefined){
      alert(json.error)
    } else {
      alert("Successfully created ticket")
      fetchGetShowings
    }
  })

}
