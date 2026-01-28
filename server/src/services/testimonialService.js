const Testimonial = require('../models/testimonial.model');

class TestimonialService {
    async createTestimonial(data){
        try{
            const testimonial = new Testimonial(data);
            return await testimonial.save();
        }catch(error){
            throw new Error(`Error creating testimonial: ${error.message}`)
        }
    }

    async getAllTestimonial(filters = {}){
        try {
            const { isActive = true, limit = 10, skip = 0, sortBy = '-create_at' } = filters
            const query = { isActive }

            const testimonials = await Testimonial
            .find(query)
            .sort(sortBy)
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .select('-__v');

            const total = await Testimonial.countDocuments(query);

            return {
                data: testimonials,
                limit: parseInt(limit),
                skip: parseInt(skip),
                total: total,
                pages: Math.ceil(total/limit)
            }
        } catch (error) {
            throw new Error(`Error fetching testimonials: ${error.message}`);
        }
    }

    async getTestimonialById(tid){
        try {
            const testimonial = await Testimonial.findOne({tid}).select('-__v');
            
            if(!testimonial){
                throw new Error('Testimonial not found');
            }

            return testimonial;
        } catch (error) {
            throw new Error(`Error fetching testimonial: ${error.message}`);
        }
    }

    async updateTestimonial(tid, data){
        try {
            const testimonial = await Testimonial.findOneAndUpdate(
               { tid },
               { $set: data },
               { new: true, runValidators: true }, 
            ).select('-__v');

            if(!testimonial){
                throw new Error('Testimonial not found');
            }

            return testimonial;
        } catch (error) {
            throw new Error(`Error updating testimonial: ${error.message}`);
        }
    }

    async deactiveTestimonial(tid) {
        try {
            const testimonial = await Testimonial.findOneAndUpdate(
                { tid },
                { $set: { isActive: false } },
                { new: true }
            );

            if(!testimonial){
                throw new Error('Testimonial not found');
            }

            return { message: 'Testimonial Deactive successfully' }

        } catch (error) {
            throw new Error(`Error Deactive testimonial: ${error.message}`)
        }
    }

    async deleteTestimonial(tid){
        try {
            const testimonial = await Testimonial.findOneAndDelete({tid});

            if(!testimonial){
                throw new Error('Testimonial not found');
            }

            return { message: "Testimonial delete successfully" }
        } catch (error) {
            throw new Error(`Error permanently deleting testimonial: ${error.message}`);
        }
    }
}

module.exports = new TestimonialService()