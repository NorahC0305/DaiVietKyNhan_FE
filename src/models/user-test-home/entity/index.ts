import { TEST_ANSWER } from "@constants/test-answer";
import { z } from "zod";

export const UserTestHomeSchema = z.object({
    id: z.number().optional(),
    userId: z.number().optional(),
    questionId: z.number().optional(),
    answer: z.enum([TEST_ANSWER.ANSWER_SCALE_TYPE.STRONGLY_DISAGREE, TEST_ANSWER.ANSWER_SCALE_TYPE.DISAGREE, TEST_ANSWER.ANSWER_SCALE_TYPE.NEUTRAL, TEST_ANSWER.ANSWER_SCALE_TYPE.AGREE, TEST_ANSWER.ANSWER_SCALE_TYPE.STRONGLY_AGREE]).optional(),
    createdById: z.number().nullable().optional(),
    updatedById: z.number().nullable().optional(),
    deletedById: z.number().nullable().optional(),
    deletedAt: z.coerce.date().nullable().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    pointHome: z.boolean().optional(),
    isCompletedLand: z.boolean().optional(),
});
export type IUserTestHome = z.infer<typeof UserTestHomeSchema>;