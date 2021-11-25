const countries = document.querySelector('.countries');
const countryImg = document.querySelector('.country-image');
const loaderImg = document.querySelector('#loader-img');
// const countryName = document.querySelector('.country-name');
// const continent = document.querySelector('.continent');
// const population = document.querySelector('.country-population');
// const language = document.querySelector('.country-language');
// const timezone = document.querySelector('.country-timezone');

console.log(countryImg);

const getCountry = function (countryName) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${countryName}`);

  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);

    console.log(data);

    const html = `<div class="country">
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

    countries.insertAdjacentHTML('beforeend', html);

    countries.classList.remove('hidden');
  });
  this.onload = function () {
    loaderImg.style.display = 'none';
  };
};

getCountry('pakistan');
getCountry('usa');
getCountry('india');
getCountry('uk');
getCountry('japan');
getCountry('portugal');
getCountry('canada');
getCountry('france');
getCountry('turkey');
getCountry('iran');
getCountry('russia');
