import {z} from "zod";
import { LandSchema } from "../entity";
import { BackendPaginationResponseModel } from "@models/backend";

export const LandResponseModel = BackendPaginationResponseModel(LandSchema);
export type ILandResponseModel = z.infer<typeof LandResponseModel>;