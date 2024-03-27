import { user } from "../DB/models/User.js";

export function signupPost(req, res) {
    getRequestBody(req)
        .then(async data => {
            try {
                const User = await user.create(data)
                res.writeHead(201, { "Content-Type": "application/json" })
                res.end(JSON.stringify(User))
            } catch (error) {
                res.writeHead(400, { "Content-Type": "application/json" })
                res.end(JSON.stringify(error.message))
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

export function loginPost(req, res) {
    res.end('loginPost')
    console.log('loginPost');
}

function getRequestBody(req) {
    let body = [];
    return new Promise((res, rej) => {
        req
            .on('data', chunk => {
                // console.log(JSON.parse(chunk.toString()), 'chunk');
                body.push(chunk);
            })
            .on('end', () => {
                try {
                    body = JSON.parse(Buffer.concat(body).toString())

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