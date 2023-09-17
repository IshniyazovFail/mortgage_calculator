import React, {ChangeEvent, useEffect, useState} from 'react';
import style from './app.module.css';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./state/store";
import {bankSelectionAC, BanksStateType, BankType, betSelectionAC, costApartmentAC} from "./state/bank-reducer";




function App() {

    const bank = useSelector<RootStateType, BankType>(state => state.bank)
    const bet = useSelector<RootStateType, number>(state => state.bet)
    const costApartment = useSelector<RootStateType, number>(state => state.costApartment)
    const dispatsh = useDispatch()

    const banks = [
        {name: "alfa", data: [{pv: 10, percent: 12.39}, {pv: 15, percent: 11.89}]},
        {name: "vtb", data: [{pv: 10, percent: 11.2}, {pv: 20, percent: 10.9}]},
        {name: "sovcom", data: [{pv: 15, percent: 11.99}]}
    ]

    useEffect(() => {
        dispatsh(betSelectionAC(bank.data[0].percent))
    }, [dispatsh])

    const onChangeBank = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        let actBank = banks.filter(b => b.name === value)
        dispatsh(bankSelectionAC(actBank[0]))
        dispatsh(betSelectionAC(actBank[0].data[0].percent))

    }
    const onChangeBet = (e: ChangeEvent<HTMLSelectElement>) => {
        let pvBet = Number(e.target.value)
        let actBet = bank.data.filter(bet => bet.pv === pvBet)
        dispatsh(betSelectionAC(actBet[0].percent))
    }


    return (
        <div className={style.container}>
            <div>

                Выберите банк

                <select onChange={onChangeBank}>
                    <option value="alfa">Альфа</option>
                    <option value="vtb">ВТБ</option>
                    <option value="sovcom">Совкомбанк</option>
                </select>
            </div>

            <div>

                Первоначальный взнос

                <select onChange={onChangeBet}>
                    {bank.data.map(pv => <option key={pv.percent} value={pv.pv}>{pv.pv} %</option>)}
                </select>
            </div>
            <div>
                Ставка :{bet}% годовых

            </div>
            <div>
                Стоимость квартиры
                <input value={costApartment}
                       onChange={(e: ChangeEvent<HTMLInputElement>) => dispatsh(costApartmentAC(Number(e.target.value)))}
                       type='number'/>
            </div>

            <div>
                Срок кредита
                <input type='number'/>
            </div>
            <button onClick={() => alert('aloha')}>Рассчитать</button>
        </div>
    );
}

export default App;
