import React, { useEffect } from 'react';
import './App.scss';
import Play from '../src/components/Play'
import GamesMode from '../src/components/GamesMode'
import { Switch, Route } from 'react-router-dom'

function App() {
  useEffect(() => { /* assim que a aplicação iniciar, será iniciado um listener para verificar se o toogle é mudado e adicionar uma classe para mudar o tema da aplicação */
    const app = document.querySelector('.app')
    const toggle = document.querySelector('.toggle')
    function dark() { /* tanto a função dark como a light servem para adicionar uma classe e remover a outra */
      app.classList.add('dark')
      app.classList.remove('ligth')
    }
    function light() {
      app.classList.add('ligth')
      app.classList.remove('dark')
    }
    toggle.addEventListener('change', (e) => {
      e.target.checked ? dark() : light()

    }, false)
  }, [])

  return (

    <div className="app">
      <header>
        <div className='title'>
          <h1>Digitação</h1>
        </div>

        <div className='div-nav'>
          <nav>
            <ul>
              <li>Jogar</li>
              <li>Sobre</li>
              <li>Conta</li>
            </ul>
          </nav>
          <label className="toggle-theme">
            <input className="toggle" type="checkbox"></input>
            <span className="slide round"></span>
          </label>
        </div>
      </header>
      <Switch>
        <Route path="/" exact component={GamesMode}></Route>
        <Route path="/play" component={Play}></Route>
      </Switch>

    </div>



  );
}

export default App;
