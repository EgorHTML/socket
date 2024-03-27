import { signupPost } from "./controllers/authControllers.js"
import {setCookies, getCookies} from './controllers/cookieController.js'

class Router {
    static #instance;

    routes = []

    constructor() {
        if (Router.#instance != null) return Router.#instance;
        Router.#instance = this;
    }

    getRoute(req) {
        const route = this.routes.find(route => route.path === req.url && route.method === req.method)
        return route
    }

    handleRequest(req, res) {
        const route = this.getRoute(req)
        this.init(route.cb, req, res)
    }

    addRoute(path, method, cb) {
        this.routes.push({
            path, method, cb
        })
    }

    init(cb, req, res) {
        cb(req, res)
    }
}

const router = new Router()

router.addRoute('/signup', 'POST', signupPost)

router.addRoute('/set-cookies', 'GET', setCookies)
router.addRoute('/get-cookies', 'GET', getCookies)

export default router



