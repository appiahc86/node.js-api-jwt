import jwt from 'jsonwebtoken';

const auth = (req, res, next)=>{
     const token = req.header('auth-token');
     if (!token) return res.status(401).json('Access Denied');

    jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
        if (err) return res.status(400).json(`Invalid Token`);
        req.user = decoded;
    });
    next();
}

export default auth;