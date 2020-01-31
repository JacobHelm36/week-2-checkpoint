let cheeseCount = 100
let clickDamage = 1
let autoModPurchases = []

let clickUpgrades = {
  pickAxes: {
    price: 20,
    quantity: 0,
    multiplier: 1
  },
  carts: {
    price:50,
    quantity: 0,
    multiplier: 4
  }
}

let autoUpgrades = {
  rovers: {
    name: "Rover",
    price: 100,
    quantity: 0,
    multiplier: 15
  },
  UFO: {
    name: "UFO",
    price:500,
    quantity: 0,
    multiplier: 30
  }
}

let inspirationElem = document.getElementById("more-supplies")

//initial click function
function mine() {
  cheeseCount += clickDamage
  update()
}
//click upgrade purchase buttons
function buyPickAxe() {
  if (cheeseCount >= clickUpgrades.pickAxes.price) {
    inspirationElem.innerHTML = "+ Axe"
    cheeseCount-= clickUpgrades.pickAxes.price
    clickDamage+=clickUpgrades.pickAxes.multiplier;
    clickUpgrades.pickAxes.quantity++;
    clickUpgrades.pickAxes.price += 15;
  } else {
    inspirationElem.innerHTML = "Need more supplies"
  }
  update()
}

function buyCart() {
  if (cheeseCount >= clickUpgrades.carts.price) 
  {
    cheeseCount-= clickUpgrades.carts.price;
    clickDamage+= clickUpgrades.carts.multiplier;
    clickUpgrades.carts.quantity++;
    clickUpgrades.carts.price += 25
  } else {
    inspirationElem.innerHTML = "Need more supplies"
  }
  update()
}

//automatic upgrade purchase buttons
function automaticButtons(itemName) {
  let item = autoUpgrades[itemName]
  if (cheeseCount >= item.price) {
    autoModPurchases.push(item.multiplier)
    item.quantity++
    cheeseCount -= item.price
    inspirationElem.innerHTML = `you've got ${item.quantity} of ${item.name}`
    item.price += Math.floor(item.price*.2)
    update()
    startInterval()
  } else {
    inspirationElem.innerHTML = `You don't have enough CHEESE!!`
  }
}

function startInterval() {
  setInterval(collectAutoUpgrades, 3000)
  update()
}

function collectAutoUpgrades() {
  for (let i = 0; i<autoModPurchases.length; i++) {
    let autoMods = 0;
    autoMods += autoModPurchases[i]
    cheeseCount+=autoMods
    update()
  }
}

//add how many items the user has
function update() {
  document.getElementById("update-cheese").textContent = cheeseCount.toString();
  document.getElementById("click-dmg").textContent = clickDamage.toString();
  document.getElementById("cart-price").textContent = clickUpgrades.carts.price.toString()
  document.getElementById("pick-price").textContent = clickUpgrades.pickAxes.price.toString()
  document.getElementById("rover-price").textContent = autoUpgrades.rovers.price.toString()
  document.getElementById("ufo-price").textContent = autoUpgrades.UFO.price.toString()
  document.getElementById("rover-count").textContent = autoUpgrades.rovers.quantity.toString()
  document.getElementById("ufo-count").textContent = autoUpgrades.UFO.quantity.toString()
  document.getElementById("cart-count").textContent = clickUpgrades.carts.quantity.toString()
  document.getElementById("pick-count").textContent = clickUpgrades.pickAxes.quantity.toString()
} 
update()