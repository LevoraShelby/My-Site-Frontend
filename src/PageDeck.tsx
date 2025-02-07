import { useContext, useEffect, useRef, useState } from 'react'
import Homepage from './Homepage.tsx'
import WhoAmI from './WhoAmI.tsx'
import KeybindingsModal from './KeybindingsModal.tsx'
import './PageDeck.css'
import {KeyBufferContext, SetKeyBufferContext} from './App.tsx'
import Writings from './Writings.tsx'
import {KeyboardListener, replaceKeyBinder} from './utils.ts'

function PageDeck() {
	const [page, setPage] = useState<number>(1)
	const [showKeybindingsModal, setShowKeybindingsModal] = useState<boolean>(false)
	const keyBuffer = useContext(KeyBufferContext)
	const setKeyBuffer = useContext(SetKeyBufferContext)
	const prevOnKeyPress = useRef<KeyboardListener|undefined>(undefined)

	const onKeyPress = (event: KeyboardEvent) => {
		if (keyBuffer.length == 0 && event.key === "?") {
			setShowKeybindingsModal((val) => !val)
			return
		}
		if (keyBuffer.length == 0 && event.key === "Escape" && showKeybindingsModal) {
			setShowKeybindingsModal(false)
			return
		}
		// Prevents any other changes from happening while keybindings modal is up.
		if (showKeybindingsModal) {
			return
		}
		if (keyBuffer.length == 0 && event.key === "p") {
			setKeyBuffer(["p"])
			return
		}
		if (keyBuffer.length == 0) {
			return
		}
		if (event.key in ["0","1","2","3"]) {
			setKeyBuffer([])
			setPage(parseInt(event.key,10))
		}
	}
	// TODO: Look into why setShowKeybindingsModal doesn't work without this but setPage does.
	useEffect(() => {
		replaceKeyBinder(onKeyPress, prevOnKeyPress)
	}, [keyBuffer, setKeyBuffer, showKeybindingsModal, setShowKeybindingsModal])
	
	// TODO: KeybindingsModal isn't opening for some reason. Needs to be fixed.
	return (<div className='pageDeck'>
		{ page == 1 && <Homepage/> }
		{ page == 2 && <WhoAmI/> }
		{ page == 3 && <Writings/> }
		<KeybindingsModal isOpen={showKeybindingsModal} />
	</div>)
}

export default PageDeck
