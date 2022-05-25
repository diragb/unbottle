// Packages:
import {
	createStore,
	SetStoreFunction,
	Store
} from 'solid-js/store'
import { createEffect } from 'solid-js'


// Functions:
export function createLocalStore<T>(accessor: string, initStatey: T): [ Store<T>, SetStoreFunction<T> ] {
	const [ state, setState ] = createStore(initStatey)
	if (localStorage[ accessor ]) setState(JSON.parse(localStorage[ accessor ]))
	createEffect(() => (localStorage[ accessor ] = JSON.stringify(state)))
	return [ state, setState ]
}


// Exports:
export default createLocalStore
