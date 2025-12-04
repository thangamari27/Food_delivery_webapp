import React from "react";
import TestimonialCard from "./TestimonialCard";

function TestimonialCardContent({ testimonials, testimonialsSection, styles }) {
 
  return (
    <div className={styles.content.grid}>
        {Array.isArray(testimonials) ? (
        testimonials.map((testimonial, idx) => {
          return (
            <TestimonialCard
              key={testimonial?.id ?? `testimonial-${idx}`}
              testimonial={testimonial}
              styles={styles.card}
            />
          );
        })
      ) : (
        <div>{testimonialsSection.notAvailable}</div>
      )}
    </div>
  );
}

export default TestimonialCardContent;