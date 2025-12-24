// section: 1
// Menu hero section style
export const menuHeroStyle ={
  section: "pt-24 md:pt-24 px-2 sm:px-4 md:px-10 pb-10 bg-gradient-to-br from-orange-50 via-white to-orange-50",
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
// Special menu style
export const specialMenuStyle = {
  section: "py-10 md:py-12 lg:py-16 bg-amber-100",
  container: "container mx-auto px-4 md:px-16",

  header: {
    title: "text-3xl sm:text-4xl font-bold text-gray-900 mb-6"
  },
  filterButton: {
    container: "flex space-x-3 overflow-x-auto pb-4 pt-1 mb-8",
    wrapper: "px-5 py-2 text-sm font-medium  transition-all duration-200 shadow-sm",
    noScrollbarStyle:{
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
    },
    activeColorClass: "rounded-tl-xl rounded-br-xl bg-amber-500 text-white",
    defaultColorClass: "rounded-tl-xl rounded-br-xl border-2 border-amber-400 bg-white text-gray-800",

    button: " px-4 py-2 text-sm font-medium transition-all duration-200 shadow-sm",
    buttonHover: "cursor-pointer hover:opacity-90 active:scale-[0.98] ",
    focusRing: "",
  },
  specialMenu:{
    gridContainer: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
    cardContainer: "p-4 rounded-3xl shadow-lg transition-all duration-300 relative",
    cardHighlight: "bg-white border-2 border-orange-400 shadow-orange-200",
    cardHighlightHover: "bg-gray-50 hover:shadow-xl",

    likeButton: "cursor-pointer absolute top-6 right-6 p-2 rounded-full bg-white shadow-md hover:scale-105 transition-transform duration-200 z-10",
    likeIcon: "text-gray-300",
    islikeIcon: "text-red-500 fill-red-500",

    imageContainer: "h-40 flex justify-center items-center overflow-hidden mb-3",
    picture: "",
    image: "w-40 h-40 object-cover rounded-full",

    menuContent: "text-left",
    menuTitle: "font-bold text-lg text-gray-900 mb-1",
    menuDescription: "text-gray-500 text-xs mb-4",

    priceContainer: "mb-4 flex justify-between items-center gap-2 pt-4 border-t border-gray-100",
    price: "text-xl font-bold text-gray-900",
    icon: "inline-block",

    button1: "flex-1 px-4 py-3 border-2 border-amber-400  text-sm font-semibold rounded transition-scale delay-150 duration-300 ease-in-out hover:-translate-y-1 shadow-md",
    button2: "flex-1 px-4 py-3 bg-amber-400 border-2 border-amber-400 hover: text-gray-50 text-sm font-semibold rounded transition-scale delay-150 duration-300 ease-in-out hover:-translate-y-1 shadow-md",
    isfeatureButton: "text-white hover:bg-orange-600' : 'bg-white text-orange-500 border border-orange-500 hover:bg-orange-50",
    featureButton: "bg-white text-orange-500 border border-orange-500 hover:bg-orange-50",

    viewModal:{
      container: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-slideDown",
      wrapper: "mx-4 bg-white rounded-2xl max-w-md w-full relative",
      btnClose: "absolute top-4 right-4 p-2 rounded-full bg-yellow-400",
      iconClose: "cursor-pointer w-6 h-6",
      imageContainer: "mb-6",
      image: "w-full h-50 lg:h-75 object-cover rounded-xl",
      picture: "",

      contentContainer: "space-y-4 p-6",
      title: "text-2xl font-bold text-gray-900",
      badge: "text-gray-600 font-semibold text-sm mt-2 border-1 border-orange-400 rounded-full inline-block px-4 py-1",
      description: "text-gray-600 ",
      priceContainer: "flex items-center justify-between",
      priceWrapper: "flex items-center",
      priceIcon: "w-6 h-6 text-gray-900",
      price: "text-2xl font-bold text-gray-900 ",

      btnContainer: "flex space-x-3",
      btn: "px-6 py-3 bg-amber-400 text-gray-900 font-semibold rounded-lg hover:bg-amber-500",

    },
  },
  notFound: {
    container: "col-span-full py-16 text-center bg-gray-50 rounded-xl m-4 border border-dashed border-gray-300",
    icon: "mx-auto text-gray-400 mb-4",
    title: "text-xl font-semibold text-gray-600",
    description: "text-gray-500",
  },
  pagination: {
    container: "flex justify-center items-center space-x-2 mt-8",
    leftButton: "cursor-pointer p-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 hover:bg-gray-200 transition-colors",
    pagebutton: "cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-colors",
    currentPage: "bg-amber-500 text-white shadow-lg",
    otherPage: 'bg-white text-gray-700 hover:bg-gray-100',
    rightButton: "cursor-pointer p-2 rounded-lg bg-gray-100 text-gray-700 disabled:opacity-50 hover:bg-gray-200 transition-colors",   
  },

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
      base: 'cursor-pointer px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm font-semibold transition-all whitespace-nowrap',
      active: 'bg-emerald-700 text-white shadow-md',
      inactive: 'border-2 border-emerald-600 bg-amber-50 text-gray-800 hover:bg-amber-100'
    }
  },

  topCategoryCard: {
    container: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6",

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
    priceIcon: "inline-block",
    originalPrice: 'text-xs sm:text-sm text-gray-400 line-through ml-1',
    originalPriceIcon: "h-4 w-4",

    buttonContainer: "w-full mt-4 flex items-center gap-1",
    addButton1: 'cursor-pointer flex-1 px-2 py-2 rounded bg-emerald-50 border-2 border-emerald-700 flex items-center justify-center text-emerald-700  transition-colors duration-200 cursor-pointer active:scale-95',
    addButton2: 'cursor-pointer flex-1 px-2 py-2 rounded bg-emerald-50 border-2 border-emerald-700 flex items-center justify-center bg-emerald-700 text-gray-100  transition-colors duration-200 cursor-pointer active:scale-95',
    buttonText: "ml-2",
    buttonIcon1: "w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-emerald-800",
    buttonIcon2: "w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-gray-50",

    likeButton: "bg-gray-50 p-2 rounded-full absolute top-6 right-8 z-10",
    likeActive: "fill-amber-500 text-amber-500",
    likeInactive: "text-gray-400",

    modal: {
      backdrop: "fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm transition-all duration-300",
      container: "bg-white rounded-2xl max-w-4xl w-full mx-auto overflow-hidden",
      closeButton: "absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg",
      imageSection: "lg:w-1/2 p-8 bg-gray-50 flex items-center justify-center",
      contentSection: "lg:w-1/2 p-8 overflow-y-auto",
      title: "text-3xl font-bold text-gray-900 mb-2",
      price: "text-3xl font-bold text-gray-900",
      originalPrice: "text-lg text-gray-400 line-through",
      discountBadge: "bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold",
      actionButton: "px-8 py-3 bg-amber-400 text-gray-900 font-bold rounded-lg hover:bg-amber-500",
    }
  },

  pagination: {
    container: "flex justify-center items-center gap-2 mt-8",
    button: {
      base: "cursor-pointer w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-medium transition-all",
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
  section: "py-12 bg-amber-50",
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
    ctaBtn: "inline-flex items-center gap-2 bg-white/90 hover:bg-white px-6 py-3 rounded-full text-sm font-semibold shadow-sm",
    imageWrap: "absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-40 h-40 md:w-56 md:h-56 overflow-hidden rounded-full shadow-2xl",
    image: "w-full h-full object-cover",
  },
};
