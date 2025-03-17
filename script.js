const table = document.querySelector("#crossword-table");
const crosswordEditorForm = document.querySelector("#crossword-editor-form");
const convertButton = document.querySelector("#convert-button");

const rowCount = 20;
const columnCount = 30;

const createCrossword = (gameCells) => {
	table.innerHTML = '';
	for (let i = 0; i < gameCells.length; i++) {
		for (let j = 0; j < gameCells[0].length; j++) {
			const cell = document.createElement('div');
			cell.setAttribute('id', `cell_${i+1}_${j+1}`);
			cell.textContent = gameCells[i][j];
			if (cell.textContent !== ' ' && !Number(cell.textContent)) cell.classList.add('active') ;
			if (cell.textContent !== ' ' && !Number(cell.textContent)) cell.classList.add('hidden') ;
			cell.classList.add('btn');
			table.append(cell)
		}
	}
}

const getGameCellsData = () => {
	const gameCells = Array.from({length: rowCount}, () => []);
	const inputs = document.querySelectorAll('.cell-input');

	for (let i = 0; i < rowCount; i++) {
		for (let j = 0; j < columnCount; j++) {
			gameCells[i][j] = inputs[i * columnCount + j].value;
		}
	}

	return gameCells;
}

const changeCrosswordEditorData = (gameCells) => {
	for (let i = 0; i < gameCells.length; i++) {
		for (let j = 0; j < gameCells[0].length; j++) {
			const inputs = document.querySelectorAll('.cell-input');
			inputs[i * gameCells[0].length + j].value = gameCells[i][j]
		}
	}
}


document.addEventListener('mousemove', (event) => {
	if (event.target.nodeName === 'DIV') {
		if (event.target.className.includes('hidden')) {
			if (event.ctrlKey || event.altKey) {
				event.target.classList.remove('hidden')
			}
		}

	}
})

document.addEventListener('DOMContentLoaded', () => {
	const gameCells = JSON.parse(localStorage.getItem("gameCells"));
	createCrossword(gameCells);
	for (let i = 0; i < 20; i++) {
		for (let j = 0; j < 30; j++) {
			const cellInput = document.createElement('input');
			cellInput.name = 'cell-input';
			cellInput.classList.toggle('cell-input')
			crosswordEditorForm.append(cellInput)
		}
	}
	changeCrosswordEditorData(gameCells);
})

document.querySelector("#crossword-table").addEventListener('click', (event) => {
	if (event.target.classList.contains('btn') && event.target.classList.contains('hidden')) {
		event.target.classList.remove('hidden');
	}
})

convertButton.addEventListener('click', () => {
	const gameCells = JSON.parse(localStorage.getItem("gameCells"));
	createCrossword(gameCells);
})

crosswordEditorForm.addEventListener('change', () => {
	localStorage.setItem('gameCells', JSON.stringify(getGameCellsData));
})