import React, { useState } from 'react';
import './GamesMode.scss'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Link } from 'react-router-dom'


export default () => {
    const [scrollX, setScrollX] = useState(0)

    function handleRight() {
        let x = scrollX - 300
        if (x < -600) {
            x = -600
        }
        setScrollX(x)
    }
    function handleLeft() {
        let x = scrollX + 300
        if (x > 0) {
            x = 0
        }
        setScrollX(x)

    }

    return (
        <div className="content">
            <h1>Games Mode</h1>
            <div className="item-left" onClick={() => { handleLeft() }}>
                <NavigateBeforeIcon className='icon' ></NavigateBeforeIcon>
            </div>
            <div className="item-rigth" onClick={() => { handleRight() }} >
                <NavigateNextIcon className='icon'></NavigateNextIcon>
            </div>
            <div className="boxes" style={{ marginLeft: scrollX }}>
                <Link to='/play' style={{ textDecoration: 'none', }}>
                    <div className='box box-1'>
                        <div className='front'><p>Modo 1.</p></div>
                        <div className='back'>
                            <p>Escolha o tempo que deseja jogar e tente digitar as palavras o mais rápido que puder.</p>
                        </div>
                    </div>
                </Link>
                <div className='box box-2'>
                    <div className='front'>
                        <p>Modo 2.</p>
                    </div>
                    <div className='back'>
                        <p>Escolha o tempo que deseja jogar e tente digitar as palavras o mais rápido que puder.</p>
                    </div>
                </div>
                <div className='box box-3'>
                    <div className='front'>
                        <p>Modo 3.</p>
                    </div>
                    <div className='back'>
                        <p>Escolha o tempo que deseja jogar e tente digitar as palavras o mais rápido que puder.</p>
                    </div>
                </div>
                <div className='box box-4'>
                    <div className='front'>
                        <p>Modo 4.</p>
                    </div>
                    <div className='back'>
                        <p>Escolha o tempo que deseja jogar e tente digitar as palavras o mais rápido que puder.</p>
                    </div>
                </div>
                <div className='box box-5'>
                    <div className='front'>
                        <p>Modo 5.</p>
                    </div>
                    <div className='back'>
                        <p>Escolha o tempo que deseja jogar e tente digitar as palavras o mais rápido que puder.</p>
                    </div>
                </div>
                <div className='box box-6'>
                    <div className='front'>
                        <p>Modo 6.</p>
                    </div>
                    <div className='back'>
                        <p>Escolha o tempo que deseja jogar e tente digitar as palavras o mais rápido que puder.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}