import TestimonialCard from "./TestimonialCard";
import TestimonialSlider from "./TestimonialSlider";
import TestimonialTrack from "./TestimonialTrack";

function TestimonialCardContent({ testimonials, testimonialsSection, styles }) {
  if (!Array.isArray(testimonials)) {
    return <div>{testimonialsSection.notAvailable}</div>;
  }

  return (
    <TestimonialSlider styles={styles.slider}>
      <TestimonialTrack testimonials={testimonials} styles={styles.slider}>
        {(testimonial) => (
          <TestimonialCard
            testimonial={testimonial}
            styles={styles.card}
          />
        )}
      </TestimonialTrack>
    </TestimonialSlider>
  );
}

export default TestimonialCardContent;