function ProcessStepNumber({ step, icon, styles }) {
    return (
        <div className={styles.processStepNumber}>
            <span className={styles.processStepIcon}>{icon}</span>
            {step}
        </div>
    );
}

export default ProcessStepNumber;