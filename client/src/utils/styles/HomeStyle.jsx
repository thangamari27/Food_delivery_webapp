// section: 1
// Home page hero section styles 
export const heroSectionStyles = {
  section: "relative lg:min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 pt-24 md:pt-32 pb-16 overflow-hidden",
  container: "container mx-auto px-4 md:px-16 lg:px-12 xl:px-32",
  heroGrid: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
  leftContainer: {
    container: "space-y-6 z-10",
    title: "text-4xl md:text-6xl lg:text-7xl font-bold leading-tight",
    highlight: "text-orange-500",
    description: "text-gray-600 text-lg md:text-xl max-w-md",
    button: "bg-orange-500 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1",
  },

  rightContainer: {
    container: "relative h-[500px] md:h-[600px] z-10 hidden lg:block",
    heroBowl: {
      bowl1: {
        position: "top-0 right-0",
        size: "large",
        gradient: "bg-gradient-to-br from-green-400 via-yellow-300 to-red-400",
        borderColor: "border-orange-200",
      },
      bowl2: {
        position: "top-1/2 left-0",
        size: "small",
        gradient: "bg-gradient-to-br from-yellow-200 to-yellow-400",
        borderColor: "border-orange-300",
      },
      bowl3: {
        position: "bottom-0 right-2",
        size: "medium",
        gradient: "bg-gradient-to-br from-green-300 via-green-400 to-green-500",
        borderColor: "border-orange-200",
      },
    },
    sizeClass: {
      small: "w-48 h-48 md:w-64 md:h-64",
      medium: "w-56 h-56 md:w-72 md:h-72",
      large: "w-72 h-72 md:w-96 md:h-96",
    },
  },

  orangeCircle: {
    circle1: "absolute top-1/4 right-1/4 w-32 h-32 bg-orange-400 rounded-full opacity-60 blur-3xl",
    circle2: "absolute top-1/3 right-1/3 w-16 h-16 bg-orange-500 rounded-full hidden lg:block",
    circle3: "absolute bottom-1/4 right-1/4 w-24 h-24 bg-orange-400 rounded-full opacity-60",
    circle4: "absolute bottom-1/3 right-1/2 w-12 h-12 bg-orange-500 rounded-full opacity-80",
    circle5: "absolute bottom-20 left-20 w-20 h-20 bg-orange-400 rounded-full opacity-60 sm:block lg:hidden",
  },
  wave: {
    waveContainer: "absolute bottom-0 left-0 w-48 h-24 hidden lg:block",
    waveSvg: "w-full h-full fill-orange-400 opacity-50",
  },

}

// section: 2
// how It Work section styles
export  const howItWorkStyles = {
  section: "py-16 md:py-24 bg-white",
  container: "container mx-auto px-4 md:px-16 lg:px-24 xl:px-32",
  stepHeader: {
    container: "text-center mb-16",
    title: "text-gray-500 text-sm md:text-base mb-2 uppercase tracking-wide",
    subTitle: "text-4xl md:text-5xl font-bold text-gray-900 mb-4",
    description: "text-gray-600 max-w-3xl mx-auto text-base md:text-lg",
  },
}

// section: 3
// Special menu section styles
export const specialMenuStyles = {
  section: "py-16 md:py-24 bg-amber-50",
  container: "container mx-auto px-4 md:px-16 lg:px-24 xl:px-32",
  // Header Styles
  header: {
    container: "text-center my-8",
    title: "text-4xl md:text-5xl font-bold text-gray-900 mb-4",
    subTitle: "text-4xl md:text-5xl font-bold text-gray-900 mb-4",
    description: "text-gray-600 max-w-2xl mx-auto",
    buttonContainer: "text-center my-8",
    button: "inline-flex items-center gap-2 hover:bg-gray-200 bg-orange-500 text-amber-50 border-2 border-white hover:border-2 hover:border-orange-500 hover:text-gray-700 px-8 py-3 rounded-full font-medium transition-all duration-300",
  },

  // Content Styles
  content: {
    titleStyle: "text-xl font-bold text-gray-900 mb-2",
    descriptionStyle: "text-sm text-gray-500 mb-4 line-clamp-2",
    menuContent: "p-5",
    priceContainer: "flex items-center justify-start",
    priceIcon: "w-5 h-5 text-gray-900",
    price: "text-2xl font-bold text-gray-900",

    // Badge Styles
    badge: {
      container: "absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium",
      popular: "bg-orange-500",
      new: "bg-green-500",
      special: "bg-purple-500",
    },
  },

  specialMenuCard: {
    grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8",
    container: "bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2",
    imageContainer: "w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200",
    picture: "aspect-[4/3] md:aspect-[16/9] w-full relative"
  },

};

