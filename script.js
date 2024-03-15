//прогноз погоди
//визначення поточного місця за координатами користувача   
document.addEventListener('DOMContentLoaded', ()=>{
  navigator.geolocation.getCurrentPosition(success, error);
  function success(pos) {
    crd = pos.coords;

    let request=fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&units=metric&appid=bbcd7d9705175a30e01add50eccb06f0`)
    .then(position=>position.json())
    .then(position=>{

    let city=position.name;
   // console.log(city)
    getWeather(`${city}`);
    getHourly(`${city}`);  
    getCities(`${city}`);

    link.classList.add('active');

    let form = document.forms.form;
    let input = form.elements.city;
    input.value=position.name;
  })
}
  function error() {
    alert("Give permission to get your geolocation or input in search box your place!");
  };
  if (!navigator.geolocation){
    alert("Geolocation not supported by your browser");
  };
})

//сайт погоди fetch
function getWeather(city){
    let resquest = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bbcd7d9705175a30e01add50eccb06f0`)
    .then(city => city.json())
    .then(city => {
        // console.log(city)

        let firstBlock=document.querySelector('#firstBlock');

        let divA=document.createElement('div'); //загальний дів для першого блоку
        divA.classList.add('stylewhite');
        firstBlock.append(divA);

        let divAa=document.createElement('div');
        divAa.classList.add('forcity');
        divA.append(divAa);
        
        let div1=document.createElement('div'); //дів для назви міста
        div1.classList.add('cityName');
        divAa.append(div1);
        div1.innerHTML+=city.name;
        div1.style.fontSize = '25px';
        div1.style.color='steelblue';
        
        let today=new Date();
         //функція для додавання 0 якщо місяць менше 9
        function addZero(num) {
	    if (num >= 0 && num <= 9) {
		    return '0' + num;
	            } else {
		    return num;
	            }
            }
            let divDate=document.createElement('div');
            divDate.classList.add('myStyle');
            divDate.style.color='steelblue';
            divAa.append(divDate);
            divDate.innerHTML=addZero(today.getDate()) + '.' + addZero(today.getMonth()+1) + '.' + today.getFullYear();

            let divDescr=document.createElement('div');
            divDescr.classList.add('someStyle')
            divA.append(divDescr);
            divDescr.innerHTML=`<b>${city.weather[0].main}</b>`;

            let divFor=document.createElement('div');
            divFor.classList.add('blocks'); //для інформації в ряд /картинка, темп, показники
            divA.append(divFor);

            let img=document.createElement('img');
            img.classList.add('bigImg');
            divFor.append(img);
            img.src=`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`;
            img.style.fontSize='35px'

            let divTemp=document.createElement('div');
            //divTemp.classList.add('tempStyle')
            divFor.append(divTemp);
            divTemp.innerHTML=(city.main.temp-273.15).toFixed(0) + ' &#176 C';
            divTemp.style.fontSize='30px';

            let divWind=document.createElement('div');
            divFor.append(divWind);
            let divMinTemp=document.createElement('div');

            let divMaxTemp=document.createElement('div');
            let divSpeed=document.createElement('div');
            divWind.append(divMinTemp);
            divWind.append(divMaxTemp);
            divWind.append(divSpeed);

            divMinTemp.innerHTML='Min temperature ' + (city.main.temp_min-273.15).toFixed(0) + ' &#176 C';
            divMaxTemp.innerHTML='Max temperature ' + (city.main.temp_max-273.15).toFixed(0) + ' &#176 C';
            divSpeed.innerHTML='Wind speed (km/h) ' + (city.wind.speed);
           
 })  
 //реалізація помилки
 .catch(() => {
     document.querySelectorAll(".stylewhite").forEach((e) => e.remove()); 
     document.querySelectorAll(".styleerr").forEach((e) => e.remove()); 

     console.log('some error');
     let divErr=document.createElement('div');
     divErr.classList.add('styleerr');
     firstBlock.append(divErr);
     let img1=document.createElement('img');
     img1.classList.add('imgStyle');
     img1.src='./3229071_280367-P615EO-548.jpg';
     divErr.append(img1);

     let warning = document.createElement('p');
        warning.innerHTML= `${city}` + ' could not be found. Please enter the different location';
        warning.classList.add('forMess')
        warning.style.fontSize = '30px';
        warning.style.color = 'red';
        divErr.append(warning);

        link5.disabled=true;
     });
}
        
//робота форми з двома функціями
let form = document.forms.form;
let btn = form.elements.btn;
let link = document.getElementById('a');
let link5 = document.getElementById('a5');

btn.addEventListener("click", () => {
    let city = form.elements.city.value;
    getWeather(`${city}`);
    getHourly(`${city}`);  
    getCities(`${city}`);  

//видалення попереднього міста
  document.querySelectorAll(".polotno").forEach((e) => e.remove()); 
  document.querySelectorAll(".stylewhite").forEach((e) => e.remove()); 
  document.querySelectorAll(".polotnoo").forEach((e) => e.remove()); 
  document.querySelectorAll(".polotno5").forEach((e) => e.remove()); 
  document.querySelectorAll(".styleerr").forEach((e) => e.remove()); 

  link.classList.add('active');
  link5.classList.remove('active');
 }); 

// //вкладка "сьогодні"
 link.addEventListener('click',()=>{
    let city = form.elements.city.value;
    getWeather(`${city}`);
    getHourly(`${city}`);  
    getCities(`${city}`);

    //додати підкреслення
    link.classList.add('active');
    link5.classList.remove('active');
 //очищення попередніх блоків
  document.querySelectorAll(".polotno").forEach((e) => e.remove()); 
  document.querySelectorAll(".polotno5").forEach((e) => e.remove()); 
  document.querySelectorAll(".stylewhite").forEach((e) => e.remove()); 
  document.querySelectorAll(".polotnoo").forEach((e) => e.remove()); 

 });

//вкладка 5 днів
 link5.addEventListener('click',()=>{
    let city = form.elements.city.value;
    getFiveDays(`${city}`);
    getHourly(`${city}`);

    link.classList.remove('active');
    link5.classList.add('active');

// //очищення попередніх блоків
    document.querySelectorAll(".stylewhite").forEach((e) => e.remove()); 
    document.querySelectorAll(".polotno").forEach((e) => e.remove()); 
    document.querySelectorAll(".polotnoo").forEach((e) => e.remove());  
    document.querySelectorAll(".polotno5").forEach((e) => e.remove()); 
 }); 

//найближчі місця!!!
function getCities(city){
    axios.get(`http://api.openweathermap.org/data/2.5/find?q=${city}&appid=bbcd7d9705175a30e01add50eccb06f0`)
    .then(res=>{
        
    // console.log(res);
    let lat=res.data.list[0].coord.lat;
    let lon=res.data.list[0].coord.lon;
   
    axios.get(`http://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=5&units=metric&appid=bbcd7d9705175a30e01add50eccb06f0`)
    .then(res=>{
        console.log(res);
    
    let thirdBlock=document.querySelector('#thirdBlock');
    
    let third=document.createElement('div'); //білий фон третього блоку
    third.classList.add('polotnoo');
    third.style.fontSize='20px';
    thirdBlock.append(third);

    let divzag=document.createElement('div');
    divzag.classList.add('sto')
    third.append(divzag)

    let h4=document.createElement('h4'); //заголовок 
    h4.classList.add('anyy'); //вирівняти по лівому краю
    h4.innerHTML='Nearby places';
    h4.style.color='steelblue';
    divzag.append(h4);

    for (let item of res.data.list){
        
    let div=document.createElement('div');
    div.classList.add('places');
    third.append(div);
    div.innerHTML=item.name;
    div.innerHTML+=`<img src=http://openweathermap.org/img/wn/${item.weather[0].icon}.png>`;
    div.innerHTML+=(item.main.temp).toFixed(0) + ' &#176 C';
    
    if(item.name==(`${city}`[0].toUpperCase() + `${city}`.slice(1))){ //забрати перше місто, яке відповідає введеному
        div.remove()
            }
        }    
    })
    .catch(error => {
                console.error('Error fetching weather data:', error);
            });
})
}          
//погодинний прогноз погоди
function getHourly(city){
    let request=fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=bbcd7d9705175a30e01add50eccb06f0`)
    .then(city=>city.json())
    .then(city=>{
        console.log(city)

        let secondBlock=document.querySelector('#secondBlock');

        let second=document.createElement('div'); //білий фон другого блоку
        second.classList.add('polotno');
        second.style.fontSize='20px';
        secondBlock.append(second);

        let h4=document.createElement('h4'); //заголовок hourly
        h4.classList.add('any');
        h4.innerHTML='Hourly';
        h4.style.color='steelblue';
        second.append(h4)

        let genDiv=document.createElement('div'); //для назви
        genDiv.classList.add('white');
        second.append(genDiv);

        let p0=document.createElement('p'); //день та назва властивості погоди (t, w, ...)
        p0.classList.add('days');
        genDiv.append(p0);
        let today=new Date();
        let days = [
            'Sunday',
            'Monday',
            'Teusday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
        let d = today.getDay();
        p0.innerHTML=`<b>${days[d]}</b>`; //
        p0.innerHTML+=`<br>`;
        p0.innerHTML+=`<p>`;
        p0.innerHTML+=`<br>`;
        p0.innerHTML+=`<p>`;
        p0.innerHTML+=`<br>`;
        p0.innerHTML+=`<p>`;
        p0.innerHTML+=`<br>`;
        p0.innerHTML+=`<p>`;
        p0.innerHTML+='Forecast ';
        p0.innerHTML+=`<br>`;
        p0.innerHTML+=`<p>`;
        p0.innerHTML+='Temp(&#176 C) ';
        p0.innerHTML+=`<br>`;
        p0.innerHTML+=`<p>`;
        p0.innerHTML+='Wind(km/h)';
        p0.innerHTML+=`<br>`;

        for(let i=0;i<6;i++){
            let divDays=document.createElement('div');
            divDays.classList.add('some');
            genDiv.append(divDays);
            let p=document.createElement('p');
            divDays.append(p);
            
            //забрати дату та залишити лише час без секунд
            p.innerHTML+=((`${city.list[i].dt_txt}`).replace(/(\d+)-(\d+)-(\d+)/, ' ').split(":",1)) + ':00';
            
            //шлях регулярного виразу
            // myDate = time.replace(/(\d+)-(\d+)-(\d+)/, ' ');
            // console.log(myDate);
            // let my = myDate.split(":", 1);
            // console.log(my);
            // let num =Number(my);
            // console.log(num + ':00')        

            let img=document.createElement('img');
            img.src=`http://openweathermap.org/img/wn/${city.list[i].weather[0].icon}@2x.png`;
            divDays.append(img);
            let p1=document.createElement('p');
            p1.innerHTML=`${city.list[i].weather[0].main}`;
            divDays.append(p1);
            let p2=document.createElement('p');
            p2.innerHTML=`${parseInt(city.list[i].main.temp-273.15) + '&#176 C'}`;
            divDays.append(p2);
            let p3=document.createElement('p');
            p3.innerHTML=`${city.list[i].wind.speed}` + ' km/h';
            divDays.append(p3);
        }
    })
    .catch(error => {
                console.error('Error fetching weather data:', error);
                document.querySelectorAll(".polotno").forEach((e) => e.remove());
            });
}

