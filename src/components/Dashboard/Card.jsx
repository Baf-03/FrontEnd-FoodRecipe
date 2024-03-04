import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
   
  export function CardComp({detail}) {
    const {images,ingredients,recipe_name,steps,_id } = detail
    return (
      <Card className="w-[20rem]">
        <CardHeader shadow={false} floated={false} className="h-[15rem]">
          <img
            src={images[0]}
            alt="card-image"
            className="h-full w-full object-cover bg-blue-gray-300 border"
          />
        </CardHeader>
        <CardBody>
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
              {recipe_name}
            </Typography>
            {/* <Typography color="blue-gray" className="font-medium">
              $95.00
            </Typography> */}
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75 line-clamp-1"
          >
            {ingredients}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            ripple={false}
            fullWidth={true}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            Show Details
          </Button>
        </CardFooter>
      </Card>
    );
  }