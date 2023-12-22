//Router de express
const { Router } = require("express");
const router = Router();
//Controllers
const getAllCountries = require('../controllers/getAllCountries');
const getCountryById = require('../controllers/getCountryById');
const postActivities = require('../controllers/postActivities');
const getAllActivities = require('../controllers/getAllActivities');
const deleteActivity = require("../controllers/deleteActivities");
//Routes
router.get('/countries', getAllCountries);
router.get('/countries/:id', getCountryById);
router.post('/activities', postActivities);
router.get('/activities', getAllActivities);
router.delete('/activities/:id', deleteActivity);

module.exports = {
    router
};