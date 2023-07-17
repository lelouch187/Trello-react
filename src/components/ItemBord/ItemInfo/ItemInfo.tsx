import React, { FC, useContext, useState } from 'react';
import s from './itemInfo.module.css';
import { ICard, ITask } from '../../../types/card';
import { Actions, AppContext } from '../../../AppContext';

interface IItemInfo {
  name: string;
  card: ICard;
  task: ITask;
  closeCard: () => void;
}

const ItemInfo: FC<IItemInfo> = ({ name, card, task, closeCard }) => {
  const { state, dispatch } = useContext(AppContext);
  const [isVisibleInput, setVisibleInput] = useState(false);
  const [value, setValue] = useState(task.title);

  const saveTask = (changeTask: ITask[]) => {
    const newCard = { ...card, tasks: changeTask };
    dispatch({ type: Actions.changeTask, payload: newCard });
    const cards = state.cards.map((card: ICard) => {
      if (card.id === newCard.id) {
        return newCard;
      }
      return card;
    });
    localStorage.setItem('cards', JSON.stringify(cards));
  };

  const deletecard = () => {
    const newTasks = card.tasks.filter((item: ITask) => item.id !== task.id);
    saveTask(newTasks);
    closeCard();
  };

  const chengeNameCard = () => {
    if (value.trim().length > 0) {
      const newTasks = card.tasks.map((item) => {
        if (item.id === task.id) {
          return { ...task, title: value };
        }
        return item;
      });
      saveTask(newTasks);
      setVisibleInput(false);
    }
  };

  return (
    <div className={s.info}>
      <div className={s.title}>
        <p className={s.name}>{name}</p>
        <h3 className={s.title_card}>{card.titleCard}</h3>
      </div>
      {isVisibleInput ? (
        <div>
          <input
            className={s.input}
            value={value}
            onChange={(e) => setValue(() => e.target.value)}
          />
          <span className={s.save} onClick={chengeNameCard}>
            &#10004;
          </span>
        </div>
      ) : (
        <div className={s.task}>
          <h2 onClick={() => setVisibleInput((prev) => !prev)}>
            {task.title || 'Поле не может быть пустым'}
          </h2>
          <span onClick={deletecard} className={s.button}>
            &#128465;
          </span>
        </div>
      )}
    </div>
  );
};

export default ItemInfo;
