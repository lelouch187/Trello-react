import React, { useContext } from 'react'
import s from './main.module.css'
import Card from './Card/Card'
import { AppContext } from '../../AppContext'
import { ICard } from '../../types/card'

const Main = () => {

  const {state} = useContext(AppContext)

  return (
    <main className={s.main}>
     {state.cards.map((item:ICard)=>{
      return <Card card={item}
      key={item.id}
      />
     })}
    </main>
  )
}

export default Main