import express from 'express'
import { signUp,signIn, logOut, getUserProfile,deleteAccount } from '../controller/user.controller.js'
import secureRoute from '../middleware/secureRoute.js'
const router = express.Router()

// router.use((req, res, next) => {
//     console.log('User Route - Incoming path:', req.path);
//     next();
// });
router.post("/signup", signUp)
router.post("/signin",signIn)

router.get("/getUserProfile",secureRoute,getUserProfile)
router.delete('/delete',secureRoute,deleteAccount)
export default router;