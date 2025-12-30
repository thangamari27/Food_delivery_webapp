import { useTestimonialSlider } from "@/hooks/useTestimonialSlider";

function TestimonialSlider({ children, speed = 0.4, styles }) {
  const { trackRef, pause, resume } = useTestimonialSlider({ speed })

  return (
    <div
      className={styles.container}
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* Left Fade */}
      <div className={styles.leftFade} />

      {/* Right Fade */}
      <div className={styles.rightFade} />

      {/* Sliding Track */}
      <div ref={trackRef} className={styles.trackContainer}>
        {children}
      </div>
    </div>
  );
}

export default TestimonialSlider;
