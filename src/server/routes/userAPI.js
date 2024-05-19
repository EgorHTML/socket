import Router from './router.js'
import { getUserData, getUsers } from "../controllers/userController.js"

const router = new Router()

router.addRoute('/api/user', 'GET', getUserData)

router.addRoute('/api/users', 'GET', getUsers)

export default router