const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const flash = require('connect-flash')
const passport = require('passport')


dotenv.config();
const pageRouter = require('./routes/page');
const accountRouter = require('./routes/account');
const communityRouter =require('./routes/community');
const model = require('./models/index.js');
const passportConfig = require('./passport')

const app = express();
model.sequelize.sync().then(()=>{
    console.log("DB Connect!");
}).catch(err=>{
    console.error(err);
});
passportConfig(passport);
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: "secret",
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use('/', pageRouter);
app.use('/account',accountRouter);
app.use('/community',communityRouter);



app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});