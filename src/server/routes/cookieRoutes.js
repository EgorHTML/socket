import { setCookies, getCookies } from "../controllers/cookieController.js"
import Router from "./router.js"

const router = new Router()

router.addRoute('/set-cookies', 'GET', setCookies)
router.addRoute('/get-cookies', 'GET', getCookies)

export default router