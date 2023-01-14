import React from 'react';

const Image = (props:any) => {
    return (
        <div className={props.className}>
              <img src={props.img}  />
        </div>
      );
}

export default Image;