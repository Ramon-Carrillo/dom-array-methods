const main = document.getElementById('main')
const addUser = document.getElementById('add-user')
const double = document.getElementById('double')
const showMillionaires = document.getElementById('show-millionaires')
const sort = document.getElementById('sort')
const calculateWealth = document.getElementById('calculate-wealth')

let data = []

//* Fetch random user and add money
const getRandomUser = async () => {
  try {
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json()

    const user = data.results[0]
    const newUser = {
      name: `${user.name.first} ${user.name.last}`,
      money: Math.floor(Math.random() * 1000000),
    }
    addData(newUser)
  } catch (error) {
    console.error(error.status, 'No good Dr. Jones')
  }
}

//* Double money of users
const doubleMoney = () => {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 }
  })
  updateDOM()
}

//* Sort users by their money
const sortByRichest = () => {
  data = data.sort((a, b) => b.money - a.money)

  updateDOM()
}

//* Filter only millionaires
const filteredMillionaires = () => {
  data = data.filter((user) => {
    return user.money >= 1000000
  })
  updateDOM()
}

//* Calculate total value
const totalWealth = () => {
  const wealth = data.reduce((acc, user) => acc + user.money, 0)

  const wealthEl = document.createElement('div')
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth,
  )}</strong></h3>`
  main.appendChild(wealthEl)
}

//* Add new obj to data arr
const addData = (obj) => {
  data.push(obj)

  updateDOM()
}

//* Update DOM
const updateDOM = (providedData = data) => {
  //* Clear main div
  main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>'

  providedData.forEach((item) => {
    const element = document.createElement('div')
    element.classList.add('person')
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money,
    )}`
    main.appendChild(element)
  })
}

//* Format number as money
const formatMoney = (amount) => {
  return new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

//* Event Listeners
addUser.addEventListener('click', getRandomUser)
double.addEventListener('click', doubleMoney)
sort.addEventListener('click', sortByRichest)
showMillionaires.addEventListener('click', filteredMillionaires)
calculateWealth.addEventListener('click', totalWealth)

getRandomUser()
getRandomUser()
getRandomUser()
