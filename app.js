
let myExpress = require("express");
let nodemailer = require("nodemailer");

require("./db");
let User = require("./models/user");

let jsontoken = require("jsonwebtoken");
let app = myExpress();
let path = require("path")
// const multer  = require('multer')
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {

//         cb(null, './mera-upload')

//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
//   })

  // const upload = multer({ storage: storage })


// app.use(function (req, res, next) {
//   console.log("s");
//   // res.json({});
//   next();
// });

// app.use(function (req, res, next) {
//   console.log("s");
//   next();
// });

// app.use(function (req, res, next) {
//   console.log("s");
//   next();
// });



app.use(myExpress.json());
// myExpress.static()
// yeh express ko btata h kay kis folder m aapne files ko dekhna ha
app.use(myExpress.static("./build"));
app.use(myExpress.static("./mera-upload"));

app.use(myExpress.urlencoded({ extended: false }))

app.use(myExpress.static(path.join(__dirname, './build')));




var transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "mw951390@gmail.com",
    pass: "bzqw biab tnyw fxlk",
  },
});

function sendResetPassword(email, webAddress, token) {
  var mailOptions = {
    from: "mw951390@gmai.com",
    to: email,
    subject: "Nice Nodemailer test",
    text: "Request password received ",
    html: `<b>Please click here to reset password <a href="http://${webAddress}:3000/reset-password/${token}">click here</a>`,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }h
    console.log("Message sent: %s", info.messageId);
  });
}

app.post("/request-forget-password", async (req, res) => {
  try {
    let usre = await User.findOne({ email: req.body.email });

    if (usre) {
      jsontoken.sign(
        { email: usre.email },
        "abc",
        { expiresIn: "1h" },
        async (err, meraRoken) => {
          usre.forgetToken = meraRoken;

          sendResetPassword(usre.email, req.hostname, meraRoken);

          await usre.save();
          res.json({});
        }
      );
    } else {
      res.json({});
    }

    console.log(req.body);
  } catch (e) {}
});




app.post("/reset-password", (req, res) => {
  console.log(req.body);
  jsontoken.verify(req.body.token, "abc", async (err, data) => {
    let user = await User.findOne({ email: data.email });
    user.password = req.body.password;
    delete user.forgetToken;
    await user.save();
    console.log(user);
    res.json({ success: true });
  });
});





app.post("/token-check", async (req, res) => {
    
  console.log(req.body.token);
  if (!req.body.token) {
    return res.json(null);
  }

  jsontoken.verify(req.body.token, "cat says", async (err, data) => {
    if (err) {
      return res.json(null);
    }

    let user = await User.findOne({_id : data.meriABC});

    // let user = users.find(user=>user.id == data.meriABC);

    res.json(user);
  });

});




// req m hamesha incoming data hota h
// like browser, android app, iOS App
app.post("/login", async (req, res) => {
  let user = await User.findOne({
    name: req.body.name,
    password: req.body.password,
  });

  if (user) {
    jsontoken.sign(
      {
        meriABC: user.id,
      },
      "cat says",
      {
        expiresIn: "5d",
      },
      function (err, meraToken) {
        console.log(meraToken);
        res.json({
          nishani: meraToken,
          user: user,
        });
      }
    );
  }

  // res.end("yeh login tha")
});

let users = [
  {
    id: 100,
    name: "farhan",
    password: "3232",
    city: "Faisalabad",
  },
];

app.get("/get-user-by-id", async (req, res) => {
  let user = await User.findById(req.query.some);

  // let user  = users.find(user=>user.id == req.query.some);

  res.json(user);
});

app.put("/update-user", async (req, res) => {
  await User.findByIdAndUpdate(req.body._id, req.body);

  res.json({ success: true });

  // let index = users.findIndex(user=>user.id == req.body.id);
  // users[index] = req.body;
  // console.log(req.body)
});

app.get("/users-lao", async (req, res) => {
  // res.end()
  // yeh string send karta
  // res.sendFile()
  // yeh file send karta h
  // res.json()
  //  yeh js wali koi bhi cheez like array ya object wagera

  let users = await User.find();

  res.json(users);
});

app.delete("/delete-user", async (req, res) => {
  await User.findByIdAndDelete(req.query.abc);

  // let index = users.findIndex(function(user){

  //     if(user.name ==  req.query.abc){
  //         return true;
  //     }

  // })

  // if(index != -1){
  // users.splice(index, 1)
  // }

  res.json({
    success: true,
  });

  console.log(req.query.abc);
});





// ,upload.array('dp', 10)
app.post("/create-user", async (req, res) => {
  try {
    // req.files[0].name = "asds";
    let nyaUser = new User(req.body);
    await nyaUser.save();
    res.json({ success: true });

  } catch (e) {
    console.log(e);
  }

  // let userParaHua = users.find(function(user){

  //     if(user.name.toLowerCase() == req.body.name.toLowerCase()){
  //         return true
  //     }

  // })

  // if(userParaHua){

  // res.status(409).json({});

  // }else{

  //     req.body.img = req.files[0].originalname;

  //     users.push(req.body);

  //     res.json({success:true});
  // }

  // console.log(req.body)
  // console.log('data awat');
});

// app.get('/', (incoming, outgoing)=>{

//     console.log(incoming.ip);

//     outgoing.end('ok hogya')

// })


// app.get("*",(req,res)=>{
//   res.sendFile(myExpress.static(path.join(__dirname, "./build/index.html")))
// })
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


app.listen(6070, () => {
  console.log("server chaling");
});
