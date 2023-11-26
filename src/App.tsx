import React, {ChangeEvent, useState} from 'react';
import style from './app.module.css';
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./state/store";
import {
    bankSelectionAC, banksSelectionAC,
    BankType,
    betSelectionAC,
    calculationAC,
    costApartmentAC,
    creditTermAC,
    pvRubFinalAC
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
    const banks=useSelector<RootStateType,Array<BankType>>(state=>state.banks)
    const dispatsh = useDispatch()


   /* const banks1 = [
        {name: "alfa", data: [{pv: 10, percent: 12.39}, {pv: 15, percent: 11.89}]},
        {name: "vtb", data: [{pv: 10, percent: 11.2}, {pv: 20, percent: 10.9}]},
        {name: "sovcom", data: [{pv: 15, percent: 11.99}]}
    ]*/
    const state = [
        {
            banksProgramm: 'Семейная',
            banks: [
                {name: "Альфа-банк", data: [{pv: 30, percent: 5.8}]},
                {name: "ВТБ", data: [{pv: 20, percent: 6}]},
                {name: "АкБарсБанк", data: [{pv: 20, percent: 5.8}]},
                {name: "Сбербанк", data: [{pv: 20, percent: 6}]},
                {name: "Дом рф", data: [{pv: 20, percent: 5.8}]},
                {name: "Открытие", data: [{pv: 20, percent: 5.89},{pv: 30, percent: 5.69}]},
                {name: "ПСБ", data: [{pv: 20, percent: 5.9}]},
            ]
        },
        {
            banksProgramm: 'Господдержка',
            banks: [
                {name: "Альфа-банк", data: [{pv: 30, percent: 8}]},
                {name: "ВТБ", data: [{pv: 20, percent: 8}]},
                {name: "АкБарсБанк", data: [{pv: 20, percent: 7.8}]},
                {name: "Сбербанк", data: [{pv: 20, percent: 8}]},
                {name: "Дом рф", data: [{pv: 20, percent: 7.8}]},
                {name: "Открытие", data: [{pv: 20, percent: 7.89},{pv: 30, percent: 7.89}]},


            ]
        },
        {
            banksProgramm: 'IT',
            banks: [
                {name: "Альфа-банк", data: [{pv: 30, percent: 4.8}]},
                {name: "ВТБ", data: [{pv: 20, percent: 5}]},
                {name: "АкБарсБанк", data: [{pv: 20, percent: 4.8}]},
                {name: "Сбербанк", data: [{pv: 20, percent: 5}]},
                {name: "Дом рф", data: [{pv: 20, percent: 4.6}]},

            ]
        },
        {
            banksProgramm: 'Стандартная',
            banks: [
                {name: "Альфа-банк", data: [{pv: 30, percent: 17.09}]},
                {name: "ВТБ", data: [{pv: 20, percent: 17.10}]},
                {name: "АкБарсБанк", data: [{pv: 20, percent:16.6}]},
                {name: "Сбербанк", data: [{pv: 10, percent: 19.4},{pv: 20, percent: 18.4}]},
                {name: "Дом рф", data: [{pv: 20, percent: 4.6}]},
                {name: "ПСБ", data: [{pv: 30, percent: 17}]},

            ]
        },
        {
            banksProgramm: 'Сельская',
            banks: [
                {name: "Россельхоз", data: [{pv: 20, percent: 3}]},
            ]
        },

    ]


    const [error, setError] = useState('')
    const [errorPv, setErrorPv] = useState('')

    /*    useEffect(() => {
            dispatsh(betSelectionAC(bank.data[0].percent))
        },[bank.data])*/


    const onChangeProgrammBank=(e: SelectChangeEvent)=>{
        const value = e.target.value
        let actBanks=state.filter(s=>s.banksProgramm===value)
        dispatsh(banksSelectionAC(actBanks[0].banks))
    }
    const onChangeBank = (e: SelectChangeEvent,) => {
        const value = e.target.value
        let actBank = banks.filter(b => b.name === value)
        dispatsh(bankSelectionAC(actBank[0]))
        dispatsh(betSelectionAC(actBank[0].data[0].percent))

    }
    const onChangeBet = (e: SelectChangeEvent,) => {
        let pvBet = Number(e.target.value)
        /*setPvPercent(pvBet)*/
        let actBet = bank.data.filter(bet => bet.pv === pvBet)
        dispatsh(betSelectionAC(actBet[0].percent))
    }

//1.010325  11.766694949
    const changeCreditTerm = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        dispatsh(creditTermAC(Number(e.target.value)))
    }

    const InputCostApartmentHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        dispatsh(costApartmentAC(Number(e.target.value)))
    }
    const InputPvRubFinalHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        dispatsh(pvRubFinalAC(Number(e.target.value)))
    }

    const calculation = () => {
        /*  const pvRub = costApartment * pvPercent / 100*/
        const onaMortgage = costApartment - pvRubFinal
        const creditTermYear = creditTerm * 12
        const betYear = bet / 12
        const numerator = betYear * Math.pow((1 + betYear), creditTermYear)
        const denominator = Math.pow((1 + betYear), creditTermYear) - 1

        const payment = Math.round(onaMortgage * (numerator / denominator))
        if (costApartment === 0) {
            setError('укажите стоимость квартиры')
        }
        if (pvRubFinal === 0) {
            setErrorPv('укажите первоначальный взнос')
        }

        dispatsh(calculationAC(onaMortgage, payment))

    }


    return (
        <div className={style.container}>
            <div className={style.name}>
                ЗЕЛЁНАЯ СЛАБОДА
            </div>
            <div className={style.blok}>
                <div className={style.title}>
                    Выберите программу
                </div>

                {/*<select onChange={onChangeBank}>
                    <option value="alfa">Альфа</option>
                    <option value="vtb">ВТБ</option>
                    <option value="sovcom">Совкомбанк</option>
                </select>*/}
                 <FormControl size="small" style={{width: '150px', color: 'black'}}>
                        <InputLabel id="demo-simple-select-label">Программа</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="alfa"
                            onChange={onChangeProgrammBank}
                            /* value={bank.name}*/
                        >

                            {state.map((el)=> <MenuItem value={el.banksProgramm}>{el.banksProgramm}</MenuItem>)}
                        </Select>
                    </FormControl>


            </div>
            <div className={style.blok}>
                <div className={style.title}>
                    Выберите банк
                </div>

                {/*<select onChange={onChangeBank}>
                    <option value="alfa">Альфа</option>
                    <option value="vtb">ВТБ</option>
                    <option value="sovcom">Совкомбанк</option>
                </select>*/}
                <FormControl size="small" style={{width: '150px', color: 'black'}}>
                    <InputLabel id="demo-simple-select-label">Банк</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="alfa"
                        onChange={onChangeBank}
                        disabled={banks[0].name === ''}
                        /* value={bank.name}*/
                    >
                        {banks.map(bank=> <MenuItem value={bank.name}>{bank.name}</MenuItem>)}
                       {/* <MenuItem value="alfa">Альфа</MenuItem>
                        <MenuItem value="vtb">ВТБ</MenuItem>
                        <MenuItem value="sovcom">Совкомбанк</MenuItem>*/}
                    </Select>
                </FormControl>
            </div>

            <div className={style.blok}>
                <div className={style.title}>
                    Первоначальный взнос в %
                </div>

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
                        disabled={bank.name === ''}
                    >
                        {bank.data.map(pv => <MenuItem key={pv.percent} value={pv.pv}>{pv.pv} %</MenuItem>)}

                    </Select>
                </FormControl>

            </div>
            <div className={style.blok}>
                <div className={style.title}>Ставка :</div>
                <div className={style.title}>{bet * 100}% годовых</div>
            </div>
            <div className={style.blok}>
                <div className={style.title}>
                    Стоимость квартиры
                </div>
                <div>
                    {/* <input className={error?style.error:''} type={'number'}  value={costApartment}
                           onChange={InputCostApartmentHandler}
                    />*/}
                    <TextField
                        error={error !== ''}
                        style={{width: '150px'}}
                        label="Рублей"
                        type={'number'}
                        size="small"
                        value={costApartment.toString()}
                        onChange={InputCostApartmentHandler}
                        id="outlined-start-adornment"
                        helperText={error}
                    />
                </div>

            </div>

            <div className={style.blok}>
                <div className={style.title}>
                    Первоначальный взнос
                </div>
                <div>
                    <TextField
                        type={'number'}
                        error={errorPv !== ''}
                        style={{width: '150px'}}
                        label="Рублей"
                        size="small"
                        value={pvRubFinal.toString()}
                        onChange={InputPvRubFinalHandler}
                        id="outlined-start-adornment"
                        helperText={errorPv}
                    />
                </div>

            </div>
            <div className={style.blok}>
                <div className={style.title}>Срок кредита</div>
                {/*<input type={'number'}  value={creditTerm} onChange={changeCreditTerm}/>*/}

                <TextField
                    style={{width: '150px'}}
                    label="Лет"
                    size="small"
                    value={creditTerm.toString()}
                    onChange={changeCreditTerm}
                    type={'number'}
                    id="outlined-start-adornment"
                />
            </div>
            {/* <div className={style.blok}>
                <div>Первоначальный взнос</div>
                <div>{pvRubFinal} руб</div>
            </div>*/}
            <div className={style.blok}>
                <div className={style.title}>В ипотеку</div>
                <div className={style.number}>{onaMortgageFinal} руб</div>
            </div>
            <div className={style.blok}>
                <div className={style.title}>Ежемесячный платеж</div>
                <div className={style.number}>{paymentFinal} руб</div>
            </div>
            <Button size={"small"} style={{marginTop: "10px"}} variant={'contained'} color={'success'}
                    onClick={calculation}>Рассчитать</Button>

        </div>
    );
}

export default App;
