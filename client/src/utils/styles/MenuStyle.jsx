
// section: 1
export const menuHeroStyle ={
  section: "pt-24 md:pt-24 px-2 sm:px-4 md:px-10 pb-10 bg-gradient-to-br from-orange-50 via-white to-orange-50",

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
      wrapper: "absolute -right-10 transform -translate-y-10 md:-translate-y-20 w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden shadow-2xl",
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
