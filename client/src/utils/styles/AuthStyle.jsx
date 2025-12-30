
export const authStyles = {
  section: "min-h-screen px-5 bg-gradient-to-br from-orange-50 via-white to-red-50",
  container: "py-24 md:py-32 flex items-center justify-center",
  
  card: "bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-6",
  
  header: {
    container: "text-center space-y-2",
    title: "text-3xl font-bold text-gray-800",
    subtitle: "text-gray-600 text-sm"
  },
  
  form: {
    container: "space-y-4",
    inputWrapper: "space-y-1",
    input: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition",
    error: "text-red-500 text-xs ml-1",
    checkbox: "w-full flex items-center justify-between space-x-2 text-sm",
    checkboxInput: "w-4 h-4 mr-1 text-orange-500 rounded focus:ring-orange-500",
    rememberMeText: "cursor-pointer mx-2 flex items-center",
  },
  socialButton: {
    container: "space-y-3",
    picture: "",
    image: "h-5 w-5",
    label: "",
    button: {
        primary: "cursor-pointer w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition duration-300 shadow-lg hover:shadow-xl",
        social: "cursor-pointer w-full border border-gray-300 py-2 rounded-lg font-medium hover:bg-gray-50 transition duration-300 flex items-center justify-center space-x-1",
    },
  },
  button: {
    primary: "cursor-pointer w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition duration-300 shadow-lg hover:shadow-xl",
    social: "cursor-pointer w-full border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-50 transition duration-300 flex items-center justify-center space-x-2",
  },
  
  divider: {
    container: "flex items-center space-x-3",
    line: "flex-1 border-t border-gray-300",
    text: "text-gray-500 text-sm"
  },
  
  footer: {
    container: "text-center text-sm text-gray-600",
    link: "cursor-pointer text-orange-500 font-semibold hover:text-orange-600 transition"
  },
  
  link: "cursor-pointer text-orange-500 text-sm hover:text-orange-600 transition"
};