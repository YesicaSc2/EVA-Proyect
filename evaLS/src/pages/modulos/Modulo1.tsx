import { Header } from "../../components/main/Header";
import { Button, Link } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ModuleI } from "../../interfaces/ModuleI";
import { ModulesData } from "../../models/ModulesData";
import ProgressBar from "../../components/modulos/ProgressBar";

export const Modulo1 = () => {
  const { id } = useParams();
  const [module, setModule] = useState<ModuleI>();

  useEffect(() => {
    setModule(ModulesData.find((module) => module.id === Number(id)));
  }, [id]);

  return (
    <div>
      <Header />
      <ProgressBar />
      <section className="mb-12 md:mb-0">
        <div className="sm:flex">
          <div className="flex-11 py-20">
            <h2 className="text-[100px] leading-none font-bold sm:text-[70px]">{module?.title}</h2>
          </div>
        </div>
      </section>

      <div className="flex flex-col justify-start items-center min-h-screen mt-0">
        <div className="w-full max-w-3xl">
          {module && (
            <iframe
              className="h-96 w-full rounded-lg"
              src={module.video}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          )}
          <div className="flex justify-end mt-4">
            <Link href={`/modulos/${id}/test`}>
              <Button color="primary">Empezar test</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
