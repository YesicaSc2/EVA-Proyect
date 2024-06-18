import { Footer } from "../../components/main/Footer";
import { Header } from "../../components/main/Header"
import { Module } from '../../components/main/Module';
import { useState, useEffect } from 'react';
import { ModuleI } from "../../interfaces/ModuleI";
import {Section} from "../../components/main/Section";
import { ModulesData } from "../../models/ModulesData";

export const MainPage = () => {
  const [modules, setModules] = useState<ModuleI[]>([]);

  useEffect(() => {
    setModules(ModulesData);
  }, []);
  
  return (
    <>
      
      <Header />
      <Section/>
      <div className="pb-20 ..."></div>
      <div className="flex gap-9 flex-wrap">
        { modules.map((module) => <Module data={module}/>) };
      </div>
      
      <Footer/>
      
    </>
  

  )
 

}
