import * as authService from '../services/authenticate';
import * as argon from 'argon2';
import jwt from 'jsonwebtoken';

const register = async (req,res) => {
    var {username, email, password, } = req.body;
    if(username == undefined || email == undefined || password == undefined){
        return res.status(409).json({message: "error to find username, email or password field"});
    }
    if(username.length < 6){
        return res.status(400).json({message: "username need minimum 6 character"})
    }
    if(email.length < 4 || !email.includes('.') || !email.includes('@')){
        return res.status(400).json({message: "please use valid email"})
    }
    if(password.length < 6){
        return res.status(400).json({message: "password is too short"});
    }
    username = username.toLowerCase();
    email = email.toLowerCase();
    var response = await authService.findUserByEmailAndUsername(email,username);
    if(response.data.main_users.length > 0){
        return res.status(409).json({message: `already have user with username ${username} or email ${email}, try another`});
    }
    var hashPassword = await argon.hash(password);
    var createdUser;
    try{
        createdUser = await authService.createUser(email,username, hashPassword);
        
    }catch(e){
        return res.status(400).json({message: "error while creating user", error: e})
    }
    if(createdUser == undefined || createdUser == null){
        return res.status(400).json({message: "failed to create user"});
    }
    var token = await generateToken(createdUser);
    return res.json({message: "user created with success",user: createdUser,token: token});


}

const login = async (req,res) => {
    console.log(req.body.input);
    var {identifier, password } = req.body.input;
    if(identifier == undefined){
        return res.status(400).json({message: "invalid identifier"});
    }
    if(password == undefined || password.length < 6){
        return res.status(400).json({message: "password needs minimum 6 characters"});
    }
    var response = await authService.findUserByEmailAndUsername(identifier,identifier);
    if(response.data.main_users.length == 0){
        return res.status(400).json({message: `no user with username equals to ${identifier}`});
    }
    var user = response.data.main_users[0];
    if((await argon.verify(user.password,password)) == false){
        return res.status(400).json({message: "invalid password"});
    }
    user = {
        "user": user.username,
        "email": user.email,
        "points": user.points
    }
    var token = await generateToken(user);
    return res.json({message: "user authenticate with success",user: user,token: token});

}

async function generateToken (user) {
    const tokenContents = {
        sub: user.id.toString(),
        iat: Date.now() / 1000,
        iss: 'https://spaces-cloud.herokuapp.com/',
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": "user",
          "x-hasura-user-id": user.id.toString(),
          "x-hasura-user-user": {
            "username": user.username,
            "email": user.email,
            "points": user.points
          },
          "x-hasura-default-role": "user",
          "x-hasura-role": "user"
        },
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
    };
    var token = jwt.sign(tokenContents,process.env.SECRET_KEY);
    return token;
}

export {
    register,
    login

}