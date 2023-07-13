import React, { FC, useState, useContext } from 'react';
import s from './itemDescription.module.css';
import { ICard, ITask } from '../../../types/card';
import { Actions, AppContext } from '../../../AppContext';

interface IItemDecription {
  card: ICard;
  task: ITask;
}

const ItemDecription: FC<IItemDecription> = ({ card, task }) => {
  const { state, dispatch } = useContext(AppContext);
  const [value, setValue] = useState(task.description);
  const addDescription = () => {
    const newTasks = card.tasks.map((item) => {
      if (item.id === task.id) {
        return { ...task, description: value };
      }
      return item;
    });
    const newCard = { ...card, tasks: newTasks };
    dispatch({ type: Actions.deleteTask, payload: newCard });
    const cards = state.cards.map((card: ICard) => {
      if (card.id === newCard.id) {
        return newCard;
      }
      return card;
    });
    localStorage.setItem('cards', JSON.stringify(cards));
  };
  const deleteDescription = () =>{
    const newTasks = card.tasks.map((item) => {
      if (item.id === task.id) {
        return { ...task, description: '' };
      }
      return item;
    });
    const newCard = { ...card, tasks: newTasks };
    dispatch({ type: Actions.deleteTask, payload: newCard });
    const cards = state.cards.map((card: ICard) => {
      if (card.id === newCard.id) {
        return newCard;
      }
      return card;
    });
    setValue('')
    localStorage.setItem('cards', JSON.stringify(cards));
  }
  const changeDescription = () =>{
    const oldValue = value;
    deleteDescription()
    setValue(oldValue)
  }
  return (
    <div className={s.description}>
      <h2 className={s.title}>Описание</h2>
      {task.description ? (
        <p>
          {task.description}
          <span onClick={changeDescription} className={s.change}>
            &#9998;
          </span>
          <span onClick={deleteDescription} className={s.delete}>
            &#128465;
          </span>
        </p>
      ) : (
        <div className={s.input}>
          <textarea onChange={(e) => setValue(() => e.target.value)} value={value} />
          <button onClick={addDescription}>Добавить описание</button>
        </div>
      )}
    </div>
  );
};

export default ItemDecription;
