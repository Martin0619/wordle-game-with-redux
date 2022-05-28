import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WordleSliceObj {
	positionLookup: { [position: number]: string }
	letterLookup: { [letter: string]: number[] }
	currentGuess: string
	hasWon: boolean
	isGameOver: boolean
	wordleTable: { [userGuess: string]: number[] }
	totalGuesses: number
	maxGuessesAllowed: number
	secretWord: string
}

const initialState: WordleSliceObj = {
	// empty out after validating it
	currentGuess: '',
	hasWon: false,
	isGameOver: false,
	// used internally since 'currentGuess' can be empty
	// look-up for letters in the secret word.
	// [letter] <- array of positions where that letter is present in the secret word
	letterLookup: {},
	// look-up for position in the secret word.
	// [position] <- letter in the secret word. Useful for chicking whether a letter is at its correct position
	positionLookup: {},
	// look-up for user guess
	// [guess] <- array of letter's position state (e.g. -1 indicates letter is present but out of position, 0 letter is not present, and 1 present and at its position)
	wordleTable: {},
	maxGuessesAllowed: -1,
	totalGuesses: 0,
	secretWord: '',
}

const wordleReducer = createSlice({
	name: 'wordle',
	initialState,
	reducers: {
		// increment total guesses
		incrementTotalGuesses: (state) => {
			state.totalGuesses++
		},
		// set max guesses allowed in the game
		setMaxGuessesAllowed: (state, action: PayloadAction<number>) => {
			state.maxGuessesAllowed = action.payload
		},
		// set current guess
		setCurrentGuess: (state, action: PayloadAction<string>) => {
			const currentUserGuess = action.payload
			state.currentGuess = currentUserGuess.toLowerCase()
		},
		// set secret word
		setSecretWord: (state, action: PayloadAction<string>) => {
			const secretWord = action.payload.toLowerCase()
			state.secretWord = secretWord
			// setup letter and position lookups
			for (let i = 0; i < secretWord.length; i++) {
				const letterPosition = i
				const letter = secretWord[letterPosition]
				state.letterLookup[letter] = [
					...(state.letterLookup[letter] ?? []),
					letterPosition,
				]
				state.positionLookup[letterPosition] = letter
			}
		},
		// check if the guess is the correct word
		checkForWinningState: (state) => {
			// increment
			state.totalGuesses++
			let hasWon = true
			const currentGuess = state.currentGuess
			const letterPositionsState = state.wordleTable[currentGuess] ?? []

			for (let i = 0; i < currentGuess.length; i++) {
				const letter = currentGuess[i]
				const DOES_LETTER_EXISTS = state.letterLookup[letter] ? true : false
				const IS_LETTER_AT_CORRECT_POSITION = state.positionLookup[i] === letter

				if (DOES_LETTER_EXISTS && IS_LETTER_AT_CORRECT_POSITION) {
					letterPositionsState.push(1)
				} else if (DOES_LETTER_EXISTS && !IS_LETTER_AT_CORRECT_POSITION) {
					letterPositionsState.push(-1)
					hasWon = false
				} else {
					letterPositionsState.push(0)
					hasWon = false
				}
			}
			const IS_GAME_OVER = state.totalGuesses === state.maxGuessesAllowed
			if (hasWon) {
				state.hasWon = true
				state.isGameOver = true
			} else if (IS_GAME_OVER) {
				state.isGameOver = true
			}
			state.wordleTable[currentGuess] = letterPositionsState
		},
		// reset the game
		reset: (state) => {
			state.currentGuess = ''
			state.hasWon = false
			state.isGameOver = false
			state.totalGuesses = 0
			state.wordleTable = {}
		},
	},
})

export default wordleReducer
export const {
	checkForWinningState,
	incrementTotalGuesses,
	setCurrentGuess,
	setMaxGuessesAllowed,
	setSecretWord,
	reset,
} = wordleReducer.actions
