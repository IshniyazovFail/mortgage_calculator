import React, {ChangeEvent, useState} from 'react';
import style from './app.module.css';


type bankType = {
    pv: number,
    percent: number
}
type initialStateType = {
    name: string,
    data: Array<bankType>
}

function App() {
    const [bank, setBank] = useState<initialStateType>( {name: "vtb", data: [{pv: 10, percent: 11.2}, {pv: 20, percent: 10.9}]})
    const [bet, setBet] = useState(10)
    const [costApartment, setCostApartment] = useState(0)
    const [initialPayment, setInitialPayment] = useState(0)

    const banks = [
        {name: "alfa", data: [{pv: 10, percent: 12.39}, {pv: 15, percent: 11.89}]},
        {name: "vtb", data: [{pv: 10, percent: 11.2}, {pv: 20, percent: 10.9}]},
        {name: "sovcom", data: [{pv: 15, percent: 11.99}]}
    ]

    const onChangeBank = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        let actBank = banks.find(b => b.name === value)
        if (actBank) {
            setBank(actBank)
        }

    }
    const onChangeBet = (e: ChangeEvent<HTMLSelectElement>) => {
        let pvBet=Number(e.target.value)
        let actBet=bank.data.find(bet=>bet.pv===pvBet)
        if(actBet) {setBet(actBet.percent)}
        else{
            debugger
            setBet(bank.data[0].percent)
        }

    }


    return (
        <div className={style.container}>
            <div>

                Выберите банк

                <select onChange={onChangeBank}>
                    <option value="vtb">ВТБ</option>
                    <option value="alfa">Альфа</option>
                    <option value="sovcom">Совкомбанк</option>
                </select>
            </div>

            <div>

                Первоначальный взнос

                <select onChange={onChangeBet}>
                  {bank.data.map(pv=> <option key={pv.percent} value={pv.pv}>{pv.pv} %</option>)}
                </select>
            </div>
            <div>
                Ставка :{bet}% годовых

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
            <button onClick={() => alert(initialPayment)}>Рассчитать</button>
        </div>
    );
}

export default App;
