import React from 'react';
// import APP from '../services/client';

export default function ListItem({listViewOpened}) {
  // APP.client.db.get(`${APP.currentUser.id}`).then(data => {
  //   // console.log(data);
  //   // [TODO]: Use this to render the list of recents used.
  // });
  return (
    <div className={`animated faster top-items-absolute-container ${listViewOpened ? 'slideInUp' : 'slideOutDown fadeOut'}`}>
      <div className="top-items-relative-container">
        <div className="top-items-container-header">Top asks</div>
        <div className="top-items-container-list">Freddy the robot</div>
        <div className="top-items-container-list">Kamal the dirty</div>
        <div className="top-items-container-list">Monday syed</div>
      </div>
    </div>
  )
}
