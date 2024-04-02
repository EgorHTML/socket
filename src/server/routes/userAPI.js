import Router from './router.js'
import { getUserData } from "../controllers/userController.js"

const router = new Router()

router.addRoute('/api/user', 'GET', getUserData)

export default router