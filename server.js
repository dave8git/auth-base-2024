const express = require('express');
const cors = require('cors');
const path = require('path');
const hbs = require('express-handlebars');
const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
//const passportConfig = require('./config/passport');
const session = require('express-session');
const authRoutes = require('./routes/auth.routes'); // Import routes
const userRoutes = require('./routes/user.routes');
const app = express();

// configure passport provider options
// passport.use(new GoogleStrategy({
//   // clientID: '76779892826-u6b69rdcv672tuh8s9sq2nre3f4mi3sa.apps.googleusercontent.com',
//   // clientSecret: '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',
//   // callbackURL: 'http://localhost:8000/auth/google/callback'
//   clientID: process.env.clientID,
//   clientSecret: process.env.clientSecret,
//   callbackURL: process.env.callbackURL
// }, (accessToken, refreshToken, profile, done) => {
//   done(null, profile);
// }));

app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', require('./routes/auth.routes'));
app.use('/user', require('./routes/user.routes'));

// // serialize user when saving to session
// passport.serializeUser((user, serialize) => {
//   serialize(null, user);
// });

// // deserialize user when reading from session
// passport.deserializeUser((obj, deserialize) => {
//   deserialize(null, obj);
// });

// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['email', 'profile'] }));

//   app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/user/no-permission' }),
//   (req, res) => {
//     res.redirect('/user/logged');
//   }
// );

app.get('/', (req, res) => {
  res.render('index');
});

// app.get('/user/logged', (req, res) => {
//   res.render('logged');
// });

// app.get('/user/no-permission', (req, res) => {
//   res.render('noPermission');
// });

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.use('/', (req, res) => {
  res.status(404).render('notFound');
});

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});
