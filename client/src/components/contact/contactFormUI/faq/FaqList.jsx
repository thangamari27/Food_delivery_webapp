import { useState } from 'react'

function FaqList({ faqData, styles }) {
  const [openIndex, setOpenIndex] = useState(null)
    
  return (
    <>
        {faqData.map((faq, index) => (
            <div className={styles.container} key={index} onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                <div className={styles.wrapper}>
                    <h3 className={styles.listTitle}>
                        {faq.question}
                    </h3>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${openIndex === index ? "rotate-180" : ""} transition-all duration-500 ease-in-out`}>
                        <path d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2" stroke="#1D293D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <p className={`${styles.listDescription} ${openIndex === index ? "opacity-100 max-h-[300px] translate-y-0 pt-4" : "opacity-0 max-h-0 -translate-y-2"}`} >
                    {faq.answer}
                </p>
            </div>
        ))}
    </>
  )
}

export default FaqList