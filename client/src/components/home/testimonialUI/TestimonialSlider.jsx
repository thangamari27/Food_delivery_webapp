import { useTestimonialSlider } from "@/hooks/useTestimonialSlider";

function TestimonialSlider({ children, speed = 0.4, styles }) {
  const { trackRef, pause, resume } = useTestimonialSlider({ speed })

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* Left Fade */}
      <div className={styles.leftFade} />

      {/* Right Fade */}
      <div className={styles.rightFade} />

      {/* Sliding Track */}
      <div ref={trackRef} className="flex w-max">
        {children}
      </div>
    </div>
  );
}

export default TestimonialSlider;
