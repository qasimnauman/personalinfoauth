import { Router } from 'express';
import {
    getPersonalInfo,
    updatePersonalInfo,
    addPersonalInfo,
    deletePersonalInfo,
    updateUserdata
} from '../controllers/personalinfo.controllers.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/getallpersonalinfo').get(verifyJWT, getPersonalInfo);
router.route('/addpersonalinfo').post(verifyJWT, addPersonalInfo);
router.route('/updatepersonalinfo/:id').put(verifyJWT, updatePersonalInfo);
router.route('/updateuserdata').put(verifyJWT, updateUserdata);
router.route('/deletepersonalinfo').delete(verifyJWT, deletePersonalInfo);

export default router;