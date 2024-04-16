import { RegisterForm } from '../../components/auth/RegisterForm';
import imageIconSignLanguage from '../../assets/images/imageIconSignLanguage.jpg';

export const RegisterPage = () => {
  return (
    <section className="container flex  justify-content-justify-content-between  align-center ">
      <RegisterForm/>
      <img src={ imageIconSignLanguage } alt="" />
    </section>
  )
}
