const mongoose = require('mongoose');
const { randomUUID} = require('crypto')

const TestimonialSchema = new mongoose.Schema({
    tid: {
        type: String,
        unique: true,
        require: true,
        default: () => randomUUID(),
    },
    fullname: {
        type: String,
        require: true,
        trim: true,
        min: 2,
        max: 20
    },
    location: {
        type: String,
        require: true,
        trim: true,
    },
    rating: {
        type: Number,
        require: true,
        min: 0,
        max: 5,
    },
    description: {
        type: String,
        require: true,
        min: 10,
        max: 150,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    create_at: {
        type: Date,
        default: Date.now,
    },
    update_at: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: { createdAt: "create_at", updatedAt: "update_at" }
});

TestimonialSchema.index({ isActive: 1, create_at: -1 });

module.exports = mongoose.model('Testimonial', TestimonialSchema);