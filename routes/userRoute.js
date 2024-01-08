'use strict';
const express = require('express');
const route = express.Router();
const app = express();
const userHandlers = require('../controllers/userController');


route.post('/auth/register', userHandlers.register)
route.post('/auth/sign_in', userHandlers.sign_in)
route.post('/auth/profile', userHandlers.loginRequired, userHandlers.profile);
module.exports = route
// console.log('user route')
// module.exports = function(app) {
//     console.log('user route')

//     const userHandlers = require('../controllers/userController');
//     // todoList Routes
//     app.route('/tasks')
//         .post(userHandlers.loginRequired, userHandlers.profile);
//     app.route('auth/register')
//         .post(userHandlers.register);
//    app.route('/auth/sign_in')
//         .post(userHandlers.sign_in);
// };