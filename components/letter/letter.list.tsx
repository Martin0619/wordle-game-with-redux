import clsx from 'clsx'
import { RootState } from '../../store'
import Letter from './letter.detail'
import cls from './styles.module.scss'

export interface WordParamsObj {
	wordMap: RootState['wordle']['wordleTable']
}

export default function Word(props: WordParamsObj) {
	return (
		<div className={cls['container']}>
			{Object.keys(props.wordMap).map((guess, i) => (
				<div key={guess + '@' + i} className={clsx(cls['word'])}>
					{props.wordMap[guess].map((letterState, j) => (
						<Letter key={letterState + '@' + j} letter={guess[j]} state={letterState} />
					))}
				</div>
			))}
		</div>
	)
}
