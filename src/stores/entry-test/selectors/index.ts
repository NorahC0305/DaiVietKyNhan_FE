import { useEntryTestStore } from '../config'

export const useAnswersSelector = () =>
  useEntryTestStore((state: ZUSTAND.IEntryTestState) => state.answers)

export const useSetAnswer = () =>
  useEntryTestStore((state: ZUSTAND.IEntryTestState) => state.setAnswer)

export const useResetAnswers = () =>
  useEntryTestStore((state: ZUSTAND.IEntryTestState) => state.reset)

export const useHouseScoresSelector = () =>
  useEntryTestStore((state: ZUSTAND.IEntryTestState) => state.houseScores)

export const useSetHouseScores = () =>
  useEntryTestStore((state: ZUSTAND.IEntryTestState) => state.setHouseScores)


