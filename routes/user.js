import Router from 'express';
const router = Router();
import bcrypt from 'bcryptjs';
import User from "../models/User.js";

//import AddUserRequest
import AddUserRequest from "../requests/AddUserRequest.js";

router.get('/', (req, res) => {
    res.send('all users');
})

router.post('/register', async (req, res) => {

    const {error} = AddUserRequest.validate(req.body)

    if (error){
        return res.status(400).json(error.details[0].message);
    }

//validation passed

   // Check if email exists
    const emailExist = await User.findOne({email: req.body.email});

    if (emailExist) {
        console.log(emailExist)
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


export default router;