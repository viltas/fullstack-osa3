// Tehtävä 3.12

const mongoose = require('mongoose')

var name = ''
var number = ''

if (process.argv.length < 3) {
  console.log('give password')
  process.exit(1)
}
const pw = process.argv[2]
const dbname = 'phonebook'

const url =
    `mongodb+srv://fullstack:${pw}@cluster0.iev5k.mongodb.net/${dbname}?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {
  name = process.argv[3]
  number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(() => {
    console.log('Person saved!')
    mongoose.connection.close()
  })
}
else if (process.argv.length === 3) {
  Person.find({}).then(persons => {
    persons.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}

