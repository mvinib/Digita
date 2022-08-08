import React, { useState, useEffect } from 'react';
import './Play.scss'

export default function Play() {
  const [words, setWords] = useState()
  const [played, setPlayed] = useState(false)
  const [letter, setLetter] = useState('')
  const [wordDiscovered, setWordDiscovered] = useState(0)
  const lt = []
  const [time, setTime] = useState(60)
  const [timeSelected, setTimeSelected] = useState()
  useEffect(() => {
    if (words) { /* listener exclusivo par o delete, já que o keypress não funciona com o backspace */
      window.addEventListener('keydown', evt => {
        switch (evt.key) {
          case "Backspace":
            lt.pop()
            setLetter(lt.join(''))
            break

          default:
            break;
        }
      })
      window.addEventListener('keypress', evt => { /* listener para verificar quais as teclas pressinadas e eliminar o possível uso indevido de algumas teclas */
        switch (evt.key) {
          case "Tab": {
            return null
          }
          case "Alt": {
            return null
          }
          case "CapsLock": {
            return null
          }
          case "Control": {
            return null
          }
          case "Meta": {
            return null
          }
          case "Dead": {
            return null
          }
          case "Shift": {
            return null
          }
          case "Enter": { /* ao pressionar o enter, é feita uma verificação para saber se as letras pressionadas batem com a palavra sorteada */
            if (lt.join('') === localStorage.getItem('selected')) {
              setWordDiscovered(wordDiscovered => wordDiscovered + 1) /* adicioando um valor para dar a pontuação final ao fim do cronometro */
              clear()
            }
            return null
          }
          default: /* aqui só irá passar as letras */
            lt.push(evt.key)
            setLetter(lt.join(''))
            break;

        }

      })
    }
  }, [words, wordDiscovered])

  useEffect(() => { /* remover os listener quando o cronometro zerar */
    if (!played) {
      window.removeEventListener('keydown', evt => { })
      window.removeEventListener('keypress', evt => { })
    }
  }, [played])

  useEffect(() => { /* iniciar o cronometro quando as palavras forem carregadas e parar o jogo quando o contador chegar a 0 */
    if (played && words) {
      const interval = setInterval(() => {
        setTime(time => time - 1);
        if (time === 0) {
          setPlayed(!played)
          setTime(timeSelected)
          localStorage.setItem('selected', '')
        }

      }, 1000);
      return () => clearInterval(interval);
    }

  }, [words, time, played])

  function clear() { /* função para zerar a palavras selecionada e zerar as letras já digitas quando uma palavra for digitada com sucesso*/
    localStorage.setItem('selected', '')
    setLetter('')

    const len = lt.length
    for (let index = 0; index < len; index++) {
      lt.pop()
    }
  }
  async function PlayAgain() { /* função parar zerar tudo e reinicar o jogo quando o usuário clicar em jogar novamente */
    setWords()
    setPlayed(!played)
    setWordDiscovered(0)
    clear()
    var qtd = 0
    switch (timeSelected) {
      case 30:
        qtd = 15
        break;
      case 60:
        qtd = 30
        break;
      case 90:
        qtd = 45
        break;
      case 120:
        qtd = 60
        break;
      default:
        break;
    }
    const all = []
    while (qtd > 0) {
      const req = await fetch(`https://api.dicionario-aberto.net/random?lang=pt`)
      const { word } = await req.json()
      all.unshift(word)
      qtd = qtd - 1

    }
    setWords(all)
  }
  async function Play(time) {
    setTime(time)
    setTimeSelected(time)
    setPlayed(!played)
    setWordDiscovered(0)
    clear()
    var qtd = 0
    switch (time) {
      case 30:
        qtd = 15
        break;
      case 60:
        qtd = 30
        break;
      case 90:
        qtd = 45
        break;
      case 120:
        qtd = 60
        break;
      default:
        break;
    }

    const all = []
    while (qtd > 0) {
      const req = await fetch(`https://api.dicionario-aberto.net/random?lang=pt`)
      const { word } = await req.json()
      all.unshift(word)
      qtd = qtd - 1

    }
    setWords(all)
  }

  function word() { /* função que retorna uma palavra aleatoria  */
    var del = 1
    const wordRandom = Math.random() * ((words.length - del) - 0)
    const ceil = Math.ceil(wordRandom)
    const a = words[ceil]
    words.splice(ceil, 1)
    del = del + 1
    return a


  }

  function randomWord() { /* função que retorna a palavra aleatoria e as letras digitadas */

    if (!localStorage.getItem('selected')) { /* faz a chamada da função sempre que não tiver nenhuma palavra para aparecer na tela */
      localStorage.setItem('selected', word())
    }
    return (
      <div className="word">
        <span className="span">{localStorage.getItem('selected')}</span>
        <p>{letter}</p>
      </div>
    )
  }
  return (
    <div className="play">
      {played === true ? words ?
        <div className='content-game'>
          <div className='content-p'>
            <p>Tempo restante: &nbsp;</p>
            <p>{time}</p>
          </div>

          <div className='time'>
            <h2>Digite a palavra abaixo:</h2>
            <section className='game-on'>
              {randomWord()}
            </section>
          </div>

        </div> :
        <section className="section2">
          <div className='content-loading'>
            <p>Carregando Palavras...</p>
            <div className='loading'></div>
          </div>
        </section>

        : wordDiscovered > 0 ?
          <div className='end-gamme'>
            <div className='punctuation'>
              <h1>Sua pontuação foi de: {wordDiscovered * 10}</h1>
            </div>
            <div className="play-again">
              <button onClick={() => { PlayAgain() }}>Jogar novamente!</button>
            </div>

          </div>
          :
          <div className="select">
            <div className="buttons">
              <button onClick={() => { Play(30) }}>30s</button>
              <button onClick={() => { Play(60) }}>60s</button>
              <button onClick={() => { Play(90) }}>90s</button>
              <button onClick={() => { Play(120) }}>120s</button>
            </div>
          </div>}
    </div>
  );
}