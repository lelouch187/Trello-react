import React, { FC, useState, useContext } from 'react';
import { ICard, ITask } from '../../../types/card';
import s from './itemComments.module.css';
import { Actions, AppContext } from '../../../AppContext';
import { nanoid } from 'nanoid';

interface IItemComments {
  name: string;
  card: ICard;
  task: ITask;
}

const ItemComments: FC<IItemComments> = ({ name, card, task }) => {
  const [visibleInput, setVisibleInput] = useState('');
  const [newComment, setNewComment] = useState('');
  const [renameComment, setRenameComment] = useState('');

  const { state, dispatch } = useContext(AppContext);

  const saveCard = (changeTasks:ITask[]) =>{
    const newCard = { ...card, tasks: changeTasks };
      dispatch({ type: Actions.changeTask, payload: newCard });
      const cards = state.cards.map((card: ICard) => {
        if (card.id === newCard.id) {
          return newCard;
        }
        return card;
      });
      localStorage.setItem('cards', JSON.stringify(cards));
  }
  const addComment = () => {
   if (newComment.trim().length>0) {
      const comment = { id: nanoid(), value: newComment };
      const newTasks = card.tasks.map((item) => {
        if (item.id === task.id) {
          return { ...task, comments: [...task.comments, comment] };
        }
        return item;
      });
      saveCard(newTasks)
      setNewComment('');
   }  
  };
  const deleteComment = (id: string) => {
    const newComments = task.comments.filter((item) => item.id !== id);
    const newTasks = card.tasks.map((item) => {
      if (item.id === task.id) {
        return { ...task, comments: newComments };
      }
      return item;
    });
    saveCard(newTasks)
  };
  const changeComment = (id: string) =>{
   if(renameComment.trim().length>0 ){
      const newComments = task.comments.map((item) => {
         if (item.id===id){
            return {...item, value: renameComment}
         }
         return item
      });
      const newTasks = card.tasks.map((item) => {
        if (item.id === task.id) {
          return { ...task, comments: newComments };
        }
        return item;
      });
      saveCard(newTasks)
      setVisibleInput('')
   }
  }
  return (
    <div>
      <h2 className={s.title}>Комментарии</h2>
      {task.comments.length > 0 &&
        task.comments.map((comment) => {
          return (
            <div className={s.comment} key={comment.id}>
              <p className={s.comment_title}>{name}</p>
              {visibleInput===comment.id ? (
                <div>
                  <input onChange={(e)=>setRenameComment(e.target.value)}
                  value={renameComment} />
                  <span className={s.save} onClick={()=>changeComment(comment.id)}>
            &#10004;
          </span>
                </div>
              ) : (
                <p onClick={() => {
                  setVisibleInput(comment.id)
                  setRenameComment(comment.value)
                  }} className={s.comment_text}>
                  {comment.value}
                </p>
              )}
              <span onClick={() => deleteComment(comment.id)} className={s.comment_delete}>
                &#10060;
              </span>
            </div>
          );
        })}
      <div className={s.add_comment}>
        <input
          onChange={(e) => setNewComment(e.target.value)}
          value={newComment}
          className={s.input}
        />
        <button onClick={addComment} className={s.button}>
          Добавить комментарии
        </button>
      </div>
    </div>
  );
};

export default ItemComments;
