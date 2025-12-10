import FeaturesList from './FeaturesList';

function ProcessDetails({ process, isOpen, styles }) {
    return (
        <div className={`${styles.processDetails} ${
            isOpen ? styles.processDetailsOpen : styles.processDetailsClosed
        }`}>
            <FeaturesList features={process.features} styles={styles} />
            
            {process.details && (
                <AdditionalDetails details={process.details} styles={styles} />
            )}
        </div>
    );
}

function AdditionalDetails({ details, styles }) {
    return (
        <div className={styles.additionalDetails}>
            {details}
        </div>
    );
}

export default ProcessDetails;