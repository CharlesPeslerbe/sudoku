/* 
    Auteur : Charles Peslerbe 
*/


/*****************  FONCTIONS  *********************/
function solveSudoku() {
    estValide(sudoku, 0);
    afficheGrille();
}

function afficheGrille() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const index = i * 9 + j;
            if (sudoku[i][j] == 0){
                boxes[index].textContent = "";
            }
            else{
                boxes[index].textContent = sudoku[i][j];
            }
        }
    }
}
function hideElements(grid, numHidden) {
    const size = 9;
    let count = 0;

    while (count < numHidden) {
        const row = Math.floor(Math.random() * size);
        const col = Math.floor(Math.random() * size);

        if (grid[row][col] !== 0) {
            grid[row][col] = 0;
            count++;
        }
    }
    afficheGrille();
}
function initializeSudoku(){
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){

            sudoku[i][j] = 0;
        }
    }
    randomNumber = Math.floor(Math.random() * 9) + 1;
    randomIndex = Math.floor(Math.random() * 3);
    x = randomIndex%9;
    y = Math.floor(randomIndex/9);
    sudoku[y][x] = randomNumber;
    afficheGrille();
    estValide(sudoku, 0);
    
    //Cacher Éléments
    hideElements(sudoku, 50);
    // element restant immuables
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            copy[i][j] = sudoku[i][j];
        }
    }
    
}

function compterCoup(){
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (sudoku[i][j] !== 0) {
                coup++;
            }
        }
    }
}

function resetGame() {
    afficheGrille();
    for (let i = 0; i < 9; i++){
        for (let j = 0; j < 9; j++){
            if (copy[i][j] == 0) {
                sudoku[i][j] = 0;
            }
            else {
                sudoku[i][j] = copy[i][j];
            }
        }
    }
    afficheGrille();
}
/*****************  FONCTIONS RÉSOLUTION *********************/ 

function absentSurLigne(k, grille, row) {
    for (let j = 0; j < 9; j++) {
        if (grille[row][j] == k) {
            return false;
        }
    }
    return true;
}

function absentSurColonne(k, grille, col) {
    for (let i = 0; i < 9; i++) {
        if (grille[i][col] == k) {
            return false;
        }
    }
    return true;
}

/* Fonction pour vérifier si un nombre est absent sur un bloc, i = ligne premier j = col premier */
function absentSurBloc(k, grille, i, j) {
    const _i = i - (i % 3);
    const _j = j - (j % 3);
    for (let row = _i; row < _i + 3; row++) {
        for (let col = _j; col < _j + 3; col++) {
            if (grille[row][col] == k) {
                return false;
            }
        }
    }
    return true;
}


function estValide(grille, position) {

    // Si on est à la 82e case (on sort du tableau), on a fini
    if (position == 9 * 9) {
        return true;
    }

    // On récupère les coordonnées de la case
    const i = Math.floor(position / 9);
    const j = position % 9;

    // Si la case n'est pas vide, on passe à la suivante (appel récursif)
    if (grille[i][j] != 0) {
        return estValide(grille, position + 1);
    }

    // A implémenter : backtracking
    for (let k = 1; k <= 9; k++) {
        if (absentSurLigne(k, grille, i) && absentSurColonne(k, grille, j) && absentSurBloc(k, grille, i, j)) {
            grille[i][j] = k;
            if (estValide(grille, position + 1)) {
                return true;
            }
        }
    }
    grille[i][j] = 0;
    return false;
}



/*****************  VARIABLES  *********************/ 

let grid = document.querySelector('.grid');
let boxes = grid.querySelectorAll('.box2');
let buttons = document.querySelectorAll('.box');
let sudoku = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
];
let selectedNumber = 1;
let randomNumber;
let randomIndex;
let x; 
let y;
let coup = 0;
let min = 0;
let sec = 0;
let h = 0;
let copy = Array.from(Array(9), () => new Array(9));

initializeSudoku();

// Placer un nombre
// On ajoute un événement de clic à chaque case de la grille
boxes.forEach((box, index) => {
    box.addEventListener("click", function() {
        // On récupère les coordonnées de la case
        const rowIndex = Math.floor(index / 9); // Indice de ligne
        const colIndex = index % 9; // Indice de colonne
        // On vérifie si la case est vide
        if (sudoku[rowIndex][colIndex] === 0) {
            if(absentSurBloc(selectedNumber, sudoku, rowIndex, colIndex) && absentSurColonne(selectedNumber, sudoku, colIndex) && absentSurLigne(selectedNumber, sudoku, rowIndex)){
                // On place le nombre sélectionné dans la case
                sudoku[rowIndex][colIndex] = selectedNumber;
                // On met à jour l'affichage de la grille
                afficheGrille();
                // On vérifie si la grille est résolue
                if (compterCoup() >= 81) {
                    if (estValide(sudoku.slice(), 0)) {
                        alert("Bravo, vous avez résolu la grille !");
                    }
                }
            }
        }
    });
});
// Placer un nombre
// On ajoute un événement de clic à chaque case de la grille
buttons.forEach((button, index) => {
    button.addEventListener("click", function() {
        //supprimer selected
        buttons.forEach((button, index) => {
            button.classList.remove('selected');
        });
        // Obtenez l'identifiant du bouton cliqué
        this.classList.add('selected');
        const buttonId = this.id;
        // Effectuez une action en fonction de l'identifiant du bouton
        switch (buttonId) {
            case "bouton1":
                selectedNumber = 1;
                break;
            case "bouton2":
                selectedNumber = 2;
                break;
            case "bouton3":
                selectedNumber = 3; 
                break;
            case "bouton4":
                selectedNumber = 4;
                break;
            case "bouton5":
                selectedNumber = 5;
                break;
            case "bouton6":
                selectedNumber = 6;
                break;
            case "bouton7":
                selectedNumber = 7;
                break;
            case "bouton8":
                selectedNumber = 8;
                break;
            case "bouton9":
                selectedNumber = 9;
                break;
            case "boutonSolve":
                solveSudoku();
                break;
            case "boutonNew":
                initializeSudoku();
                break;
            case "boutonReset":
                resetGame();
                break;
            // Ajoutez d'autres cas pour d'autres boutons si nécessaire
        }
    });
});



