import express from 'express';
// import auth from '../../middlewares/auth';
import flightController from '../../controllers/flight.controller';

const router = express.Router();

router.get('/airlines', flightController.getAirlines);
router.get('/airports', flightController.getAirports);
router.post('/offer', flightController.createOfferRequest);
router.route("/orders").post(flightController.createOrder).get(flightController.getOrders)

router.route("/orders/:id").get(flightController.getOrder).patch(flightController.updateOrder)
router.post('/two_way_offer', flightController.createTwoWayOfferRequest);
router.get('/offer_requests', flightController.getOfferRequests);

export default router;
