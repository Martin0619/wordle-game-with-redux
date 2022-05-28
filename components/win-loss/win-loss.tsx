import { reset } from '../../features/wordle.slice'
import { useAppDispatch } from '../../store/store.hooks'
import cls from './styles.module.scss'

export interface WinLossParamsObj {
	hasWon: boolean
	isGameOver: boolean
}

export default function WinLoss(props: WinLossParamsObj) {
	const dispatch = useAppDispatch()

	const onClickHandle = () => {
		dispatch(reset())
	}

	return (
		<>
			{props.hasWon && <h1 className={cls['win-loss']}>you have won</h1>}

			{props.isGameOver && !props.hasWon && (
				<h1 className={cls['win-loss']}>game over</h1>
			)}
			{(props.hasWon || props.isGameOver) && (
				<button onClick={onClickHandle}>reset</button>
			)}
		</>
	)
}
