import { BackendPaginationResponseModel } from "@models/backend";
import { TestHomeSchema } from "../entity";
import { z } from "zod";

export const TestHomeResponseModel = BackendPaginationResponseModel(TestHomeSchema);
export type ITestHomeResponseModel = z.infer<typeof TestHomeResponseModel>;