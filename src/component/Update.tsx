import { useContext, useRef, useState } from "react"
import { UserContext } from "./Homee";

document.body.style.overflow = 'hidden';
const Update = () => {
    const [updateClick, setUpdateClick] = useState(false)
    const context = useContext(UserContext)
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
  
    const handleSubmit = () => {
    if (context) {
        context.userDispatch({
            type: 'UPDATE', data: {
                lastName: lastNameRef.current?.value || '',
                email: emailRef.current?.value || '',
                addres: addressRef.current?.value || '',
                phone: phoneRef.current?.value || ''
            }
        })
    }
}
    return (
        <>
            <button style={{
                top: '70px',
                left: '20px'
            }} onClick={() => setUpdateClick(true)}>לעדכון פרטים</button >
 
           {updateClick&& <form onSubmit={handleSubmit}>
                <div >
                    <label >שם משפחה:</label>
                    <input name="lastName"ref={lastNameRef} />
                </div>
                <div >
                    <label >מייל:</label>
                    <input name="email"ref={emailRef}/>
                </div>
                <div >
                    <label >כתובת:</label>
                    <input id="address"ref={addressRef}
                    />
                </div>
                <div >
                    <label >טלפון:</label>
                    <input name="phone"ref={phoneRef}/>
                </div>
                <button type="submit">שמור שינויים</button>
            </form>}
        </>
    )
}
export default Update


