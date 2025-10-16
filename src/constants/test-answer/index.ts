const AnswerScaleType = {
  STRONGLY_DISAGREE: "STRONGLY_DISAGREE",
  DISAGREE: "DISAGREE",
  NEUTRAL: "NEUTRAL",
  AGREE: "AGREE",
  STRONGLY_AGREE: "STRONGLY_AGREE",
} as const;

const TestQuestionHomeTraitType = {
  CHOLERIC: "CHOLERIC",
  SANGUINE: "SANGUINE",
  MELANCHOLIC: "MELANCHOLIC",
  PHLEGMATIC: "PHLEGMATIC",
} as const;

const TestQuestionHomeType = {
  NORMAL: "NORMAL",
  CONVERT: "CONVERT",
} as const;

export const TEST_ANSWER= {
  ANSWER_SCALE_TYPE: AnswerScaleType,
  TEST_QUESTION_HOME_TRAIT_TYPE: TestQuestionHomeTraitType,
  TEST_QUESTION_HOME_TYPE: TestQuestionHomeType,
};
