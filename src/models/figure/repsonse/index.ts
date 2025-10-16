import { BackendPaginationResponseModel, BackendResponseModel } from "@models/backend";
import { z } from "zod";
import { FigureSchema } from "../entity";

/**
 * Model of FigureData
 */
export const FigureResponseModel = BackendPaginationResponseModel(FigureSchema);
export type IFigureResponseModel = z.infer<typeof FigureResponseModel>;
//----------------------End----------------------//
