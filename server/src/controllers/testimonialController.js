const testimonialService = require('../services/testimonialService');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

class TestimonialController {
    async create(req, res){
        try {
            const { fullname, location, rating, description } = req.body;

            if(!fullname || !location || !rating || !description){
                throw new ApiError(400, 'All fields are required')
            }   

            const testimonial = await testimonialService.createTestimonial({
                fullname,
                location,
                rating,
                description
            });

            return res.status(201).json(
                new ApiResponse(201, {
                    success: true,
                    message: 'Testimonial created successfully',
                    data: testimonial
                })
            )
        } catch (error) {
            return res.status(500).json(
                {
                    success: false,
                    message: error.message
                }
            ) 
        }
    }

    async getAll(req, res){
        try {
           const { isActive, limit, skip, sortBy } = req.query;
            
            const result = await testimonialService.getAllTestimonial({
                isActive: isActive !== undefined ? isActive === 'true' : true,
                limit,
                skip,
                sortBy
            });
            
            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Testimonials fetched successfully',
                    data: result.data, // Changed: data property
                    pagination: {      // Changed: structured pagination
                        limit: result.limit,
                        skip: result.skip,
                        total: result.pages,
                        hasMore: result.skip + result.data.length < result.pages * result.limit
                    }
                })
            )
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getById(req, res){
        try {
            const { tid } = req.params;
            const testimonial = await testimonialService.getTestimonialById(tid);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    data: testimonial
                })
            );
        } catch (error) {
            const statusCode = error.message.includes('not found') ? 404 : 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    }

    async update(req, res){
        try {
            const { tid } = req.params;
            const updateData = req.body;
            
            const testimonial = await testimonialService.updateTestimonial(tid, updateData);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Testimonial updated successfully',
                    data: testimonial
                })
            );

        } catch (error) {
            const statusCode = error.message.includes('not found') ? 404 : 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    }

    async deactive(req, res){
        try {
            const { tid } = req.params;
            
            const result = await testimonialService.deactiveTestimonial(tid);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Testimonial deactivated successfully',
                    data: result
                })
            );
        } catch (error) {
            const statusCode = error.message.includes('not found') ? 404 : 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    }

    async delete(req, res) {
        try {
            const { tid } = req.params;
            const result = await testimonialService.deleteTestimonial(tid);

            return res.status(200).json(
                new ApiResponse(200, {
                    success: true,
                    message: 'Testimonial deleted permanently',
                    data: result
                })
            )
        } catch (error) {
            const statusCode = error.message.includes('not found') ? 404 : 500;
            return res.status(statusCode).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new TestimonialController();