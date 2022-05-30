'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map;
let mapEvent;
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        const {latitude} = position.coords;
        const {longitude} = position.coords;
        console.log(latitude,longitude);
        const coords = [latitude, longitude];
        map = L.map('map').setView(coords, 13);
        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map); 

        //Click on map handler
        map.on('click', function(e) {
            mapEvent = e;
            form.classList.remove('hidden');
            inputDistance.focus();
        })
    }, () => {
        alert('Could not get your position')
    })
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    //Clear input fields
    
    //Display Marker
    const {lat, lng} = mapEvent.latlng;  
        L.marker([lat, lng]).addTo(map)
        .bindPopup(L.popup({
            maxWidth: 250,
            minWidth: 100,
            closeOnClick: true,
            className: 'running-popup'
        })
        )
        .setPopupContent(`Completed Workout ${(inputDistance.value>0)? inputDistance.value : 0}km!`)
        .openPopup();  
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
})

inputType.addEventListener('change', function(){
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
})