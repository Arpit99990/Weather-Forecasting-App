import { createElement } from 'react';
import {myapi} from './api';
const apikey = myapi();

window.addEventListener("load",()=>{
    if(navigator.geolocation){
        navigator.geolocation.
        getCurrentPosition((position)=>{
            let lon = position.coords.longitude;
            let lan = position.coords.latitude;
            const url= `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` + `lon=${lon}&appid=${apikey}`;

             fetch(url).then(res=>{
                return res.json()
             }).then((data)=>{
                console.log(data);
                weatherReport(data)
             })
        })
    }
})

function searchByCity(){
    var place= document.getElementById('input').value;
    var urlsearch= `http://api.openweathermap.org/data/2.5/weather?q=${place}&` + `appid=${apikey}`;

    fetch(urlsearch).then((res)=>{
        return res.json();
    }).then((data)=>{
        console.log(data);
        weatherReport(data);
    })
    document.getElementById('input').value='';
}

function weatherReport(data){
    var urlcast=`http://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=${apikey}`;

    fetch(urlcast).then(res=>{
                return res.json()
             }).then((forecast)=>{
                console.log(forecast);
                hourForecast(forecast);
                dayForecast(forecast);

                document.getElementById('city').
                innerText=data.name+', '+ data.sys.country;

                document.getElementById('temperature').
                innerText=Math.floor(data.main.temp -273)+' °C';

                 document.getElementById('clouds').innerText= data.weather[0].description;
                 console.log(data.weather[0].description)
                 
                 let icon1= data.weather[0].icon;
                 let iconurl= "http://api.openweathermap.org/img/w/"+ icon1 +".png";
                 document.getElementById('img').src=iconurl
             })
            }

function hourForecast(forecast){
    document.querySelector('.templist').
    innerHTML= '';
    for(let i=0;i<5;i++){
        var date=new Date(forecast.list[i].dt*1000);

        let houR=document.createElement('div');
        houR.setAttribute('class','next');

        let div=document.createElement('div');
        let time=document.createElement('p');
        time.setAttribute('class','time');
        time.innerText=(date.
        toLocaleTimeString(undefined,'Asia/Kolkata')).replace(':00','');
        
        let temp=document.createElement('p');
        temp.innerText=Math.floor(forecast.list[i].main.temp_max -273)+' °C'
        +'/'+Math.floor(forecast.list[i].main.temp_min -273)+' °C';

        div.appendChild(time);
        div.appendChild(temp);

        let desc=document.createElement('p');
        desc.setAttribute('class','desc');
        desc.innerText=forecast.list[i].
        weather[0].description;

        houR.appendChild(div);
        houR.appendChild(desc);
        document.querySelector('.templist').
        appendChild(houR);
    }
}
function dayForecast(forecast){
    document.querySelector('weekF').
    innerHTML='';

    for(int =8;i<forecast.list.length;i+=8){
        console.log(forecast.list[i]);
        
        let div=document.createElement('div');
        div.setAttribute('class','dayF');

        let day=document.createElement('p');
        day.setAttribute('class','date');
        day.innerText=new Date(forecast.list[i].dt*1000).
        toLocaleDateString(undefined,'Asia/Kolkata');
        div.appendChild(day);

        let temp=document.createElement('p');
        temp.innerText=Math.floor(forecast.list[i].main.temp_max -273)+' °C'
        +'/'+Math.floor(forecast.list[i].main.temp_min -273)+' °C';
        div.appendChild(temp);

        let description= document.createElement('p');
        description.setAttribute('class','desc')
        description.innerText= forecast.list[i].weather[0].description;
        div.appendChild(description);

        document.querySelector('.weekF').appendChild(div)
    }
}