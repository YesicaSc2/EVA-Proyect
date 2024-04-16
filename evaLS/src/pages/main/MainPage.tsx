import { Footer } from "../../components/main/Footer";
import { Header } from "../../components/main/Header"
import { Module } from '../../components/main/Module';

export const MainPage = () => {
  return (
    <>
      <Header />
      <div>
        <Module/>
        <Module/>
        <Module/>
        <Module/>
      </div>

      <Footer/>
    </>


  )
}
