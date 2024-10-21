import React from 'react';

const NavButton = ({ icon, isActive, label }) => {
  return (
    <div className="nav-button">
      <div className="nav-icon-container">
        <img loading="lazy" src={icon} alt={`${label} icon`} className="nav-icon" />
        {isActive && <div className="nav-selector" />}
      </div>
      <span className="visually-hidden">{label}</span>
    </div>
  );
};

export default NavButton;