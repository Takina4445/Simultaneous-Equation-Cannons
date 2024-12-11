// 初始化選項
const xContainer = document.getElementById('x-values');
const yContainer = document.getElementById('y-values');

for (let i = 1; i <= 12; i++) {
    xContainer.innerHTML += `<label><input type="checkbox" value="${i}"> ${i}</label> `;
    yContainer.innerHTML += `<label><input type="checkbox" value="${i}"> ${i}</label> `;
}

// 清空 B 值輸入框
document.getElementById('clear-b').addEventListener('click', () => {
    document.querySelectorAll('.b-input').forEach(input => input.value = '');
});

// 計算按鈕邏輯
document.getElementById('calculate').addEventListener('click', () => {
    const X_values = Array.from(document.querySelectorAll('#x-values input:checked')).map(el => parseInt(el.value));
    const Y_values = Array.from(document.querySelectorAll('#y-values input:checked')).map(el => parseInt(el.value));
    const B_values = Array.from(document.querySelectorAll('.b-input')).map(el => parseInt(el.value)).filter(v => !isNaN(v));
    const A_now = parseInt(document.getElementById('a-now').value);
    const A_max = parseInt(document.getElementById('a-max').value);
    const highlightDiff = parseInt(document.getElementById('highlight-diff').value);

    if (!A_now || !A_max || X_values.length === 0 || Y_values.length === 0 || B_values.length === 0) {
        alert('請確保所有欄位都已填寫正確。');
        return;
    }

    const resultsTable = document.querySelector('#results tbody');
    resultsTable.innerHTML = '';

    for (let A = 1; A <= A_max; A++) {
        X_values.forEach(X => {
            Y_values.forEach(Y => {
                B_values.forEach(B => {
                    if (2 * X + Y === A && X + Y === B) {
                        const diff = Math.abs(A - A_now);
                        const rowClass = diff <= highlightDiff ? 'highlight' : '';
                        resultsTable.innerHTML += `
                            <tr class="${rowClass}">
                                <td>${A}</td>
                                <td>${B}</td>
                                <td>${X}</td>
                                <td>${Y}</td>
                            </tr>`;
                    }
                });
            });
        });
    }

    if (!resultsTable.innerHTML) {
        resultsTable.innerHTML = '<tr><td colspan="4">沒有符合條件的組合。</td></tr>';
    }
});
