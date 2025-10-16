import { TEST_ANSWER } from "@constants/test-answer";
import { UserTestHomeSchema } from "@models/user-test-home/entity";
import { z } from "zod";

export const TestHomeSchema = z.object({
  id: z.number().optional(),
  text: z.string().optional(),
  testQuestionHomeType: z.enum([TEST_ANSWER.TEST_QUESTION_HOME_TYPE.NORMAL, TEST_ANSWER.TEST_QUESTION_HOME_TYPE.CONVERT]).optional(),
  testType: z
    .enum([
      TEST_ANSWER.TEST_QUESTION_HOME_TRAIT_TYPE.CHOLERIC,
      TEST_ANSWER.TEST_QUESTION_HOME_TRAIT_TYPE.SANGUINE,
      TEST_ANSWER.TEST_QUESTION_HOME_TRAIT_TYPE.MELANCHOLIC,
      TEST_ANSWER.TEST_QUESTION_HOME_TRAIT_TYPE.PHLEGMATIC,
    ])
    .nullable()
    .optional(),
  answer: z.enum([TEST_ANSWER.ANSWER_SCALE_TYPE.STRONGLY_DISAGREE, TEST_ANSWER.ANSWER_SCALE_TYPE.DISAGREE, TEST_ANSWER.ANSWER_SCALE_TYPE.NEUTRAL, TEST_ANSWER.ANSWER_SCALE_TYPE.AGREE, TEST_ANSWER.ANSWER_SCALE_TYPE.STRONGLY_AGREE]).optional(),
  userAnswer: UserTestHomeSchema.optional(),
  createdById: z.number().nullable().optional(),
  updatedById: z.number().nullable().optional(),
  deletedById: z.number().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});
export type ITestHome = z.infer<typeof TestHomeSchema>;
