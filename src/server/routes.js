import { signupPost } from "./controllers/authControllers.js"

export class Router {
    static routes = {
        '/signup': {
            'POST': signupPost
        }
    }

    static routers = []

    static createRouter(path, method) {
        const router = new Router(path, method)
        this.routers.push(router)
        return router
    }

    static handleRequest(req, res) {
        console.log(req.url, req.method, 'path method');
        const routers = this.routers.filter(router => router.path === req.url && router.method === req.method)

        routers.forEach(router => {
            router.init(Router.routes[router.path][router.method], req, res)
        })
    }

    init(cb, req, res) {
        cb(req, res)
    }

    constructor(path, method) {
        this.path = path
        this.method = method
    }


}

// могу сразу вставлять функцию без routes

const loginPost = Router.createRouter('/signup', 'POST')



