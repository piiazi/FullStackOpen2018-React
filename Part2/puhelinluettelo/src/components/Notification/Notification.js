import React from 'react';

import classes from './Notification.css';

const Notification = ( { message } ) => {

  if ( message === null ) {
    return null;
  }
  return (
    <div className="NotificationMessage">
       { message }
    </div>
  )
}

export default Notification;
