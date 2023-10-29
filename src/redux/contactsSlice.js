import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";


const contactsSlice = createSlice({
    name: 'contact',
    initialState: { contacts: [], name: '', number: '' },
    reducers: {
        addName(state, action) {
            state.name = action.payload;
        },
        addNumber(state, action) {
            state.number = action.payload;
        },
        addContacts: {
            reducer(state, action) {
                state.contacts.push(action.payload);
            },
            prepare({ name, number }) {
                return {
                    payload: {
                        name, number, id: nanoid()
                    }
                }
            }
        },
        deleteContact(state, action) {
            const contIndex = state.contacts.findIndex(con => con.id === action.payload)
            state.contacts.splice(contIndex, 1);
        }
    }
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userContacts']
}

export const contactReducer = persistReducer(persistConfig, contactsSlice.reducer);
export const { addName, addNumber, addContacts, deleteContact } = contactsSlice.actions;