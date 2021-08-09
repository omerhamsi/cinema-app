const container=document.querySelector(".container");
const count=document.getElementById("count");
const amount=document.getElementById("amount");
const select=document.getElementById("movie");
const seats=document.querySelectorAll(".seat:not(.reserved)");

getfromlocalstrogae();
calculatetotal();
container.addEventListener("click",function(e){
    if(e.target.classList.contains("seat")&& !e.target.classList.contains("reserved")){
        e.target.classList.toggle("selected");
        calculatetotal();
    }
    
})
function calculatetotal(){
    const selectedSeats = container.querySelectorAll('.seat.selected');

    const selectedSeatsArr = [];
    const seatsArr = [];

    selectedSeats.forEach(function(seat) {
        selectedSeatsArr.push(seat);
    });

    seats.forEach(function(seat) {
        seatsArr.push(seat);
    });

    // [1,3,5]
    let selectedSeatIndexs = selectedSeatsArr.map(function(seat) {
        return seatsArr.indexOf(seat);
    });
    let price=select.value;
    let total=container.querySelectorAll(".seat.selected").length;
    count.innerText=total;
    amount.innerText=price*total;
    savetolocalstorage(selectedSeatIndexs);
}
select.addEventListener("change",function(e){
    calculatetotal();
})
function savetolocalstorage(indexs){
    localStorage.setItem("selectedseats",JSON.stringify(indexs));
    localStorage.setItem("selectedmovieindex",select.selectedIndex);
}
function getfromlocalstrogae(){
    const selectedseats = JSON.parse(localStorage.getItem('selectedseats'));

    if (selectedseats !=null && selectedseats.length > 0) {
        seats.forEach(function(seat, index) {
            if (selectedseats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    const selectedmovie=localStorage.getItem("selectedmovieindex");
    if(selectedmovie!=null && selectedmovie.length>0){
        select.selectedIndex=selectedmovie;
    }
}