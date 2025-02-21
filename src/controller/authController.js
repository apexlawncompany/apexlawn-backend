import { createUserService, getUserByEmailService, getUserByIdService } from '../models/signUpModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { handleResponse } from '../utils/catchError.js';




  const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  };


/**
 *  Singup function with req,res,next parameters
 */

export const signup = async (req, res, next) => {
  try {
    const {email, first_name, last_name} = req.body;
    if(req.body.password.length < 5){
        return handleResponse(res, 400, 'Password must be at least 5 characters long');
    }

    if(!email || !first_name || !last_name){
        return handleResponse(res, 400, 'Email, first_name and last_name are required');
    }


    let password =  await bcrypt.hash(req.body.password, 10);  
    const created_at = new Date();
    const updated_at = new Date();
    
    const user = await createUserService({email, password, first_name, last_name, created_at, updated_at});
    if(!user){
        return handleResponse(res, 400, 'User not created');
    }
   
    delete user.password;

    user.token = generateToken(user.id);

    handleResponse(res, 200, 'User created successfully', user);
  } catch (error) {
    next(error);
  }
};


/**
 *  Login function with req,res,next parameters
 */

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if(!email || !password){
        return handleResponse(res, 400, 'Email and password are required');
    }

    const result = await getUserByEmailService(email);

    if(!result || !await bcrypt.compare(password, result.password)){
        return handleResponse(res, 400, 'User or Password incorrect');
    }

    const token = generateToken(result.id);

    return handleResponse(res, 200, 'Login successful', {token});
  }catch(error){
    next(error);
  }
};

/**
 *  authentication user with req,res,next parameters
 */

export const authenticateUser = async (req, res, next) => {
  try {
    let idToken = '';
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        idToken = req.headers.authorization.split(' ')[1];
    }

    if(!idToken){
        return handleResponse(res, 401, 'Please login and try again');  
    }

    const tokenDetails = jwt.verify(idToken, process.env.JWT_SECRET);
    const user = await getUserByIdService(tokenDetails.id);

    if(!user){
        return handleResponse(res, 401, 'User not found || Please login to continue');  
    }
    req.user = user;
    return next();

  } catch (error) {
    next(error);
  }
};