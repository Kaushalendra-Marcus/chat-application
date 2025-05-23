import express from 'express'
import { sendMessage, getMessage } from '../controller/message.controller.js'
const router = express.Router()
import secureRoute from '../middleware/secureRoute.js'

// router.use((req, res, next) => {
//     console.log('Message Route - Incoming path:', req.path);
//     next();
// });
router.post('/send/:id', secureRoute, sendMessage)  
router.get('/get/:id', secureRoute, getMessage) 

export default router