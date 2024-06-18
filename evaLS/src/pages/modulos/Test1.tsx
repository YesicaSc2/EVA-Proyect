import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { ModulesData } from "../../models/ModulesData";
import { ModuleI } from "../../interfaces/ModuleI";
import { Header } from "../../components/main/Header";
import { Button } from "@nextui-org/react";
import ProgressBar from "../../components/modulos/ProgressBar";

export const Test1 = () => {
    const { id } = useParams();
    const [module, setModule] = useState<ModuleI>();
    const navigate = useNavigate();

    useEffect(() => {
        setModule(ModulesData.find(module => module.id === Number(id)));
    }, [id]);

    const handleNextLesson = () => {
        const currentProgress = localStorage.getItem('progress') ?? 0;
        localStorage.setItem('progress', `${Number(currentProgress) + 10}`);
        const nextId = Number(id) + 1;
        if (nextId <= ModulesData.length) {
            navigate(`/modulos/${nextId}`);
        } else {
            navigate(`/modulos/1`); // Redirigir 
        }
    };

    return (
        <div>
            <Header />
            <ProgressBar />
            <section className="mb-12 md:mb-0">
                <div className="sm:flex">
                    <div className="flex-11 py-20">
                        <h2 className="text-[100px] leading-none font-bold sm:text-[70px]">{module?.title} Test</h2>
                    </div>
                </div>
            </section>
            <div className="flex flex-col justify-start items-center min-h-screen mt-0">
                <div className="w-full max-w-3xl">
                    <Button color="primary" onClick={handleNextLesson}>Siguiente lección</Button>
                </div>
            </div>
        </div>
    );
}
