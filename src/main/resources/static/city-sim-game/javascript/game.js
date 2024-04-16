//Button Click Functionality
let profit;
const button = document.getElementById('button');
button.addEventListener("click", async function () {
    await addMoney(1);
});


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
    await updateTotal();
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

function initializeShop() {
    fetch('/initialize-shop')
        .then(response => response.json())
        .then(props => {
            const shopBox = document.getElementById('shop');
            props.forEach(prop => {
                console.log('Item ID:', prop.id);
                console.log('Item Price:', prop.price);
                console.log('Item Multiplier:', prop.multiplier);

                let propElement = document.createElement('div');
                propElement.classList.add('shopItem');
                propElement.textContent = 'Building ' + prop.id.toLocaleString() +  '\t$' + prop.price.toLocaleString();
                propElement.addEventListener('click', async function () {
                    if (profit >= prop.price) {
                        propElement.remove();
                        await updateTotal();
                        await subMoney(prop.price);
                        await setMultiplier(prop.multiplier);
                        await createFeedCol(generateMessage("Building " + prop.id))
                    }
                })
                shopBox.appendChild(propElement);
            });
        })
        .catch(error => console.error('Error fetching items:', error));
}
document.addEventListener('DOMContentLoaded', initializeShop);









// //Initialize Shop
// // class Prop {
// //     constructor(name, price, element) {
// //         this._name = name;
// //         this._price = price;
// //         this._element = element;
// //     }
// //     get name() {
// //         return this._name;
// //     }
// //     get price() {
// //         return this._price;
// //     }
// //     get element() {
// //         return this._element;
// //     }
// //     get multiplier() {
// //         return 0.3;
// //     }
// // }
//
// // let props = [];
// // const shopBox = document.getElementById('shop');
// // let price = 10;
// // for (let i = 1; i <= 12; i++) {
// //     let prop = new Prop('Building ' + i, price, document.createElement('div'))
// //     props.push(prop);
// //     prop.element.classList.add('shopItem');
// //     prop.element.textContent = prop.name + '\t$' + prop.price.toLocaleString();
// //     shopBox.appendChild(prop.element);
// //     price *= 1.57;
// //     price = roundOff(Math.round(price));
// // }
// // function roundOff(number) {
// //     const powerOfTen = Math.pow(10, Math.floor(Math.log10(number)));
// //     return Math.round(number / powerOfTen) * powerOfTen;
// // }
//
// //api fetches
// function addMoney() {
//     fetch('/add-money', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ money: ''+1 })
//     })
//         .then(response => response.text())
//         .then(responseText => {
//             console.log('Response from Java:', responseText);
//         });
// }
// function subtractMoney(amount) {
//     profit -= amount;
//     fetch('/sub-money', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ money: ''+amount })
//     })
//         .then(response => response.text())
//         .then(responseText => {
//             console.log('Response from Java:', responseText);
//         });
// }
//
// //Making money with button clicks
// const button = document.getElementById('button');
// let profit = 0;
// button.addEventListener('click', function() {
//     profit++;
//     addMoney();
//     updateTotal();
// })
// function updateTotal() {
//     const profitElement = document.getElementById('profit');
//     profitElement.textContent = profit.toString();
// }
//
// function generateMessage(name) {
//     return "You bought " + name + "!";
// }
//
// //Updating Feed Box
// function createFeedCol(message) {
//     const feedBox = document.getElementById('feed');
//     feedBox.scrollTop = feedBox.scrollHeight + feedBox.clientHeight + feedBox.clientHeight;
//     const feedCol = document.createElement('div');
//     const feed = document.createTextNode(message);
//     feedCol.className = 'feedCol';
//     feedCol.appendChild(feed);
//     feedBox.appendChild(feedCol);
// }
//
// //Buying items in the shop
// // const items = document.querySelectorAll('.shopItem');
// // for (const item of items) {
// //     item.addEventListener('click', function() {
// //         for (const prop of props) {
// //             if (prop.element === item) {
// //                 if (profit >= prop.price) {
// //                     subtractMoney(prop.price);
// //                     createFeedCol(generateMessage(prop.name));
// //
// //                     item.remove();
// //                     props.splice(props.indexOf(prop), 1);
// //                     updateTotal();
// //                 }
// //             }
// //         }
// //     })
// // }