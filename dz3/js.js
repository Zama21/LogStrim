let commandCalc = document.querySelectorAll('.command-calc')
let inputCalc = document.querySelector('.input-calc')
let calcHistoryItem = document.querySelectorAll('.item-history-of-actions-btn')
let historyOfActions = document.querySelector('.history-of-actions')
let calcMessage = document.querySelector('.calc-message')

let setOperations = new Set(['+', '*', '/', '%', ','])
let setOperationsAll = new Set(['+', '-', '*', '/', '%', ','])
let setBracketsAll = new Set(['(', ')'])
let setBracketsOpen = new Set(['('])

function calcShowMessage(message) {
	calcMessage.classList.add('calc-message-show')
	inputCalc.classList.add('input-calc-show-message')
	calcMessage.innerText = message
	// calcMessage.style.opacity = 1
	// calcMessage.style.transform = 'translateY(0%)'
	// calcMessage.innerText = message
	// let str = inputCalc.style.minHeight.replace(/[^\d]/gi, '')
	// //let str = getComputedStyle(inputCalc).minHeight.replace(/[^\d]/gi, '')
	// inputCalc.style.cssText = `min-height: ${+str * 1.2 + 'px'}`
}

function calcHideMessage() {
	calcMessage.classList.remove('calc-message-show')
	inputCalc.classList.remove('input-calc-show-message')
	// calcMessage.style.opacity = 0
	// calcMessage.style.transform = 'translateY(100%)'
	// // inputCalc.style.removeProperty('min-height')
	// inputCalc.style.cssText = `min-height: 100px`
}

function calcInsert(word, inp) {
	let start = inp.selectionStart
	inp.value =
		inp.value.substring(0, start) +
		word +
		inp.value.substring(inp.selectionEnd, inp.value.length)
	// inp.focus()
	inp.setSelectionRange(start + 1, start + word.length)
}

function calcDelete(countSymbol, inp) {
	let start = inp.selectionStart
	inp.value =
		inp.value.substring(0, start - countSymbol) +
		inp.value.substring(inp.selectionEnd, inp.value.length)
	// inp.focus()
	inp.setSelectionRange(start - countSymbol, start - countSymbol)
}

function previousValue(inp, count) {
	// console.log('=====================')
	// console.log(inp.selectionStart - 1)
	// console.log(inp.value[inp.selectionStart - 1])
	// console.log('=====================')
	return inp.value[inp.selectionStart - count]
}

function regExpForCalc(string) {
	let str = string.replace(/([\d\)])\(/g, '$1*(')
	str = str.replace(/\)([\d\(])/g, ')*$1')
	str = str.replace(/[^-()\d/*+,%]/gi, '')
	str = str.replace(/[,]/gi, '.')
	let result
	try {
		result = eval(str)
	} catch (err) {
		calcShowMessage('Некорректное выражение!')
		return false
	}
	if (result == undefined) return false
	calcShowMessage(result)
	return result
}
function CheckComma() {
	let i = 2
	while (
		previousValue(inputCalc, i) != undefined &&
		i < inputCalc.selectionStart
	) {
		if (previousValue(inputCalc, i) == ',') {
			return false
		} else if (
			setOperationsAll.has(previousValue(inputCalc, i)) ||
			setBracketsAll.has(previousValue(inputCalc, i))
		) {
			return true
		}
		// console.log(previousValue(inputCalc, i))
		i++
	}
	return true
}
function addCalcAction(act) {
	inputCalc.focus()
	switch (act) {
		case 'DEL':
			calcDelete(1, inputCalc)
			break
		case 'bracket':
			{
				if (previousValue(inputCalc, 1) != ',') {
					calcInsert('()', inputCalc)
					let start = inputCalc.selectionStart
					inputCalc.setSelectionRange(start, start)
				}
			}
			break
		case '=':
			{
				let res = regExpForCalc(inputCalc.value)
				if (res !== false) {
					const container = document.createElement('div')
					container.addEventListener('click', function (event) {
						calcInputAddEval(event.target.innerText)
					})
					container.className = 'item-history-of-actions'
					historyOfActions.prepend(container)

					const btn = document.createElement('button')
					btn.innerText = `${inputCalc.value}=${res}`
					btn.className = 'item-history-of-actions-btn'
					btn.type = 'button'
					container.append(btn)
				}
			}
			break
		case '.':
			if (
				CheckComma() &&
				!(previousValue(inputCalc, 1) == undefined) &&
				!setOperationsAll.has(previousValue(inputCalc, 1)) &&
				!setBracketsAll.has(previousValue(inputCalc, 1))
			) {
				calcInsert(',', inputCalc)
			}

			break
		case 'AC':
			inputCalc.value = ''
			break
		default: {
			if (setOperationsAll.has(act)) {
				if (
					setOperationsAll.has(previousValue(inputCalc, 1)) &&
					previousValue(inputCalc, 2) != undefined
				) {
					calcDelete(1, inputCalc)
					calcInsert(act, inputCalc)
				} else if (act == '-') {
					calcInsert(act, inputCalc)
				} else if (
					previousValue(inputCalc, 1) != undefined &&
					previousValue(inputCalc, 1) != '-' &&
					!setBracketsOpen.has(previousValue(inputCalc, 1))
				) {
					calcInsert(act, inputCalc)
				}
			} else {
				calcInsert(act, inputCalc)
			}

			// if (
			// 	(previousValue(inputCalc, 1) == undefined ||
			// 		setBracketsOpen.has(previousValue(inputCalc, 1))) &&
			// 	setOperationsAll.has(act) &&
			// 	act != '-'
			// ) {
			// 	// console.log(previousValue(inputCalc, 1))
			// } else {
			// 	calcInsert(act, inputCalc)
			// }
		}
	}
}

function calcInputAddEval(str) {
	str = str.replace(/=(.*)$/g, '')
	inputCalc.value = str
}
for (item of commandCalc) {
	item.addEventListener('click', function (event) {
		addCalcAction(event.target.value)
	})
}
for (item of calcHistoryItem) {
	item.addEventListener('click', function (event) {
		calcInputAddEval(event.target.innerText)
	})
}

inputCalc.addEventListener('focus', calcHideMessage)
