import React, {ChangeEvent, useState} from 'react';
import style from './app.module.css';


function App() {
    const [bank, setBank] = useState({name:'vtb',bet:0.112})
    const [bet, setBet] = useState(10)
    const [costApartment, setCostApartment] = useState(0)
    const [initialPayment, setInitialPayment] = useState(0)

    const banks={
       alfa:{},
        vtb:{},
        sovkom:{}
    }

    const onChangeBank = (e: ChangeEvent<HTMLSelectElement>) => {
        const value=e.target.value
        if(value==='vtb'&&bet===10){
            setBank({name:value,bet:0.112})
        }else if(value==='vtb'&&bet===20){
            setBank({name:value,bet:0.109})
        }

    }
    const onChangeBet = (e: ChangeEvent<HTMLSelectElement>) => {
        setBet(Number(e.target.value))
    }


    return (
        <div className={style.container}>
            <div>

                Выберите банк

                <select onChange={onChangeBank}>
                    <option value=" vtb">ВТБ</option>
                    <option value="alfa">Альфа-банк</option>
                    <option value="sovcom">Совкомбанк</option>
                </select>
            </div>

            <div>

                Первоначальный взнос

                <select onChange={onChangeBet}>
                    <option value='10'>10%</option>
                    <option value='15'>15%</option>
                    <option value='20'>20%</option>
                </select>
            </div>
            <div>
                Ставка : {bank.bet}

            </div>
            <div>
                Стоимость квартиры
                <input onChange={(e: ChangeEvent<HTMLInputElement>) => setCostApartment(Number(e.target.value))}
                       type='number'/>
            </div>

            <div>
                Срок кредита
                <input type='number'/>
            </div>
            <button onClick={() => alert(initialPayment)}> Рассчитать</button>
        </div>
    );
}

export default App;
