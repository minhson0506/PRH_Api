import express from 'express';
import MessageResponse from '../interfaces/MessageResponse';
import companyRoute from './routes/companyRoute';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
    res.json({
        message: 'routes: PRH database',
    });
});

router.use('/postal_codes', companyRoute);

export default router;