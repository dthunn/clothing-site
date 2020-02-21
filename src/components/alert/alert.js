import React from 'react';

import './alert.styles.scss';

const alert = ({ msg }) => {
  return (
    <div className='alert'>
      <h3>{msg}</h3>
    </div>
  );
};

export default alert;
