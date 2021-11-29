// console.log('test started');

// setTimeout(() => {
//   console.log('0 second timer started');
// }, 1000);

// Promise.resolve('new promise')
//   .then(res => {
//     console.log(res);
//     for (let i = 0; i < 1000000000; i++) {}
//     setTimeout(() => {
//       console.log('res');
//     }, 0);

//     return 'promise 2';
//   })
//   .then(data => {
//     console.log(data);
//   });

// console.log('test ended');

// const newPromise = new Promise(function (resolve, reject) {
//   const random = Math.random();
//   console.log(random);
//   if (random > 0.5) {
//     resolve('you won the lottery');
//   } else {
//     reject(new Error('you lost the lottery'));
//   }
// });

// newPromise.then(res => console.log(res)).catch(err => console.log(`${err}`));

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(3).then(res => console.log('i waited for 5 seconds'));

// navigator.geolocation.getCurrentPosition(
//   pos => console.log(pos),
//   err => console.log(err)
// );

// const getPosition = function () {
//   return new Promise(function (res, rej) {
//     navigator.geolocation.getCurrentPosition(res, rej);
//   });
// };

// getPosition()
//   .then(res => {
//     console.log(res.coords.latitude, res.coords.longitude);
//     return fetch(
//       `https://geocode.xyz/${res.coords.latitude},${res.coords.longitude}?geoit=json`
//     );
//   })
//   .then(res => res.json())
//   .then(data => {
//     console.log(data.country);
//   })
//   .catch(err => console.log(err.message));

// const container = document.querySelector('.container');

// let i = 1;
// let currImg;

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// function createImage(imgPath) {
//   return new Promise(function (res, rej) {
//     const img = document.createElement('img');
//     img.src = imgPath;
//     img.className = `img-${i}`;
//     img.addEventListener('load', function () {
//       img.classList.add('img');
//       container.insertAdjacentElement('beforeend', img);
//       currImg = document.querySelector(`.img-${i}`);
//       res(img);
//     });

//     img.addEventListener('error', function (e) {
//       rej(new Error(`${e.type} image not found`));
//     });

//     // res(img);
//     // rej(err => err);
//   });
// }

// wait(2)
//   .then(() => createImage(`./img/img-${i}.jpg`))
//   .then(res => {
//     console.log(res);
//     i++;
//     return wait(2);
//   })
//   .then(() => {
//     currImg.classList.add('hidden');
//     return wait(0.5);
//   })
//   .then(() => createImage(`./img/img-${i}.jpg`))
//   .then(res => {
//     console.log(res);
//     i++;
//     return wait(2);
//   })
//   .then(() => {
//     currImg.classList.add('hidden');
//     return wait(0.5);
//   })
//   .then(() => createImage(`./img/img-${i}.jpg`))
//   .then(res => {
//     console.log(res);
//     i++;
//   })
//   .catch(err => {
//     console.log(`${err}`);
//   });

// const container = document.querySelector('.container');
// const countries = document.querySelector('.countries');

// const renderCountry = function (data, className = '') {
//   html = `<div class="country ${className}">
//           <div class="country-img">
//             <img src="${data.flags.png}" alt="" class="country-image" />
//           </div>
//           <div class="country-details">
//             <h2 class="country-name">${data.name.common}</h2>
//             <h3 class="continent">${data.region}</h3>
//             <ul>
//               <li>
//                 <i class="fas fa-user-friends population"></i>
//                 <span class="country-population">${(
//                   data.population / 1000000
//                 ).toFixed(1)} M people</span>
//               </li>
//               <li>
//                 <i class="fas fa-city capital-city"></i>
//                 <span class="country-language">${data.capital[0]}</span>
//               </li>
//               <li>
//                 <i class="fas fa-clock timezone"></i>
//                 <span class="country-timezone">${data.timezones[0]}</span>
//               </li>
//             </ul>
//           </div>
//         </div>`;

//   container.style.display = 'block';
//   countries.insertAdjacentHTML('beforeend', html);
//   countries.classList.remove('hidden');
// };

// const getCountry = async function (country) {
//   const res = await fetch(`https://restcountries.com/v3.1/alpha/${country}`);
//   const [data] = await res.json();
//   renderCountry(data);
// };

// const getNeigbours = async function (country) {
//   const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
//   const [data] = await res.json();
//   renderCountry(data);
//   data.borders.forEach(c => {
//     getCountry(c);
//   });
// };

// getNeigbours('Pakistan');

// const getPosition = async function () {
//   try {
//     const res = await getPosition();
//     console.log(res);
//   } catch (err) {
//     console.log(err);
//   }
// };

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

const whereIAm = async function () {
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    console.log(lat, lng);
    return `your location is ${lat} , ${lng}`;
  } catch (err) {
    console.log(err);
    console.log(`${err.message}`);

    throw err.message;
  }
};

(async function () {
  try {
    const location = await whereIAm();
    console.log(location);
  } catch (err) {
    console.log(err.message);
  }
})();

// whereIAm().then(data => console.log(data));
