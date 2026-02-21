import PropTypes from 'prop-types';

/**
 * 🏷️ BADGE COMPONENT
 * Small label for status, categories, etc.
 */
const Badge = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400',
    secondary: 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400',
    accent: 'bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400',
    success: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
    warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
    danger: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
    neutral: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400',
    outline: 'border border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-400 bg-transparent',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'success', 'warning', 'danger', 'neutral', 'outline']),
  className: PropTypes.string,
};

export default Badge;
