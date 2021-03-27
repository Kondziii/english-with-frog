import React from 'react';
import './Video.css';

const Video = ({ src }) => {
  return (
    <>
      <div className='videoWrapper'>
        <div className='color-overlay' />
        <video src={src} autoPlay muted loop></video>
      </div>
    </>
  );
};

export default Video;
