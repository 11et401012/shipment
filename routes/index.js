const express = require('express');
const router = express.Router();
const containerController = require('../controller/containerController');
const containerStatusController = require('../controller/containerStatusController');
const shipmentController = require('../controller/shimentController');
const shipmentMiddleware = require('../middleware/shipment.middleware');
const containerService = require('../services/util.service');
const containerStatusMiddleware = require('../middleware/containerstatus.middleware');
const containerMiddleware = require('../middleware/container.middleware');
const containerupdateStatusMiddleware = require('../middleware/containerUpdate.middleware');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/container/status', containerStatusController.fetchContainerStatus)
  .post('/container/status', containerStatusMiddleware.ValidateContainerStatus, containerStatusController.saveContainerStatus);

router.post('/container', containerMiddleware.ValidateContainer, containerController.storeContainer)
  .put('/container', containerupdateStatusMiddleware.ValidateContainerUpdateStatus, containerController.updateContainerStatus)
  .get('/container', containerController.fetchContainer);


router.post('/shipment', shipmentMiddleware.Validateshipment, containerService.findContainer, shipmentController.storeShipment)
  .delete('/shipment', shipmentController.deleteShipment)
  .get('/shipment', shipmentController.fetchShipment);

module.exports = router;