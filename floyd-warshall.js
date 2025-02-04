const undefinedNumberField = Number.MAX_SAFE_INTEGER;

// Example matrix processing function
export default function processMatrix(matrix) {
 
 matrix = create_d0(matrix);
 let html = convertToHtmlTable(matrix);
 html += d_of_k(matrix, 0);
 return html;
}

// Creates the distanc matrix of matrix with distanc 0
function create_d0 (d0_Matrix) {
 const matrixDimensions = d0_Matrix.length;
 for (let i = 0; i < matrixDimensions; i++) {
  for (let j = 0; j < matrixDimensions; j++) {
   // Example operation: set each element to 0
   if (i === j) {
    d0_Matrix[i][j] = 0;
   } else if (d0_Matrix[i][j] > 0) {
     // Do nothing
   } else {
    d0_Matrix[i][j] = undefinedNumberField;
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
   if (value === undefinedNumberField) {
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
 if (inValue === undefinedNumberField) {
  html += "<td>#</td>";
 } else {
  html += `<td>${inValue}</td>`;
 }
 } else {
  if (inValue === undefinedNumberField) {
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
export function d_of_k(list, k_step) {
 let html = "";
 const n = list.length;
 let i_k_value, k_j_value;

 if (k_step < n) {
  html += "<br><table>";
  html += "<tr>";
  html += tdstr(`D(${k_step})`);
  html += "<td>";
  html += "<table>";

  
  for (let i = 0; i < n; i++) {
   i_k_value = list[i][k_step];

   if (i !== k_step && i_k_value !== undefinedNumberField) { //wenn (nicht) Zeilen Nr. die gewählte n von d(n) spricht
    html += "<tr>";
    for (let j = 0; j < n; j++) {
     k_j_value = list[k_step][j];
     let distance_of_i_to_j = list[i][j];
     const sum_of_both_fields = k_j_value + i_k_value;

     if (k_step !== j && k_j_value !== undefinedNumberField && (sum_of_both_fields < distance_of_i_to_j || distance_of_i_to_j === undefinedNumberField)) {
      
     list[i][j] = sum_of_both_fields;
     distance_of_i_to_j = sum_of_both_fields;
     html += td(distance_of_i_to_j, "corange");
     } else if (k_step === j) {
     html += td(distance_of_i_to_j, "cgreen");
     } else {
     html += td(distance_of_i_to_j, "");
     }
    }
    html += "</tr>";
   } else if (i === k_step) {
   html += '<tr class="highlight">';
   for (let row_index = 0; row_index < n; row_index++) {
    const value = list[i][row_index];
    html += td(value, "");
   }
   html += "</tr>";
   } else {
   html += "<tr>";
   for (let column_index = 0; column_index < n; column_index++) {
    const value = list[i][column_index];
    if (column_index === k_step) {
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

  html += d_of_k(list, ++k_step);
 }

 return html;
}