import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image } from "@nextui-org/react"
import { Link } from "react-router-dom"
import { ModuleI } from "../../interfaces/ModuleI"

export const Module = ({ data }: { data: ModuleI }) => {
  return (
    <Card className="max-w-[450px]">
      <CardHeader className="flex justify-center">
        <Image
          alt="nextui logo"
          radius="none"
          height="100%"
          src={ data.image }
          width="100%"
          
        />
      </CardHeader>
      <Divider/>
      <CardBody>
        <h4 className="font-bold text-large">{ data.title }</h4>
        <p>{ data.description }</p>
      </CardBody>
      <Divider/>
      <CardFooter className="flex justify-end">
      <Link to="/auth">
        <Button color="primary" variant="flat" size="lg">
          Iniciar
        </Button>
      </Link>
      </CardFooter>
    </Card>
  )
}
