if (!localStorage.getItem('gameCells')) {
localStorage.setItem('gameCells', JSON.stringify([
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '4', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '2', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
	[' ', ' ', '13', ' ', ' ', '10', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'м', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'г', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
	[' ', ' ', 'ф', ' ', ' ', 'к', ' ', ' ', '14', ' ', ' ', ' ', '3', 'п', 'о', 'л', 'я', 'р', 'и', 'з', 'о', 'в', 'а', 'н', 'н', 'ы', 'й', ' ', '16', ' '],
	['11', 'м', 'а', 'з', 'е', 'р', ' ', ' ', 'п', ' ', ' ', ' ', ' ', ' ', 'н', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'з', ' ', ' ', ' ', ' ', ' ', 'в', ' '],
	[' ', ' ', 'б', ' ', ' ', 'и', ' ', ' ', 'о', ' ', ' ', ' ', ' ', ' ', 'о', ' ', '1', 'т', 'в', 'е', 'р', 'д', 'о', 'т', 'е', 'л', 'ь', 'н', 'ы', 'е'],
	[' ', ' ', 'р', ' ', ' ', 'с', ' ', ' ', 'л', ' ', ' ', ' ', ' ', ' ', 'х', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'в', ' ', ' ', ' ', ' ', ' ', 'н', ' '],
	[' ', ' ', 'и', ' ', ' ', 'т', ' ', ' ', 'у', ' ', ' ', ' ', ' ', ' ', 'р', ' ', ' ', ' ', ' ', ' ', '12', ' ', 'ы', ' ', ' ', ' ', ' ', ' ', 'у', ' '],
	[' ', ' ', 'к', ' ', ' ', 'а', ' ', ' ', 'п', ' ', '5', 'у', 'з', 'к', 'о', 'н', 'а', 'п', 'р', 'а', 'в', 'л', 'е', 'н', 'н', 'ы', 'й', ' ', 'ж', ' '],
	[' ', ' ', 'а', ' ', ' ', 'л', ' ', ' ', 'р', ' ', ' ', ' ', ' ', ' ', 'м', ' ', ' ', ' ', ' ', ' ', 'о', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'д', ' '],
	[' ', ' ', 'н', ' ', ' ', 'л', ' ', ' ', 'о', ' ', ' ', '6', 'с', 'ш', 'а', ' ', ' ', ' ', ' ', ' ', 'л', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'е', ' '],
	[' ', ' ', 'т', ' ', ' ', 'и', ' ', ' ', 'в', ' ', ' ', ' ', ' ', ' ', 'т', ' ', ' ', ' ', ' ', ' ', 'о', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'н', ' '],
	[' ', ' ', ' ', ' ', ' ', 'ч', ' ', ' ', 'о', ' ', '9', ' ', '8', 'х', 'и', 'м', 'и', 'ч', 'е', 'с', 'к', 'и', 'е', ' ', ' ', ' ', ' ', ' ', 'н', ' '],
	[' ', ' ', ' ', ' ', ' ', 'е', ' ', ' ', 'д', ' ', 'л', ' ', ' ', ' ', 'ч', ' ', ' ', ' ', ' ', ' ', 'о', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'о', ' '],
	[' ', ' ', ' ', ' ', '7', 'с', 'п', 'о', 'н', 'т', 'а', 'н', 'н', 'о', 'е', ' ', ' ', ' ', ' ', '15', 'н', 'а', 'к', 'а', 'ч', 'к', 'а', ' ', 'е', ' '],
	[' ', ' ', ' ', ' ', ' ', 'к', ' ', ' ', 'и', ' ', 'з', ' ', ' ', ' ', 'с', ' ', ' ', ' ', ' ', ' ', 'н', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
	[' ', ' ', ' ', ' ', ' ', 'и', ' ', ' ', 'к', ' ', 'е', ' ', ' ', ' ', 'к', ' ', ' ', ' ', ' ', ' ', 'ы', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
	[' ', ' ', ' ', ' ', ' ', 'е', ' ', ' ', 'о', ' ', 'р', ' ', ' ', ' ', 'и', ' ', ' ', ' ', ' ', ' ', 'е', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'в', ' ', ' ', ' ', ' ', ' ', 'й', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'ы', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
	[' ', ' ', ' ', ' ', '17', 'к', 'о', 'г', 'е', 'р', 'е', 'н', 'т', 'н', 'ы', 'й', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
]
))

}
const table = document.querySelector("#crossword-table");
const crosswordEditorForm = document.querySelector("#crossword-editor-form");
const convertButton = document.querySelector("#convert-button");
const clearButton = document.querySelector("#clear-button");
const saveGameDataContainer = document.querySelector("#saved-game-data");

const rowCount = 20;
const columnCount = 30;

const createCrossword = (gameCells) => {
	table.innerHTML = '';
	for (let i = 0; i < gameCells.length; i++) {
		for (let j = 0; j < gameCells[0].length; j++) {
			const cell = document.createElement('div');
			cell.setAttribute('id', `cell_${i+1}_${j+1}`);
			cell.textContent = gameCells[i][j];
			if (cell.textContent.trim() && !Number(cell.textContent)) cell.classList.add('active') ;
			if (cell.textContent.trim() && !Number(cell.textContent)) cell.classList.add('hidden') ;
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
	saveGameDataContainer.value = JSON.stringify(gameCells);
})

document.querySelector("#crossword-table").addEventListener('click', (event) => {
	if (event.target.classList.contains('btn') && event.target.classList.contains('hidden')) {
		event.target.classList.remove('hidden');
	}
})

convertButton.addEventListener('click', () => {
	const gameCells = JSON.parse(localStorage.getItem("gameCells"));
	createCrossword(gameCells);
	changeCrosswordEditorData(gameCells);
})

clearButton.addEventListener('click', () => {
	const inputs = document.querySelectorAll('.cell-input');
	inputs.forEach(input => input.value = '');
	localStorage.setItem('gameCells', JSON.stringify([]));
	createCrossword([]);
	saveGameDataContainer.value = "[]";
})

crosswordEditorForm.addEventListener('change', () => {
	const gameCells = getGameCellsData();
	localStorage.setItem('gameCells', JSON.stringify(gameCells));
	saveGameDataContainer.value = JSON.stringify(gameCells);
})

saveGameDataContainer.addEventListener('input', (event) => {
	const gameCells = JSON.parse(event.target.value);
	localStorage.setItem('gameCells', JSON.stringify(gameCells));
})