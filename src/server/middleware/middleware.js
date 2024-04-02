export default class MiddleWare {
    static #instance

    #handlers = []

    constructor(middleWares) {
        if (MiddleWare.#instance != null) return MiddleWare.#instance;
        MiddleWare.#instance = this;

        middleWares?.forEach(middleWare => {
            MiddleWare.getInstance().#handlers.push(...middleWare.getHandlers())
        })
    }

    static getInstance() {
        return this.#instance
    }

    getHandler(req) {
        return this.#handlers.find(handler => req.url.includes(handler.path))
    }

    async handleRequest(req, res) {
        const handler = this.getHandler(req)
        if (handler)
            return handler.cb(req, res)
        return true
    }

    addHandler(path, cb) {
        this.#handlers.push({ path, cb })
    }

    getHandlers() {
        return this.#handlers
    }
}