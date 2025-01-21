export type User = {
    id?: string,
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
        case 'CREATE': {
            // בדיקה האם action.data מוגדר ואינו אובייקט ריק
            if (!action.data || Object.keys(action.data).length === 0) {
                console.error('CREATE action requires non-empty data.');
                return state; // מחזיר את המצב הנוכחי אם אין נתונים
            }
            const { id, firstName, password } = action.data;
            return {
                id: id || '',
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



