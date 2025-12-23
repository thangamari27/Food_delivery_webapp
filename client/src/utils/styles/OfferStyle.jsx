
// section: 1
// Offer hero section style
export const offerHeroStyle ={
  section: "pt-24 md:pt-24 px-2 sm:px-4 md:px-6 pb-10 bg-gradient-to-br from-orange-50 via-white to-orange-50",
  carousel: {
    heroContainer: {
      container: "relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-2xl",

      slidesContainer: "absolute inset-0 transition-opacity duration-700",
      slideWrapper: "h-full flex items-center justify-between px-8 md:px-16",
      slideContent: "ml-8 md:ml-12 lg:ml-32 text-white z-10 max-w-md",
      slideTitle: "text-5xl md:text-7xl font-bold mb-2",
      slideSubtitle: "text-2xl md:text-3xl font-semibold",
      slideDescription: "",
      
      slideImageContainer: "absolute right-0 top-0 h-full w-1/2 md:w-3/6",
      slidePicture: "",
      slideImage: "h-full w-full object-cover rounded-l-full brightness-70 lg:brightness-100",

      leftArrow: "absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-20 transition",
      leftArrowIcon: "w-6 h-6",
      rightArrow: "absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-20 transition",
      rightArrowIcon: "w-6 h-6",

      scrollNavContainer: "absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20",
      scrollButton: "h-2 rounded-full transition-all"
    },
  }
}

// section: 2
// Current offer section
export const currentOfferStyle = {
    section: "py-16 md:py-2 bg-amber-50",
    offerGrid: {
        container: "p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
        card: "relative overflow-hidden rounded-xl shadow-lg transition-transform",

        offerBgImage: {
          container: "absolute inset-0 pointer-events-none",
          picture: "brightness-75",
          image: "w-full h-full object-cover scale-[1.03] transition-transform duration-500",
          imageShadow: "absolute inset-0 absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent bg-gradient-to-b from-black/75 via-black/30 to-transparent"
        },

        offerCardHeader: {
          container: "relative p-5 text-white flex flex-col justify-between h-full min-h-[320px]",
          wrapper: "flex justify-between items-start gap-4",
          header: "max-w-[70%]",
          title: "text-lg md:text-xl font-extrabold drop-shadow-sm",
          description: "text-sm md:text-base opacity-95 mt-1",
          discountContainer: "ml-auto",
          discountWrapper: "bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-white shadow-sm",        
        },

        offerCardFooter: {
          container: "mt-4 flex items-center justify-between",
          button: "inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-md text-sm",
          detailHide: "sm:inline",
          dateContainer: "text-xs text-white/90",
          date: "font-medium",
        },

        offerPanel: {
          container: "absolute inset-x-0 bottom-0 bg-white/95 text-slate-900 rounded-t-xl shadow-2xl transition-transform duration-300",
          panelOpen: "translate-y-full",
          panelClose: "translate-y-0",
          panelContainer: "p-4 md:p-6",
          panelWrapper: "flex justify-between items-start gap-4",
          title: "text-lg font-bold",
          subTitle: "text-sm text-slate-600 mt-1",
          buttonClose: "p-2 rounded-md hover:bg-slate-100",

          contentContainer: "mt-3 text-sm text-slate-700 space-y-3",
          buttonContainer: "flex gap-3 mt-2",
          leftButton: "px-4 py-2 rounded-md bg-red-600 text-white font-semibold",
          rightButton: "px-4 py-2 rounded-md border-2 border-red-600",
          
        }
    }
}

