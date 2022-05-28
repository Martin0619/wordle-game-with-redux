import clsx from 'clsx'
import cls from './styles.module.scss'

export interface WordDetailParamsObj {
	state: LetterPositionState
	letter: string
}

export enum LetterPositionState {
	OUT_OF_POSITION = -1,
	IN_POSITION = 1,
	NOT_PRESENT = 0,
}

const ColorMapper: Record<LetterPositionState, string> = {
	[LetterPositionState.IN_POSITION]: 'letter--green',
	[LetterPositionState.NOT_PRESENT]: 'letter--grey',
	[LetterPositionState.OUT_OF_POSITION]: 'letter--yellow',
}

export default function Letter(props: WordDetailParamsObj) {
	return (
		<span className={clsx(cls['letter'], cls[ColorMapper[props.state]])}>
			{props.letter}
		</span>
	)
}
