import AppLayot from "./component/AppLayout";
import AllRecipes from "./component/AllRecipes";
import ViewRecipeDetails from "./component/ViewRecipeDetails";
import { createBrowserRouter } from "react-router-dom"
import AddRecipe from "./component/AddRecipe";

export const Router1 = createBrowserRouter([
    {
        path: '/',
        element: <AppLayot />,
        errorElement: <>main error</>,
        children: [
            { path: 'AllRecipe', element: <AllRecipes />, children: [{ path: ':id', element: <ViewRecipeDetails /> }] 
        },
        {path:'AddRecipe',element: <AddRecipe />},
        ]
    }
],
)


