const people = [
  { name: 'Nader', age: 36 },
  { name: 'Amanda', age: 24 },
  { name: 'Jason', age: 44 }
];

export default () =>
  //hit api
  // new Promise((resolve, reject) => {
   new Promise((resolve) => {
    setTimeout(() => resolve(people), 3000);
  })
;
