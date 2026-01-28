const express = require('express');
const TestimonialController = require('../controllers/testimonialController');
const router = express.Router();

// Get Testimonial
router.get('/', TestimonialController.getAll);
router.get('/:tid', TestimonialController.getById);

// Create Testimonial
router.post('/', TestimonialController.create);

// Update Testimonial
router.put('/:tid', TestimonialController.update);

// Deactive and delete
router.delete('/:tid', TestimonialController.deactive);
router.delete('/:tid/permanent', TestimonialController.delete);

module.exports = router;