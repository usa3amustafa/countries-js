const countries = document.querySelector('.countries');
const container = document.querySelector('.container');
const loaderImage = document.querySelector('#loader-img');
const btnP = document.querySelector('.btn-container');
const btn = document.querySelector('.btn');

loaderImage.style.display = 'none';
container.style.display = 'none';

const renderError = function (msg) {
  btn.style.display = 'none';
  loaderImage.style.display = 'none';

  const html = `<h2 class="error-message">
                  ${msg}
                </h2>`;

  btnP.insertAdjacentHTML('beforeend', html);
};

const renderCountry = function (data, className = '') {
  html = `<div class="country ${className}">
          <div class="country-img">
            <img src="${data.flags.png}" alt="" class="country-image" />
          </div>
          <div class="country-details">
            <h2 class="country-name">${data.name.common}</h2>
            <h3 class="continent">${data.region}</h3>
            <ul>
              <li>
                <i class="fas fa-user-friends population"></i>
                <span class="country-population">${(
                  data.population / 1000000
                ).toFixed(1)} M people</span>
              </li>
              <li>
                <i class="fas fa-city capital-city"></i>                
                <span class="country-language">${data.capital[0]}</span>
              </li>
              <li>
                <i class="fas fa-clock timezone"></i>
                <span class="country-timezone">${data.timezones[0]}</span>
              </li>
            </ul>
          </div>
        </div>`;

  loaderImage.style.display = 'none';
  btnP.style.display = 'none';
  container.style.display = 'block';
  countries.insertAdjacentHTML('beforeend', html);
  countries.classList.remove('hidden');
};

// get JSON

const getJSON = function (url, errorMsg = 'something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${response.status} ${errorMsg}`);
    return response.json();
  });
};

const getCountry = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, `country not found`)
    .then(countryData => {
      const [data] = countryData;
      renderCountry(data);
      return data.borders;
    })
    .then(arr => {
      if (!arr) throw new Error(`the country has no neigbours`);
      for (const country of arr) {
        getJSON(`https://restcountries.com/v3.1/alpha/${country}`)
          .then(countryData => {
            const [data] = countryData;
            renderCountry(data, 'neighbour');
          })
          .catch(err => {
            console.log(`Error ${err.message}`);
          })
          .finally(() => {
            console.log('neigbours printed ');
          });
      }
    })
    .catch(err => {
      console.log(
        `something went wrong ${err.message} , please try again later`
      );
      renderError(
        `Something Went wrong
         ${err.message} , 
         Please Try again later`
      );
    })
    .finally(() => {
      console.log('country and neigbours printed');
    });
};

btn.addEventListener('click', () => {
  loaderImage.style.display = 'flex';

  const whereAmI = function (lat, lng) {
    // do reverse geocoding to get country from lat and lng
    console.log(lat, lng);
    // fetch(`https://geocode.xyz/52.508,13.381?geoit=json`)
    // fetch(`https://geocode.xyz/19.037,72.873?geoit=json`)
    fetch(`https://geocode.xyz/-33.933,18.474?geoit=json`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const { country } = data;
        getCountry(country);
      });
  };

  function getPosition(pos) {
    whereAmI(pos.coords.latitude, pos.coords.longitude);
  }

  navigator.geolocation.getCurrentPosition(getPosition);
});
