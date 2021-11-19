const router = require("express").Router();
const UserModel = require('../models/User.model')
const bcrypt = require('bcryptjs');


// Handles GET requests to /signin and shows a form
router.get('/signs', (req, res, next) => {
    res.render('auth/signs.hbs')
})

// Handles POST requests to /signup 
router.post('/signup', (req, res, next) => {
    const {email, password} = req.body
    
    // VALIDATIONS
    
  
    if (email == '' || password == '') {
        //throw error
        res.render('auth/signs.hbs', {error: 'Please enter all fields'})
        return;
    }
    //Validate if the password is strong
    let passRegEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passRegEx.test(password)) {
      res.render('auth/signs.hbs', {error: 'Please enter Minimum eight characters, at least one letter and one number for your password'})
      return;
    }
    // Email validation
    let emailRegEx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    if (!emailRegEx.test(email)) {
      res.render('auth/signs.hbs', {error: 'Please enter a valid email dude'})
      return;
    }
    
    // Encryption

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    UserModel.create({email, password: hash})
      .then(() => {
          res.redirect('/')
      })
      .catch((err) => {
        next(err)
      })

})

// Handles POST requests to /signin 
router.post('/signs', (req, res, next) => {
    const {email, password} = req.body
    
    //DO Validations First

    // Find the user email
    UserModel.find({email})
      .then((emailResponse) => {
          // if the email exists check the password
          if (emailResponse.length) {
              //bcrypt decryption 
              let userObj = emailResponse[0]

              // check if password matches
              let isMatching = bcrypt.compareSync(password, userObj.password);
              if (isMatching) {
                  // loggedInUser = userObj
                  req.session.myProperty = userObj
                  // req.session.welcome = 'Helllo'

                  res.redirect('/profile')
              }
              else {
                res.render('auth/signs.hbs', {error: 'Password not matching'})
                return;
              }
          }
          else {
            res.render('auth/signs.hbs', {error: 'User email does not exist'})
            return;
          }
      })
      .catch((err) => {
        next(err)
      })
})

// Our Custom middleware that checks if the user is loggedin
const checkLogIn = (req, res, next) => {
    if (req.session.myProperty ) {
      //invokes the next available function
      next()
    }
    else {
      res.redirect('/signs')
    }
}

router.get('/profile', checkLogIn, (req, res, next) => {
    let myUserInfo = req.session.myProperty  
    res.render('auth/profile.hbs', {name: myUserInfo.username})
})


router.get('/logout', (req, res, next) => {
    // Deletes the session
    // this will also automatically delete the session from the DB
    req.session.destroy()
    res.redirect('/signs')
})

module.exports = router;