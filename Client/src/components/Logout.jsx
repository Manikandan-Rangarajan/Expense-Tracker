import React, { useEffect } from 'react';

function Logout() {
  useEffect(() => {
    
    localStorage.removeItem('userId'); 
    localStorage.removeItem('authToken');

    
    const timer = setTimeout(() => {
      window.location.href = `${window.location.origin}/`;
    }, 1500); 
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.message}>Logging you out...</h2>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', 
  },
  message: {
    fontSize: '2rem', 
    fontWeight: 'bold',
    color: '#333', 
  },
};

export default Logout;