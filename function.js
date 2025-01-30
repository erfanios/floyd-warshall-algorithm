function createfield() {
 n = $('#my_input').val();
 $("#matrix").html('');
 if (n <= 20 && n >= 2) {

  $("#matrix").html('');
  $("#matrix").append('<h2>Bitte Adjazenmatrix(A)(Verbindungsmatrix) eingeben</h2>')

  //$("#matrix").append('<form id="matrixinput" method="post" onsubmit="return false"><br>');

  var inputs = '<form id="matrixform"><br>';

  for (var i = 0; i < n; i++) {
   for (var k = 0; k < n; k++) {
    inputs += '<input value="0" min="0" type="number" id="r' + i + 'c' + k + '" name="r' + i + 'c' + k + '" style=" margin: auto; width:60px;">';
   }
   inputs += '<br>';
  }
  inputs += '<button type="submit">Submit</button>';
  inputs += '</form>';

  $("#matrix").append(inputs);

 }
 else {
  $("#matrix").append("Bitte einen n Dimension von unter 2-20 wählen.");

 }
 /*
 for (var i = 1; i <= n; i++) {
   $("#matrix").append('<span>Item ' + i + ' </span><input id="rolo_add' + i + '" name="addposition"  type="text" value="" required/><br>');

 }*/

}


function response () {
console.log("hello");

}

$(document).ready(function() {
 // Handle form submission dynamically
 $(document).on('submit', '#matrixform', function(event) {
     event.preventDefault();

     var matrix = [];
     var n = parseInt($('#my_input').val());

     for (var i = 0; i < n; i++) {
         var row = [];
         for (var k = 0; k < n; k++) {
             row.push(parseInt($('#r' + i + 'c' + k).val()) || 0);
         }
         matrix.push(row);
     }

     // Process the matrix (modify this function as needed)
     var resultMatrix = processMatrix(matrix);

     $("#matrixresponse").html('<h2>Matrix Data Processed</h2>');
     $("#matrixresponse").append('<pre>Original Matrix:\n' + JSON.stringify(matrix, null, 2) + '</pre>');
     $("#matrixresponse").append('<pre>Processed Matrix:\n' + JSON.stringify(resultMatrix, null, 2) + '</pre>');
 });

 // Example matrix processing function
 function processMatrix(matrix) {
     // Example: Multiply each element by 2
     return matrix.map(row => row.map(value => value * 2));
 }
});
