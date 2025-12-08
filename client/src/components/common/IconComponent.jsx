import React from 'react';

function IconComponent({ Icon, className }) {
  return Icon ? <Icon className={className} /> : null;
}

export default IconComponent;