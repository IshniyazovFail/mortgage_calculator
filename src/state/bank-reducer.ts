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
    bank: BankType,
    creditTerm:number,
    pvRubFinal:number,
    onaMortgageFinal:number,
    paymentFinal:number
}
export type InitialActionType = bankSelectionType | betSelectionType|costApartmentType|creditTermType|calculationType|pvRubFinalType

type bankSelectionType = ReturnType<typeof bankSelectionAC>
type betSelectionType = ReturnType<typeof betSelectionAC>
type costApartmentType = ReturnType<typeof costApartmentAC>
type creditTermType = ReturnType<typeof creditTermAC>
type calculationType = ReturnType<typeof calculationAC>
type pvRubFinalType=ReturnType<typeof pvRubFinalAC>
let initialState: BanksStateType = {
    bet: 0,
    /*bank: {name: "alfa", data: [{pv: 10, percent: 12.39}, {pv: 15, percent: 11.89}]},*/
    bank: {name: "", data: [ {pv: 0, percent: 0}]},
    costApartment:0,
    creditTerm:20,
    pvRubFinal:0,
    onaMortgageFinal:0,
    paymentFinal:0

}


export const bankReducer = (state: BanksStateType = initialState, action: InitialActionType) => {
    switch (action.type) {
        case "BANK_SELECTION":
            return {...state, bank: action.bank}
        case "BET_SELECTION":
            return {...state, bet: action.bet/100}
        case "CHANGE_COST_APARTMENT":
            return {...state,costApartment:action.cost}
        case "CHANGE_CREDIT_TERM":
            return {...state,creditTerm:action.creditTerm}
        case "CALCULATION":
            return {...state,onaMortgageFinal:action.onaMortgageFinal,paymentFinal:action.paymentFinal}
        case "CHANGE_PV":
            return {...state,pvRubFinal:action.pvRubFinal}
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
export const creditTermAC = (creditTerm: number) => {
    return {
        type: "CHANGE_CREDIT_TERM" as const,
        creditTerm
    }
}

export const pvRubFinalAC=(pvRubFinal:number)=>{
    return{
        type:"CHANGE_PV" as const ,
        pvRubFinal
    }
}
export const calculationAC = (
                              onaMortgageFinal:number,
                              paymentFinal:number) => {
    return {
        type: "CALCULATION" as const,
        onaMortgageFinal,
        paymentFinal    }
}