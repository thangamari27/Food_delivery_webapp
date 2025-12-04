
// section: 1
// conatct page Hero section styles
export const heroStyle = {
    section: "py-20 md:py-16 lg:py-32 bg-gradient-to-br from-orange-50 via-white to-orange-50",
    container: "container mx-auto px-4 md:px-16 lg:px-24 xl:px-32",
    header: {
        container: "text-center",
        title: "text-gray-600 text-sm md:text-base mb-2 uppercase tracking-wide",
        subTitle: "text-4xl md:text-5xl font-bold text-gray-900 mb-4",
        description: "text-gray-600 max-w-3xl mx-auto text-base md:text-lg",
        paragraph: "text-gray-600 max-w-3xl mx-auto text-base md:text-lg",
    }
}


// section: 2
// conatct page FAQ section styles
export const contactFormStyles = {
    section: "py-20 md:py-12 lg:py-26 bg-gray-50",
    container: "max-w-6xl mx-auto flex flex-col md:flex-row items-stretch justify-center gap-8 lg:gap-12 px-4 md:px-6",
    contactForm: {
        leftImage: {
            container: "w-full md:w-1/2 lg:w-auto flex-shrink-0 hidden lg:block",
            picture: "",
            image: "max-w-sm w-full rounded-xl h-full shadow-lg object-cover",
        },
        rightForm: {
            container: "w-full md:w-1/2 lg:flex-1",
            wrapper: "flex flex-col items-center md:items-start text-sm text-slate-800",
            header: {
                container: "text-center mb-10",
                badge: "text w-32 font-medium px-1 py-2 rounded-full",
                title: "text-4xl text-left font-bold py-4",
                description: "max-md:text-sm text-gray-500",
            },
            form:{
               container: "max-w-[384px] md:max-w-[550px] w-full px-4",
               formContainer: "w-full",
               grid: "grid grid-cols-1 gap-4 md:grid-cols-2",               

            },
            formButton: {
                buttonContainer: "mt-5",
                button: "flex items-center justify-center gap-2 text-white py-2.5 w-full rounded-full transition-colors",
            }
        },
    }
}

// section: 3
// conatct page constact form section styles
export  const faqStyles = {
    section: "py-20 md:py-16 lg:py-32 bg-gray-200",
    container: "container mx-auto px-4 md:px-16 lg:px-24 xl:px-32",
    wrapper: "max-w-xl mx-auto flex flex-col items-center justify-center px-4 md:px-0",
    header: {
        title: "text-orange-600 text-sm font-medium",
        subTitle: "text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 text-center",
        description: "text-sm text-slate-500 mt-2 pb-8 text-center",
    },
    faqList: {
       container: "border-b border-slate-200 py-4 cursor-pointer w-full",
       wrapper: "flex items-center justify-between",
       listTitle: "text-sm font-medium md:text-lg md:font-medium",
       listDescription: "text-sm md:text-xl text-slate-700 transition-all duration-500 ease-in-out max-w-md", 
    }
}