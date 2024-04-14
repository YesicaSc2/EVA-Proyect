import { createBrowserRouter } from "react-router-dom";
import { MainPage, RegisterPage } from "../pages";
import App from "../App";

export const router = createBrowserRouter([
    {
        element: <App/>,
        path: '/',
        children: [
            //RUTA PAGINA PRINCIPAL
            {
                path: 'main',
                element: <MainPage/>,
            }, 

            //RUTA REGISTER
            {
                path: 'auth',
                element: <RegisterPage/>,
                children: [
                    {
                        path: 'register',
                        element: <RegisterPage/>
                    }
                ]
            }
        ]
    }
])