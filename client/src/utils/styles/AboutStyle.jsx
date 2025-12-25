// Section: 1
// about page hero section styles
export const heroSectionStyle = {
  hero: {
    section: "relative bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 rounded-3xl overflow-hidden py-12 md:pt-16",
    container: "relative z-10 px-6 sm:px-8 md:px-16 py-12 md:py-16 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 rounded",
    left: "w-full lg:w-1/2",
    right: "w-full  lg:w-1/2 flex items-center justify-center hidden lg:flex",
    badge: "inline-block text-gray-900 text-sm font-bold tracking-wide mb-2 border border-3 border-orange-500 p-3 rounded-full",
    title: "text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight",
    description: "text-gray-600 text-base sm:text-lg md:text-lg max-w-xl mb-6 leading-relaxed",
    button: "bg-orange-500 rounded text-white px-8 py-3 rounded text-base sm:text-lg font-semibold hover:bg-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block",
    pictureStyle: "w-82 h-82 md:w-120 md:h-120 w-full rounded-full overflow-hidden shadow-xl",
    imageStyle: "w-full h-full object-cover",
    highlightsList: "space-y-3 mb-8",
    highlightItem: "flex items-center gap-3 text-gray-700",
    highlightIcon: "w-5 h-5 text-orange-500"
  },
};

// Section: 2
// Achievement section styles
export const achievementStyle = {
  section: "",
  container: "bg-gradient-to-r from-gray-900 to-gray-800 p-12 shadow-2xl",
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8",
  item: "text-center",
  iconContainer: "w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4",
  icon: "w-8 h-8 text-orange-500",
  number: "text-4xl md:text-5xl font-bold text-white mb-2",
  label: "text-white/80 text-sm md:text-base",
};

// Section: 3
// why choose us section styles 
export const whyChooseUsStyle = {
  whyChooseUs: {
    section: "",
    container: "mt-10 bg-gradient-to-r from-orange-500 to-red-500 p-12 shadow-2xl",
    header: "text-center mb-12",
    badge: "text-white/90 text-sm md:text-base mb-2 uppercase tracking-wide font-semibold",
    title: "text-4xl md:text-5xl font-bold text-white mb-4",
    grid: "grid md:grid-cols-2 lg:grid-cols-4 gap-6",
    featureCard: "bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20",
    iconContainer: "w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mb-4",
    icon: "w-7 h-7 text-white",
    featureTitle: "text-xl font-bold text-white mb-2",
    featureDescription: "text-white/90 text-sm"
  },

  stats: {
    container: "bg-gradient-to-r from-gray-900 to-gray-800 p-12 shadow-2xl",
    grid: "grid grid-cols-2 lg:grid-cols-4 gap-8",
    item: "text-center",
    iconContainer: "w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4",
    icon: "w-8 h-8 text-orange-500",
    number: "text-4xl md:text-5xl font-bold text-white mb-2",
    label: "text-white/80 text-sm md:text-base"
  }
}

// Section: 4
// quality commitment section styles
export const qualityCommitmentStyle = {
    qualitySection: {
        section: "py-16 md:py-24 bg-white",
        container: "container mx-auto px-4 md:px-16 lg:px-24 xl:px-32",
        title: "text-center text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-8",
        description: "text-gray-600 text-lg text-center mb-10",
        grid: {
            gridWrapper: "grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12",
        },
        qualityWrapper: {
            wrapper: "flex flex-col items-center text-center space-y-4 p-6 rounded-lg transition-all duration-300 group",
            imageContainer: "w-35 h-35 flex items-center justify-center bg-gray-100 rounded-full group-hover:bg-orange-50 transition-colors duration-300",
            contentContainer: "space-y-3",
        },
    },
}

// Section: 5
// behind scene section styles
export const behindScenseStyle = {
  section: "py-12 bg-amber-50",
  container: "mb-20 px-6 md:px-12",
  header: "text-center mb-12",
  badge: "text-orange-500 text-sm md:text-xl mb-2 uppercase tracking-wide font-semibold",
  title: "text-4xl md:text-5xl font-bold text-gray-900 mb-4",
  description: "text-gray-600 text-lg",
  content: "grid md:grid-cols-1 lg:grid-cols-2 gap-6",
  imageContainer: "rounded-2xl overflow-hidden shadow-2xl",
  mainImage: "w-full h-110 object-fill",
  behindScenseList: "space-y-4",
  behindScenseItem: "flex items-start gap-4 bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100",
  iconContainer: "w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl",
  behindScenseContainer: "flex-1",
  behindScenseName: "text-lg font-bold text-gray-900 mb-1",
  behindScenseDescription: "text-gray-600 text-sm"
}