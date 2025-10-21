import { authOptions } from "@lib/authOptions";
import { IFigureResponseModel } from "@models/figure/repsonse";
import SelectCharacterPage from "@pages/Starter/Select-character";
import figureService from "@services/figure";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@routes";

async function getFigure() {
  const figure = await figureService.getAllFigures();
  return figure;
}

export default async function SelectCharacter() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(ROUTES.PUBLIC.HOME);
  }
  const figure = (await getFigure()) as IFigureResponseModel;
  console.log('figure', figure);
  

  return <SelectCharacterPage figures={figure.data?.results || []} />;
}
