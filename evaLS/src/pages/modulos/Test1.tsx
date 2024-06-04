import {useParams} from "react-router-dom";
import { useState, useEffect } from 'react';
import { ModulesData } from "../../models/ModulesData";
import { ModuleI } from "../../interfaces/ModuleI";

export const Test1 = () => {
    const { id } = useParams();
    const [module, setModule] = useState<ModuleI>();

    useEffect(() => {
        setModule(ModulesData.find(module => module.id == Number(id)));
    }, []);
    return(
     <div>
        {module?.title} Test
    </div>
    )
    
}