/* 
    Auteur : Charles Peslerbe 
*/

/*****************  VARIABLES  *********************/ 


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
]

document.getElementById("bouton0").addEventListener("click", solveSudoku);

// On génére un nombre aléatoire entre 1 et 9
const randomNumber = Math.floor(Math.random() * 9) + 1;

// On génére un indice aléatoires entre 0 et 80 (81 cases  9x9)
//const randomIndex = Math.floor(Math.random() * 81);

// Pour des soucis de génération plus aléatoire on génére un indice aléatoire entre 0 et 3  
const randomIndex = Math.floor(Math.random() * 3);

// On l'affiche dans la grille
const grid = document.querySelector('.grid');
const boxes = grid.querySelectorAll('.box2');
boxes[randomIndex].textContent = randomNumber;


// Ensuite on stocke la valeurs du sudoku dans notre grille
const x = randomIndex%9;
const y = Math.floor(randomIndex/9);
sudoku[y][x] = randomNumber;

// On résout le sudoku avec 1 seule case remplie
estValide(sudoku, 0);

// On affiche le sudoku résolu
//afficheGrille() ;

function solveSudoku() {
    afficheGrille();
    estValide(sudoku, 0);
    afficheGrille();
}

function afficheGrille() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const index = i * 9 + j;
            boxes[index].textContent = sudoku[i][j];
        }
    }
}

/*****************  FONCTIONS  *********************/

function numberSelection(number){
    switch (number) {
        case 1:
            
            
            reloadHover();
            document.getElementById("bouton1").className = "box align selected";
            break;
        case 2:
            
        
            reloadHover();
            document.getElementById("bouton2").className = "box align selected";
            break;
        case 3:
            
        
            reloadHover();
            document.getElementById("bouton3").className = "box align selected";
            break;
        case 4:
            
            
            reloadHover();
            document.getElementById("bouton4").className = "box align selected";
            break;
        case 5:
            
        
            reloadHover();
            document.getElementById("bouton5").className = "box align selected";
            break;
        case 6:
            
        
            reloadHover();
            document.getElementById("bouton6").className = "box align selected";
            break;
        case 7:
                
            
            reloadHover();
            document.getElementById("bouton7").className = "box align selected";
            break;
        case 8:
                    
                
            reloadHover();
            document.getElementById("bouton8").className = "box align selected";
            break;
        case 9:
                        
                    
            reloadHover();
            document.getElementById("bouton9").className = "box align selected";
            break;
    }
}

function reloadHover() {
    document.getElementById("bouton1").className = "box align notSelected";
    document.getElementById("bouton2").className = "box align notSelected";
    document.getElementById("bouton3").className = "box align notSelected";
    document.getElementById("bouton4").className = "box align notSelected";
    document.getElementById("bouton5").className = "box align notSelected";
    document.getElementById("bouton6").className = "box align notSelected";
    document.getElementById("bouton7").className = "box align notSelected";
    document.getElementById("bouton8").className = "box align notSelected";
    document.getElementById("bouton9").className = "box align notSelected";
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