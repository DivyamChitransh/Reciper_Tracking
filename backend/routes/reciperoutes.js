const express = require('express');
const {searchrecipe,getrecipeDetails,saveRecipe,Getrecipes,reorder} = require('../controllers/recipecont.js');
const {authenticate} = require('../middlewares/authmiddleware.js');
const router = express.Router();

router.get('/search',searchrecipe);
router.get('/details/:id',getrecipeDetails);
router.post('/save',authenticate,saveRecipe);
router.get('/saved',authenticate,Getrecipes);
router.put('/reorder',authenticate,reorder);

module.exports = router;
