import { Button, Input } from "@nextui-org/react"
import { FaUser } from "react-icons/fa"


export const RegisterForm = () => {


    return (

        <div className=" register-form items-center max-w-md mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
            <div className="flex flex-col items-center justify-center mb-5">
                <h2 className="text-2xl font-bold mb-4" style={{ color: 'black' }}>Registro de Usuario</h2>
                <span
                    className="inline-block text-primary" 
                    style={{ fontSize: '150px' }}
                ><FaUser /></span>

            </div>
            <form >
                <div className="mb-4">
                    <Input
                        color="primary"
                        label="Nombre completo"
                        className="inputRegister"
                        style={{ color: 'black' }}
                        
                        
                    />
                </div>
                <div className="mb-4">
                    <Input
                        color="primary"
                        label="Correo electrónico"
                        type="email"
                        className="inputRegister"
                        style={{ color: 'black' }}
                    />
                </div>
                <div className="mb-6">
                    <Input
                        color="primary"
                        label="Contraseña"
                        type="password"
                        className="inputRegister"
                        style={{ color: 'black' }}
                    />
                </div>
                <Button className="font-bold" color="primary" type="submit" fullWidth>
                    Registrarse
                </Button>
            </form>
        </div>

    )
}
