const express = require('express')
var morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.json())
morgan.token('person', request => JSON.stringify(request.body))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :person"))

//morgan('tiny')

let persons = [
  {
    id: 1,
    name: "Gilgamesh Virtanen",
    number: "050-1231234",
  },
  {
    id: 2,
    name: "Erkki Berserkki",
    number: "020-3213214",
  },
  {
    id: 3,
    name: "Isännöitsijä",
    number: "045-3233452",
  },
  {
    id: 4,
    name: "Hilma Musashi-Mäenpää",
    number: "098-4234234",
  }
]
app.get('/', (req, res) => {
  res.send('<h1>Puhelinluettelo backend</h1>')
})

app.get('/info', (req, res) => {
  const count = persons.length
  const date = new Date()
  res.send('Phonebook has info for ' + count + ' people <br/> ' + date)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name is missing' 
    })
  }

  if (persons.some(p => p.name === body.name)) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  if (!body.number) {
    return response.status(400).json({ 
      error: 'number is missing' 
    })
  }

  const person = {
    id: Math.floor(Math.random() * (10000 - 0 + 1) + 0),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})