//прогноз погоди на 5 днів
function getFiveDays(city){
    let request=fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&count=5&appid=bbcd7d9705175a30e01add50eccb06f0`)
    .then(city=>city.json())
    .then(city=>{
        console.log(city);

        let firstBlock=document.querySelector('#firstBlock');

        let first=document.createElement('div'); //білий фон другого блоку
        first.classList.add('polotno5');
        firstBlock.append(first);

        //для кожного дня push свої години прогнозу погоди (stackoverflow)
        let array = city.list; //массив, можно использовать массив объектов
        let size = 8; //размер подмассива
        let subarray = []; //массив в который будет выведен результат.
        for (let i = 0; i <Math.ceil(array.length/size); i++){
        subarray[i] = array.slice((i*size), (i*size) + size);
         }
        console.log(subarray); //пять підмасивів по 8 обєктів

        for(let i=0;i<subarray.length;i++){
            console.log(subarray[i][0]); //кожен перший з пяти
            console.log(subarray[i]);

                let divFive=document.createElement('div');
                divFive.classList.add('aaaa5');
                first.append(divFive);

                let p=document.createElement('p');
                divFive.append(p);

    const days = {
    0: "SUN",
    1: "MON",
    2: "TUE",
    3: "WED",
    4: "THU",
    5: "FRI",
    6: "SAT"
  };
  const d = new Date(subarray[i][0].dt * 1000);
  const dayName = days[d.getDay()];
  //console.log(dayName)
  p.innerHTML=`<b>${dayName}<b>`;

            p.innerHTML+=`<br>`; 
            p.innerHTML+=`<p>`; 
            p.innerHTML+=`${subarray[i][0].dt_txt}`.replace(/(\d+):(\d+):(\d+)/, ' '); //викинути години
            p.innerHTML+=`<p>`;
            p.innerHTML+=`<br>`;  
            p.innerHTML+=`<img src=http://openweathermap.org/img/wn/${subarray[i][0].weather[0].icon}@2x.png>`;
            p.innerHTML+=`<br>`;  
            p.innerHTML+=`${parseInt(subarray[i][0].main.temp) + '&#176 C'}`;
            p.innerHTML+=`<br>`;  
            p.innerHTML+=`${subarray[i][0].weather[0].main}`; 
            p.innerHTML+=`<br>`; 
            p.innerHTML+=`${subarray[i][0].weather[0].description}`; 

        }
