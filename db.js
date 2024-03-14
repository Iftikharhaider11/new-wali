const { Schema } = require('mongoose');
let mongoose = require('mongoose');
// mongoose aik JS m likhi hui library h jo mongodb server ke saaath interact krwati h

// mongoose.connect('mongodb://localhost:27017/meri-achi-db').then(function(conne){
    mongoose.connect('mongodb+srv://mw951390:1234@cluster0.xxofs0k.mongodb.net/Commerce-baba').then(function(conne){

console.log("DB Connected......")

}).catch(function(err){
    console.log(err);
});