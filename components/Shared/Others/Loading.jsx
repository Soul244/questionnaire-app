import React from 'react';

function Loading() {
  return (
    <div className="center">
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}

export default Loading;
