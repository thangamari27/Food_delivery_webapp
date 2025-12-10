import { useState } from 'react';
import ProcessItem from './ProcessItem';

function ServiceList({ serviceList, styles }) {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleProcess = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className={styles.processSection}>
            {serviceList.map((process, index) => (
                <ProcessItem
                    key={index}
                    process={process}
                    index={index}
                    isOpen={openIndex === index}
                    onToggle={toggleProcess}
                    styles={styles}
                />
            ))}
        </div>
    );
}

export default ServiceList;