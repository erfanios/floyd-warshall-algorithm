function createfield() {
 n = $('#my_input').val();
 $("#matrix").html('');
 if (n <= 20 && n >= 2){

   $("#matrix").html('');
   $("#matrix").append('<h2>Bitte Adjazenmatrix(A)(Verbindungsmatrix) eingeben</h2>')

   //$("#matrix").append('<form id="matrixinput" method="post" onsubmit="return false"><br>');

   var inputs='<form id="matrix" action="../response.sh"><br>';

   for (var i = 0; i < n; i++) {
       for (var k = 0; k < n; k++) {
           inputs += '<input value="0" min="0" type="number" id="r' + i + 'c' + k +'" name="r' + i + 'c' + k +'" style=" margin: auto; width:60px;">';
       }
       inputs +='<br>';
   }
   inputs +='<input id="matrixsubmit" type="submit" value="bestätigen">';
   inputs +='</form>';

   $("#matrix").append(inputs);
 
 }
 else{
   $("#matrix").append("Bitte einen n Dimension von unter 2-20 wählen.");

 }
   /*
   for (var i = 1; i <= n; i++) {
     $("#matrix").append('<span>Item ' + i + ' </span><input id="rolo_add' + i + '" name="addposition"  type="text" value="" required/><br>');

   }*/

 

 }


 /*
 $('#matrixsubmit').click(function(e){
   e.preventDefault();
   n = $('#matrixinput').val();
   $('#matrixresponse').html('');
   $('#matrixresponse').append(n);
   
 })
 

 function response() {

   
   n = $('#matrix').val();
   $('#matrixresponse').html('');
   $('#matrixresponse').append(n +'Hi there kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
   
 }
 
*/
 
 
