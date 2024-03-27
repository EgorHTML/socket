import { signupPost } from "./controllers/authControllers.js"

class Router {
    static #instance;

    routers = []

    getRoute(req){
        const routers = this.routers.find(router => router.path === req.url && router.method === req.method)
        return !!routers
    }

    handleRequest(req, res) {
        const routers = this.routers.filter(router => router.path === req.url && router.method === req.method)

        routers.forEach(router => {
            this.init(router.cb, req, res)
        })
    }

    addRoute(path, method, cb) {
        this.routers.push({
            path, method, cb
        })
    }

    init(cb, req, res) {
        cb(req, res)
    }

    constructor() {
        if (Router.#instance != null) return Router.#instance;
        Router.#instance = this;
    }


}

const router = new Router()
router.addRoute('/signup', 'POST', signupPost)

export default router



