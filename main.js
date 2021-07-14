// openweathermap.org
let my_city; //= "London";
let API_URL ;//= `https://api.openweathermap.org/data/2.5/weather?q=${my_city}&appid=0c064be1a54bc58da877f505c0940ac5&units=metric`;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const clk =document.getElementById("clk");


 async function getCity(cityname){
    my_city = cityname;
    API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${my_city}&appid=0c064be1a54bc58da877f505c0940ac5&units=metric`;
    const resp =  await fetch(API_URL);
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
    let iconCode = city.weather[0].icon;
   
    
    document.body.style.backgroundImage = `url(./images/${iconCode[0] + iconCode[1] + 'd'}.jpeg)`;
    document.body.style.backgroundSize = "100vw 100vh";
    document.body.style.width="100%";

    const weather=document.getElementById("weather");
    const temp=document.getElementById("temp");
    
    const feel=document.getElementById("feel");
    const desc=document.getElementById("desc");
    
    const cityname=document.getElementById("cityname");
    const country=document.getElementById("country");

    let iconURL = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
   // console.log(iconURL);

           if(city.main.temp >= 33)
           {   console.log("yes i enter");
               temp.style.color="red";
                weather.style.color="red";
                cityname.style.color="red";
                country.style.color="red";
                desc.style.color="red";
                feel.style.color="red";
            }       
           if((city.main.temp>17)&&(city.main.temp<33))
           {
            temp.style.color="green";
            feel.style.color="green";
            cityname.style.color="green";
             country.style.color="green";
            weather.style.color="green";
            desc.style.color="green";
           }
           if(city.main.temp<=17)
           {
            temp.style.color="blue";
            feel.style.color="blue";
            cityname.style.color="blue";
                country.style.color="blue";
            weather.style.color="blue";
            desc.style.color="blue";

           }

       

            cityname.innerHTML=`<strong>City Name:</strong> ${city.name}`
           

            country.innerHTML=`<strong>Country Name: </strong> ${city.sys.country}` 
    
            weather.innerHTML=`<strong>Weather: </strong> ${city.weather[0].main}`

            desc.innerHTML=`<strong>Weather Description: </strong> ${city.weather[0].description}`

                 temp.innerHTML=`<strong>Temperature:</strong> ${city.main.temp} <span>&#8451;</span>`
                        feel.innerHTML=`<strong>Feels like:</strong> ${city.main.feels_like} <span>&#8451;</span>`
        
        //document.getElementById("imageicon").innerHTML=`<img src = ${iconURL} alt = "Weather Icon" id="icon" >`
        document.getElementById("imageicon").innerHTML=`<img src = ${iconURL} alt = "Weather Icon" id="icon" >`
    }

clk.addEventListener("click",findtext);

         //   event.preventDefault();
         function findtext()
         {   let my_cit=search.value;
            console.log("your sarch",my_cit);
            if(my_cit){
                getCity(my_cit);
                search.value="";
            }
        }
 form.addEventListener("submit", function(event) {
     event.preventDefault();  
     const city = search.value;
     console.log("You searched for city", city);
     if(city){
         getCity(city);
         search.value = "";
    }
 }

 );
