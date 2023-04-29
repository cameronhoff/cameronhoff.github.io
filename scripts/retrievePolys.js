document.addEventListener('DOMContentLoaded', () => {
    const codeWordLen = document.querySelector('#code-word-len');
    // Corrective capacity of the code
    const numOfErrors = document.querySelector('#num-of-errors');
    const calcFactorsBtn = document.querySelector('#calc-factors-btn');

    let errors = 0
    let codelen = 0
    codeWordLen.addEventListener('change', () => {
        console.log('changed codewordlen')
        codelen = codeWordLen.value;
    })

    numOfErrors.addEventListener('change', () => {
        console.log('changed num of errors')
        errors = parseInt(numOfErrors.value); 
    })
    calcFactorsBtn.addEventListener('click', () => {
        console.log('clicked')
        console.log(codelen);
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
    switch (cap) {
        case "1":
            console.log("tryna read")
            fetch(`../db/7_${cap}`)
            .then(response => response.text())
            .then(text => console.log(text))
            break;
        case "2":
            break;
        case "3":
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