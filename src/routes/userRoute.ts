import express, { Request, Response, response } from 'express';
import { addNewUser } from '../controllers/userController';
import { validateNewUser } from '../middleware/validation';
import _ from 'lodash';

const router = express.Router();

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