// section: 3
// User benefit section style
export const userBenefitStyle = {
  section: "w-full bg-gradient-to-b from-gray-50 to-white py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8",
  container: "max-w-7xl mx-auto",

  header: {
    container: "text-center mb-8 md:mb-12 lg:mb-16",
    title: "text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-2 md:mb-3",
    description: "text-gray-500 text-sm md:text-base lg:text-lg",    
  },
  benefitCarousel: {
    container: "mb-2 md:mb-6 lg:mb-8",
    lgWrapper: "hidden lg:block relative",
    mdWrapper: "hidden md:grid lg:hidden grid-cols-3 gap-4",
    smWrapper: "grid md:hidden grid-cols-2 gap-3 sm:gap-4",
    leftButton: "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all z-10",
    iconLeft: "w-6 h-6 text-gray-600",
    cardGrid: "grid grid-cols-4 gap-4 xl:gap-6",
    rightButton: "absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all z-10",
    iconRight: "w-6 h-6 text-gray-600",
    benefitCard:{
      container: "bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 md:p-5 lg:p-6 flex flex-col items-center text-center border border-gray-100 hover:border-orange-200",
      iconContainer: "bg-orange-50 rounded-full p-3 md:p-4 mb-3 md:mb-4",
      icon: "w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-orange-500",
      title: "font-bold text-gray-800 text-sm md:text-base lg:text-lg mb-1 md:mb-2",
      subTitle: "text-gray-500 text-xs md:text-sm",
    },
    deliveryCard: {
      container: "max-w-7xl py-2 lg:py-6",
      wrapper: "bg-gradient-to-br from-orange-50 via-o-50 to-orange-100 rounded-2xl lg:rounded-3xl p-6 md:p-8 lg:p-12",
      leftImageContainer: {
        container: "flex flex-col lg:flex-row items-center gap-8 md:gap-10 lg:gap-12 xl:gap-16",
        imageContainer: "w-full lg:w-1/2 flex justify-center",
        imageWrapper: "relative w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-sm xl:max-w-md", 
        imageShadow: "absolute inset-0 bg-orange-200 rounded-2xl blur-2xl opacity-30",
        picture: "",
        image: "relative w-full h-60 sm:h-64 md:h-72 lg:h-80 xl:h-96 object-cover rounded-xl md:rounded-2xl shadow-lg md:shadow-xl",
        
        imageResponsive: {
          mobile: "h-56 sm:h-64", 
          tablet: "h-60 md:h-72", 
          desktop: "h-72 lg:h-80 xl:h-96", 
        }
      },
      benefitItem: {
        outerContainer: "w-full lg:w-1/2 space-y-4 md:space-y-5 lg:space-y-6 order-1 lg:order-2",
        container: "bg-white rounded-xl lg:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-md lg:hover:shadow-lg transition-all duration-300",
        wrapper: "flex items-start gap-3 sm:gap-4",
        iconContainer: "rounded-full w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center flex-shrink-0",
        icon: "w-5 h-5 sm:w-6 sm:h-6",
        content: "flex-1",
        title: "font-bold text-gray-800 text-sm sm:text-base md:text-lg lg:text-xl mb-1",
        description: "text-xs sm:text-sm text-gray-500",
      },
    }
  },

  

}

// section: 4
// Loyalty section styles
export const loyaltyProgramStyle = {
  section: "bg-gray-200 p-8 md:p-12",
  container: "max-w-7xl mx-auto",
  sectionGrid: "grid lg:grid-cols-2 gap-8 items-center",
  header: {
    container: "md:m-4",
    title: "text-2xl md:text-4xl font-bold text-gray-900 mb-4",
    description: "text-gray-600 mb-6 leading-relaxed",
  },
  buttonStyle: {
    buttonContainer: "mt-8",
    button: "px-8 py-2.5 rounded font-medium transition-all duration-300 flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white"
  },
  featureList: {
    container: "space-y-8",
    wrapper: "flex items-center gap-3",
    iconContainer: "bg-orange-600 rounded-full ",
    icon: "text-gray-200",
    feature: "text-gray-800 font-medium",
    
  },
  rightImage: {
    container: "grid grid-cols-2 gap-2",
    picture: "border-y-4 border-orange-600 rounded-2xl p-4",
    image: "relative w-full h-60 sm:h-64 md:h-72 lg:h-80 xl:h-96 object-cover rounded-xl md:rounded-2xl shadow-lg md:shadow-xl",
  },
  
}

