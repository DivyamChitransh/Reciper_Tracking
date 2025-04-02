const express = require('express');
const Recipe = require('../models/recipe.js');
const axios = require('axios');


const searchrecipe = async(req,res) => {
    try{
        const {query} = req.query;
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`,{params:{query,apiKey:'eecbc08858214b2f9b134ce99d4646f0'}});
        res.status(200).json(response.data.results);
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
};

const getrecipeDetails = async(req,res) => {
    try{
        const {id} = req.params;
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`,{params:{apiKey:'eecbc08858214b2f9b134ce99d4646f0'}});
        res.status(200).json(response.data);
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
};

const saveRecipe = async(req,res) => {
    try{
        const {recipeId,image,title} = req.body;
        const userId  = req.user?.id;
        const count = await Recipe.countDocuments({userId});
        const recipes = new Recipe({userId,recipeId,image,title,order:count});
        await recipes.save();
        res.status(200).json({message:'Recipe Added',recipes});
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
};

const Getrecipes = async(req,res) => {
    try{
        const recipes = await Recipe.find().sort('order');
        res.status(200).json(recipes);
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
};

const reorder = async(req,res) => {
    try{
        const {orderedRecipes} = req.body;
        for(let i=0;i<orderedRecipes.length;i++){
            await Recipe.findByIdAndUpdate(orderedRecipes[i]._id,{order:i});
        }
        res.status(200).json({message:'Reordered this recipe'})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
};

module.exports = {searchrecipe,getrecipeDetails,saveRecipe,Getrecipes,reorder};