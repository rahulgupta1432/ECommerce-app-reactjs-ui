import React from 'react';

const HeroSection = () => {
  return (
    <section id="hero">
      <h4 style={{ fontSize: '24px', color: '#222' }}>Trade-in-fair</h4>
      <h2 style={{
        position: 'absolute',
        top: '150px',
        fontSize: '46px',
        lineHeight: '54px',
        color: '#222'
      }}>Super value deals</h2>
      <h1 style={{
        color: '#088178',
        fontSize: '50px',
        lineHeight: '64px',
        left: '-652px',
        top: '80px',
        position: 'relative',
      }}>On all Products</h1>
      <p>Save more with coupons and up to 70% off!</p>

      <button
        style={{
          backgroundImage: 'url("https://i.postimg.cc/528H2mmS/button.png")',
          backgroundColor: 'transparent',
          color: '#088178',
          border: '0',
          cursor: 'pointer',
          top: '-160px',
          left: '-650px',
          width: '200px',
          height: '45px',
          position: 'relative'
        }}
      >Shop Now</button>
    </section>
  );
};

export default HeroSection;
