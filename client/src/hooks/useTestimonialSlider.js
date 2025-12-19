import { useEffect, useRef } from "react";

export function useTestimonialSlider({ speed = 0.4 }) {
  const trackRef = useRef(null);
  const position = useRef(0);
  const isPaused = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationId;
    const halfWidth = track.scrollWidth / 2;

    const animate = () => {
      if (!isPaused.current) {
        position.current -= speed;

        if (Math.abs(position.current) >= halfWidth) {
          position.current = 0;
        }

        track.style.transform = `translateX(${position.current}px)`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [speed]);

  return {
    trackRef,
    pause: () => (isPaused.current = true),
    resume: () => (isPaused.current = false),
  };
}
