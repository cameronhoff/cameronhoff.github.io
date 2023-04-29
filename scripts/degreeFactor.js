document.addEventListener('DOMContentLoaded', () => {
    const calcDfBtn = document.querySelector('#calc-df-btn');

    calcDfBtn.addEventListener('click', () => {
        calculateFactorization();
    })
});

function check(arr) {
    const c = /[^01 ]/;
    for (let i = 0; i < arr.length; i++) {
        if (c.test(arr[i])) {
        return false;
        }
    }
    return true;
}

function calc_fstep(m1, m2) {
    const m1_bin = parseInt(m1, 2);
    const m2_bin = m2.split('').reverse().join('');
    const res = [];
    for (let i = 0; i < m2_bin.length; i++) {
        const digit = parseInt(m2_bin[i], 2);
        if (digit !== 0) {
        res.push(m1_bin * digit * 2**i);
        }
    }
    let x = 0;
    for (let i = 0; i < res.length; i++) {
        x ^= res[i];
    }
    return x.toString(2);
}

function calculateFactorization() {
    const arr_pols = [
        document.querySelector('#c1-input').value,
        document.querySelector('#c2-input').value,
        document.querySelector('#c3-input').value,
        document.querySelector('#c4-input').value,
        document.querySelector('#c5-input').value,
        document.querySelector('#c6-input').value
    ];
    for (let i = 0; i < arr_pols.length; i++) {
        if (arr_pols[i] === '' || parseInt(arr_pols[i], 2) === 0) {
        arr_pols[i] = '1';
        }
    }
    console.log(arr_pols);
    if (check(arr_pols)) {
        let f2 = calc_fstep(arr_pols[0], arr_pols[1]);
        let f3 = calc_fstep(f2, arr_pols[2]);
        let f4 = calc_fstep(f3, arr_pols[3]);
        let f5 = calc_fstep(f4, arr_pols[4]);
        let f6 = calc_fstep(f5, arr_pols[5]);
        document.querySelector('#factorization-result-input').value = f6;
    }
}
