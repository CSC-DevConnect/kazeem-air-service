import express from 'express';
// import auth from '../../middlewares/auth';
// import userValidation from '../../validations/user.validation';
import flightController from '../../controllers/flight.controller';

const router = express.Router();

// router.route('/').post(auth('bookFlight'), flightController.bookFlight).get(auth('airlines'), flightController.getAirlines);
router.get('/airlines', flightController.getAirlines);
// router.route('/:flightId').get(auth('getFlight'), flightController.getFlight);

export default router;
