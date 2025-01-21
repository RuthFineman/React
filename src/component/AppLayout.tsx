import NavBar from "./NavBar"
import { Outlet } from "react-router"
const AppLayot = () => {


    return (<>

        <div>
            <div><NavBar /></div>
            <div></div>
            <div><Outlet /></div>
        </div>

    </>)
}
export default AppLayot