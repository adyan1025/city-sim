const backgroundMusic = new Audio("/city-sim-game/background_music.mp3");
backgroundMusic.loop = true;
window.addEventListener("DOMContentLoaded", function() {
    backgroundMusic.play();
});

document.addEventListener("click", function() {
    backgroundMusic.play();
});

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
        if (profit >= 40) {
            lockIn();
        }
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

function updateTotal() {
    const profitElement = document.getElementById('profit');
    profitElement.textContent = profit.toString();
}

function generateMessage(name) {
    return "You bought " + name + "!";
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

setInterval(getMoney, 500);
setInterval(updateTotal, 500);

let buy_audio = new Audio("/city-sim-game/buy.mp3");
function initializeShop() {
    fetch('/initialize-shop')
        .then(response => response.json())
        .then(props => {
            const shopBox = document.getElementById('shop');
            props.forEach(prop => {
                // console.log('Item ID:', prop.id);
                // console.log('Item Price:', prop.price);
                // console.log('Item Multiplier:', prop.multiplier);
                // console.log('Item Passive: ', prop.passive);

                let propElement = document.createElement('div');
                propElement.classList.add('shopItem');
                if (prop.type === "Building") {
                    propElement.textContent = 'Building ' + prop.id.toLocaleString() +  '\t$' + prop.price.toLocaleString();
                }
                else if (prop.type === "Vehicle") {
                    propElement.textContent = 'Vehicle ' + prop.id.toLocaleString() +  '\t$' + prop.price.toLocaleString();
                }
                else {
                    console.log("This is nothing?");
                }
                propElement.addEventListener('click', async function () {
                    if (profit >= prop.price) {
                        buy_audio.play();
                        propElement.remove();
                        await subMoney(prop.price);
                        await setMultiplier(prop.multiplier);

                        if (prop.type === "Building") {
                            await createFeedCol(generateMessage("Building " + prop.id));
                        }
                        else if (prop.type === "Vehicle") {
                            await createFeedCol(generateMessage("Vehicle " + prop.id));
                        }
                        else {
                            console.log("This is nothing?");
                        }

                        // profit -= prop.price;
                        window.dispatchEvent(modelChange);

                    }
                })
                shopBox.appendChild(propElement);
            });
        })
        .catch(error => console.error('Error fetching items:', error));
}
document.addEventListener('DOMContentLoaded', initializeShop);