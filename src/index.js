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
  <div class="card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img src="${stolenBike.image}"/>
        <p><strong>Bike Manufacturer:</strong> ${stolenBike.bike}.
        <br>
        <strong>Serial Number:</strong> ${stolenBike.serial}</p>
        <p><strong>Color(s):</strong> ${stolenBike.colors}.</p>
        <p><strong>Status:</strong> ${stolenBike.status} in ${stolenBike.location}!</p>
        <hr>
      </div>
        <div class="flip-card-back">
          <p><strong>Bounty:</strong> $${stolenBike.bounty}</p>
        </div>
      </div>
    </div>
  </div>
  `).join('<br>');
  outputDiv.innerHTML = bikesHTMLString;
};

const getCity = () => {
  const city = document.querySelector('#area').value;
  if (city.includes(', ')) {
    city.replaceAll(', ', '%2C%20');
  } else if (city.includes(' ')) {
    city.replaceAll(' ', '%2C%20');
  }
  return city;
};

function handleFormSubmit(event) {
  event.preventDefault();
  const area = getCity();
  const proximity = parseInt(document.querySelector('#proximity').value);
  document.querySelector('#area').value = null;
  document.querySelector('#proximity').value = '';
  stolenBikes(area, proximity);
}

document.querySelector('form').addEventListener('submit', handleFormSubmit);

//Wednesday TODO List
//Emoji API
//modal implentation
//card flip
//default photos
//'null' returned for location