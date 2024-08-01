const router = require('express').Router();
const cartController = require('../controllers/cartController')

router.get('/find',cartController.getCart);
router.post('/',cartController.addToCart);
router.delete('/:cartItemId',cartController.deleteCart);
router.post('/quantity',cartController.decrementCartItem);

module.exports = router