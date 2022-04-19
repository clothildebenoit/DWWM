let x = '';
let y = prompt('saisir un caractère :')
let ligne =prompt('saisir nombre de lignes:')

for ( i = 1; i <=ligne; i++) {
    x = x+y;
    document.write(x+"<br/>")
}