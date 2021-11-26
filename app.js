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

const getCountry = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(countryData => {
      const [data] = countryData;
      renderCountry(data);
      const neigbour = data.borders[0];
      if (!neigbour) return;
      return fetch(`https://restcountries.com/v3.1/alpha/${neigbour}`);
    })
    .then(response => response.json())
    .then(neigbourCountry => {
      const [data] = neigbourCountry;
      renderCountry(data, 'neighbour');
    })
    .catch(err => {
      console.log(
        `something went wrong ${err.message} , please try again later`
      );
      renderError(`Something Went wrong ${err.message} Please Try again later`);
    })
    .finally();
};

btn.addEventListener('click', () => {
  loaderImage.style.display = 'flex';
  getCountry(prompt('Enter the country u want to know about'));
});

// const getCountryAndNeigbour = function (countryName) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v3.1/name/${countryName}`);

//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);

//     renderCountry(data);

//     const neigbours = data.borders;

//     if (!neigbours) return;

//     for (const neigbour of neigbours) {
//       const request2 = new XMLHttpRequest();
//       request2.open('GET', `https://restcountries.com/v3.1/alpha/${neigbour}`);

//       request2.send();

//       request2.addEventListener('load', function () {
//         const [data] = JSON.parse(this.responseText);

//         renderCountry(data, 'neighbour');
//       });
//     }
//   });
// };

// getCountry(prompt('Enter the country name you want to know about'));

// getCountryAndNeigbour('pakistan');
// getCountryAndNeigbour('usa');
// getCountryAndNeigbour('india');
// getCountryAndNeigbour('uk');
// getCountryAndNeigbour('japan');
// getCountryAndNeigbour('portugal');
// getCountryAndNeigbour('canada');
// getCountryAndNeigbour('france');
// getCountryAndNeigbour('turkey');
// getCountryAndNeigbour('zimbabwe');
// getCountryAndNeigbour('australia');
// getCountryAndNeigbour('spain');
// getCountryAndNeigbour('italy');
// getCountryAndNeigbour('ghana');
// getCountryAndNeigbour('bulgaria');
// getCountryAndNeigbour('russia');
