import { User } from "../DB/mongo/models/User.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

function createToken(id) {
    console.log(process.env.TokenExpiresInSeconds, 'process.env.TokenExpiresInSeconds');
    return jwt.sign({ id }, 'secret', {
        expiresIn: 1800
    })
}

export function signupPost(req, res) {
    getRequestBody(req)
        .then(async data => {
            try {
                const user = await User.create(JSON.parse(data))
                const token = createToken(user._id)
                res.setHeader('Set-Cookie', `jwt=${token};max-age=${process.env.TokenExpiresInMiliSeconds || 60000};httpOnly=true`);
                res.writeHead(201, { "Content-Type": "application/json" })
                res.end(JSON.stringify({ message: 'success', code: 201 }))
            } catch (error) {
                res.writeHead(400, { "Content-Type": "application/json" })
                res.end(JSON.stringify({ message: error.message }))
            }
        })
        .catch(error => {
            res.writeHead(400, { "Content-Type": "application/json" })
            res.end(JSON.stringify(error.message))
        })
}

export function loginGet(req, res) {
    console.log('loginGet');
}

export function signIn(req, res) {
    getRequestBody(req)
        .then(async data => {
            const { email, password } = JSON.parse(data)
            try {
                console.log(process.env.TokenExpiresInMiliSeconds || 60000, 'process.env.TokenExpiresInMiliSeconds || 60000');
                const user = await User.login(email, password)
                const token = createToken(user._id)
                res.setHeader('Set-Cookie', `jwt=${token};max-age=${process.env.TokenExpiresInMiliSeconds || 60000};httpOnly=true`);
                res.writeHead(200, { "Content-Type": "application/json" })
                res.end(JSON.stringify({
                    message: 'success', code: 200, data: {
                        userId: user._id
                    }
                }))
            } catch (error) {
                res.writeHead(401, { "Content-Type": "application/json" })
                res.end(JSON.stringify({
                    message: error.message, code: 401, data: ''
                }))
            }
        })
        .catch(error => {
            res.writeHead(400, { "Content-Type": "application/json" })
            res.end(JSON.stringify(error.message))
        })
}

export function getRequestBody(req) {
    let body = [];
    return new Promise((res, rej) => {
        req
            .on('data', chunk => {
                body.push(chunk);
            })
            .on('end', () => {
                try {
                    body = Buffer.concat(body).toString()

                    res(body)
                    
                } catch (error) {
                    console.error(error);
                    rej(error)
                }
            })
            .on('error', error => {
                console.error(error.stack);
                rej(error)
            });
    })
}