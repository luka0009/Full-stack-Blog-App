import express from 'express';
import User from '../models/userModel';

export const registerUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const {name, email, password} = req.body;
        
        if(!name || !email || !password) {
            throw new Error('Please fill in all the fields');
        }

        const userExists = await User.findOne({ email });
        if(userExists) {
            throw new Error('User already exists');
        };

        const user = await User.create({
            name,
            email, 
            password
        });

        return res.status(201).json({
            _id: user.id,
            avatar: user.avatar,
            name: user.name,
            email: user.email,
            verified: user.verified,
            admin: user.admin,
            token: await user.generateJWT(),
        })
    } catch (error) {
        next(error);
    }    
};