// section: 4
// Popular Cuisines section styles
export const popularMenuStyles = {
  section: "py-16 md:py-24 bg-gray-50",
  container: "container mx-auto px-4 md:px-16 lg:px-24 xl:px-32",

  header: {
    container: "text-center mb-12",
    title: "text-4xl md:text-5xl font-bold text-gray-900 mb-4",
    description: "max-w-2xl mx-auto text-gray-600",
  },
  menuCarousel: {
    carouselContainer: "relative overflow-hidden",
    leftFade: "pointer-events-none absolute left-0 top-0 h-full w-20 z-20 bg-gradient-to-r from-white to-transparent",
    rightFade: "pointer-events-none absolute right-0 top-0 h-full w-20 z-20 bg-gradient-to-l from-white to-transparent",
    marqueeContainer: "pm-marquee flex gap-6 items-start py-6",
    shrinkImageContainer: "shrink-0 min-w-[220px] md:min-w-[260px]",
    menuCard: {
      Container: "bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300",
      wrapper: "w-full overflow-hidden",
      imageContainer: "aspect-[4/3] w-full relative bg-gradient-to-br from-gray-100 to-gray-200",
      picture: "absolute inset-0",
    },
    menuCardContent: {
      container: "p-4",
      title: "text-lg font-semibold text-gray-900 mb-1",
      description: "text-sm text-gray-500 mb-3 line-clamp-2",
      priceContainer: {
        container: "flex items-center justify-between gap-2",
        price: "inline-block text-base font-bold text-gray-900",
        icon: "inline-block",
        category: "inline-block text-xs text-gray-900 p-2 border border-orange-500 rounded-full",
      }
    },

  },
  buttonStyle: {
    buttonContainer: "text-center my-6",
    button: "inline-flex items-center gap-2 hover:bg-gray-200 bg-orange-500 text-amber-50 border-2 border-white hover:border-2 hover:border-orange-500 hover:text-gray-700 px-8 py-3 rounded-full font-medium transition-all duration-300",
  }
}

// section: 6
// Tesimonial section styles
export const testimonialStyles = {
  section: "py-16 md:py-20 bg-amber-50",
  container: "container mx-auto px-4 md:px-16 lg:px-24 xl:px-32",
  header: {
    container: "text-center mb-12",
    title: "text-4xl md:text-5xl font-bold text-gray-900 mb-8",
    description: "text-white/90 text-sm md:text-base tracking-[0.3em] mb-12 font-light"

  },
  testimonialCard: {
    content: {
      grid: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    },
    card: {
      container: "bg-white border-2 border-gray-200 rounded-2xl p-6 md:p-8 hover:border-orange-300 hover:shadow-lg transition-all duration-300",
      description: "text-gray-600 mb-6 text-sm md:text-base leading-relaxed",
      content: "flex items-center gap-4",
      constentWrapper: "flex-1",
      title: "font-bold text-gray-900",
      address: "text-sm text-gray-500",
      starContainer: "flex gap-1 mt-4"
    },
  },
  
  buttonStyle: "mt-12 px-8 py-4 bg-white text-red-600 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:bg-red-50",

}

// common card section styles
export const cardStylesConfig = {
  // How It Works Card Styles
  howItWorks: {
    wrapper: "flex flex-col items-center text-center space-y-4 p-6 rounded-lg 6 transition-all duration-300 group",
    imageContainer: "w-24 h-24 flex items-center justify-center bg-gray-100 rounded-lg group-hover:bg-orange-50 transition-colors duration-300",
    contentContainer: "space-y-3",
  },
  
  // Food Item Card Styles
  foodItem: {
    wrapper: "bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer",
    imageContainer: "w-full h-48 overflow-hidden",
    contentContainer: "p-4 space-y-2",
    priceStyle: "text-xl font-bold text-orange-500",
    ratingContainer: "flex items-center gap-2",
    ratingStyle: "text-sm text-gray-600",
    authorStyle: "",
  },
  
  // Testimonial Card Styles
  testimonial: {
    wrapper: "bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300",
    imageContainer: "w-16 h-16 rounded-full overflow-hidden mx-auto mb-4",
    contentContainer: "text-center space-y-3",
    priceStyle: "",
    ratingContainer: "flex justify-center gap-1 mb-2",
    ratingStyle: "text-yellow-400",
    authorStyle: "text-sm font-semibold text-gray-900 mt-4",
  },
  
  // Feature Card Styles
  feature: {
    wrapper: "bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-orange-300 transition-all duration-300",
    imageContainer: "w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-4",
    contentContainer: "space-y-3",
    priceStyle: "",
    ratingContainer: "",
    ratingStyle: "",
    authorStyle: "",
  },
};

export const gridStylesConfig = {
  howItWorks: {
    gridWrapper: "grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12",
  },
  foodItems: {
    gridWrapper: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
  },
  testimonials: {
    gridWrapper: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  },
  features: {
    gridWrapper: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
  },
};