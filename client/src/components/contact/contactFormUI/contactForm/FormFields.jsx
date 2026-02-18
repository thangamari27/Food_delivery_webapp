import InputField from './InputField';
import TextareaField from './TextareaField';

function FormFields ({ fields = [], formData = {}, handleChange, styles }) {
  return (
    <form className={styles.formContainer} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.grid}>
        {fields.map((f) => {
          const isFull = f.type === 'textarea';
          const value = formData[f.id] ?? '';
          return (
            <div key={f.id} className={isFull ? 'md:col-span-2' : 'md:col-span-1'}>
              {f.type === 'textarea' ? (
                <TextareaField id={f.id} label={f.label} placeholder={f.placeholder} requiredField={f.requiredField} required={f.required} rows={f.rows} value={value} onChange={handleChange} />
              ) : f.type === 'select' ? (
                <label className="block mb-2">
                  <div className="mb-2 font-medium text-slate-700">{f.label}{f.required && <span className="ml-2 text-xs text-red-500">{f.requiredField}</span>}</div>
                  <select name={f.id} id={f.id} value={value} onChange={handleChange} className="block w-full rounded-md border border-gray-300  outline-none target:outline-none px-3 py-2 text-sm">
                    {(f.options || []).map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                  </select>
                </label>
              ) : (
                <InputField id={f.id} label={f.label} type={f.type} placeholder={f.placeholder} requiredField={f.requiredField} required={f.required} icon={f.icon} value={value} onChange={handleChange} />
              )}
            </div>
          );
        })}
      </div>
    </form>
  );
}

export default FormFields 