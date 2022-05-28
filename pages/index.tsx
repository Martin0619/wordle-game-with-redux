import React, { useCallback, useEffect, useState } from 'react'
import Form from '../components/form/form'
import Word from '../components/letter/letter.list'
import WinLoss from '../components/win-loss/win-loss'
import {
	checkForWinningState,
	setCurrentGuess,
	setMaxGuessesAllowed,
	setSecretWord,
} from '../features/wordle.slice'
import { useAppDispatch, useAppSelector } from '../store/store.hooks'

export default function IndexPage() {
	const state = useAppSelector((store) => ({
		currentGuess: store.wordle.currentGuess,
		maxGuesses: store.wordle.maxGuessesAllowed,
		totalGuesses: store.wordle.totalGuesses,
		guessesTable: store.wordle.wordleTable,
		hasWon: store.wordle.hasWon,
		isGameOver: store.wordle.isGameOver,
	}))
	const dispatch = useAppDispatch()
	const [inputValue, setInputValue] = useState('')
	const [timer, setTimer] = useState<NodeJS.Timeout>(null)
	const [completed, setCompleted] = useState<Promise<void>>(null)

	useEffect(() => {
		if (!typeof window) return
		dispatch(setSecretWord('Habana'))
		dispatch(setMaxGuessesAllowed(10))
	}, [])

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setInputValue(value)
		clearTimeout(timer)
		const response = new Promise<void>((resolve) => {
			const timeoutId = setTimeout(() => {
				console.log(value)
				dispatch(setCurrentGuess(value))
				resolve()
			}, 700)
			setTimer(timeoutId)
		})
		setCompleted(response)
	}

	const onSubmitHandler = useCallback((e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setInputValue('')
		setCompleted(async (completed) => {
			await completed
			dispatch(checkForWinningState())
			return completed
		})
	}, [])

	return (
		<>
			<h3>{`${state.totalGuesses} out of ${state.maxGuesses}`}</h3>

			<Form
				searchValue={inputValue}
				onSearchChange={onChangeHandler}
				onSubmit={onSubmitHandler}
				isGameOver={state.isGameOver}
			/>

			<Word wordMap={state.guessesTable} />

			<WinLoss hasWon={state.hasWon} isGameOver={state.isGameOver} />
		</>
	)
}
