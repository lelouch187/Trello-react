import React, { useContext, useEffect } from 'react';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Popup from './components/Popup/Popup';
import { Actions, AppContext } from './AppContext';
import ItemBord from './components/ItemBord/ItemBord';

const App = () => {
  const { state, dispatch } = useContext(AppContext);
  
  useEffect(() => {
    const name = localStorage.getItem('name');
    if (name) {
      dispatch({ type: Actions.setName, payload: name });
    }
    //eslint-disable-next-line   
  }, []);

  return (
    <div className="App">
      {state.popup.visible&&!localStorage.getItem('name') && <Popup />}
      {state.activeTask.isVisible && <ItemBord />}
      <Header />
      <Main />
    </div>
  );
};

export default App;
