import express, { Request, Response, response } from 'express';
import { addNewUser, authenticateUser } from '../controllers/userController';
import { validateExistingUser, validateNewUser } from '../middleware/validation';
import _ from 'lodash';

const router = express.Router();

router.post(`/`, validateExistingUser, async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body;

        const result = await authenticateUser(email, password);

        const { message, token } = result;

        if (result.success) {
            res.header('x-auth-token', token).send(message);
        } else {
            res.status(400).send(message);
        }

    } catch (e) {
        console.error('Error on post method: ', e);
        
        res.status(500).send('Internal server error');
    }
});

export default router;
