import { getData, createData, getDataById, updateData, getDataByEmail } from "../repositories/users.js";
import { errorResponse, successResponse } from "../utils/response.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_ACCESS_TOKEN = "kelas.com";
const SECRET_REFRESH_TOKEN = "backend";

export const cerateUser = async (request, response, next) => {
    try {
        let name = request.body.name;
        let email = request.body.email;
        let password = request.body.password;
        let saltRound = 10;

        bcrypt.hash(password, saltRound, async (err, hashedPassword) => {
            const [result] = await createData(name, email, hashedPassword);
            const [users] = await getDataById(result.insertId); 

            if(users.length > 0) {
                successResponse(response, "sucess", users[0]);
            } else {
                errorResponse(response, "failed create data")
            }
        })
    } catch(error) {
        next(error)
    }
    
}

export const getUser = async (request, response, next) => {
    try{
        const [result] = await getData();

        if(result.length > 0) {
            console.log(request.claims.id);
            successResponse(response, "success", result);
        } else {
            errorResponse(response, "data not found", 404);
        }
    } catch(error) {
        next(error);
    }
    
}

export const getUserById = async(id) => {
    const [result] = await getDataById(id);

    if(result.length > 0) {
        console.log(result[0]);
    } else {
        console.log(`data user tidak di temukan`)
    }
    
}

export const updateUser = async (request, response, next) => {
    try {
        let id = request.params.id;
        let name = request.body.name;
        let email = request.body.email;

        const [result]= await updateData(id, name, email);
        if (result.affectedRows > 0){
            successResponse(response, "success update data", result.affectedRows);
        } else {
            errorResponse(response, "user id not found!")
        }
    } catch(error) {
        next(error)
    }
}

export const login = async (request, response, next) => {
    try {
        let email = request.body.email;
        let pass = request.body.password;
        const [users] = await getDataByEmail(email);
        if(users.length > 0) {
            let user = users[0];
            bcrypt.compare(pass, user.password, (err, isValid) => {
                if(isValid) {
                    let payload = {
                        id: user.user_id,
                        name: user.name,
                        email: user.email
                    };
                    let accessToken = jwt.sign(payload, SECRET_ACCESS_TOKEN, {expiresIn:"15m"});
                    let refreshToken = jwt.sign(payload, SECRET_REFRESH_TOKEN, { expiresIn:"30m"});
                    let data = {
                        access_token : accessToken, 
                        refresh_token : refreshToken,
                    }
                    successResponse(response, "success", data);
                } else {
                    errorResponse(response, "email atau password salah",401);
                }
            })
        }
    } catch (error) {
        next(error);
    }
}

export const validateToken = (request, response, next) => {
    try {
        let authToken = request.headers.authorization;
        let accessToken = authToken && authToken.split(' ')[1]; // Bearer accessToken
        
        jwt.verify(accessToken, SECRET_ACCESS_TOKEN, (error, payload) => {
            if (!error) {
                request.claims = payload;
                next()
            } else {
                errorResponse(response, error.message, 403);
            }
        })
    } catch(error) {
        next(error);
    }
}