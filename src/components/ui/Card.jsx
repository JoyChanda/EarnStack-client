import PropTypes from 'prop-types';

/**
 * 📦 CARD COMPONENT
 * Consistent card container with same height, radius, and spacing
 * 
 * @variants: base | hover | glass
 */
const Card = ({ 
  children, 
  variant = 'base',
  className = '',
  ...props 
}) => {
  const variants = {
    base: 'card-base',
    hover: 'card-hover',
    glass: 'card-glass',
  };

  const cardClasses = `
    ${variants[variant]}
    ${className}
  `.trim();

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['base', 'hover', 'glass']),
  className: PropTypes.string,
};

export default Card;
