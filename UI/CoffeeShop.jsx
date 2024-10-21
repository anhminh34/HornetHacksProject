import React from 'react';
import NavigationBar from './NavigationBar';

const CoffeeShop = () => {
  return (
    <div className="homescreen">
      <header className="background">
        <h1 className="shop-title">COFFEE SHOP</h1>
        <div className="progress-container">
          <div className="progress-bar" />
        </div>
        <section className="play-section">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c9bd928e95349550f49dbebe89f9032e63082e027ca060657a3b55e8b88cbd8f?placeholderIfAbsent=true&apiKey=21d04c1844b948eea151b9f83ce1b902" alt="Coffee shop background" className="play-section-image" />
          <button className="play-button">Play</button>
        </section>
        <div className="shadow-blocker" />
      </header>
      <main className="background-filler">
        <NavigationBar />
        <div className="coming-soon-box">LOCATION SOON</div>
      </main>
    </div>
  );
};

export default CoffeeShop;