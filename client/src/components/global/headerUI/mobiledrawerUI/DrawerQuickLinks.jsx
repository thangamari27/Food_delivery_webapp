import { Info, Briefcase, Phone } from 'lucide-react';

function DrawerQuickLinks({ content, styles }) {
  return (
    <div className={styles.section}>
        <h3 className={styles.title}>Quick Links</h3>
        {content.map((link, index) => (
        <QuickLink key={index} link={link} styles={styles} />
        ))}
    </div>
  )
}

const QuickLink = ({ link, styles }) => {
  const Icon = link.icon;
  return (
    <a href={link.href} className={styles.actionButton}>
      <Icon className={styles.actionIcon} />
      {link.text}
    </a>
  );
};

export default DrawerQuickLinks