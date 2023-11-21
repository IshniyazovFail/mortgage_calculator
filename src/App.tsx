import React, {ChangeEvent, ReactNode, useEffect, useState} from 'react';
import style from './app.module.css';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./state/store";
import {
    bankSelectionAC,
    BankType,
    betSelectionAC,
    calculationAC,
    costApartmentAC,
    creditTermAC
} from "./state/bank-reducer";
import {Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";


function App() {
    const bank = useSelector<RootStateType, BankType>(state => state.bank)
    let bet = useSelector<RootStateType, number>(state => state.bet)
    const costApartment = useSelector<RootStateType, number>(state => state.costApartment)
    const creditTerm = useSelector<RootStateType, number>(state => state.creditTerm)
    const pvRubFinal = useSelector<RootStateType, number>(state => state.pvRubFinal)
    const onaMortgageFinal = useSelector<RootStateType, number>(state => state.onaMortgageFinal)
    const paymentFinal = useSelector<RootStateType, number>(state => state.paymentFinal)
    const [pvPercent, setPvPercent] = useState(bank.data[0].pv)
    const dispatsh = useDispatch()


    const banks = [
        {name: "alfa", data: [{pv: 10, percent: 12.39}, {pv: 15, percent: 11.89}]},
        {name: "vtb", data: [{pv: 10, percent: 11.2}, {pv: 20, percent: 10.9}]},
        {name: "sovcom", data: [{pv: 15, percent: 11.99}]}
    ]

    const [error, setError] = useState('')

    useEffect(() => {
        dispatsh(betSelectionAC(bank.data[0].percent))
    }, [])

    const onChangeBank = (e: SelectChangeEvent<string>, child: ReactNode) => {
        const value = e.target.value
        let actBank = banks.filter(b => b.name === value)
        dispatsh(bankSelectionAC(actBank[0]))
        dispatsh(betSelectionAC(actBank[0].data[0].percent))

    }
    const onChangeBet = (e: SelectChangeEvent<string>, child: ReactNode) => {
        let pvBet = Number(e.target.value)
        setPvPercent(pvBet)
        let actBet = bank.data.filter(bet => bet.pv === pvBet)
        dispatsh(betSelectionAC(actBet[0].percent))
    }

//1.010325  11.766694949
    const changeCreditTerm = (e: ChangeEvent<HTMLInputElement>) => {
        dispatsh(creditTermAC(Number(e.target.value)))
    }

    const InputCostApartmentHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        dispatsh(costApartmentAC(Number(e.target.value)))
    }

    const calculation = () => {
        const pvRub = costApartment * pvPercent / 100
        const onaMortgage = costApartment - pvRub
        const creditTermYear = creditTerm * 12
        const betYear = bet / 12
        const numerator = betYear * Math.pow((1 + betYear), creditTermYear)
        const denominator = Math.pow((1 + betYear), creditTermYear) - 1

        const payment = Math.round(onaMortgage * (numerator / denominator))
        if (costApartment === 0) {
            setError('введите стоимость квартиры')
        }

        dispatsh(calculationAC(pvRub, onaMortgage, payment))

    }


    return (
        <div className={style.container}>
            <div className={style.blok}>
                <div>
                    Выберите банк
                </div>

                {/*<select onChange={onChangeBank}>
                    <option value="alfa">Альфа</option>
                    <option value="vtb">ВТБ</option>
                    <option value="sovcom">Совкомбанк</option>
                </select>*/}
                <FormControl size="small" style={{width: '150px'}}>
                    <InputLabel id="demo-simple-select-label">Банк</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="alfa"
                        onChange={onChangeBank}
                       /* value={bank.name}*/
                    >
                        <MenuItem value="alfa">Альфа</MenuItem>
                        <MenuItem value="vtb">ВТБ</MenuItem>
                        <MenuItem value="sovcom">Совкомбанк</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className={style.blok}>

                Первоначальный взнос

                {/* <select onChange={onChangeBet}>
                    {bank.data.map(pv => <option key={pv.percent} value={pv.pv}>{pv.pv} %</option>)}
                </select>*/}

                <FormControl size="small" style={{width: '150px'}}>
                    <InputLabel id="demo-simple-select-label">ПВ</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        onChange={onChangeBet}
                        disabled={bank.name===''}
                    >
                        {bank.data.map(pv => <MenuItem key={pv.percent} value={pv.pv}>{pv.pv} %</MenuItem>)}

                    </Select>
                </FormControl>

            </div>
            <div className={style.blok}>
                <div>Ставка :</div>
                <div>{bet * 100}% годовых</div>
            </div>
            <div className={style.blok}>
                Стоимость квартиры
                <div>
                    {/* <input className={error?style.error:''} type={'number'}  value={costApartment}
                           onChange={InputCostApartmentHandler}
                    />*/}
                    <TextField
                        error={error !== ''}
                        style={{width: '150px'}}
                        label="Рублей"
                        size="small"
                        value={costApartment}
                        onChange={InputCostApartmentHandler}
                        type={'number'}
                        id="outlined-start-adornment"
                        helperText={error}
                    />
                </div>

            </div>

            <div className={style.blok}>
                <div>Срок кредита</div>
                {/*<input type={'number'}  value={creditTerm} onChange={changeCreditTerm}/>*/}

                <TextField
                    style={{width: '150px'}}
                    label="Лет"
                    size="small"
                    value={creditTerm}
                    onChange={changeCreditTerm}
                    type={'number'}
                    id="outlined-start-adornment"
                />
            </div>
            <div className={style.blok}>
                <div>Первоначальный взнос</div>
                <div>{pvRubFinal} руб</div>
            </div>
            <div className={style.blok}>
                <div>В ипотеку</div>
                <div>{onaMortgageFinal} руб</div>
            </div>
            <div className={style.blok}>
                <div>Ежемесячный платеж</div>
                <div>{paymentFinal} руб</div>
            </div>
            <Button size={"small"} style={{marginTop: "10px"}} variant={'contained'} color={'primary'}
                    onClick={calculation}>Рассчитать</Button>

        </div>
    );
}

export default App;
