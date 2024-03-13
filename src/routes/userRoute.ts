import express, { Request, Response, response } from 'express';
import { addNewUser } from '../controllers/userController';
import { validateNewUser } from '../middleware/validation';
import _ from 'lodash';
import { auth } from '../middleware/auth';
import { AuthenticatedRequest } from '../models/authenticatedRequest';
import UserModel from '../models/user';
import { admin } from '../middleware/admin';

const router = express.Router();

router.get(`/me`, [auth, admin], async (req: AuthenticatedRequest, res: Response) => {
   
   const user = await UserModel.findById(req.user._id).select('-password');

   res.send(user);

})

router.post(`/add`, validateNewUser, async (req: Request, res: Response) => {

    try {
        const { name, email, password } = req.body;

        const result = await addNewUser(name, email, password);

        const { message, data, token } = result;        

        if (result.success) {
            res.header('x-auth-token', token).send({data, message});
        } else {
            res.status(400).send(result.message);
        }

    } catch (e) {
        console.error('Error on post method: ', e);
        
        res.status(500).send('Internal server error');
    }
});

export default router;
