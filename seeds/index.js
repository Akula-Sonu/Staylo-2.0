const mongoose = require('mongoose');
const path = require('path');
const cities = require('./cities.js');
const {descriptors,places} = require('./seedHelpers.js');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/Staylo', {
})
.then(() => {
  console.log("MongoDB connection open!");
})
.catch(err => {
  console.log("MongoDB connection error:");
  console.log(err);
});

const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDB = async () => {
    await Campground.deleteMany();
    for(let i=0; i<50;i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*30)+10;
        const camp = new Campground({
            location: `${cities[random1000].city} ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
            price,
            description:"one of the finest place to stay"
        })
        camp.save();
    }

}
seedDB();