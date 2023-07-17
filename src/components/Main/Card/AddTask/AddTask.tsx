import React, { FC, useState, useContext } from 'react';
import s from './addTask.module.css';
import { Actions, AppContext } from '../../../../AppContext';
import { ICard, ITask } from '../../../../types/card';
import { nanoid } from 'nanoid';

interface IAddTaskProps{
   id:string;
}

const AddTask: FC<IAddTaskProps> = ({id}) => {
  const [isVisibArea, setVisibArea] = useState(false);
  const [value, setValue] = useState('');
  
  const {state ,dispatch} = useContext(AppContext)
  
  const addNewTask = ()=>{
   if(value.trim()){
      const task:ITask = {
         id:nanoid(),
         title:value,
         description:'',
         comments: [],
      }
      const cards = state.cards.map((card:ICard)=>{
         if (card.id===id) {
              return {...card, tasks:[...card.tasks, task]}
         }
         return card
      })
      dispatch({type:Actions.changeCard, payload:cards})
      setValue('')
      setVisibArea(prev=>!prev)
      localStorage.setItem('cards', JSON.stringify(cards));
   }
  }

  return <>{isVisibArea ? 
   <div>
      <textarea onChange={(e)=>setValue(e.target.value)}
      value={value}
      className={s.area}
      placeholder='Ввести заголовок для этой карточки' />
      <div className={s.buttons}>
         <button onClick={addNewTask}
         className={s.button}>Добавить карточку</button>
         <span onClick={()=>setVisibArea(prev=>!prev)}>&#10060;</span>
      </div>
   </div>
  : <p onClick={()=>setVisibArea(prev=>!prev)}
  className={s.text}>+ добавить карточку</p>}</>;
};

export default AddTask;
