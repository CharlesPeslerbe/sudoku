/* 
    Auteur : Charles Peslerbe 
*/


/*****************  FONCTIONS  *********************/

function numberSelection(number){
    switch (number) {
        case 1:
            selectedNumber = 1;
            break;
        case 2:
            selectedNumber = 2;
            break;
        case 3:
            selectedNumber = 3;
            break;
        case 4:
            selectedNumber = 4;
            //reloadHover();
            //document.getElementById("bouton4").className = "box align selected";
            break;
        case 5:
            selectedNumber = 5;
            //reloadHover();
            //document.getElementById("bouton5").className = "box align selected";
            break;
        case 6:
            selectedNumber = 6;
            //reloadHover();
            //document.getElementById("bouton6").className = "box align selected";
            break;
        case 7: 
            selectedNumber = 7;
            //reloadHover();
            //document.getElementById("bouton7").className = "box align selected";
            break;
        case 8:     
            selectedNumber = 8;  
            //reloadHover();
            //document.getElementById("bouton8").className = "box align selected";
            break;
        case 9:         
            selectedNumber = 9;      
            //reloadHover();
            //document.getElementById("bouton9").className = "box align selected";
            break;
    }
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
            console.log(grille);
            if (estValide(grille, position + 1)) {
                return true;
            }
        }
    }
    grille[i][j] = 0;
    return false;
}

function initializeSudoku(){
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
    afficheGrille();
    let randomNumber = Math.floor(Math.random() * 9) + 1;
    let randomIndex = Math.floor(Math.random() * 3);
    let x = randomIndex%9;
    let y = Math.floor(randomIndex/9);
    sudoku[y][x] = randomNumber;
    afficheGrille();
    estValide(sudoku, 0);
    afficheGrille();
}

/*****************  VARIABLES  *********************/ 

const grid = document.querySelector('.grid');
const boxes = grid.querySelectorAll('.box2');
const buttons = document.querySelectorAll('.box');

let selectedNumber = 1;

// On crée un tableau 9x9 pour le sudoku et on le remplit de 0 (case vide)
const sudoku = [
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
document.getElementById("boutonNew").addEventListener("click", initializeSudoku);
document.getElementById("boutonSolve").addEventListener("click", solveSudoku);

// On génére un nombre aléatoire entre 1 et 9
const randomNumber = Math.floor(Math.random() * 9) + 1;

// On génére un indice aléatoires entre 0 et 80 (81 cases  9x9)
//const randomIndex = Math.floor(Math.random() * 81);

// Pour des soucis de génération plus aléatoire on génére un indice aléatoire entre 0 et 3  
const randomIndex = Math.floor(Math.random() * 3);

// On l'affiche dans la grille
//boxes[randomIndex].textContent = randomNumber;

// Ensuite on stocke la valeur du nombre aléatoire dans notre grille
const x = randomIndex%9;
const y = Math.floor(randomIndex/9);
sudoku[y][x] = randomNumber;

// On résout le sudoku avec 1 seule case remplie
//estValide(sudoku, 0);


// On affiche le sudoku résolu
afficheGrille() ;

// On affiche les cases souhaitées

// Placer un nombre
// On ajoute un événement de clic à chaque case de la grille
boxes.forEach((box, index) => {
    box.addEventListener("click", function() {
        // On récupère les coordonnées de la case
        const rowIndex = Math.floor(index / 9); // Indice de ligne
        const colIndex = index % 9; // Indice de colonne
        // On vérifie si la case est vide
        if (sudoku[rowIndex][colIndex] === 0) {
            // On place le nombre sélectionné dans la case
            sudoku[rowIndex][colIndex] = selectedNumber;
            // On met à jour l'affichage de la grille
            afficheGrille();
        }
    });
});
// Placer un nombre
// On ajoute un événement de clic à chaque case de la grille
buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
        numberSelection(index+1);
    });
});



function solveSudoku() {
    afficheGrille();
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