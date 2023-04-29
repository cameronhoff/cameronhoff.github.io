document.addEventListener('DOMContentLoaded', () => {
    const codeWordLengthSelector = document.querySelector('#code-word-len');
    // Corrective capacity of the code
    const correctiveCapacitySelector = document.querySelector('#error-corr-cap');
    const calcFactorsBtn = document.querySelector('#calc-factors-btn');

    let codeCap = 1;
    let codeLen = 1;

    codeWordLengthSelector.addEventListener('change', () => {
        codeLen = codeWordLengthSelector.value;
    })

    correctiveCapacitySelector.addEventListener('change', () => {
        codeCap = parseInt(correctiveCapacitySelector.value);
    })
    calcFactorsBtn.addEventListener('click', () => {

        getUniqueCombinations(returnIrreducibleFactors(codeLen), codeCap);
    })
});

// returns only primitive factors
function returnPrimitiveFactors(n) {
    // primitive polynomials
    const pFactor7 = ["1011", "1101"]; 
    const pFactor15 = ["111", "10011", "11001"];
    const pFactor31 = ["100101", "101001", "101111", "110111", "111011", "111101"];
    const pFactor63 = ["111", "1011", "1101", "1000011", "1011011", "1100001", "1100111", "1101101", "1110011"];
    const pFactor127 = ["10000011", "10001001", "10001111", "10010001", "10011101", "10100111", "10101011",
                "10111001", "10111111", "11000001", "11001011", "11010011", "11010101", "11100101", 
                "11101111", "11110001", "11110111", "11111101"];
    const pFactor255 = ["111", "10011", "11001", "100011101", "100101011", "100101101", "101001101", "101011111", "101100011", 
                "101100101", "101101001", "101110001", "110000111", "110001101", "110101001", 
                "111000011", "111001111", "111100111", "111110101"]
    switch (n) {
        case '7':
            return pFactor7;
        case '15':
            return pFactor15;
        case '31':
            return pFactor31;
        case '63':
            return pFactor63;
        case '127':
            return pFactor127;
        case '255':
            return pFactor255;
    }
}

// returns all irreducible factors with primitives
function returnIrreducibleFactors(n) {
    const allFactors7 = [...returnPrimitiveFactors('7')];
    const allFactors15 = [...returnPrimitiveFactors('15'), "11111"];
    const allFactors31 = [...returnPrimitiveFactors('31')];
    const allFactors63 = ["1001001", "1010111", ...returnPrimitiveFactors('63'), "1110101"];
    const allFactors127 = [...returnPrimitiveFactors('127')];
    const allFactors255 = ["100011011", "100111001", "100111111", "101110111", 
                            "101111011", "110001011", "110011111", "110100011",
                            "110110001", "110111101", "111010111", "111011101",
                            "111110011", "111111001", ...returnPrimitiveFactors('255')];

    switch (n) {
        case '7':
            return allFactors7;
        case '15':
            return allFactors15;
        case '31':
            return allFactors31;
        case '63':
            return allFactors63;
        case '127':
            return allFactors127;
        case '255':
            return allFactors255;
    }
}

function getUniqueCombinations(arr, n) {
    const resultsBlock = document.querySelector('#csk-results');
    resultsBlock.innerHTML = '';
    if (n === 1) {
        return arr.map(el => [el]);
    }
    const combos = [];
    const visited = new Set();
    const backtrack = (currCombo, idx) => {
        if (currCombo.length === n) {
        const key = currCombo.sort().join("");
        if (!visited.has(key)) {
            let generetingPoly = multiplyPolynomials(currCombo);

            let currComboStr = currCombo.toString();

            let liEl = document.createElement('li');
            // TODO: check IF generatingPoly is able to detect errrors of multiplicity n 
            liEl.innerHTML = `${generetingPoly} -- ${currComboStr.replaceAll(',', '*')}`;
            resultsBlock.appendChild(liEl);

            combos.push(currCombo);
            visited.add(key);
        }
        return;
        }
        for (let i = idx; i < arr.length; i++) {
        const newCombo = [...currCombo, arr[i]];
        backtrack(newCombo, i + 1);
        }
    }
    backtrack([], 0);
    return combos;
}

function calculateMult(m1, m2, radix) {
    // convert m1 from string to integer in the given radix
    m1 = parseInt(m1, parseInt(radix));
    // reverse the digits of m2
    m2 = m2.split('').reverse().join('');
    // create an empty array called res
    const res = [];
    // iterate through the digits of m2
    for (let i = 0; i < m2.length; i++) {
        // convert the i-th digit of m2 from string to integer in the given radix
        const digit = parseInt(m2[i], parseInt(radix));
        // if the digit is not zero, push m1 times 2 to the power of i to the res array
        if (digit !== 0) {
            res.push(m1 * 2 ** i);
        }
    }
    // initialize x to zero
    let x = 0;
    // iterate through the elements of res
    for (let i = 0; i < res.length; i++) {
        // calculate the XOR of x and the i-th element of res and assign it to x
        x ^= res[i];
    }
    return x.toString(2);
    // if radix is equal to '2', set the value of the mult-result-input element to x in binary
    //if (radix === '2') {
    //    document.getElementById('mult-result-input').value = x.toString(2);
    //} else {
    //    document.getElementById('mult-result-input').value = decToBase(x, parseInt(radix));
    //}
}

function decToBase(num, radix) {
    // create a string of digits that correspond to the given radix
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // initialize res to an empty string
    let res = '';
    
    while (num > 0) {
        // calculate the remainder of num divided by radix and assign it to digit
        const digit = num % radix;
        // add the digit-th character of digits to the beginning of res
        res = digits[digit] + res;
        // divide num by radix and round down to the nearest integer
        num = Math.floor(num / radix);
    }
    return res;
}

function multiplyPolynomials(polys) {
    let result = polys[0];
    for (let i = 1; i < polys.length; i++) {
        result = calculateMult(result, polys[i], 2);
    }
    return result;
}