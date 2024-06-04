import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image } from "@nextui-org/react"
import { Link } from "react-router-dom"
import { ModuleI } from "../../interfaces/ModuleI"

export const Module = ({ data }: { data: ModuleI }) => {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex justify-center">
        <Image
          alt="nextui logo"
          radius="none"
          height="70%"
          src={ data.image }
          width="70%"
          
        />
      </CardHeader>
      <Divider/>
      <CardBody>
        <h4 className="font-bold text-large">{ data.title }</h4>
        <p>{ data.description }</p>
      </CardBody>
      <Divider/>
      <CardFooter className="flex justify-end">
      <Link to={`/modulos/${data.id}`}>
        <Button color="primary" variant="flat" size="lg">
          Iniciar
        </Button>
      </Link>
      </CardFooter>
    </Card>
  )
}