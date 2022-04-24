const button = document.querySelector('button')!; // ! はこのオブジェクトはnullではないという意味

function clickHandler(message: string) {
    console.log('Clicked!'+ message);
}

button.addEventListener('click', clickHandler.bind(null,"You're welcome!"));

function add(n1: number, n2: number) {
    if (n1 + n2 > 0) {
        return n1 + n2;
    }
    return;
}