console.log('SiswaModel invoked');
const Realm = require('realm');
const SiswaSchema = {
  name: 'Siswa',
  properties: {
    name:  'string',
    last_name: 'string',
    nis: {type: 'int', default: 0},
  }
};
var realm_db;
Realm.open({path: '/Users/opetstudio/AdventistEducation/Siswa.realm', schema: [SiswaSchema]})
  .then(function(realm){
    console.log('open schema invoked');
    realm_db = realm;
    // Create Realm objects and write to local storage
    // realm.write(() => {
    //   const myCar = realm.create('Car', {
    //     make: 'Honda',
    //     model: 'Civic',
    //     miles: 1000,
    //   });
    //   myCar.miles += 20; // Update a property value
    // });
    //
    // // Query Realm for all cars with a high mileage
    // const cars = realm.objects('Car').filtered('miles > 1000');

    // Will return a Results object with our 1 car
    // cars.length // => 1

    // Add another car
    // realm.write(() => {
    //   const myCar = realm.create('Car', {
    //     make: 'Ford',
    //     model: 'Focus',
    //     miles: 2000,
    //   });
    // });

    // Query results are updated in realtime
    // cars.length // => 2
  });
