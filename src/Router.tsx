import { createBrowserRouter } from "react-router"
import AppLayot from "./component/AppLayout";
import Person from "./component/Person";
import NavBar from "./component/NavBar";
import Page from "./component/Page";


export const Router1 = createBrowserRouter([
    {
        // path: '/',
        // element: <AppLayot />,
        // children: [{
        //     path: 'about', element: <About />, children: [{ path: 'ruti', element: <>my name is ruti</> }]
        // },
        // { path: 'person/:id', element: <Person /> },
        // { path: '/', element: <Homee /> }
        // ]

        path: '/',
        element: <AppLayot />,
        errorElement: <>main error</>
        , children: [
            { path: 'person/:id', element: <Person /> },
            { path: 'ruti', element: <>my name is ruti</> },
         {  path: '/', element: <NavBar/>},
            { path: 'Page', element: <Page /> },]
    }
],
)


