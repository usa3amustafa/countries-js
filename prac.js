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

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(3).then(res => console.log('i waited for 5 seconds'));
