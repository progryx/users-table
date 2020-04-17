import { InferActionTypes } from "./redux-store";
import { MockData } from "./mockData";

type ActionTypes = InferActionTypes<typeof actions>

export type TableData = {
    items: Array<{
        id: string
        firstName: string
        lastName: string
        age: number
        checked: boolean
    }>
    isSelectedAll: boolean
}

const NO_DATA_AVAILABLE = 'No data available'

export const actions = {
    setError: () => ({type: 'SET_ERROR'} as const),
    setUsers: (users: MockData) => ({type: 'SET_USERS', payload: { users }} as const),
    getUsers: () => ({type: 'GET_USERS'} as const),
    selectUser: (id: string) => ({type: 'SELECT_USER', payload: { id }} as const),
    selectAllUsers: (selected: boolean) => ({type: 'SELECT_ALL_USERS', payload: { selected }} as const)
}

const initialState: {
    table: TableData,
    serverMessage: string
} = {
    table: {
        items: [],
        isSelectedAll: false,
    },
    serverMessage: ''
};

const generateId = (): string =>
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

export const mainReducer = (state = initialState, action: ActionTypes) => {
    switch (action.type) {

        default: {
            return state;
        }

        case 'SET_ERROR': {
            return {
                ...state,
                serverMessage: NO_DATA_AVAILABLE
            }
        }

        case 'SELECT_USER': {
            const items = state.table.items.map(user => user.id === action.payload.id
                ? { ...user, checked: !user.checked }
                : user
            )
            const isSelectedAll = items.every(user => user.checked)
            return {
                ...state,
                table: {
                    ...state.table,
                    items,
                    isSelectedAll,
                },
                selectedUsers: state.table.items.filter(user => user.checked).map(user => user.firstName),
            }
        }

        case 'SELECT_ALL_USERS': {
            return {
                ...state,
                table: {
                    items: state.table.items.map(user => action.payload.selected
                        ? {...user, checked: true}
                        : {...user, checked: false}
                    ),
                    isSelectedAll: action.payload.selected
                }
            }
        }

        case 'SET_USERS': {
            return {
                ...state,
                table: {
                    ...state.table,
                    items: action.payload.users.map((row) => ({
                        id: generateId(),
                        firstName: row.firstName,
                        lastName: row.lastName,
                        age: row.age,
                        checked: false
                    }))
                }
            }
        }
    }
};