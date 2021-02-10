const express = require("express");
const router = express.Router();
const passport = require("passport")
const { Comment } = require("../models/comment");
const comments = Comment.find({});
const {isAuthenticated} = require('../config/configuration')



// All Comment
router.get('/comment',isAuthenticated, async(req,res)=>{
  let pageTitle = "Comment"
  let all_comment = await Comment.countDocuments()
    comments.exec((err, comments) => {
        if (err) {
            throw err;
        } else {
            res.render("admin/allComments", {comments, pageTitle, all_comment})
        }
    })
})


// Admin dasgboard
router.get('/dashboard',isAuthenticated ,async(req, res)=>{
    let pageTitle = "Dashboard"
    let name = req.user.username;
    let email = req.user.email;
    res.render('admin/dashboard', {pageTitle, name, email})
  })


// Login Routes
router.route('/login')
.get( (req, res)=>{
    let pageTitle = "Login"
    res.render('admin/login', {pageTitle})
  })
.post((req, res, next)=>{
    // console.log(req.body)
    passport.authenticate('local', {
      successRedirect: '/admin/dashboard',
      failureRedirect: '/admin/login',
      failureFlash: true
    })(req, res, next);
  })


// Logout Handles
router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success_msg', "You are logged out");
    res.redirect("/")
  })



module.exports = router

