class Router {
    static #instance

    #routes = []

    middleWare

    constructor(routers) {
        if (Router.#instance != null) return Router.#instance;
        Router.#instance = this;

        routers?.forEach(router => {
            Router.getInstance().#routes.push(router.#routes)
        })
    }

    static getInstance() {
        return this.#instance
    }

    setMiddleWare(middleWare) {
        this.middleWare = middleWare
    }

    getRoute(req) {
        const route = this.#routes.find(route => route.path === req.url && route.method === req.method)
        return route
    }

    async handleRequest(req, res) {
        const f = await this.middleWare.handleRequest(req, res)
        console.log(f, 'flag');
        if (f !== false) {
            const route = this.getRoute(req)
            this.init(route.cb, req, res)
        }
    }

    addRoute(path, method, cb) {
        this.#routes.push({
            path, method, cb
        })
    }

    init(cb, req, res) {
        cb(req, res)
    }
}

export default Router
