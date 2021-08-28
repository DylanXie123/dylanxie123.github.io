import React from 'react';

const GridContainer = (props: { children: React.ReactNode }) => {
  return (
    <div style={{ width: '90%', margin: 'auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)' }}>
        {props.children}
      </div>
    </div>
  )
}

export default GridContainer;