// Check if the browser supports geolocation.


// Set options for high accuracy, a 5-second timeout, and no caching.

//  Use watchPosition to track the user's location continuously. 
const socket =io();
if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
        const{latitude,longitude}=position.coords;
        socket.emit('send-location',{latitude,longitude});
    },(error)=>{
        console.error(error);
    },{
        enableHighAccuracy:true,
        timeout:5000,
        maximumAge:0,
    })
}

const map=L.map("map").setView([0,0],10);

L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution : "OpenStreetMap"
}).addTo(map)

// Emit the Latitude and longitude via a socket with "send-location". Log any errors to the console

// Initialize a map centered at coordinates (0, 0) with a zoon level of 15 using Leaflet. Add OpenStreetMap tiles to the map

// Create an empty object markers.
const markers={};

socket.on("recieved-location", (data)=>{
    const {id,latitude,longitude} = data;
    map.setView([latitude,longitude],16);
    if(markers[id]){
        markers[id].setLatLng([latitude,longitude]);
    }else{
        markers[id]=L.marker([latitude,longitude]).addTo(map);
       
    }
})


// When receiving location data via the socket, extract id, Latitude, and longitude, and center the map on the new coordinates.

//  If a marker for the id exists, update its position, otherwise, create a new marker at the given coordinates and add it to the map. When a
//a user disconnects ,remove their marker from the map and delete it from markers;