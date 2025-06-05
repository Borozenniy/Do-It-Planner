import express from 'express';
import { createUser, testEndpoint } from '../controllers/user-controller.js';
import jwtCheck from '../middleware/auth-middleware.js';
//const express = require('express');
//const { createUser, testEndpoint } = require('../controllers/user-controller');

const router = express.Router();
router.post('/user', jwtCheck, createUser); //create-user => user
router.get('/test', testEndpoint);

export default router;
