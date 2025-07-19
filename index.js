require('dotenv').config() // Để sử dụng file .env

const express = require('express')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('express-flash') // Hiển thị thông báo
const cookieParser = require('cookie-parser')
const routeClient = require('./routes/client/index.route');
const routeAdmin = require('./routes/admin/index.route');
const app = express()
const port = process.env.PORT
const path = require('path');
const MongoStore = require('connect-mongo');

const database = require('./config/database') // Kết nối database
database.connect() // Gọi hàm để kết nối

app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')

app.use(express.static(`${__dirname}/public`)) // Định nghĩa thư mục chứa file tĩnh như CSS, Image, JS

app.use('/uploads', express.static('uploads'));
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce'))); // TinyMCE
app.use(methodOverride('_method')) // Cho phép ghi đè method bằng `_method`
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', require('./routes/admin/upload.route')); // hoặc app.use('/api', require...)

// Thông báo
app.use(cookieParser(process.env.SECRET_KEY));
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    collectionName: 'sessions',
    ttl: 60 * 60,
  }),
  cookie: { 
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 1000
  }
}));
app.use(flash());

// Middleware để tránh cache (ngăn flash hiện lại khi back)
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

routeClient(app);
routeAdmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})