// section: 5
// Holiday special section styles
export const holidaySpecialStyle = {
  section: "py-4 md:py-8 lg:py-12 bg-gray-100",
  container: "px-4 md:px-8 lg:px-12",

  header: {
    container: "text-center mb-10",
    title: "text-2xl md:text-4xl font-bold mb-4",
    description: "text-lg mb-4",
  },

  combo: {
    badge: "inline-block text-sm font-semibold px-3 py-1 rounded-full",
    grid: "grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8",
    card: "relative rounded-2xl overflow-hidden shadow-2xl",
    cardContent: {
      container: "p-6 md:p-8 h-full lg:h-80 flex flex-col relative z-20",
      badgeContainer: "flex items-start justify-between",
      badge: "inline-block border-2 border-gray-200 text-xs font-semibold px-3 py-1 rounded-full",
      rightBadgeText: "text-sm text-gray-50/80",
      
      content: "mt-4",
      title: "text-xl md:text-2xl font-bold text-white",
      listContainer: "mt-3 text-sm text-white/90 space-y-1",
      list: "flex items-start gap-2",
      listIcon: "w-1.5 h-1.5 rounded-full bg-white/90 mt-2",
      listText: "",

      buttonContainer: "mt-auto flex items-center justify-between pt-6",
      button: "inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-3 md:px-8 md:py-4 rounded-full text-sm font-semibold hover:bg-white/90 shadow-sm",

      priceContainer: "text-right text-white/90",
      priceWrapper: "flex items-center ",
      currencyIcon: "w-4 h-4 text-white",
      price: "text-xl font-bold",
      priceSuffix: "text-md text-gray-100 font-bold"

    },

    cardImage: {
      container: "absolute inset-0 pointer-events-none z-0",
      wrapper: "absolute -right-10 transform -translate-y-10 md:-translate-y-20 w-40 h-40 md:w-56 md:h-56 lg:w-75 lg:h-75 rounded-full overflow-hidden shadow-2xl",
      image: "w-full h-full object-cover block",
      picture: ""
    },

    imageOverlay: "absolute inset-0 z-10 pointer-events-none  to-transparent",

    cardTop: "space-y-4",
    cardFooter: "flex items-center justify-between mt-4",
    itemsList: "text-sm text-gray-700 space-y-1",
    ctaBtn: "inline-flex items-center gap-2 bg-white/90 hover:bg-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm",
    imageWrap: "absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-40 h-40 md:w-56 md:h-56 overflow-hidden rounded-full shadow-2xl",
    image: "w-full h-full object-cover",
  },

  mainCombo: {
    container: "bg-emerald-700 rounded p-8 relative overflow-hidden shadow-xl mt-4",
    grid: "grid md:grid-cols-2 gap-6 items-center",
    
    leftContent: {
      container: "px-1 md:px-3 lg:px-6",
      badge: "bg-orange-500 text-white px-4 py-2 inline-block rounded-lg shadow-lg mb-4",
      title: "text-sm font-bold uppercase tracking-wider",
      discount: "text-2xl font-bold",
      description: "text-white text-sm opacity-90 mb-8",
      buttonContainer: "flex gap-3 mb-6",
      buttonLeft: "bg-white text-red-800 font-medium px-8 py-3 rounded flex items-center gap-2  transition-colors cursor-pointer",
      buttonLeftSize: "text-sm font-medium",
      buttonRight: "border-2 border-red-500 text-white px-5 py-3 lg:px-8 lg:py-4 rounded flex items-center gap-2 hover:bg-red-600 transition-colors cursor-pointer font-semibibold",
      buttonRightSize: "text-sm font-medium",
      priceContainer: "text-white",
      icon: "inline-block",
      price: "text-4xl font-bold",
      savings: "text-yellow-300 ml-2 font-bold",
    },
    
    rightCard: {
      cardContainer: "relative",
      card: "bg-white rounded p-4 shadow-2xl",
      cardHeader: "bg-yellow-400 h-10 rounded -mx-4 -mt-4 mb-2 flex items-center justify-center",
      cardHeaderDecoration: "bg-white w-16 h-6 rounded-b-3xl",
      cardTitle: "text-center mb-2",
      cardTitleText: "text-sm font-bold text-red-800",
      picture: "",
      mainImage: "w-full h-62 object-cover rounded-xl mb-2 border-2 border-green-100",
      sideImagesContainer: "flex gap-2",
      sideImage: "w-16 h-16 object-cover rounded-lg border-2 border-green-100"
    }
  },

}