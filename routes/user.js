import Router from 'express';
const router = Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../models/User.js";

//import Requests
import AddUserRequest from "../requests/AddUserRequest.js";
import LoginRequest from "../requests/LoginRequest.js";


//Get all users
router.get('/', (req, res) => {
    res.send('all users');
})

//Register a new user
router.post('/register', async (req, res) => {

    const {error} = AddUserRequest.validate(req.body)

    if (error){
        return res.status(400).json(error.details[0].message);
    }

//validation passed

   // Check if email exists
    const emailExist = await User.findOne({email: req.body.email});

    if (emailExist) {
        return res.status(400).json({message: 'Email already exists'});
    }

   let {name, email, password} = req.body;

   //Hash passwords
       bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {

            const newUser = new User({
                name: name,
                email: email,
                password: hash
            });
         //save user to database
            newUser.save().then(user =>{
                res.json(user);
            })


        });// bcrypt.hash
    }); //bcrypt.gensalt

})

//Login
router.post('/login', async (req, res) => {

    const {error} = LoginRequest.validate(req.body)
    if (error){
        return res.status(400).json(error.details[0].message);
    }

    //validation passed
              //Load hash from db
    const user = await User.findOne({email: req.body.email});

    //if user is found
    if (user){
         await bcrypt.compare(req.body.password, user.password, function(err, pass) {
            if (err) throw err;
            if (pass){
                //Create a token for the user
                const token = jwt.sign({user: user}, process.env.TOKEN_SECRET)

                res.header('auth-token', token).status(200).json(`user is logged in. token: ${token}`);
            } else{ //Passwords do not match
                res.status(400).json(`password is incorrect`);
            }

        });
    }else { //if email does not exist
        res.status(404).json(`This user does not exist`);
    }

});

export default router;