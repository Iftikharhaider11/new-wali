
let myExpress = require("express");
let nodemailer = require("nodemailer");

require("./db");
let User = require("./models/user");

let jsontoken = require("jsonwebtoken");
let app = myExpress();
let path = require("path")

app.use(myExpress.json());
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


    res.json(user);
  });

});




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


  res.json(user);
});

app.put("/update-user", async (req, res) => {
  await User.findByIdAndUpdate(req.body._id, req.body);

  res.json({ success: true });

});

app.get("/users-lao", async (req, res) => {
  let users = await User.find();

  res.json(users);
});

app.delete("/delete-user", async (req, res) => {
  await User.findByIdAndDelete(req.query.abc);
  res.json({
    success: true,
  });

  console.log(req.query.abc);
});





app.post("/create-user", async (req, res) => {
  try {
    let nyaUser = new User(req.body);
    await nyaUser.save();
    res.json({ success: true });

  } catch (e) {
    console.log(e);
  }

});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})


app.listen(6070, () => {
  console.log("server chaling");
});
