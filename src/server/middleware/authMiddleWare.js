import MiddleWare from "./middleware.js";
import { parseCookies } from "../controllers/cookieController.js"
import jwt from "jsonwebtoken";

const middleWare = new MiddleWare()

async function isLogin(req, res) {
    const token = parseCookies(req).jwt

    if (token) {
        jwt.verify(token, 'secret', (error, decoded) => {
            if (error) {
                console.warn(error.message);
                res.writeHead(401, { "Content-Type": "application/json" })
                res.end(JSON.stringify({
                    code: 401, message: 'Unauthorized '
                }));
                return false
            } else {
                res.jwt = decoded
                console.log(decoded, 'decoded');
            }
        })
    } else {
        res.writeHead(401, { "Content-Type": "application/json" })
        res.end(JSON.stringify({
            code: 401, message: 'Unauthorized '
        }));
        return false
    }
    return true
}

middleWare.addHandler("/api/", isLogin)

export default middleWare