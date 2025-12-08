import { useState } from "react";

function useUserBenefit({ content }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => 
        prev + 1 >= content.benefits.length - 2 ? 0 : prev + 1
    )
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
        prev === 0 ? content.benefits.length -3 : prev - 1
    )
  };

  return {
    currentIndex,
    prevSlide,
    nextSlide,
  }
}

export default useUserBenefit