import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { createEntryTestSlice } from '../slices'


export const useEntryTestStore = create<ZUSTAND.IEntryTestState>()(
  devtools(
    persist(
      (set, get, api) => ({
        ...createEntryTestSlice(set),
      }),
      { name: 'entryTestAnswers', version: 1 }
    )
  )
)


