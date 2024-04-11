import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCharacter, updateCharacter, updateCharacters } from '../../store/dataSlice';
import './card.scss'

function Card() {

  const data = useSelector(state => state.data);
  const selectedCharacter = data.selectedCharacter;
  const characters = data.characters;
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    dispatch(selectCharacter());
  }, [dispatch])

  const handleSpeciesChange = (e) => {
    dispatch(updateCharacter({...selectedCharacter, species: e.target.value}))
  }

  const handleGenderChange = (e) => {
    dispatch(updateCharacter({...selectedCharacter, gender: e.target.value}))
  }

  const handleLocationNameChange = (e) => {
    dispatch(updateCharacter({ ...selectedCharacter, location: { ...selectedCharacter.location, name: e.target.value } }));
  }

  const saveSelectedCharacter = (selectedCharacter) => {
    const updatedCharactersList = characters.map(character => {
      if (character.id == selectedCharacter.id) {
        return selectedCharacter;
      } else {
      return character;
      }
    });
    dispatch(updateCharacters(updatedCharactersList));
    setDisabled(true)
  }

  const makeDisabledfalse = () => {
    disabled === true?   setDisabled(false) : setDisabled(true)
  }


  return (
    <div className='card_container'>
    {selectedCharacter ? (
        <div className="card">
            <div className='card_component' id={selectedCharacter.id}>
                <div className='name'>{selectedCharacter.name}
                <div className="buttons">
                <button className='btn' onClick={() => makeDisabledfalse(disabled)}>&#9998;</button>
                <button className='btn' onClick={() => saveSelectedCharacter(selectedCharacter)}>✓</button>
                </div>
                </div>
                <div className="card_info">
                    <img src={selectedCharacter.image} alt={selectedCharacter.name} className='card_image'/>
                    <div className="card_info_text">
                        <p className='card_info_text_item'>Species</p>
                        <input 
                        className='card_info_text_name'
                        value={selectedCharacter.species} 
                        onChange={handleSpeciesChange} 
                        disabled = {disabled}
                        />
                        <p className='card_info_text_item'>Gender</p>
                        <input 
                        className='card_info_text_name'
                        value={selectedCharacter.gender}
                        onChange={handleGenderChange} 
                        disabled = {disabled}
                        />
                        <p className='card_info_text_item'>Location</p>
                        <input
                        className='card_info_text_name'
                        value={selectedCharacter.location.name}
                        onChange={handleLocationNameChange} 
                        disabled = {disabled}
                        />
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <p>Select a character :)</p>
    )}
  </div>
  );
}

export default Card;
