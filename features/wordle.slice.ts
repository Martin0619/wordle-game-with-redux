import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface WordleSliceObj {
	positionLookup: { [position: number]: string }
	letterLookup: { [letter: string]: number[] }
	currentGuess: string
	hasWon: boolean
	isGameOver: boolean
	wordleTable: Array<{ letter: string; state: number }[]>
	totalGuesses: number
	maxGuessesAllowed: number
	secretWord: string
}

const initialState: WordleSliceObj = {
	currentGuess: '',
	hasWon: false,
	isGameOver: false,
	// look-up for letters in the secret word.
	// [letter] <- array of positions where that letter is present in the secret word
	letterLookup: {},
	// look-up for position in the secret word.
	// [position] <- letter in the secret word. Useful for chicking whether a letter is at its correct position
	positionLookup: {},
	// look-up for user guess
	// [guess] <- array of letter's position state (e.g. -1 indicates letter is present but out of position, 0 letter is not present, and 1 present and at its position)
	wordleTable: [],
	maxGuessesAllowed: 5,
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
			const LetterPositionStateArray = [] as { letter: string; state: number }[]

			// iterate through the letters of the user guess
			for (let i = 0; i < currentGuess.length; i++) {
				// save current letter of a guess
				const letter = currentGuess[i]
				const DoesLetterExist = state.letterLookup[letter] ? true : false
				const IsLetterAtItsCorrectPosition = state.positionLookup[i] === letter
				// check if the letter exists and it's at its correct position
				if (DoesLetterExist && IsLetterAtItsCorrectPosition) {
					LetterPositionStateArray.push({ letter, state: 1 })
				} else if (DoesLetterExist && !IsLetterAtItsCorrectPosition) {
					LetterPositionStateArray.push({ letter, state: -1 })
					hasWon = false
				} else {
					LetterPositionStateArray.push({ letter, state: 0 })
					hasWon = false
				}
			}

			state.wordleTable.push(LetterPositionStateArray)
			const GameOver = state.totalGuesses === state.maxGuessesAllowed
			// check if the user has guessed or game is over
			if (hasWon) {
				state.hasWon = true
				state.isGameOver = true
			} else if (GameOver) state.isGameOver = true
		},
		// reset the game
		reset: (state) => {
			state.currentGuess = ''
			state.hasWon = false
			state.isGameOver = false
			state.totalGuesses = 0
			state.wordleTable = []
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
