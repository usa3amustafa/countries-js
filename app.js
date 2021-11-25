const countries = document.querySelector('.countries');

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
};

getCountry(prompt('Enter the country name you want to know about'));

// getCountry('pakistan');
// getCountry('usa');
// getCountry('india');
// getCountry('uk');
// getCountry('japan');
// getCountry('portugal');
// getCountry('canada');
// getCountry('france');
// getCountry('turkey');
// getCountry('zimbabwe');
// getCountry('australia');
// getCountry('spain');
// getCountry('italy');
// getCountry('chilie');
// getCountry('ghana');
// getCountry('bulgaria');
