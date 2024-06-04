import { createBrowserRouter } from "react-router-dom";
import { MainPage, RegisterPage, Modulo1, Test1 } from "../pages";
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

            //RUTA MODULOS
            {
                path: 'modulos/:id',
                element: <Modulo1/>,
                
            },
            //RUTA MODULOS
            {
                path: 'modulos/:id/test',
                element: <Test1/>,
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