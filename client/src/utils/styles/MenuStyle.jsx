
// section: 1
export const menuHeroStyle ={
  section: "pt-24 md:pt-24 px-2 sm:px-4 md:px-10 pb-10 bg-gradient-to-br from-orange-50 via-white to-orange-50",

}

// section: 2
export const specialMenuStyle = {
  container: 'min-h-screen bg-gradient-to-b from-orange-50 to-white',
  section: 'max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8',
  heading: 'text-3xl sm:text-4xl font-bold text-gray-900 mb-3',
  subheading: 'text-gray-600 text-sm sm:text-base max-w-2xl',
  
  heroCard: 'bg-gradient-to-br from-amber-400 to-amber-500 rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center text-white shadow-xl hover:shadow-2xl transition-shadow',
  heroImage: 'text-6xl sm:text-7xl mb-4',
  heroTitle: 'text-xl sm:text-2xl font-bold mb-2',
  heroDesc: 'text-xs sm:text-sm opacity-90',
  
  filterButton: 'px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all',
  filterActive: 'bg-amber-500 text-white shadow-md',
  filterInactive: 'bg-white text-gray-700 hover:bg-gray-100',
  
  menuCard: 'bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all relative',
  menuImage: 'text-5xl sm:text-6xl mb-3',
  menuTitle: 'text-base sm:text-lg font-bold text-gray-900 mb-2',
  menuDesc: 'text-xs sm:text-sm text-gray-600 mb-3',
  menuPrice: 'text-xl sm:text-2xl font-bold text-amber-500',
  
  button: 'px-4 sm:px-6 py-2 rounded-full font-medium transition-all',
  buttonPrimary: 'bg-amber-500 text-white hover:bg-amber-600',
  buttonSecondary: 'bg-white text-amber-500 border-2 border-amber-500 hover:bg-amber-50',
  
  badge: 'absolute top-3 right-3 bg-amber-500 text-white rounded-full p-2',
  heartButton: 'absolute top-3 right-3 transition-colors cursor-pointer',
  heartInactive: 'text-gray-300 hover:text-red-500',
  heartActive: 'text-red-500',
  
  categoryButton: 'px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap',
  categoryActive: 'bg-emerald-700 text-white shadow-md',
  categoryInactive: 'bg-gray-100 text-gray-400 hover:bg-gray-200',
  
  todayCard: 'bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all',
  todayImage: 'text-7xl sm:text-8xl p-6 sm:p-8 bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center',
  todayContent: 'p-4 sm:p-6',
  todayTitle: 'text-sm sm:text-base font-bold text-gray-900 mb-2 uppercase',
  todayIngredients: 'text-xs text-gray-600 mb-3',
  todayPrice: 'text-base sm:text-lg font-bold text-emerald-700',
  todayOriginalPrice: 'text-xs sm:text-sm text-gray-400 line-through ml-1',
  
  addButton: 'w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-emerald-700 hover:text-emerald-700 transition-colors cursor-pointer',
  
  pagination: 'flex justify-center items-center gap-2 mt-8',
  pageButton: 'w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-medium transition-all',
  pageActive: 'bg-emerald-700 text-white',
  pageInactive: 'bg-white text-gray-700 hover:bg-gray-100',
  
  notFound: 'text-center py-16 px-4',
  notFoundIcon: 'text-8xl mb-4',
  notFoundTitle: 'text-2xl font-bold text-gray-900 mb-2',
  notFoundText: 'text-gray-600',
  
  scrollContainer: 'flex gap-2 overflow-x-auto pb-2 w-full sm:w-auto scrollbar-hide'
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
    grid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8",
    card: "relative rounded-2xl overflow-hidden shadow-2xl",
    cardContent: {
      container: "p-6 md:p-8 h-full flex flex-col relative z-20",
      badgeContainer: "flex items-start justify-between",
      badge: "inline-block text-xs font-semibold px-3 py-1 rounded-full",
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
      priceSuffix: "text-sm text-white/80"

    },

    cardImage: {
      container: "absolute inset-0 pointer-events-none z-0",
      wrapper: "absolute -right-10 transform -translate-y-10 md:-translate-y-20 w-40 h-40 md:w-56 md:h-56 lg:w-65 lg:h-65 rounded-full overflow-hidden shadow-2xl",
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
