import React from 'react';
import './Loader.css';

const loader = () => {
  return (
    <div className="text-center">
      <div className="loader-anim"><div></div><div></div><div></div></div>
      <h4>Accessing Data</h4>
    </div>
  );
};

export default loader;
