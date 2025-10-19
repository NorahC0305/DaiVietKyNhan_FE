import { z } from "zod";
import { KyNhanSummarySchema, KyNhanSchema, KyNhanUserSchema } from "../entity";
import { BackendPaginationResponseModel, BackendResponseModel } from "@models/backend";

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

/**
 * KyNhan user list response model
 */
export const KyNhanUserListResponseModel = z.object({
  statusCode: z.number(),
  data: z.array(KyNhanUserSchema),
  message: z.string(),
});
export type IKyNhanUserListResponseModel = z.infer<
  typeof KyNhanUserListResponseModel
>; //-----------------End-KyNhanUserListResponseModel-----------------//
