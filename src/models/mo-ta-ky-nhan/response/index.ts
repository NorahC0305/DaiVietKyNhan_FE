import { z } from "zod";
import { MoTaKyNhanSchema } from "../entity";
import { BackendPaginationResponseModel, BackendResponseModel } from "@models/backend";

/**
 * Mo ta ky nhan list response model
 */
export const MoTaKyNhanListResponseModel = BackendPaginationResponseModel(MoTaKyNhanSchema);
export type IMoTaKyNhanListResponseModel = z.infer<typeof MoTaKyNhanListResponseModel>;

/**
 * Mo ta ky nhan detail response model
 */
export const MoTaKyNhanDetailResponseModel = BackendResponseModel(MoTaKyNhanSchema);
export type IMoTaKyNhanDetailResponseModel = z.infer<typeof MoTaKyNhanDetailResponseModel>;
