'use strict';

const mongoose = require('../DB/userDb')
const jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt')
 const User = require('../models/userModal')

exports.register = async (req, res) => {
   
   try {
    const newUser = await User.create(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
    const user = await newUser.save();
    res.status(200).json(user)

} catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message })
}

  // const user = await newUser.save();
  // res.json(user);
  // async (err, user) => {
  // console.log('user', user)
  // try {
  //   user.hash_password = undefined;
  //   return res.json(user);

  // } catch (error) {
  //   console.log('err', err)

  //   return res.status(400).send({
  //     message: err
  //   });
  // }
  // });
};

exports.sign_in = async (req, res) =>{
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    // Username not found
    return res.status(401).json({ message: 'Invalid user' });
  }
const isMatch =await user.comparePassword(req.body.password, function(err, isMatch) {
  if (isMatch) {
    return done(null, user);
  } else {
    return done(null, false, { message: 'Incorrect password.' });
  }
});
  // const isMatch = await User.comparePassword(req.body.password);
  if (!isMatch) {
    // Incorrect password
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // const token = user.generateAuthToken();
  
  // Increments the login count for the user
  // await user.incrementLoginCount();

//  await User.findOne({
//     email: req.body.email
//   }, function (err, user) {
//     if (err) throw err;
//     if (!user || !user.comparePassword(req.body.password)) {
//       return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
//     }
    return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs') });
//   });
};

exports.loginRequired = function (req, res, next) {
  if (req.user) {
    next();
  } else {

    return res.status(401).json({ message: 'Unauthorized user!!' });
  }
};
exports.profile = function (req, res, next) {
  if (req.user) {
    res.send(req.user);
    next();
  }
  else {
    return res.status(401).json({ message: 'Invalid token' });
  }
}