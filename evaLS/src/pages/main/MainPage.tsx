import { Footer } from "../../components/main/Footer";
import { Header } from "../../components/main/Header"
import { Module } from '../../components/main/Module';
import { useState, useEffect } from 'react';
import { ModuleI } from "../../interfaces/ModuleI";
import {Section} from "../../components/main/Section";
import { ModulesData } from "../../models/ModulesData";
// import uno from '../../assets/images/1.jpg';
// import dos from '../../assets/images/2.jpg';
// import tres from '../../assets/images/3.jpg';
// import cuatro from '../../assets/images/4.jpg';
// import repaso from '../../assets/images/repaso2.jpg';
// import desafio from '../../assets/images/desafio.jpg';



export const MainPage = () => {
  const [modules, setModules] = useState<ModuleI[]>([]);

  useEffect(() => {
    setModules(ModulesData);
  }, []);
  
  // const data: { title: string, description: string } = {title: '', description: ''};
  // const modules: ModuleI[] = [
  //   { 
  //     title: 'Modulo 1',
  //     description: 'Este modulo sera una introducción y guía.',
  //     image: uno
  //   },
  //   { 
  //     title: 'Modulo 2',
  //     description: 'Este modulo abarcará números.',
  //     image: dos
  //   },
  //   { 
  //     title: 'Modulo 3',
  //     description: 'Este modulo abarcará letras.',
  //     image: tres
  //   },
  //   { 
  //     title: 'Modulo 4',
  //     description: 'Este modulo abarcará palabras.',
  //     image: cuatro
  //   },
  //   { 
  //     title: 'Repaso',
  //     description: 'Repasa las dudas que tengas.',
  //     image: repaso
  //   },
  //   { 
  //     title: 'Desafio ',
  //     description: 'Desafiate a ti mismo con tests.',
  //     image: desafio
  //   },
  // ];
  return (
    <>
      
      <Header />
      <Section/>
      <div className="pb-20 ..."></div>
      <div className="flex gap-9 flex-wrap">
        {/* <Module module={data}/> */}
        {/* <Module/>
        <Module/>
        <Module/> */}
        { modules.map((module) => <Module data={module}/>) };
      </div>
      
      <Footer/>
      
    </>
  

  )
 

}
