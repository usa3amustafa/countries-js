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

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        resolve(pos);
      },
      err => {
        if (err.message === 'User denied Geolocation') {
          const err = { message: 'please give access to the location' };
          reject(err);
        }
      }
    );
  });
};

// get JSON

const getJSON = async function (url, errorMsg = 'something went wrong') {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${errorMsg}`);
  return await response.json();
};

const renderNeignhbour = async function (countries) {
  const countriesMap = countries.map(n =>
    getJSON(`https://restcountries.com/v3.1/alpha/${n}`)
  );
  const data = await Promise.all(countriesMap);
  data.forEach(([d]) => {
    renderCountry(d, 'neighbour');
  });
  // const countriesRes = await Promise.all([countriesMap]);
  // console.log(countriesRes);
};

const whereIAm = async function (c1, c2, c3) {
  try {
    const [[country1], [country2], [country3]] = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    const countries = [country1, country2, country3];
    countries.forEach(c => {
      renderCountry(c);
      renderNeignhbour(c.borders);
    });
  } catch (err) {
    console.log(err);
    console.log(`${err.message}`);
    renderError(`${err.message}`);

    // throw error of the promise returned from the async promise
    throw err;
  }
};

btn.addEventListener('click', () => {
  loaderImage.style.display = 'flex';
  whereIAm('portugal', 'russia', 'pakistan');
});

// const getCountry = function (country) {
//   getJSON(`https://restcountries.com/v3.1/name/${country}`, `country not found`)
//     .then(countryData => {
//       const [data] = countryData;
//       renderCountry(data);
//       return data.borders;
//     })
//     .then(arr => {
//       if (!arr) throw new Error(`the country has no neigbours`);
//       for (const country of arr) {
//         getJSON(`https://restcountries.com/v3.1/alpha/${country}`)
//           .then(countryData => {
//             const [data] = countryData;
//             renderCountry(data, 'neighbour');
//           })
//           .catch(err => {
//             console.log(`Error ${err.message}`);
//           })
//           .finally(() => {
//             console.log('neigbours printed ');
//           });
//       }
//     })
//     .catch(err => {
//       console.log(
//         `something went wrong ${err.message} , please try again later`
//       );
//       renderError(
//         `Something Went wrong
//          ${err.message} ,
//          Please Try again later`
//       );
//     })
//     .finally(() => {
//       console.log('country and neigbours printed');
//     });
// };

// const getPosition = function () {
//   return new Promise(function (res, rej) {
//     navigator.geolocation.getCurrentPosition(res, rej);
//   });
// };

// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;

//       // do reverse geocoding to get country from lat and lng

//       // fetch(`https://geocode.xyz/52.508,13.381?geoit=json`)
//       // fetch(`https://geocode.xyz/19.037,72.873?geoit=json`)
//       // fetch(`https://geocode.xyz/-33.933,18.474?geoit=json`)
//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(response => {
//       // console.log(response.json());
//       if (!response.ok)
//         throw Error(`${response.status} please try again in a few seconds`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(data.country);
//       getCountry(data.country);
//     })
//     .catch(err => {
//       renderError(`Error ${err.message} , thankyou`);
//       console.log(`Error ${err.message} , thankyou`);
//     })
//     .finally(() => {
//       console.log('countries and neigbours printed on the base of location');
//     })
//     .catch(err => renderError(`${err.message}`));
// };
