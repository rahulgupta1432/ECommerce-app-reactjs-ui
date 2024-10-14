import React from 'react';

const OfflinePage = () => {
  return (
    <div style={styles.container}>
      <img src="img/offline-page.jpeg" alt="Offline" style={styles.image} />
      <h1 style={styles.heading}>You're Offline</h1>
      <p style={styles.message}>Please check your internet connection.</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f8f8',
    textAlign: 'center',
  },
  image: {
    maxWidth: '300px',
    marginBottom: '20px',
  },
  heading: {
    fontSize: '24px',
    margin: '10px 0',
  },
  message: {
    fontSize: '16px',
  },
};

export default OfflinePage;
