import { useAppSelector } from '../../store/store.hooks'
import TableCell from './table-cell'

export default function WordleTable() {
	const state = useAppSelector((store) => ({
		secret: store.wordle.secretWord,
		table: store.wordle.wordleTable,
		max: store.wordle.maxGuessesAllowed,
	}))

	return (
		<table style={{ borderSpacing: '0.5rem' }}>
			<tbody>
				{Array.from({ length: state.max }).map((_, row) => (
					<tr>
						{Array.from({ length: state.secret.length }).map((_, col) => (
							<TableCell col={col} row={row} />
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}
