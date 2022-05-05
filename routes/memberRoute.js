const express = require('express');
const route = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Member = require('../models/memberModel');

route.get("/", async(req, res) => {
    try {
        const members = await Member.findAll({
            attributes: {exclude: ['password']},
        });
        res.send(members);
    } catch (err) {
        res.send("Something went wrong");
    }
});

route.post("/", async(req, res) => {
    try {
        const salt = await bcrypt.genSaltSync()
        const newMember = await Member.create({
            userName: req.body.userName,
            password: bcrypt.hashSync(req.body.password, salt),
            email: req.body.email,
            committee: req.body.committee,
        });
        res.send(newMember);
    } catch (err) {
        res.send("Something went wrong");
    }
});

route.post("/login", async(req, res) => {
    try{
        const member = await Member.findOne({
            where: {
                email: req.body.email
            } 
        });
        if(member){
            const isValid = await bcrypt.compare(req.body.password, member.password);
            // console.log("invalid", isValid);
            if(isValid){
                const token = jwt.sign({email: member.email}, process.env.SECRET_KEY);
                res.send(token);
            }else{
                res.send("invalid password");
            }
        }else{
            res.send("invalid email");
        }
    }
    catch(err){
        // console.log(err);
        res.send("something went wrong");
    }
});

route.delete("/:id", async (req,res)=>{
    try{
        const member = await Member.findByPk(req.params.id);
        await member.destroy();
        res.send("Member deleted successfully");
    }
    catch(err){
        res.send("something went wrong");
    }
    
});

module.exports= route;