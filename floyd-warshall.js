let matrix;
const numberForUndefined = -1;

// Example matrix processing function
export default function processMatrix(originalMatrix) {
 matrix = originalMatrix;
 
 const d0 = create_d0(originalMatrix);
 let html = convertToHtmlTable(d0);
 html += d_of_k(d0, 0);
 return html;
}

// Creates the distanc matrix of matrix with distanc 0
function create_d0 (aMatrix) {
 let d0_Matrix = aMatrix;
 const matrixDimensions = aMatrix.length;
 for (let i = 0; i < matrixDimensions; i++) {
  for (let j = 0; j < matrixDimensions; j++) {
   // Example operation: set each element to 0
   if (i === j) {
    d0_Matrix[i][j] = 0;
   } else if (aMatrix[i][j] > 0) {
    d0_Matrix[j][j] = aMatrix[i][j];
   } else {
    d0_Matrix[i][j] = numberForUndefined;
   }
  }
 }

 return d0_Matrix;
}

function convertToHtmlTable(matrix) {
 const n = matrix.length;
 let html = "<br><table>";
 html += "<tr><td>D(0)</td><td><table>";

 for (let i = 0; i < n; i++) {
  html += "<tr>";
  for (let j = 0; j < n; j++) {
   const value = matrix[i][j];
   if (value === numberForUndefined) {
    html += "<td>#</td>";
   } else {
    html += `<td>${value}</td>`;
   }
  }
  html += "</tr>";
 }

 html += "</table></td></tr></table>";
 return html;
}

function td(inValue, cssClass) {
 let html = "";

 if (cssClass.length === 0) {
 if (inValue === numberForUndefined) {
  html += "<td>#</td>";
 } else {
  html += `<td>${inValue}</td>`;
 }
 } else {
 if (inValue === numberForUndefined) {
  html += `<td class="${cssClass}">#</td>`;
 } else {
  html += `<td class="${cssClass}">${inValue}</td>`;
 }
 }

 return html;
}

function tdstr(inValue) {
 return `<td>${inValue}</td>`;
}

// Creates the distanc matrix of matrix with distanc `K`
// It is a recursiv function
export function d_of_k(list, num) {
 let html = "";
 const n = list.length;
 let sInstance, rInstance;
 const r = num;

 if (num < n) {
 html += "<br><table>";
 html += "<tr>";
 html += tdstr(`D(${num})`);
 html += "<td>";
 html += "<table>";

 for (let s = 0; s < n; s++) {
  sInstance = list[s][r];

  if (s !== r && sInstance !== numberForUndefined) {
  html += "<tr>";
  for (let zr = 0; zr < n; zr++) {
   rInstance = list[r][zr];
   let value = list[s][zr];
   const sum = rInstance + sInstance;

   if (r !== zr && rInstance !== numberForUndefined && (sum < value || value === numberForUndefined)) {
   list[s][zr] = sum;
   value = sum;
   html += td(value, "corange");
   } else if (r === zr) {
   html += td(value, "cgreen");
   } else {
   html += td(value, "");
   }
  }
  html += "</tr>";
  } else if (s === r) {
  html += '<tr class="highlight">';
  for (let i = 0; i < n; i++) {
   const value = list[s][i];
   html += td(value, "");
  }
  html += "</tr>";
  } else {
  html += "<tr>";
  for (let i = 0; i < n; i++) {
   const value = list[s][i];
   if (i === r) {
   html += td(value, "cgreen");
   } else {
   html += td(value, "");
   }
  }
  html += "</tr>";
  }
 }

 html += "</table>";
 html += "</td>";
 html += "</tr>";
 html += "</table>";

 html += d_of_k(list, ++num);
 }

 return html;
}