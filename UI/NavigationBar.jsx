import React from 'react';
import NavButton from './NavButton';

const navigationItems = [
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8ccff70ffe4d6c5d704f6ec96fb1a2779309e5f0218de48c621200b9ffd38cf3?placeholderIfAbsent=true&apiKey=21d04c1844b948eea151b9f83ce1b902", label: "Home", isActive: true },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/6f435368052e3999ba4320da969fbe1cec81fe886f680a839ea02d16d2f456af?placeholderIfAbsent=true&apiKey=21d04c1844b948eea151b9f83ce1b902", label: "Leaderboard" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/080898d2f6b8125100df8f7dd130261b2de64bc74b9239a1063150e1f75ac110?placeholderIfAbsent=true&apiKey=21d04c1844b948eea151b9f83ce1b902", label: "Favorites" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8126abe257125766b96786115b6a22424ef005f6401e108d55ba8ec998ffaac0?placeholderIfAbsent=true&apiKey=21d04c1844b948eea151b9f83ce1b902", label: "Settings" }
];

const NavigationBar = () => {
  return (
    <nav className="navigation-bar">
      {navigationItems.map((item, index) => (
        <NavButton key={index} {...item} />
      ))}
    </nav>
  );
};

export default NavigationBar;