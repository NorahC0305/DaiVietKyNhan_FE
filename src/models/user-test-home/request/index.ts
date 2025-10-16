import { TEST_ANSWER } from "@constants/test-answer";
import z from "zod";

/**
 * Login form data request
 */
export const userTestHomeRequest = z.object({
    questionId: z.number().optional(),
    answer: z.enum([TEST_ANSWER.ANSWER_SCALE_TYPE.STRONGLY_DISAGREE, TEST_ANSWER.ANSWER_SCALE_TYPE.DISAGREE, TEST_ANSWER.ANSWER_SCALE_TYPE.NEUTRAL, TEST_ANSWER.ANSWER_SCALE_TYPE.AGREE, TEST_ANSWER.ANSWER_SCALE_TYPE.STRONGLY_AGREE]).optional(),
});
export type IUserTestHomeRequest = z.infer<typeof userTestHomeRequest>;
//-----------------End-Login-Request-----------------//