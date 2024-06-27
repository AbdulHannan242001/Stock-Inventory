import jwt from 'jsonwebtoken';
import User from '../modals/User.modal.js';

const fetchUser = async (req, res, next) => {
    const token = req.cookies.jwt;


    if (!token) {
        return res.status(401).send('Access Denied');
    }

    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);

        if (!verify) {
            return res.status(401).send('Invalid Token');
        }

        const user = await User.findById(verify.id).select('-password');

        if (!user) {
            return res.status(401).send('User Not Found');
        }

        req.user = user;

        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).send('Invalid Token');
    }
};

export default fetchUser;
