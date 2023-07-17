import React, { useState, useContext } from 'react'
import s from './popup.module.css'
import { AppContext } from '../../AppContext';
import { Actions } from '../../AppContext';

const Popup = () => {
   const [name, setName] = useState('');
   const [error, setError] = useState(false);

   const {dispatch} = useContext(AppContext);

   const onSetName = () => {
      if (name.trim()){
       localStorage.setItem("name",name)  
       dispatch({type:Actions.setName, payload:name})
      } else {
         setError(true)
      }
   }

  return (
    <div className={s.popup_wrapper}>
      <div className={s.popup}>
         <p className={s.text}>Введите ваше имя</p>
         <input onChange={(e)=>setName(e.target.value)}
         value={name}
         className={s.input} />
         {error&&<p className={s.error}>Вы не ввели имя!</p>}
         <button onClick={onSetName}
         className={s.button}>Сохранить</button>
      </div>
    </div>
  )
}

export default Popup