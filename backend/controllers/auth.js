const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: 'Please enter all fields',
    });
  }

  User.findOne({ email })
    .populate('tags', { label: 0 })
    .then((user) => {
      if (!user)
        return res.status(400).json({
          msg: 'User does not exist',
        });

      //Validate password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({
            msg: 'Invalid credentials',
          });

        jwt.sign(
          {
            id: user.id,
          },
          process.env.jwtSecret,
          {
            expiresIn: 3600,
          },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user,
            });
          }
        );
      });
    });
};

exports.registerUser = (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(name);

  if (!name || !email || !password) {
    return res.status(400).json({
      msg: 'Please enter all fields',
    });
  }

  User.findOne({ email })
    .select('-password')
    .then((user) => {
      if (user)
        return res.status(400).json({
          msg: 'User already exists',
        });
      const newUser = new User({
        name,
        email,
        password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save().then((user) => {
            jwt.sign(
              {
                id: user.id,
              },
              process.env.jwtSecret,
              {
                expiresIn: 3600,
              },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  user,
                });
              }
            );
          });
        });
      });
    });
};

exports.getUser = (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .populate('tags', { label: 0 })
    .exec()
    .then((user) => res.json(user));
};
