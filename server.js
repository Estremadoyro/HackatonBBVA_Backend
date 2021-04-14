const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const connectDB = require("./db");

const passport = require("passport");
const session = require("express-session");
const FacebookStrategy = require("passport-facebook").Strategy;

const Cliente = require("./models/Cliente");
//DB Connection
connectDB();

//Middleware
app.use(express.json({ extended: false }));
app.use(cors());
app.use(passport.initialize());
// app.use(passport.session());
// app.use(session({ secret: "hackatonloginsecretkey" }));

//Autenticacion
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: "907674410064551",
      clientSecret: "4d65205cc6831f3bf41bb9529ab76de6",
      callbackURL: "/api/auth/facebook/callback",
      profileFields: ["id", "displayName", "name", "gender", "picture.type(large)", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      //console.log(accessToken, refreshToken, profile);
      process.nextTick(function (res, req) {
        Cliente.findOne({ uid: profile.id }, function (err, user) {
          if (err) return done(err);
          // if the user is found, then log them in
          if (user) {
            console.log("user found");
            console.log(user);
            // res.status(200).json({ cliente: user });
            // res.send(user);
            return done(null, user); // user found, return that user
          } else {
            var newUser = new Cliente();
            newUser.uid = profile.id;
            newUser.token = accessToken;
            newUser.name = profile.displayName; // look at the passport user profile to see how names are returned
            newUser.email = profile.emails[0].value;
            newUser.pic = profile.photos[0].value;
            // save our user to the database
            newUser.save(function (err) {
              if (err) throw err;
              return done(null, newUser);
            });
          }
        });
      });
    }
  )
);

//Routes
app.use("/api/auth/google", require("./routes/auth/google"));
app.use("/api/auth/facebook", require("./routes/auth/facebook"));
//Productos
app.use("/api/producto/tarjeta", require("./routes/productos/tarjeta"));
app.use("/api/producto/prestamo", require("./routes/productos/prestamo"));
app.use("/api/producto/segurovida", require("./routes/productos/segurovida"));

app.listen(PORT, () => {
  console.log(`Server running @ ${PORT}`);
});
