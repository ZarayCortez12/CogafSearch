import {Router} from 'express'
import { searchOne } from '../controllers/search.controller.js'

const router = Router()

router.post('/searchOne', searchOne);

export default router;