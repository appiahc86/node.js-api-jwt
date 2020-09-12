import Router from 'express';
const router = Router();

import auth from './verifyToken.js';


router.get('/', auth, (req, res) => {
    const data = {
                   post: {title: 'Hello world', body: 'this is my first post'},
                   authUser:  req.user
                 };

    res.status(200).json(data);
});


export default router;