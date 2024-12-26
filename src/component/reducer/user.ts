export type User = {
    firstName: string,
    lastName: string,
    mail: string,
    password: string,
    address: string,
    phone: string
}

type Action = {
    type: 'CREATE' | 'UPDATE' | 'POP' | 'REMOVE',
    //מכיל את היוזר החדש
    data: Partial<User>
}

export const userRaducer = (state: User, action: Action): User => {
    switch (action.type) {
        case 'CREATE':
            const { firstName, password } = action.data as Partial<User>
            return {
                firstName: firstName || '',
                lastName: '', mail: '',
                password: password || '',
                address: '', phone: ''
            }
        case 'UPDATE':
            return {
                firstName: state.firstName,
                lastName: action.data.lastName || state.lastName,
                password: state.password,
                mail: action.data.mail || state.mail,
                address: action.data.address || state.address,
                phone: action.data.phone || state.phone,
            }
        default:
            return state;
    }
}



