import MiddleWare from "./middleware.js";
import { parseCookies } from "../controllers/cookieController.js"
import jwt from "jsonwebtoken";

const middleWare = new MiddleWare()

async function isLogin(req, res) {
    const token = parseCookies(req).jwt
    let auth = true
    if (token) {
        jwt.verify(token, 'secret', (error, decoded) => {
            if (error) {
                res.jwt = null
                res.writeHead(401, { "Content-Type": "application/json" })
                res.end(JSON.stringify({
                    code: 401, message: error.message
                }));
                auth = false
            } else {
                res.jwt = decoded
                console.log(decoded, 'decoded');
            }
        })
    } else {
        res.jwt = null
        res.writeHead(401, { "Content-Type": "application/json" })
        res.end(JSON.stringify({
            code: 401, message: 'Unauthorized'
        }));
        auth = false
    }

    return auth
}

middleWare.addHandler("/api/", isLogin)

export default middleWare