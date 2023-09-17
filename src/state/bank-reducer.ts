type betType = {
    pv: number,
    percent: number
}
export type BankType = {
    name: string,
    data: Array<betType>
}
export type BanksStateType = {
    bet: number,
    costApartment:number,
    bank: BankType
}
export type InitialActionType = bankSelectionType | betSelectionType|costApartmentType

type bankSelectionType = ReturnType<typeof bankSelectionAC>
type betSelectionType = ReturnType<typeof betSelectionAC>
type costApartmentType = ReturnType<typeof costApartmentAC>
let initialState: BanksStateType = {
    bet: 0,
    bank: {name: "alfa", data: [{pv: 10, percent: 12.39}, {pv: 15, percent: 11.89}]},
    costApartment:0
}


export const bankReducer = (state: BanksStateType = initialState, action: InitialActionType) => {
    switch (action.type) {
        case "BANK_SELECTION":
            return {...state, bank: action.bank}
        case "BET_SELECTION":
            return {...state, bet: action.bet}
        case "CHANGE_COST_APARTMENT":
            return {...state,costApartment:action.cost}
        default:
            return state
    }
}


export const bankSelectionAC = (bank: BankType) => {
    return {
        type: "BANK_SELECTION" as const,
        bank
    }
}
export const betSelectionAC = (bet: number) => {
    return {
        type: "BET_SELECTION" as const,
        bet
    }
}

export const costApartmentAC = (cost: number) => {
    return {
        type: "CHANGE_COST_APARTMENT" as const,
        cost
    }
}