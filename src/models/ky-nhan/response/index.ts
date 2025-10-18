import { z } from "zod";
import { KyNhanSummarySchema, KyNhanSchema } from "../entity";
import { BackendPaginationResponseModel } from "@models/backend";

/**
 * KyNhan summary response model
 */
export const KyNhanSummaryResponseModel =
  BackendPaginationResponseModel(KyNhanSummarySchema);
export type IKyNhanSummaryResponseModel = z.infer<
  typeof KyNhanSummaryResponseModel
>; //-----------------End-KyNhanSummaryResponseModel-----------------//

/**
 * KyNhan response model
 */
export const KyNhanResponseModel =
  BackendPaginationResponseModel(KyNhanSchema);
export type IKyNhanResponseModel = z.infer<
  typeof KyNhanResponseModel
>; //-----------------End-KyNhanResponseModel-----------------//
