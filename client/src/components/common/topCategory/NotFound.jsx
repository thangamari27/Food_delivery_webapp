import React from 'react';

const NotFound = ({ content, styles }) => {
  const IconComponent = content.icon;
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <IconComponent className={styles.icon} />
      </div>
      <h3 className={styles.title}>{content.title}</h3>
      <p className={styles.text}>
        {content.description}
      </p>
    </div>
  );
};

export default NotFound;