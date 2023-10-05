let commandCalc = document.querySelectorAll('.command-calc')
let inputCalc = document.querySelector('.input-calc')
let calcHistoryItem = document.querySelectorAll('.item-history-of-actions-btn')
let historyOfActions = document.querySelector('.history-of-actions')

let setOperations = new Set(['+', '-', '*', '/', '%', ','])
let setOperationsAll = new Set(['+', '-', '*', '/', '%', ',', '(', ')'])
let setBracketsOpen = new Set(['('])

function calcInsert(word, inp) {
	let start = inp.selectionStart
	inp.value =
		inp.value.substring(0, start) +
		word +
		inp.value.substring(inp.selectionEnd, inp.value.length)
	inp.focus()
	inp.setSelectionRange(start + 1, start + word.length)
}

function calcDelete(countSymbol, inp) {
	let start = inp.selectionStart
	inp.value =
		inp.value.substring(0, start - countSymbol) +
		inp.value.substring(inp.selectionEnd, inp.value.length)
	inp.focus()
	inp.setSelectionRange(start - countSymbol, start - countSymbol)
}

function previousValue(inp) {
	return inp.value[inp.selectionStart - 1]
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
		let errorMessage = document.querySelector('.error-title-calc')
		errorMessage.style.opacity = 1
		errorMessage.style.transform = 'translateY(0%)'

		let str = getComputedStyle(inputCalc).minHeight.replace(/[^\d]/gi, '')
		inputCalc.style.cssText = `min-height: ${+str + +str * 0.2 + 'px'}`
		return false
	}
	return result
}

function addCalcAction(act) {
	switch (act) {
		case 'DEL':
			calcDelete(1, inputCalc)
			break
		case 'bracket':
			{
				if (previousValue(inputCalc) != ',') {
					calcInsert('()', inputCalc)
					let start = inputCalc.selectionStart
					inputCalc.setSelectionRange(start, start)
				}
			}
			break
		case '=':
			{
				let res = regExpForCalc(inputCalc.value)
				if (res) {
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
				!(previousValue(inputCalc) == undefined) &&
				!setOperationsAll.has(previousValue(inputCalc))
			) {
				calcInsert(',', inputCalc)
			}

			break
		case 'AC':
			inputCalc.value = ''
			break
		default: {
			if (setOperations.has(act)) {
				if (setOperations.has(previousValue(inputCalc))) {
					calcDelete(1, inputCalc)
				}
			}
			if (
				(previousValue(inputCalc) == undefined ||
					setBracketsOpen.has(previousValue(inputCalc))) &&
				setOperations.has(act)
			) {
				console.log('WWWWWWWWWWWWWWWWWWWWWWW')
			} else {
				calcInsert(act, inputCalc)
			}
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

inputCalc.addEventListener('focus', () => {
	let errorMessage = document.querySelector('.error-title-calc')
	errorMessage.style.opacity = 0
	errorMessage.style.transform = 'translateY(100%)'

	inputCalc.style.removeProperty('min-height')
})
