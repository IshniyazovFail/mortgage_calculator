import {bankReducer, bankSelectionAC, betSelectionAC} from "./bank-reducer";

test("test for selection bank", () => {
    let startState = {
        bet: 0,
        costApartment:0,
        bank: {name: "alfa", data: [{pv: 10, percent: 12.39}, {pv: 15, percent: 11.89}]}
    }

    let newBank = {name: "vtb", data: [{pv: 10, percent: 11.2}, {pv: 20, percent: 10.9}]}
    let endState = bankReducer(startState, bankSelectionAC(newBank))

    expect(endState.bank.name).toBe('vtb')


})

test("test for selection bet", () => {
    let startState = {
        bet: 0,
        costApartment:0,
        bank: {name: "alfa", data: [{pv: 10, percent: 12.39}, {pv: 15, percent: 11.89}]}

    }

    let endState = bankReducer(startState, betSelectionAC(10))

    expect(endState.bet).toBe(10)


})