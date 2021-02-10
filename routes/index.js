const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')
const { Comment } = require("../models/comment");

router.get('/', async(req, res)=>{
    let comments = await Comment.find({approved: true})
    const messages = comments.map(comment=>{
        return comment
    })
    // console.log(messages)
    res.render('index', {comments, messages})
})






module.exports = router;