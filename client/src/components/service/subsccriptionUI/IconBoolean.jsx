import { Check, X } from "lucide-react";

function IconBoolean({ value, styles }) {
  if (value === true)
    return <Check size={18} className={styles.iconPositive} aria-label="yes" />;
  if (value === false)
    return <X size={18} className={styles.iconNegative} aria-label="no" />;
  return null;
}

export default IconBoolean