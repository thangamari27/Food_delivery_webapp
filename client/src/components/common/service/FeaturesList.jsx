function FeaturesList({ features, styles }) {
    if (!features || features.length === 0) return null;
    
    return (
        <ul className={styles.featuresList}>
            {features.map((feature, index) => (
                <FeatureItem key={index} feature={feature} styles={styles} />
            ))}
        </ul>
    );
}

function FeatureItem({ feature, styles }) {
    return (
        <li className={styles.featureItem}>
            <span className={styles.featureDot}></span>
            <span>{feature}</span>
        </li>
    );
}

export default FeaturesList;