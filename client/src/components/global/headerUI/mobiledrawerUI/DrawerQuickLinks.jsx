import { Info, Briefcase, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

function DrawerQuickLinks({ content, onClose, styles }) {
  return (
    <div className={styles.section}>
        <h3 className={styles.title}>Quick Links</h3>
        {content.map((link, index) => (
        <QuickLink key={index} link={link} onClose={onClose} styles={styles} />
        ))}
    </div>
  )
}

const QuickLink = ({ link, onClose, styles }) => {
  const Icon = link.icon;
  return (
    <Link to={link.href} onClick={onClose} className={styles.actionButton}>
      <Icon className={styles.actionIcon} />
      {link.text}
    </Link>
  );
};

export default DrawerQuickLinks