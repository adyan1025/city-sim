//Button Click Functionality
let profit;
const button = document.getElementById('button');
button.addEventListener("click", async function () {
    const audio = new Audio("city-sim-game/money_sound.mp3");
    audio.play();
    await addMoney(1);
});
const modelChange = new CustomEvent('model', {});


//Button Click REST API requests
async function getMoney() {
    try {
        const response = await fetch('/get-money');
        const number = await response.json();
        profit = number;
        console.log('Received number:', number);
    } catch (error) {
        console.error('Error fetching number:', error);
    }
}

function lockIn() {
    let clouds = document.getElementById('background-wrap');
    let day = document.getElementById('day');
    let navbar = document.getElementById('navbar');
    let cityName = document.getElementById('cityName');
    let menu = document.getElementById('menu');
    let button = document.getElementById('button');
    let feedBox = document.getElementById('feedBox');
    let shop = document.getElementById('shop');
    clouds.classList.add('fade-background');
    day.classList.add('fade-background');
    navbar.classList.add('fade-white-cards');
    cityName.classList.add('fade-white-cards');
    menu.classList.add('fade-menu');
    button.classList.add('fade-menu');
    feedBox.classList.add('fade-menu');
    shop.classList.add('fade-menu');
    let night = document.getElementById('bgCanvas');
    night.style.display = 'unset';
    clouds.style.display = 'none';
}

async function addMoney(amount) {
    try {
        const response = await fetch('/add-money', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(amount),
        });

        if (response.ok) {
            console.log('Money added successfully');
            await getMoney();
            updateTotal();
        } else {
            throw new Error('Error adding money: ' + response.status);
        }
    } catch (error) {
        console.error(error);
    }
}

async function subMoney(amount) {
    try {
        const response = await fetch('/subtract-money', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(amount),
        });

        if (response.ok) {
            console.log('Money subtracted successfully');
        } else {
            throw new Error('Error adding money: ' + response.status);
        }
    } catch (error) {
        console.error(error);
    }
}

async function setMultiplier(multiplier) {
    try {
        const response = await fetch('/set-multiplier', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(multiplier),
        });

        if (response.ok) {
            console.log('Multiplied successfully');
        } else {
            throw new Error('Error adding money: ' + response.status);
        }
    } catch (error) {
        console.error(error);
    }
}

async function setPassive(passive) {
    try {
        const response = await fetch('/add-passive', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(passive),
        });

        if (response.ok) {
            console.log('Passive Added');
        } else {
            throw new Error('Error adding money: ' + response.status);
        }
    } catch (error) {
        console.error(error);
    }
}

function updateTotal() {
    const profitElement = document.getElementById('profit');
    profitElement.textContent = profit.toString();
}

function generateMessage(name, type, num) {
    if (type === 0) {
        return "You bought " + name + "! This passively grants $" + num + ".";
    }
    else if (type === 1) {
        return "You bought " + name + "! This grants +" + num + " per click.";
    }
    else if (type === 2) {
        return "You don't have enough for this prop!";
    }
    else {
        return "You didn't buy the previous prop!";
    }
}

// Updating Feed Box
function createFeedCol(message) {
    const feedBox = document.getElementById('feed');
    feedBox.scrollTop = feedBox.scrollHeight + feedBox.clientHeight + feedBox.clientHeight;
    const feedCol = document.createElement('div');
    const feed = document.createTextNode(message);
    feedCol.className = 'feedCol';
    feedCol.appendChild(feed);
    feedBox.appendChild(feedCol);
}

setInterval(getMoney, 700);
setInterval(updateTotal, 700);

let buy_audio = new Audio("/city-sim-game/buy.mp3");
let isBought = {};
function initializeShop() {
    fetch('/initialize-shop')
        .then(response => response.json())
        .then(props => {
            console.log("HERE!!!" + props);
            const shopBox = document.getElementById('shop');
            props.forEach(prop => {
                isBought[prop.id] = false;
                let propElement = document.createElement('div');
                let priceElement = document.createElement('span');
                propElement.classList.add('shopItem');
                priceElement.classList.add('price');
                if (prop.type === "Building") {
                    propElement.textContent = prop.name;
                }
                else if (prop.type === "Vehicle") {
                    propElement.textContent = prop.name;
                }
                else {
                    console.log("This is nothing?");
                }
                priceElement.textContent = '$' + prop.price.toLocaleString();
                propElement.addEventListener('click', async function () {
                    if (prop.id === 0 || isBought[prop.id-1]) {
                        if (!isBought[prop.id]) {
                            if (profit >= prop.price) {
                                if (prop.id === 6) {
                                    lockIn();
                                }
                                else if (prop.id === 7) {
                                    window.location.href = "/win";
                                }
                                isBought[prop.id] = true;
                                buy_audio.play();
                                propElement.remove();
                                await subMoney(prop.price);
                                if (prop.type === "Building") {
                                    await createFeedCol(generateMessage(prop.name, 0, prop.passive));
                                    await setPassive(prop.passive);
                                } else if (prop.type === "Vehicle") {
                                    await setMultiplier(prop.multiplier);
                                    await createFeedCol(generateMessage(prop.name, 1, prop.multiplier));
                                } else {
                                    console.log("This is nothing?");
                                }
                                window.dispatchEvent(modelChange);
                            }
                            else {
                                await createFeedCol(generateMessage("", 2, 0));
                            }
                        }
                    }
                    else {
                        await createFeedCol(generateMessage("", 3, 0));
                    }
                })
                const line_break = document.createElement('br')
                propElement.appendChild(line_break);
                propElement.appendChild(priceElement);
                shopBox.appendChild(propElement);
            });
        })
        .catch(error => console.error('Error fetching items:', error));
}
initializeShop();