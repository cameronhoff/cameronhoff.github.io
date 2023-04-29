document.addEventListener('DOMContentLoaded', () => {
    const codeWordLen = document.querySelector('#code-word-len');
    const numOfErrors = document.querySelector('#num-of-errors');
    const calcFactorsBtn = document.querySelector('#calc-factors-btn');

    let errors = 0
    let codelen = 0
    codelen = codeWordLen.value;
    errors = parseInt(numOfErrors.value); 
    codeWordLen.addEventListener('change', () => {
        codelen = codeWordLen.value;
        console.log(`changed codewordlen to ${codelen}`)
    })

    numOfErrors.addEventListener('change', () => {
        errors = parseInt(numOfErrors.value); 
        console.log(`changed num of errors to ${errors}`)
    })
    calcFactorsBtn.addEventListener('click', () => {
        console.log(`clicked calc-btn codelen=${codelen} errors=${errors}`);
        switch (codelen) {
            case "7":
                print7(errors);
                break;
            case "15":
                break;
            case "31":
                break;
            case "63":
                break;
            case "127":
                break;
            case "255":
                break;
        }
    })
});

function print7(cap) {
    console.log('here')
    const results = document.querySelector('#csk-results');
    switch (cap) {
        case 1:
            fetch('db/7_1.txt')
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.error(error));
            break;
        case 2:
            break;
        case 3:
            break;
    }
}
function print15() {

}
function print31() {

}
function print63() {

}
function print127() {

}
function print255() {

}
