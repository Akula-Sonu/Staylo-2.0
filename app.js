const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const path = require('path');
const Campground = require('./models/campground');



mongoose.connect('mongodb://127.0.0.1:27017/Staylo', {
})
.then(() => {
  console.log("MongoDB connection open!");
})
.catch(err => {
  console.log("MongoDB connection error:");
  console.log(err);
});




app.engine('ejs',ejsMate);
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));










app.get('/',(req,res)=>{
    res.render('home.ejs');
});

app.get('/campgrounds',async (req,res)=>{
  const campgrounds = await Campground.find({});
    res.render('campgrounds/index',{campgrounds});
});

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})


app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
})

app.get('/campgrounds/:id',async (req,res)=>{
  const campground = await Campground.findById(req.params.id);
  res.render('campgrounds/show',{campground});
});

app.get('/campgrounds/:id/edit',async(req,res)=>{
  const campground = await Campground.findById(req.params.id);
  res.render('campgrounds/edit',{campground});
})

app.put('/campgrounds/:id',async (req,res)=>{
  const{id} = req.params;
  const campground = await Campground.findByIdAndUpdate(id,{...req.body.campground});
  res.redirect(`/campgrounds/${campground._id}`);
})
app.delete('/campgrounds/:id',async (req,res)=>{
  const{id} = req.params;
  const campground = await Campground.findByIdAndDelete(id);
  res.redirect(`/campgrounds`);
})



app.listen(3000,()=>{
    console.log("On Server Port 3000");
})