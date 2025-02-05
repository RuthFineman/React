import { useContext } from "react";
import { UserContext } from "./Homee";
import { Link } from "react-router-dom";

const NavBar = () => {
    const context = useContext(UserContext)

    return (<>
        <nav style={{ position: "fixed", top: "0", right: "0", padding: "20px" }}>
            <Link to='/'>Home</Link>  |
            <Link to='/AllRecipe'> Show the Recipes</Link> |
            {context?.user.id != 0 && <Link to='/AddRecipe'> Add a Recipe</Link>}
        </nav>
    </>)
}
export default NavBar
