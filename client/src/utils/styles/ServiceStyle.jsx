// section: 1
// Service page hero section styles
export const serviceHeroStyles = {
    section: "pt-16 md:pt-22 px-2 sm:px-4 md:px-6 pb-10 bg-gradient-to-br from-orange-50 via-white to-orange-50",
    container: "max-w-7xl mx-auto px-6 py-8 lg:py-12",
    grid: "grid lg:grid-cols-2 gap-10 items-center",
    leftStyle: {
        container: "",
        title: "text-3xl md:4xl lg:5xl font-bold mb-2",
        description: "text-md lg:text-lg text-gray-600 mb-8",
        buttonContainer: {
            container: "mt-8 flex flex-wrap gap-3",
            primarybtn: "inline-flex items-center px-5 py-3 bg-orange-500 text-white rounded shadow hover:bg-orange-600",
            secondarybtn: "inline-flex items-center  px-5 py-3 border-2 border-orange-500 rounded hover:bg-orange-200",

        },
        reviews: {
            container: "mt-8 flex items-center gap-4  text-sm text-gray-500",
            wrapper: "md:mt-2",
            icon: "mr-2 text-orange-600 md:inline-block",
            title: "font-medium",
        },
    },
    rightStyle: {
        container: "",
        picture: "",
        image: "relative w-full h-60 sm:h-64 md:h-102 lg:h-80 xl:h-96 sm:oject-cover md:object-fill lg:object-cover rounded-xl md:rounded-2xl shadow-lg md:shadow-xl"
    }
}

// section: 2
// Service page hero section styles
export const serviceDeliveryStyles = {
    section: "pt-8 md:pt-12 px-2 sm:px-4 md:px-6 pb-10 bg-orange-50",
    container: "max-w-7xl mx-auto px-6 py-4 lg:py-8",
    grid: "grid lg:grid-cols-5  gap-10",
    
    header: {
        container: "text-left mb-16",
        title: "text-orange-500 text-4xl md:5xl lg:6xl font-bold mb-2",
        description: "text-md lg:text-lg text-gray-600 mb-8",
    },

    // Carousel Styles
    carouselContainer: "flex flex-col items-center h-full lg:col-span-2 lg:h-[600px] ",
    carouselWrapper: "w-full h-full overflow-hidden relative rounded-xl shadow-lg",
    carouselSlider: "flex transition-transform duration-500 ease-in-out h-full",
    carouselSlide: "w-full flex-shrink-0 h-full object-cover",
    carouselDots: "flex items-center mt-5 space-x-2",
    carouselDot: "w-3 h-3 bg-black/20 rounded-full transition-all duration-300 cursor-pointer",
    carouselDotActive: "w-4 h-4 bg-black",
    
    // FAQ Section Styles
    processSection: "space-y-4 lg:col-span-3",
    processTitle: "text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 lg:mb-3",
    processDescription: "text-sm sm:text-base text-gray-600 mb-2 lg:mb-4",
    
    // Process Item Styles
    processItem: "bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5 lg:p-6 cursor-pointer transition-all duration-300 hover:shadow-md hover:border-gray-300",
    processHeader: "flex justify-between items-start gap-4",
    processStepContainer: "flex items-start gap-4",
    processStepNumber: "flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm sm:text-base font-bold",
    processStepIcon: "text-2xl mr-2",
    processContent: "flex-1",
    processMainTitle: "text-base sm:text-lg font-bold text-gray-900",
    processSubtitle: "text-sm sm:text-base text-orange-600 font-medium mb-1",
    processDescriptionShort: "text-sm text-gray-600 mb-2",
    
    // Process Details (Expandable)
    processDetails: "text-gray-600 overflow-hidden transition-all duration-500 ease-in-out leading-relaxed",
    processDetailsOpen: "opacity-100 max-h-[800px] translate-y-0 pl-3",
    processDetailsClosed: "opacity-0 max-h-0 -translate-y-2",
    
    // Features List
    featuresList: "mt-4 space-y-2",
    featureItem: "flex items-start gap-2 text-sm text-gray-700",
    featureDot: "w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0",
    
    // Icons
    iconContainer: "flex-shrink-0 mt-1",
    iconPlus: "transition-all duration-500 ease-in-out text-gray-600",
    iconMinus: "transition-all duration-500 ease-in-out text-gray-600",
    
    // Additional Details
    additionalDetails: "mt-3 pt-3 border-t border-gray-100 text-sm text-gray-500 italic"
}

