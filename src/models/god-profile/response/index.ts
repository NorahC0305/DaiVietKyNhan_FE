import { BackendResponseModel } from "@models/backend";
import { GodProfileSchema } from "../entity";
import { z } from "zod";

export const GodProfileResponseModel = BackendResponseModel(GodProfileSchema);
export type IGodProfileResponseModel = z.infer<typeof GodProfileResponseModel>;