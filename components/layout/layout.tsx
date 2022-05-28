import React from 'react'
import cls from './styles.module.scss'

export interface LayoutParamsObj {
	children?: React.ReactNode
}

export default function Layout(props: LayoutParamsObj) {
	return <main className={cls['layout']}>{props.children}</main>
}
