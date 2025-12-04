import FormHeader from './FormHeader';
import FormFields from './FormFields ';
import SubmitButton from './SubmitButton';

function RightSection({ sectionRight, formData, handleChange, handleSubmit }) {
  return (
    <div className="w-full md:w-1/2 lg:flex-1">
      <div className="flex flex-col items-center md:items-start text-sm text-slate-800">
        <FormHeader badge={sectionRight.badge} heading={sectionRight.heading} description={sectionRight.description} />
        <div className="max-w-[384px] md:max-w-[550px] w-full px-4">
          <FormFields fields={sectionRight.fields} formData={formData} handleChange={handleChange} />
          <div className="mt-5">
            <SubmitButton
              text={sectionRight.submitButton.text}
              bgColor={sectionRight.submitButton.bgColor}
              hoverColor={sectionRight.submitButton.hoverColor}
              icon={sectionRight.submitButton.icon}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightSection