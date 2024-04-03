import MongoDB from "../DB/mongo/mongo.js";
import { parseCookies } from "./cookieController.js";

export async function getUserData(req, res) {
    const mongoDB = new MongoDB()

    console.log(parseCookies(req), 'body');
    try {
        const id = res.jwt.id
        const user = (await mongoDB.getUser(id))[0]
        console.log(user, 'user');
        console.log(res.jwt, 'res.userId');
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ data: { email: user.email } }))
    } catch (error) {
        console.log(error);
        res.writeHead(400, { "Content-Type": "application/json" })
        res.end(JSON.stringify({ message: error.message }))
    }

    console.log('api user!!');
}