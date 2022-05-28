import React from 'react'

export interface FormParamsObj {
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
	onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	searchValue: string
	isGameOver: boolean
}

export default function Form(props: FormParamsObj) {
	return (
		<form onSubmit={props.onSubmit}>
			<input
				type='text'
				onChange={props.onSearchChange}
				value={props.searchValue}
				disabled={props.isGameOver}
			/>
			<button type='submit' disabled={props.isGameOver}>
				Guess
			</button>
		</form>
	)
}
