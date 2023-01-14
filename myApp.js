require('dotenv').config({path: __dirname + "/mongo.env"});
let mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Database connection successful', process.env.MONGO_URI)
})
.catch(err => {
  console.error('Database connection error', err)
})


let personSchema = new mongoose.Schema({
  name: { type: String, require: true },
  age: Number,
  favoriteFoods: [String]
})

let Person = new mongoose.model('Person', personSchema)

const createAndSavePerson = (done) => {
  let newPerson = new Person({
    name: "Pablo",
    age: 36,
    favoriteFoods: ['banana', 'apple', 'dark-chocolate ice-cream']
  });
  console.log(newPerson)
  newPerson.save(function(err, data) {
    console.log(data)
    if (err) console.log(err);
    done(null, data);
  })
  
};

const arrayOfPeople = [
{
  name: "Pablo",
  age: 36,
  favoriteFoods: ['banana', 'apple', 'dark-chocolate ice-cream']
},
{
  name: "Maria",
  age: 25,
  favoriteFoods: ['Pizza', 'Humus', 'apple pie']
},
{
  name: "Juan",
  age: 31,
  favoriteFoods: ['banana', 'coffee', 'chocolate cake']
}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err,data) {
    console.log(data)
    if (err) console.log(err);
    done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  const name = {name: personName}
  Person.find(name, function(err, data) {
    if(err) console.log(err);
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  const foodToFind = {favoriteFoods: food};
  Person.findOne(foodToFind, function(err, data) {
    if(err) console.log(err);
    done(null, data)
  })
};

const findPersonById = (personId, done) => {
  const id = { _id: personId };
  Person.findById(id, function(err, data) {
    if(err) console.log(err);
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if(err) console.log(err);
    person.favoriteFoods.push(foodToAdd);
    person.save((err, data) => {
      if(err) console.lor(err);
      done(null, data)
    })
  }) 
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  const name = { name: personName };
  const age = { age: ageToSet };

  Person.findOneAndUpdate(name, age, { new: true }, (err, data) => {
    if(err) console.log(err);
    done(null, data);
  })
};

const removeById = (personId, done) => {
  const id = { _id: personId }
  Person.findByIdAndRemove(id, (err, data) => {
    if(err) console.log(err);
    done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  const name = { name: nameToRemove }
  Person.remove(name, (err, data) => {
    if(err) console.log(err);
    done(null, data)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  const food = { favoriteFoods: foodToSearch }
  Person.find(food)
    .sort({name: 1})
    .limit(2)
    .select({ age: 0 })
    .exec((err, data) => {
      if(err) console.log(err);
      done(null, data)
    })
  }

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
