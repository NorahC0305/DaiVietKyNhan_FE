import { useEntryTestStore } from '../config'

export const useAnswersSelector = () =>
  useEntryTestStore((state: ZUSTAND.IEntryTestState) => state.answers)

export const useSetAnswer = () =>
  useEntryTestStore((state: ZUSTAND.IEntryTestState) => state.setAnswer)

export const useResetAnswers = () =>
  useEntryTestStore((state: ZUSTAND.IEntryTestState) => state.reset)


