// openweathermap.org
let my_city = "London";
let API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${my_city}&appid=0c064be1a54bc58da877f505c0940ac5&units=metric`;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// console.log(API_URL);
async function getCity(cityname){
    my_city = cityname;
    API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${my_city}&appid=0c064be1a54bc58da877f505c0940ac5&units=metric`;
    const resp = await fetch(API_URL);
    // console.log(resp);
    if(resp.status == 200){
        const respData = await resp.json();
        createCityCard(respData);
    }
    else{
        main.innerHTML = "Sorry, we don't have the weather data for your city.";
    }
}

function createCityCard(city){
    let iconCode = `${city.weather[0].icon}`;
    console.log(iconCode);
    
    document.body.style.backgroundImage = `url(./images/${iconCode[0] + iconCode[1] + 'd'}.jpeg)`;
    document.body.style.backgroundSize = "cover";
    
    let iconURL = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    // console.log(iconURL);
    const cardHTML = `
    <div>
        <ul>
            <li><strong>City Name:</strong> ${city.name} </li>
            <li><strong>Country Name: </strong> ${city.sys.country} </li>
            <br>
            <li><strong>Weather: </strong> ${city.weather[0].main} </li>
            <li><strong>Weather Description: </strong> ${city.weather[0].description} </li>
            <br>
            <li><strong>Temperature:</strong> ${city.main.temp} <span>&#8451;</span></li>
            <li><strong>Feels like:</strong> ${city.main.feels_like} <span>&#8451;</span></li>
        </ul>
        <img src = ${iconURL} alt = "Weather Icon">
    </div>
    `;
    main.innerHTML = cardHTML;
}

form.addEventListener("submit", e => {
    e.preventDefault();  
    const city = search.value;
    console.log("You searched for city", city);
    if(city){
        getCity(city);
        search.value = "";
    }
});
