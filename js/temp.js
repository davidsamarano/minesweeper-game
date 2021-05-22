


// function renderBoard() {

//     var currNum;
//     var length = Math.sqrt(gLevel);  // rowspan & colspan;
//     var currIdx = 0;          //  0 - (gLevel-1);
//     var strHtml = ``;

//     var elHeader_colspan = document.querySelector('th');
//     elHeader_colspan.colSpan = '' + length; // <th colspan="4"/"5"/"6">

//     for (var i = 0; i < length; i++) {

//         strHtml += `<tr>`;

//         for (var j = 0; j < length; j++) {

//             currNum = gCellsData[currIdx];
//             strHtml += `<td class="cell" onclick="cellClick(this)">${currNum}</td>`;
//             currIdx++;
//         }
//         strHtml += `</tr>`;
//     }
//     var elBoard = document.querySelector('.board');
//     elBoard.innerHTML = strHtml;
// }