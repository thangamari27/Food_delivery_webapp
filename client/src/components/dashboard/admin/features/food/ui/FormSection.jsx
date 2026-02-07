import React from 'react';

function FormSection({ title, children, styles }) {
  return (
    <div className="space-y-4">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
          {title}
        </h3>
      )}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

export default FormSection;