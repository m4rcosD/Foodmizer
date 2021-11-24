const router = require("express").Router();
const UserModel = require('../models/User.model')
const bcrypt = require('bcryptjs');
const uploader = require('../middleware/cloudinary.config.js');
//things from html 

// Handles GET requests to /signin and shows a form
router.get('/signin', (req, res, next) => {
    res.render('auth/signin.hbs')
})

// Handles GET requests to /signup and shows a form
router.get('/signup', (req, res, next) => {
  res.render('auth/signup.hbs')
})

// Handles POST requests to /signup 
router.post('/signup', (req, res, next) => {
    const {username, email, password} = req.body
    

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    UserModel.create({username, email, password: hash})
      .then(() => {
          res.redirect('/');
      })
      .catch((err) => {
        next(err)
      })

})

// Handles POST requests to /signin 
router.post('/signin', (req, res, next) => {
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
                res.render('auth/signin.hbs', {error: 'Password not matching'})
                return;
              }
          }
          else {
            res.render('auth/signin.hbs', {error: 'User email does not exist'})
            return;
          }
      })
      .catch((err) => {
        next(err)
      })
})

//Cloudinary
router.post('/upload-pic', uploader.single("imageUrl"), (req, res, next) => {
  // the uploader.single() callback will send the file to cloudinary and get you and obj with the url in return

  if (!req.file) {
    
        return ;
  }
  UserModel.findByIdAndUpdate(req.session.myProperty._id, { image:req.file.path})
    .then ((user)=>{
        res.redirect('/profile')
    })
    .catch((err)=>{
        next(err)
    })
  // You will get the image url in 'req.file.path'
  // Your code to store your url in your database should be here
})



// Our Custom middleware that checks if the user is loggedin
const checkLogIn = (req, res, next) => {
    if (req.session.myProperty ) {
      //invokes the next available function
      next()
    }
    else {
      res.redirect('/signin')
    }
}

router.get('/profile', checkLogIn, (req, res, next) => {
    let myUserInfo = req.session.myProperty  
    UserModel.findById(req.session.myProperty._id)
    .then((user)=>{
      console.log(user)
      res.render('auth/profile.hbs', {user})
  })
    .catch((err)=>{
      next(err)
  })
})



router.get('/logout', (req, res, next) => {
    // Deletes the session
    // this will also automatically delete the session from the DB
    req.session.destroy()
    res.redirect('/signin')
})

module.exports = router;


/*
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
<<<<<<< HEAD
router.get('/search', checkLogIn, (req, res, next) => {
    res.send('Search page')
})
=======
<<<<<<< HEAD


=======
router.get('/search', checkLogIn, (req, res, next) => {
    res.send('Search page')
})
>>>>>>> 316354a925d5666dd3515e2c8b6608809f97ed93
>>>>>>> 14d6521d2b2b20fb06e7a7618bd6a70dd51be882
router.get('/logout', (req, res, next) => {
    // Deletes the session
    // this will also automatically delete the session from the DB
    req.session.destroy()
    res.redirect('/signs')
})

module.exports = router;
*/