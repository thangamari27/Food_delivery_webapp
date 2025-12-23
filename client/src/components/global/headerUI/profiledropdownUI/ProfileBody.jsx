

function ProfileBody({ title, items, actionHandlers, isLink = false, styles }) {
  return (
    <div className={styles.container}>
        <h3 className={styles.title}>{title}</h3>
        {items.map((item, index) => (
        <ProfileItem
            key={index}
            item={item}
            actionHandlers={actionHandlers}
            isLink={isLink}
            styles={styles}
        />
        ))}
    </div>
  )
}

const ProfileItem = ({ item, actionHandlers, isLink, styles }) => {
  const Icon = item.icon;
  
  if (isLink) {
    return (
      <a href={item.href} className={styles.link}>
        <Icon className={styles.icon} />
        <span className={styles.text}>{item.text}</span>
      </a>
    );
  }
  
  return (
    <button
      onClick={actionHandlers[item.onClickKey]}
      className={styles.button}
    >
      <Icon className={styles.icon} />
      <span className={styles.text}>{item.text}</span>
    </button>
  );
};

export default ProfileBody