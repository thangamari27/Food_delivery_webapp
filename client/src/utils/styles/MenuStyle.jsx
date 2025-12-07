
// section: 1
// hero section style
export const menuHeroStyle ={
  section: "pt-24 md:pt-24 px-2 sm:px-4 md:px-10 pb-10 bg-gradient-to-br from-orange-50 via-white to-orange-50",
  carousel: {
    heroContainer: {
      container: "relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-2xl",

      slidesContainer: "absolute inset-0 transition-opacity duration-700",
      slideWrapper: "h-full flex items-center justify-between px-8 md:px-16",
      slideContent: "text-white z-10 max-w-md",
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
// Special menu style
export const specialMenuStyle = {
  section: "py-10 md:py-12 lg:py-16 bg-amber-100",
  container: "container mx-auto px-4 md:px-16",

  header: {
    title: "text-3xl sm:text-4xl font-bold text-gray-900 mb-6"
  },
  filterButton: {
    container: "flex space-x-3 overflow-x-auto pb-4 pt-1 mb-8",
    wrapper: "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 shadow-sm",
    noScrollbarStyle:{
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
    },
    activeColorClass: "bg-gray-800 text-white focus:ring-gray-600",
    defaultColorClass: "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50",

    button: "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 shadow-sm",
    buttonHover: "hover:opacity-80 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2",
    focusRing: "focus:ring-gray-300",
  },
  specialMenu:{
    gridContainer: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
    cardContainer: "p-4 rounded-3xl shadow-lg transition-all duration-300 relative",
    cardHighlight: "bg-white border-2 border-orange-400 shadow-orange-200",
    cardHighlightHover: "bg-gray-50 hover:shadow-xl",

    likeButton: "absolute top-6 right-6 p-2 rounded-full bg-white shadow-md hover:scale-105 transition-transform duration-200 z-10",
    likeIcon: "text-gray-300",
    islikeIcon: "text-red-500 fill-red-500",

    imageContainer: "h-40 flex justify-center items-center overflow-hidden mb-3",
    picture: "",
    image: "w-40 h-40 object-cover rounded-full",

    menuContent: "text-left",
    menuTitle: "font-bold text-lg text-gray-900 mb-1",
    menuDescription: "text-gray-500 text-xs mb-4",

    priceContainer: "flex justify-between items-center pt-3 border-t border-gray-100",
    price: "text-xl font-bold text-gray-900",
    icon: "inline-block",

    button: "px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 shadow-md",
    isfeatureButton: "bg-orange-500 text-white hover:bg-orange-600' : 'bg-white text-orange-500 border border-orange-500 hover:bg-orange-50",
    featureButton: "bg-white text-orange-500 border border-orange-500 hover:bg-orange-50",

  },
  notFound: {
    container: "col-span-full py-16 text-center bg-gray-50 rounded-xl m-4 border border-dashed border-gray-300",
    icon: "mx-auto text-gray-400 mb-4",
    title: "text-xl font-semibold text-gray-600",
    description: "text-gray-500",
  },
  pagination: {
    container: "flex justify-center items-center space-x-2 mt-8",
    leftButton: "p-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 hover:bg-gray-200 transition-colors",
    pagebutton: "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
    currentPage: "bg-orange-500 text-white shadow-lg",
    otherPage: 'bg-white text-gray-700 hover:bg-gray-100',
    rightButton: "p-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 hover:bg-gray-200 transition-colors",
    

  }

}

// section: 3
// Top category menu items style
export const topCategoryStyles = {
  section: "bg-gradient-to-b from-orange-50 to-white",
  container: "max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8",

  header: {
    container: "",
    title: "text-3xl sm:text-4xl font-bold text-gray-900 mb-7",
    subTitle: "text-gray-600 text-sm sm:text-base max-w-2xl",
  },

  scrollContainer: {
    base: 'flex gap-2 overflow-x-auto mb-7 pb-2 w-full sm:w-auto scrollbar-hide',
    button: {
      base: 'px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap',
      active: 'bg-emerald-700 text-white shadow-md',
      inactive: 'bg-gray-100 text-gray-400 hover:bg-gray-200'
    }
  },

  topCategoryCard: {
    container: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6",

    cardContainer: 'bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all',
    imageContainer: 'relative w-full overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50',
    picture: "block w-full h-48 sm:h-56 md:h-60 lg:h-54 xl:h-62",
    image: "w-full h-full object-cover transition-transform duration-500 hover:scale-105",

    content: 'p-4 sm:p-6',
    title: 'text-sm sm:text-base font-bold text-gray-900 mb-2 uppercase truncate',
    ingredients: 'text-xs text-gray-600 mb-3',
    priceContainer: "flex items-center justify-between",
    priceWrapper: "",
    priceTitle: "",
    price: 'text-base sm:text-lg font-bold text-emerald-700',
    originalPrice: 'text-xs sm:text-sm text-gray-400 line-through ml-1',
    
    addButton: 'w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 hover:bg-emerald-100 hover:border-emerald-300 transition-colors duration-200 cursor-pointer active:scale-95',
    
    // Icon styles
    icon: "w-4 h-4 sm:w-5 sm:h-5",
  },

  pagination: {
    container: "flex justify-center items-center gap-2 mt-8",
    button: {
      base: "w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-medium transition-all",
      active: "bg-emerald-700 text-white",
      inactive: "bg-white text-gray-700 hover:bg-gray-100"
    },
    icon: {
      size: 20
    }
  },

  notFound: {
    container: 'text-center py-16 px-4 bg-gray-100 rounded',
    iconContainer: 'text-center mb-4',
    icon: "inline-block text-4xl",
    title: 'text-2xl font-bold text-gray-900 mb-2',
    text: 'text-gray-600'
  }

}

// section: 4
// Combo section styles
export const comboStyles = {
  section: "py-12 bg-white",
  container: "container mx-auto px-4 md:px-16",
  header: {
    container: "text-center mb-8",
    title: "text-sm font-semibold text-orange-500 uppercase tracking-wide",
    subTitle: "text-1xl md:text-3xl font-bold text-gray-900 mt-2",
    description: "text-gray-600 max-w-2xl mx-auto mt-3",
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
      button: "inline-flex items-center gap-2 bg-white text-orange-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/90 shadow-sm",

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
};
