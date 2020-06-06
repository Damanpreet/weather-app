console.log("Client side javascript file is loaded!");

const Userlocation = document.querySelector('form');

Userlocation.addEventListener('submit', (event)=>{
    event.preventDefault();
    
    const search = document.getElementById('location');
    const weather = document.getElementById('weather');
    search.style.color = "green";
    search.textContent = "Loading..."
    weather.textContent = "";

    var address = document.querySelector('input');
    var address = address.value;
    
    fetch('/weather?address='+address).then((resp)=>{
        resp.json().then((data)=>{
            
            
            if(data.error){
                console.log(data.error);
                search.textContent = data.error;
                search.style.color = "red";
                weather.textContent = "";
                return;
            }
            search.textContent = "Location is: "+data.location;
            weather.textContent = "Weather: " + data.forecast;
            search.style.color = "green";
            weather.style.color = "blue";
        });
    });
   
})


