
let mongoose =  require('mongoose');

// let schema = mongoose.Schema(
    
//     {
//         email:String,
//         forgetToken:String,
//         name:String,
//         password:String,
//         img:String      
//     }
// );

let User = mongoose.model('user', {
    email:String,
    forgetToken:String,
    name:String,
    password:String,
    img:String,
    city:String      
});

module.exports = User;
// website
// https://mongoosejs.com/

// User.find()
// saarey user kay record lekar ajao

// User.findById(recordKiID)
// single record lekar ajao ID se match krke

// User.findByIdAndDelete(recordKiID)
// single record delete kardo ID se match krke
              
// User.findByIdAndUpdate(recordKiID, nyaRecordkaObject)
// single record update kardo ID se match krke

// u = new User();
// u.save()





// ORM
// object relational mapping