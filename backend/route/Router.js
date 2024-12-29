const express = require("express");
const routers = express.Router();
const User = require("../models/User");

const { register, login } = require("../controllers/authController");
const {addTodo,updateTodo,getTodo,deleteTodo,}=require("../controllers/EventController");
// Routes for authentication
routers.post("/register", register);
routers.post("/login", login);

// Routes for event handlers
routers.post('/addTodo', addTodo)
routers.get('/getTodo', getTodo)
routers.put('/updateTodo/:id', updateTodo)
routers.delete('/deleteTodo/:id', deleteTodo)


module.exports = routers;