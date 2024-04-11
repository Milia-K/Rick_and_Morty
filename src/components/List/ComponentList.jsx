import React from 'react'

function ComponentList(props) {
const {id, name, image, onClick} = props;

return (
  <div id={id} className='list_item_group'>
    <div className="list_item" onClick={onClick}>
      <img src={image} alt={name} className='list_item_avatar'/>
      <div className='name'>{name}</div>
    </div>
  </div>
  )
}

export default ComponentList
