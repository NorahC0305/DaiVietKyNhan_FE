import { z } from "zod";
import { KyNhanSummarySchema } from "../entity";
import {
  BackendPaginationResponseModel,
  BackendResponseModel,
} from "@models/backend";

/**
 * KyNhan summary response model
 */
export const KyNhanSummaryResponseModel =
  BackendPaginationResponseModel(KyNhanSummarySchema);
export type IKyNhanSummaryResponseModel = z.infer<
  typeof KyNhanSummaryResponseModel
>; //-----------------End-KyNhanSummaryResponseModel-----------------//

/**
 * Create KyNhan summary response model
 */
export const CreateKyNhanSummaryResponseModel =
  BackendResponseModel(KyNhanSummarySchema);
export type ICreateKyNhanSummaryResponseModel = z.infer<
  typeof CreateKyNhanSummaryResponseModel
>; //-----------------End-CreateKyNhanSummaryResponseModel-----------------//
