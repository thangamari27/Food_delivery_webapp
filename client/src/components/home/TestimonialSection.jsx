import TestimonialHeader from './testimonialUI/TestimonialHeader'
import TestimonialCardContent from './testimonialUI/TestimonialCardContent'
import { testimonialsSection } from '@/utils/constant/admin/HomeConstant'
import { testimonialStyles } from '@/utils/styles/HomeStyle'
import { useTestimonials } from '../../hooks/useTestimonial'
import Loader from '../common/PageLoader';
import { useMemo } from 'react';

function TestimonialSection() {
  const styles = testimonialStyles;

  // Memoize filters to prevent infinite re-renders
  const filters = useMemo(() => ({ 
    isActive: true, 
    limit: 6 
  }), []);

  const { testimonials, loading, error } = useTestimonials({
    autoFetch: true,
    filters
  })

  // Show loading only on initial load
  if (loading && testimonials.length === 0) {
    return <Loader />
  }

  // Show error only if we have no testimonials
  if (error && testimonials.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className="text-center py-12">
            <p className="text-red-600">Error loading testimonials: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  // Ensure testimonials is always an array
  const safeTestimonials = Array.isArray(testimonials) ? testimonials : [];
  
  const formattedTestimonials = safeTestimonials.map(t => ({
    id: t.tid,
    name: t.fullname,
    location: t.location,
    rating: t.rating,
    text: t.description
  }))

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Section Header */}
        <TestimonialHeader 
          title={testimonialsSection.title} 
          styles={styles.header} 
        />

        {/* Testimonials Grid */}
        {formattedTestimonials.length > 0 ? (
          <TestimonialCardContent 
            testimonials={formattedTestimonials} 
            testimonialsSection={testimonialsSection} 
            styles={styles.testimonialCard} 
          />
        ) : !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No testimonials available.</p>
          </div>
        )}

      </div>
    </section>
  )
}

export default TestimonialSection