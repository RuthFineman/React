import { useContext, useRef, useState } from "react"
import { UserContext } from "./Homee";
import axios from "axios";

const Update = () => {
    const [updateClick, setUpdateClick] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const context = useContext(UserContext)
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);
        try {
            const res = await axios.put('http://localhost:3000/api/user/', {
                lastName: lastNameRef.current?.value,
                email: emailRef.current?.value,
                address: addressRef.current?.value,
                phone: phoneRef.current?.value,
            }, { headers: { 'user-id': context?.user.id }, })
            
            if (context?.user) {
                setUpdateClick(false)
                context.userDispatch({ type: 'UPDATE', data: res.data.user })
                alert('השינויים נשמרו בהצלחה!')
            }
        } catch (e: any) {
            if (e.status === 401) alert('משתמש לא קיים');
            console.log(e);
        } finally {
            setIsUpdating(false);
        }
    }
    return (
        <>
            {/* כפתור לעדכון פרטים ממורכז עם צבע אפור */}
            {!updateClick && (
                <button 
                    style={{
                        position: 'absolute', 
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)', // ממורכז במדויק
                        padding: '10px 20px', 
                        backgroundColor: '#888', // גוון אפור
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }} 
                    onClick={() => setUpdateClick(true)} 
                >
                    לעדכון פרטים
                </button >
            )}

            {/* הצגת הטופס כאשר נלחץ */}
            {updateClick && 
                <form 
                    onSubmit={handleSubmit} 
                    style={{
                        display: 'flex', 
                        flexDirection: 'column', 
                        width: '300px', 
                        marginTop: '20px', 
                        padding: '20px', 
                        border: '1px solid #ddd', 
                        borderRadius: '8px',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)' // ממורכז במדויק
                    }}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>שם משפחה:</label>
                        <input name="lastName" ref={lastNameRef} style={{ width: '100%', padding: '8px', borderRadius: '4px' }} />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>מייל:</label>
                        <input name="email" ref={emailRef} style={{ width: '100%', padding: '8px', borderRadius: '4px' }} />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>כתובת:</label>
                        <input id="address" ref={addressRef} style={{ width: '100%', padding: '8px', borderRadius: '4px' }} />
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <label>טלפון:</label>
                        <input name="phone" ref={phoneRef} style={{ width: '100%', padding: '8px', borderRadius: '4px' }} />
                    </div>
                    <button 
                        type="submit" 
                        style={{
                            padding: '10px 20px', 
                            backgroundColor: '#888', // צבע אפור
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '5px', 
                            cursor: 'pointer'
                        }} 
                        disabled={isUpdating}>
                        {isUpdating ? 'ממתין...' : 'שמור שינויים'}
                    </button>
                </form>
            }
        </>
    )
}

export default Update;


