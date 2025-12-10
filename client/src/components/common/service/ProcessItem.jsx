import { useState } from 'react';
import ProcessHeader from './ProcessHeader';
import ProcessDetails from './ProcessDetails';

function ProcessItem({ process, index, isOpen, onToggle, styles }) {
    return (
        <div 
            className={styles.processItem}
            onClick={() => onToggle(index)}
        >
            <ProcessHeader 
                process={process}
                isOpen={isOpen}
                styles={styles}
            />
            
            <ProcessDetails 
                process={process}
                isOpen={isOpen}
                styles={styles}
            />
        </div>
    );
}

export default ProcessItem;