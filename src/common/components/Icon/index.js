import React from 'react';
import PropTypes from 'prop-types';
import style from './icon.module.scss';

const BaseIcon = ({icon, className, variant, ...props}) => {
  const renderClassName = () => {
    let iconClass = `material-icons`;
    if(variant) iconClass += `-${variant}`;
    let classes = style[iconClass]
    if(className) classes += ` ${className}`;
    return classes;
  };
  return (
    <span {...props} className={renderClassName()}>
      {icon}
    </span>
  );
};
BaseIcon.defaultProps = {
  icon: null,
  className: null,
  variant: null,
};
BaseIcon.propTypes = {
  icon: PropTypes.string, // Icon name
  className: PropTypes.string, // Icon className
  variant: PropTypes.string, // Icon variant
};
export default BaseIcon;