// section: 3
// Catering Service section styles 
export const serviceCateringStyles = {
    section: "pt-8 md:pt-12 px-2 sm:px-4 md:px-6 pb-10 bg-orange-50",
    container: "max-w-7xl mx-auto px-6 py-4 lg:py-8",
    grid: "grid lg:grid-cols-5  gap-10",
    
    header: {
        container: "md:text-right mb-16",
        title: "text-orange-500 text-4xl md:5xl lg:6xl font-bold mb-2",
        description: "text-md lg:text-lg text-gray-600 mb-8",
    },

    // Carousel Styles
    carouselContainer: "flex flex-col items-center h-full lg:col-span-2 lg:h-[600px] ",
    carouselWrapper: "w-full h-full overflow-hidden relative rounded-xl shadow-lg",
    carouselSlider: "flex transition-transform duration-500 ease-in-out h-full",
    carouselSlide: "w-full flex-shrink-0 h-full object-cover",
    carouselDots: "flex items-center mt-5 space-x-2",
    carouselDot: "w-3 h-3 bg-black/20 rounded-full transition-all duration-300 cursor-pointer",
    carouselDotActive: "w-4 h-4 bg-black",
    
    // FAQ Section Styles
    processSection: "space-y-4 lg:col-span-3",
    processTitle: "text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 lg:mb-3",
    processDescription: "text-sm sm:text-base text-gray-600 mb-2 lg:mb-4",
    
    // Process Item Styles
    processItem: "bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5 lg:p-6 cursor-pointer transition-all duration-300 hover:shadow-md hover:border-gray-300",
    processHeader: "flex justify-between items-start gap-4",
    processStepContainer: "flex items-start gap-4",
    processStepNumber: "flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm sm:text-base font-bold",
    processStepIcon: "text-2xl mr-2",
    processContent: "flex-1",
    processMainTitle: "text-base sm:text-lg font-bold text-gray-900",
    processSubtitle: "text-sm sm:text-base text-orange-600 font-medium mb-1",
    processDescriptionShort: "text-sm text-gray-600 mb-2",
    
    // Process Details (Expandable)
    processDetails: "text-gray-600 overflow-hidden transition-all duration-500 ease-in-out leading-relaxed",
    processDetailsOpen: "opacity-100 max-h-[800px] translate-y-0 pl-3",
    processDetailsClosed: "opacity-0 max-h-0 -translate-y-2",
    
    // Features List
    featuresList: "mt-4 space-y-2",
    featureItem: "flex items-start gap-2 text-sm text-gray-700",
    featureDot: "w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0",
    
    // Icons
    iconContainer: "flex-shrink-0 mt-1",
    iconPlus: "transition-all duration-500 ease-in-out text-gray-600",
    iconMinus: "transition-all duration-500 ease-in-out text-gray-600",
    
    // Additional Details
    additionalDetails: "mt-3 pt-3 border-t border-gray-100 text-sm text-gray-500 italic"
}

// section: 4
// Pickup/Takeaway section styles 
export const pickTakeawayStyles = {
  section: "py-16 md:py-24 bg-white",
  container: "container mx-auto px-4 md:px-16 lg:px-24 xl:px-32",
  
  stepHeader: {
    container: "text-center mb-16",
    title: "text-orange-500 text-sm md:text-base mb-2 uppercase tracking-wide",
    subTitle: "text-4xl md:text-5xl font-bold text-gray-900 mb-4",
    description: "text-gray-600 max-w-3xl mx-auto text-base md:text-lg",
  },
  
  howItWorksFlex: {
    wrapper: "flex flex-col items-center text-center space-y-4 p-6 rounded-xl transition-all duration-300 group hover:shadow-lg hover:border hover:border-orange-100 bg-white border border-gray-100",
    imageContainer: "w-24 h-24 flex items-center justify-center bg-orange-50 rounded-full group-hover:bg-orange-100 transition-colors duration-300 p-4",
    contentContainer: "space-y-3",
  },
  
  // Updated for 4-column grid
  howItWorksGrid: {
    gridWrapper: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8",
  },
  
}

// section: 5
// Pricing plan and table section styles 
export const pricingStyles = {
    section: 'bg-gradient-to-br from-orange-50 via-white to-red-50 py-12 px-4 sm:px-6 lg:px-8',
    container: 'max-w-7xl mx-auto',
    header: 'text-center mb-12',
    title: 'text-4xl md:text-5xl font-bold text-gray-900 mb-4',
    subtitle: 'text-lg md:text-xl text-gray-600',
    
    periodToggle: 'flex justify-center gap-2 mb-12 flex-wrap',
    periodBtn: 'px-6 py-3 rounded-full font-semibold transition-all duration-300',
    periodBtnActive: 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-105',
    periodBtnInactive: 'bg-white text-gray-700 hover:bg-gray-50 shadow',
    
    plansGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16',
    planCard: 'bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl relative',
    popularBadge: 'absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg',
    planName: 'text-2xl font-bold text-gray-900 mb-2',
    priceContainer: 'mb-6',
    priceWrapper: "",
    price: 'text-4xl font-bold text-gray-900',
    period: 'text-gray-600 text-lg',
    savings: 'inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mt-2',
    priceIcon: "inline-block",
    icon: "inline-block",

    featuresList: 'h-104 space-y-4 my-8',
    feature: 'flex items-start gap-3',
    checkIcon: 'text-green-500 flex-shrink-0 mt-1',
    featureText: 'text-gray-700',
    
    btn: 'w-full py-4 rounded-xl font-bold text-lg transition-all duration-300',
    btnPrimary: 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl',
    btnSecondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    
    comparisonSection: 'mt-16',
    comparisonTitle: 'text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8',
    table: 'w-full bg-white rounded-2xl shadow-xl overflow-hidden',
    tableWrapper: 'overflow-x-auto',
    thead: 'bg-gradient-to-r from-orange-500 to-red-500',
    th: 'px-6 py-4 text-left text-white font-bold',
    thFirst: 'px-6 py-4 text-left text-white font-bold text-lg',
    tr: 'border-b border-gray-200 hover:bg-gray-50 transition-colors',
    td: 'px-6 py-4 text-gray-700',
    tdFirst: 'px-6 py-4 font-semibold text-gray-900',
    iconPositive: "inline-flex items-center justify-center text-green-600",
    iconNegative: "inline-flex items-center justify-center text-red-500",
    textMuted: "text-gray-600",
}