//при натисканні на день зявляється погодинний прогноз погоди
        
let divFor5=document.querySelectorAll('.aaaa5')
    for(let i=0;i<divFor5.length;i++){
        divFor5[i].addEventListener('click', ()=>{

        document.querySelectorAll(".polotno").forEach((e) => e.remove()); //видаляємо попередній прогноз
        let secondBlock=document.querySelector('#secondBlock');

let second=document.createElement('div'); //білий фон другого блоку
second.classList.add('polotno');
secondBlock.append(second);

let h4=document.createElement('h4'); //заголовок hourly
h4.classList.add('any');
h4.innerHTML='Hourly';
h4.style.fontSize='20px';
h4.style.color='steelblue';
second.append(h4);

let genDiv=document.createElement('div'); //для назви
        genDiv.classList.add('white');
        second.append(genDiv);

        let p0=document.createElement('p'); //день та назва властивості погоди (t, w, ...)
        p0.classList.add('days');
        p0.style.fontSize='20px';
        genDiv.append(p0);

const days = {
    0: "SUNDAY",
    1: "MONDAY",
    2: "TUERSDAY",
    3: "WEDNESDAY",
    4: "THUSDAY",
    5: "FRIDAY",
    6: "SATURDAY"
  };
  const d = new Date(subarray[i][0].dt * 1000);
  const dayName = days[d.getDay()];
  //console.log(dayName)
  p0.innerHTML=`<b>${dayName}<b>`;

        p0.innerHTML+=`<br>`;
        p0.innerHTML+=`<p>`;
        p0.innerHTML+=`<br>`;
        p0.innerHTML+=`<p>`;
        p0.innerHTML+=`<br>`;
        p0.innerHTML+=`<p>`;
        p0.innerHTML+='Forecast ';
        p0.innerHTML+=`<br>`;
        p0.innerHTML+=`<p>`;
        p0.innerHTML+='Temp(&#176 C) ';
        p0.innerHTML+=`<br>`;
        p0.innerHTML+='Real Feel ';
        p0.innerHTML+=`<br>`;
        p0.innerHTML+=`<p>`;
        p0.innerHTML+='Wind(km/h)';
        p0.innerHTML+=`<br>`;

        for(let j=0;j<6;j++){    //перебираємо кожен обєкт всіх пяти утворених масивів!!!! \_{")}_/
            let divDays=document.createElement('div');
            divDays.classList.add('some');
            genDiv.append(divDays);
            let p=document.createElement('p');
            p.style.fontSize='20px';
            divDays.append(p);

           p.innerHTML+=((`${subarray[i][j].dt_txt}`).replace(/(\d+)-(\d+)-(\d+)/, ' ').split(":",1)) + ':00';
           p.innerHTML+=`<br>`; 
           p.innerHTML+=`<img src=http://openweathermap.org/img/wn/${subarray[i][j].weather[0].icon}@2x.png>`;
           p.innerHTML+=`<br>`; 
           p.innerHTML+=`${subarray[i][j].weather[0].main}`;
           p.innerHTML+=`<br>`; 
           p.innerHTML+=`<p>`;
           p.innerHTML+=`${parseInt(subarray[i][j].main.temp)}` + ' &#176 C'; 
           p.innerHTML+=`<br>`; 
           p.innerHTML+=`${parseInt(subarray[i][j].main.feels_like)}` + ' &#176 C'; 
           p.innerHTML+=`<br>`; 
           p.innerHTML+=`<p>`;
           p.innerHTML+=`${subarray[i][j].wind.speed}` + ' km/h';;
         };
      });
    };
  })
  .catch(error => {
                console.error('Error fetching weather data:', error);
            });
}
 

