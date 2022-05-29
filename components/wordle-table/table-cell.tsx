import clsx from 'clsx'
import { useAppSelector } from '../../store/store.hooks'
import cls from './styles.module.scss'

export interface TableCellParamsObj {
	col: number
	row: number
}

export enum TableCellColor {
	Green = 1,
	Yellow = -1,
	Grey = 0,
}

export const TableCellColorMapper: Record<TableCellColor, string> = {
	[TableCellColor.Green]: 'table-cell--green',
	[TableCellColor.Yellow]: 'table-cell--yellow',
	[TableCellColor.Grey]: 'table-cell--grey',
}

export default function TableCell({ col, row }: TableCellParamsObj) {
	const table = useAppSelector((store) => store.wordle.wordleTable)
	const secret = useAppSelector((store) => store.wordle.secretWord)

	const IsThereValue = table[row]?.length <= secret.length && table[row][col]?.letter

	const LetterPositionState = (IsThereValue ? table[row][col].state : undefined) as
		| TableCellColor
		| undefined

	const LetterValue = (IsThereValue ? table[row][col].letter : undefined) as
		| string
		| undefined

	return (
		<td
			className={clsx(cls['table-cell'], cls[TableCellColorMapper[LetterPositionState]])}
		>
			{LetterValue}
		</td>
	)
}
