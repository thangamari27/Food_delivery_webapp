import ProcessStepNumber from './ProcessStepNumber';
import ToggleIcon from './ToggleIcon';

function ProcessHeader({ process, isOpen, styles }) {
    return (
        <div className={styles.processHeader}>
            <div className={styles.processStepContainer}>
                <ProcessStepNumber 
                    step={process.step}
                    icon={process.icon}
                    styles={styles}
                />
                
                <div className={styles.processContent}>
                    <div className={styles.processSubtitle}>
                        {process.subtitle}
                    </div>
                    <h3 className={styles.processMainTitle}>
                        {process.title}
                    </h3>
                    <p className={styles.processDescriptionShort}>
                        {process.description}
                    </p>
                </div>
            </div>
            
            <ToggleIcon isOpen={isOpen} styles={styles} />
        </div>
    );
}

export default ProcessHeader;