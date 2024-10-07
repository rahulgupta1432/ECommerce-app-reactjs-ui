import React from 'react';

const BackToTop = React.forwardRef((props, ref) => {
  const scrollToTop = () => {
    if (ref.current) {
      ref.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
    <button
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '35px',
        width:'55px',
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        zIndex: 1000,
      }}
    >
      <svg height="1.2em" className="arrow" viewBox="0 0 512 512">
                    <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
                    style={{fill:'white'}}></path>
                </svg>
                <p className="text"
                style={{
                    fontSize:'0.7rem',
                    width:'100px',
                    position:'absolute',
                    color:'white',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    // bottom:'-18px',
                    opacity:0,
                    transitionDuration:'.7s'
                }}
                >Back to Top</p>
    </button>
    </>
  );
});

export default BackToTop;
