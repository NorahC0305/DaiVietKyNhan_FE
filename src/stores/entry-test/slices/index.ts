export const createEntryTestSlice = (
  set: any
): ZUSTAND.IEntryTestState => ({
  answers: {},
  setAnswer: (questionId: number, answerId: number) =>
    set((state: ZUSTAND.IEntryTestState) => ({
      answers: { ...state.answers, [questionId]: answerId },
    })),
  reset: () => set({ answers: {} }),
  houseScores: undefined,
  setHouseScores: (scores) => set({ houseScores: scores }),
});

let set: any;
export const bindSet = (_set: any) => {
  set = _set;
};


