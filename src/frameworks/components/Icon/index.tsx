import React from 'react';
import style from './icon.module.scss';

interface Props {
  icon?: string, // Icon name
  className?: string, // Icon className
  variant?: string // Icon variant
}

const BaseIcon = ({icon, className, variant, ...props}:Props) => {
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

export default BaseIcon;
