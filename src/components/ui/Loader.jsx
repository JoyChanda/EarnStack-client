import PropTypes from 'prop-types';

/**
 * ⏳ LOADER / SPINNER COMPONENT
 * Loading indicators for async operations
 * 
 * @variants: spinner | dots | pulse
 * @sizes: sm | md | lg
 */
export const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-4',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div 
      className={`spinner ${sizes[size]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

/**
 * 💬 PULSE LOADER
 * Animated pulsing dots
 */
export const PulseLoader = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`} role="status" aria-label="Loading">
      <div className="w-2 h-2 bg-primary-600 dark:bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
      <div className="w-2 h-2 bg-primary-600 dark:bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
      <div className="w-2 h-2 bg-primary-600 dark:bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

PulseLoader.propTypes = {
  className: PropTypes.string,
};

/**
 * 📄 FULL PAGE LOADER
 * Loading screen for page transitions
 */
export const PageLoader = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-neutral-950">
      <Spinner size="lg" />
      <p className="mt-4 text-lg font-medium text-neutral-700 dark:text-neutral-300">
        {message}
      </p>
    </div>
  );
};

PageLoader.propTypes = {
  message: PropTypes.string,
};

export default Spinner;
