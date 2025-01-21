import { Link } from "react-router"
const NavBar = () => {
    const name = "ruti";
    return (<>

        <nav>
            <Link to='/'>Home</Link>  |
            <Link to={`/Person/${name}`}>Person</Link> |
            <Link to='/Page'>Page</Link>

        </nav>
    </>)
}
export default NavBar



