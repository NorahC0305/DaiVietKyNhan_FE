import { BackendResponseModel } from "@models/backend";
import { UserTestHomeSchema } from "../entity";
import { z } from "zod";

export const UserTestHomeResponseModel = BackendResponseModel(UserTestHomeSchema);
export type IUserTestHomeResponseModel = z.infer<typeof UserTestHomeResponseModel>;