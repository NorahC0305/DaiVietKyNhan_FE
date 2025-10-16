import { IFigureResponseModel } from "@models/figure/repsonse";
import SelectCharacterPage from "@pages/Starter/Select-character";
import figureService from "@services/figure";

async function getFigure() {
  const figure = await figureService.getAllFigures();
  return figure;
}

export default async function SelectCharacter() {
  const figure = (await getFigure()) as IFigureResponseModel;
  return (
    <>
      <SelectCharacterPage figures={figure.data?.results || []} />
    </>
  );
}
