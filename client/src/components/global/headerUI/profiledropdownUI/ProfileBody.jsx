import { Link } from "react-router-dom";

function ProfileBody({ title, items, isClose, actionHandlers, isOpen, isLink = false, styles }) {
  return (
    <div className={styles.container}>
        <h3 className={styles.title}>{title}</h3>
        {items.map((item, index) => (
        <ProfileItem
            key={index}
            item={item}
            isClose={isClose}
            actionHandlers={actionHandlers}
            isLink={isLink}
            styles={styles}
        />
        ))}
    </div>
  )
}

const ProfileItem = ({ item, isClose, actionHandlers, isLink, styles }) => {
  const Icon = item.icon;
  
  if (isLink) {
    return (
      <Link to={item.href} onClick={isClose} className={styles.link}>
        <Icon className={styles.icon} />
        <span className={styles.text}>{item.text}</span>
      </Link>
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