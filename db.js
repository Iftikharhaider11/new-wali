const { Schema } = require('mongoose');
let mongoose = require('mongoose');
// mongoose aik JS m likhi hui library h jo mongodb server ke saaath interact krwati h

// mongoose.connect('mongodb://localhost:27017/meri-achi-db').then(function(conne ,){
    mongoose.connect('mongodb+srv://iftihaider1122:1234@cluster0.irvsyvj.mongodb.net/e-baba' ,{
        serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(function(conne){

console.log("DB Connected......")

}).catch(function(err){
    console.log(err);
});