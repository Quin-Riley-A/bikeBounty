// Bike API: https://api.99spokes.com/docs
import StolenBike from './classes/stolenBike';
import './css/styles.css';

//Business Logic

const stolenBikes = (area='IP', proximity) => {
  const url = `https://bikeindex.org:443/api/v3/search?location=${area}&distance=${proximity}&stolenness=proximity`;
  console.log(url);
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('data');
      console.log(data);
      const stolenBikes = [];
      for (let i = 0; i < data.bikes.length; i++) {
        const stolenBike = new StolenBike(data.bikes[i]);
        stolenBikes.push(stolenBike);
      }
      console.log('stolenBikes');
      console.log(stolenBikes);
      displayStolenBike(stolenBikes);
    });
};
//function displayError {for bad API request}

//UI logic
const displayStolenBike = (stolenBikes) => {
  const outputDiv = document.getElementById('divOutput');
  const bikesHTMLString = stolenBikes.map ( stolenBike => `
  <img src="${stolenBike.image}"/>
  <p><strong>Bike Manufacturer:</strong> ${stolenBike.bike}.
  <br>
  <strong>Serial Number:</strong> ${stolenBike.serial}</p>
  <p><strong>Color(s):</strong> ${stolenBike.colors}.</p>
  <p><strong>Status:</strong> ${stolenBike.status} in ${stolenBike.location}!</p>
  <p><strong>Bounty:</strong> $${stolenBike.bounty}</p>
  <hr>
  `).join('<br>');
  outputDiv.innerHTML = bikesHTMLString;
};

function handleFormSubmit(event) {
  event.preventDefault();
  const area = document.querySelector('#area').value;
  const proximity = parseInt(document.querySelector('#proximity').value);
  document.querySelector('#area').value = null;
  document.querySelector('#proximity').value = '';
  stolenBikes(area, proximity);
}


document.querySelector('form').addEventListener('submit', handleFormSubmit);

// const getCity = () => {
//   const city = document.querySelector('#area').value;
//   if (city.contains(', ')) {
//     city.replaceAll(', ', '%2C%20')
//   } else if (city.contains(' ')) {
//   city.replaceAll(' ', '%2C%20')
//   }
//   return city;
// };