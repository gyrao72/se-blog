const router = require('express').Router();
let Blog = require('../models/blog');
const {requireAuth,checkUser} = require('../middleware/authMiddleware');
const User = require('../models/user');

