import React, { useState , useEffect} from 'react'
import ComponentList from './ComponentList';
import { useSelector, useDispatch } from 'react-redux';
import './list.scss'
import { fetchData, selectCharacter} from '../../store/dataSlice';

function List() {

  const characters = useSelector(state => state.data.characters);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleCharacterClick = (character) => {
    dispatch(selectCharacter(character));
  };

  return (
    <div className='list_container'>
      {characters && characters.length > 0 ? (
        characters.map(character => (
        <ComponentList
            key={character.id}
            image={character.image}
            name={character.name}
            onClick={() => handleCharacterClick(character)}
        />
      ))
      ) : (
      <p>No data available</p>
      )}
    </div>
  )
}

export default List