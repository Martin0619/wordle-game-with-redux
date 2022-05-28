import { configureStore } from '@reduxjs/toolkit'
import wordleReducer from '../features/wordle.slice'

const store = configureStore({
	reducer: {
		wordle: wordleReducer.reducer,
	},
})

export default store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
