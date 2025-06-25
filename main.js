import {myapi} from './api';
const apikey = myapi();

window.addEventListener("load",()=>{
    if(navigator.geolocation){
        navigator.geolocation.
        getCurrentPosition((position)=>{
            let lon = position.coords.longitude;
            let lan = position.coords.latitude;
             const url=`http://api.openweathermap.org/data/2.5/weather?q=delhi&appid=${apikey}`;

             fetch(url).then(res=>{
                return res.json()
             }).then((data)=>{
                console.log(data);
             })
        })
    }
})