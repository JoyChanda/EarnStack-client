import PropTypes from 'prop-types';

/**
 * 💀 SKELETON COMPONENT
 * Loading placeholders that match content structure
 */
export const Skeleton = ({ className = '', ...props }) => {
  return (
    <div className={`skeleton ${className}`} {...props} />
  );
};

Skeleton.propTypes = {
  className: PropTypes.string,
};

/**
 * 📝 Pre-configured skeleton variants
 */
export const SkeletonText = ({ lines = 3, className = '' }) => {
  return (
    <div className={className}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`skeleton-text ${i === lines - 1 ? 'w-2/3' : ''}`}
        />
      ))}
    </div>
  );
};

SkeletonText.propTypes = {
  lines: PropTypes.number,
  className: PropTypes.string,
};

export const SkeletonTitle = ({ className = '' }) => {
  return <div className={`skeleton-title ${className}`} />;
};

SkeletonTitle.propTypes = {
  className: PropTypes.string,
};

export const SkeletonCard = ({ className = '' }) => {
  return <div className={`skeleton-card ${className}`} />;
};

SkeletonCard.propTypes = {
  className: PropTypes.string,
};

/**
 * 🎴 TASK CARD SKELETON
 * Matches the TaskCard layout exactly
 */
export const CardSkeleton = () => {
  return (
    <div className="card-base h-full">
      <div className="skeleton aspect-video w-full mb-4 rounded-xl" />
      <SkeletonTitle className="mb-4" />
      <SkeletonText lines={2} className="flex-1" />
      <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-between mt-auto">
        <div className="flex gap-2">
            <div className="skeleton w-6 h-6 rounded-full" />
            <div className="skeleton w-20 h-4" />
        </div>
        <div className="skeleton w-16 h-4" />
      </div>
      <div className="skeleton h-12 w-full mt-4 rounded-btn" />
    </div>
  );
};


export default Skeleton;
