class Router {
    static #instance;

    routes = []

    constructor(...routers) {
        routers.forEach(router => {
            this.routes.push(router.routes)
        })
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

export default Router
