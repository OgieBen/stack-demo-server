const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const authApi = require('./dist/app/prod/api/auth');
const questionsApi = require('./dist/app/prod/api/questions');
const testRouter = require('./dist/app/prod/api/answers');

const cors = require('cors');

const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwks = require('jwks-rsa');






const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/protected', expressJwt({
//   secret: jwksClient.expressJwtSecret(jwksOpts),
//   issuer: process.env.AUTH0_API_ISSUER,
//   audience: process.env.AUTH0_API_AUDIENCE,
//   requestProperty: 'accessToken',
//   getToken: (req) => req.cookies['access_token']
// }));


/* const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and 
  // the signing keys provided by the JWKS endpoint.
  // secret: jwksRsa.expressJwtSecret({
  //   cache: true,
  //   rateLimit: true,
  //   jwksRequestsPerMinute: 5,
  //   jwksUri: `https://slackdemo.auth0.com/.well-known/jwks.json`
  // }),

  // // Validate the audience and the issuer.
  // audience: 'https://slackdemo.auth0.com/api/v2/',
  // issuer: `https://slackdemo.auth0.com/`,
  // algorithms: ['RS256']

  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://slackdemo.auth0.com/.well-known/jwks.json"
}),
audience: 'https://slackdemo-api.herokuapp.com/',
issuer: "https://slackdemo.auth0.com/",
algorithms: ['RS256']
}); */

app.use(cors());
app.use(require('cookie-parser')('cookie'));
app.use(require('express-session')({
  secret: 'session',
  resave: true,
  saveUninitialized: false,
  cookie: {}
}));

// app.use('/api', cors);
// app.use('/api', checkJwt);


app.use('/', indexRouter);
app.use('/profile/', userRouter);
app.use('/api/v1/auth', authApi);
app.use('/api/v1/questions', questionsApi);
// app.use('/api/v1/questions/{id}', answersApi);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
