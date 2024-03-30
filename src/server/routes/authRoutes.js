import Router from './router.js'
import { signupPost, signIn } from "../controllers/authControllers.js"

const router = new Router()

router.addRoute('/signup', 'POST', signupPost)
router.addRoute('/signin', 'POST', signIn)

export default router