const rowData = document.querySelector('.rowData');
let weatherDay = {};
let weatherArray=[];
const searchInput = document.querySelector('input.search');
const searchBtn = document.querySelector('.searchtn');
const form = document.forms[0];
form.addEventListener('click', function(e){
    e.preventDefault();
})

async function weather(city){
    const result = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6a53b6c615924b24b81133712241506&q=${city}&days=3`);
    weatherDay = await result.json();
    weatherArray = weatherDay.forecast.forecastday;
    display();
}
weather('cairo');

searchInput.addEventListener('input', async function(){
    let searchText = await fetch(`http://api.weatherapi.com/v1/search.json?key=6a53b6c615924b24b81133712241506&q=${searchInput.value}`);
    const searchResult = await searchText.json();
    weather(searchResult[0].name)
})

searchBtn.addEventListener('click',function(){
    searchInput.value = null;
})


let cartona = ``;
function display(){
  let dateObj = new Date(weatherArray[0].date);
  let dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
  let dateObj1 = new Date(weatherArray[1].date);
  let dayOfWeek1 = dateObj1.toLocaleDateString('en-US', { weekday: 'long' });
  let dateObj2 = new Date(weatherArray[2].date);
  let dayOfWeek2 = dateObj2.toLocaleDateString('en-US', { weekday: 'long' });
  console.log(dayOfWeek2);
  
    cartona = `
     <div class="col-lg-4 px-0 gy-3">
            <div class="today text-white">
              <header class="p-2 d-flex justify-content-between">
                <p class="day mb-0">${dayOfWeek}</p>
                <p class="date mb-0">${weatherArray[0].date}</p>
              </header>
              <section class="p-3">
                <h6 class="fs-4">${weatherDay.location['name']}</h6>
                <h3 class="py-2">${weatherDay.current.windchill_c}°C</h3>
                <img src="https:${weatherDay.current.condition['icon']}">
                <p class="text-primary">${weatherDay.current.condition['text']}</p>
                <div class="py-4">
                  <span class="me-3"><i class="fa-solid fa-umbrella"></i> 20%</span>
                  <span class="me-3"><i class="fa-solid fa-wind"></i>${weatherDay.current.wind_kph}km/h</span>
                  <span class="me-3"><i class="fa-regular fa-compass"></i> ${weatherDay.current.wind_dir}</span>
                </div>
              </section>
            </div>
          </div>
          <div class="col-lg-4 px-0 gy-3">
            <div class="tomorrow h-100 text-white">
              <header class="p-2 text-center">
                <p class="day mb-0">${dayOfWeek1}</p>
              </header>
              <section class="p-3 text-center">
                <img class="py-3" src="https:${weatherArray[1].day.condition['icon']}">
                <h5 class="dayDeg fs-3">${weatherArray[1].day.maxtemp_c}°C</h5>
                <h6 class="nightDeg fs-6">${weatherArray[1].day.mintemp_c}°C</h6>
                <p class="text-primary py-2">${weatherArray[1].day.condition['text']}</p>
              </section>
            </div>
          </div>
          <div class="col-lg-4 px-0 gy-3">
            <div class="twoDays h-100 text-white">
              <header class="p-2 text-center">
                <p class="day mb-0">${dayOfWeek2}</p>
              </header>
              <section class="p-3 text-center">
                <img class="py-3" src="https:${weatherArray[2].day.condition['icon']}">
                <h5 class="dayDeg fs-3">${weatherArray[2].day.maxtemp_c}°C</h5>
                <h6 class="nightDeg fs-6">${weatherArray[2].day.mintemp_c}°C</h6>
                <p class="text-primary py-2">${weatherArray[2].day.condition['text']}</p>
              </section>
            </div>
          </div>
    `
    rowData.innerHTML = cartona;
}
