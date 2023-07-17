import { useContext, useEffect } from 'react';
import s from './itemBord.module.css';
import { Actions, AppContext } from '../../AppContext';
import { ICard, ITask } from '../../types/card';
import ItemInfo from './ItemInfo/ItemInfo';
import ItemDecription from './ItemDescription/ItemDecription';
import ItemComments from './ItemComments/ItemComments';

const ItemBord = () => {
  const { state, dispatch } = useContext(AppContext);

  const currentCard: ICard = state.cards.filter(
    (card: ICard) => card.id === state.activeTask.indexCard,
  )[0];

  const currentTask: ITask = currentCard.tasks.filter(
    (task: ITask) => task.id === state.activeTask.indexTask,
  )[0];

  const closeCard = () => {
    dispatch({type:Actions.closeCard})
  }

  useEffect(() => {
    const close = (e:KeyboardEvent) => {
      if(e.keyCode === 27){
        closeCard()
      }
    }
    window.addEventListener('keydown', close)
  return () => window.removeEventListener('keydown', close)
  //eslint-disable-next-line
},[])

  return (
    <div className={s.popup_wrapper}>
      <div className={s.popup}>
        <ItemInfo closeCard={closeCard}
          task={currentTask}
          card={currentCard}
          name={state.popup.name}
        />
        <ItemDecription task={currentTask}
          card={currentCard} />
        <ItemComments task={currentTask}
        card={currentCard} 
        name={state.popup.name} />
        <span onClick={closeCard}
        className={s.close}>&#10060;</span>
      </div>
    </div>
  );
};

export default ItemBord;
