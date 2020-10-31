const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/api/authRoute');
const updateUserRoutes = require('./routes/api/updateUserRoute');
const tagsRoutes = require('./routes/api/tagsRoute');

require('dotenv').config();

const app = express();

// app.use(express.json());
// app.use(
//   express.urlencoded({
//     limit: '50mb',
//     extended: true,
//   })
// );
app.use(bodyParser.json());
//------- MIDDLEWARES ---------//

// MONGODB CONNECTION
mongoose.connect(
  process.env.MONGO_CONNECT_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log('MongoDB connected..');
  }
);

// CORS MIDDLEWARE
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//   })
// );
app.use(cors());
//MORGAN MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// -------ROUTES---------//

app.use('/api/auth', authRoutes);

app.use('/api/user/update', updateUserRoutes);

app.use('/api/tags', tagsRoutes);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}..`);
});
