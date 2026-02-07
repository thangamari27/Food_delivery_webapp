import FormHeader from './FormHeader';
import FormFields from './FormFields ';
import SubmitButton from './SubmitButton';

function RightSection({ sectionRight, formData, handleChange, handleSubmit, loading, styles }) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <FormHeader 
          badge={sectionRight.badge} 
          heading={sectionRight.heading} 
          description={sectionRight.description} 
          styles={styles.header} 
        />
        <div className={styles.form.container}>
          <FormFields 
            fields={sectionRight.fields} 
            formData={formData} 
            handleChange={handleChange} 
            styles={styles.form}
          />
          <div className={styles.formButton.buttonContainer}>
            <SubmitButton
              text={sectionRight.submitButton.text}
              bgColor={sectionRight.submitButton.bgColor}
              hoverColor={sectionRight.submitButton.hoverColor}
              icon={sectionRight.submitButton.icon}
              onClick={handleSubmit}
              loading={loading}
              styles={styles.formButton}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightSection