import { createStore} from "redux";
import {bankReducer} from "./bank-reducer";


export const store =createStore(bankReducer)
export  type RootStateType=ReturnType<typeof bankReducer>