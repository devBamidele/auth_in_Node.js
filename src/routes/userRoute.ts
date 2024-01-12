import express, { Request, Response, response } from 'express';
import { addNewUser } from '../controllers/userController';
import { validateNewUser } from '../middleware/validation';
import _ from 'lodash';

const router = express.Router();

router.post(`/add`, validateNewUser, async (req: Request, res: Response) => {

    try {
        const { name, email, password } = req.body;

        const result = await addNewUser(name, email, password);

        const successReply = _.pick(result, ['message', 'data']);

        if (result.success) {
            res.send(successReply);
        } else {
            res.status(400).send(result.message);
        }

    } catch (e) {
        console.error('Error on post method: ', e);
        
        res.status(500).send('Internal server error');
    }
});

export default router;
