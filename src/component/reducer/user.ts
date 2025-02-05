export type User = {
    id?: number,
    firstName: string,
    lastName: string,
    mail: string,
    password: string,
    address: string,
    phone: string
}

type Action = {
    type: 'CREATE' | 'UPDATE' | 'POP' | 'REMOVE',
    data: Partial<User>
}
export const userRaducer = (state: User, action: Action): User => {
    switch (action.type) {
        case 'CREATE': {
            if (!action.data || Object.keys(action.data).length === 0) {
                console.error('CREATE action requires non-empty data.');
                return state;
            }
            const { id, firstName, password } = action.data;
            return {
                id: id || 0,
                firstName: firstName || '',
                lastName: '',
                mail: '',
                password: password || '',
                address: '',
                phone: ''
            };
        }
        case 'UPDATE': {
            if (!action.data || Object.keys(action.data).length === 0) {
                console.error('UPDATE action requires non-empty data.');
                return state;
            }
            return {
                ...state,
                ...action.data,
            };
        }
        default:
            return state;
    }
};



