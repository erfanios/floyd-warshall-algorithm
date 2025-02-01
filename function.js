async function createfield() {
 n = $('#my_input').val();
 $("#matrix").html('');
 if (n <= 20 && n >= 2) {

  $("#matrix").html('');

  const text = await getTranslationTextAsync("fill_the_matrix");
  $("#matrix").append('<h2 id="header_of_matrix" >' + text + '</h2>')

  //$("#matrix").append('<form id="matrixinput" method="post" onsubmit="return false"><br>');

  var inputs = '<form id="matrixform"><br>';

  for (var i = 0; i < n; i++) {
   for (var k = 0; k < n; k++) {
    inputs += '<input value="0" min="0" type="number" id="r' + i + 'c' + k + '" name="r' + i + 'c' + k + '" style=" margin: auto; width:60px;">';
   }
   inputs += '<br>';
  }
  const submit = await getTranslationTextAsync("submit");
  inputs += '<button id="matrixSubmit" type="submit">' + submit + '</button>';
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

function getTranslationText(keyName) {
 const browserLanguage = typeof navigator !== 'undefined' ? navigator.language : 'en';
 const language = filterLanguage(browserLanguage.split("-")[0]);
 let translationText = '';

 $.ajax({
 url: `translation/${language}.json`,
 async: false,
 dataType: 'json',
 success: function(data) {
   translationText = data[keyName];
 }
 });

 return translationText;
}


async function getTranslationTextAsync(keyName) {
 const browserLanguage = typeof navigator !== 'undefined' ? navigator.language : 'en-US';
 const language = filterLanguage(browserLanguage.split("-")[0]);
 let translationText = '';

  try {
  const response = await fetch(`translation/${language}.json`);
  const data = await response.json();
  translationText = data[keyName];
  } catch (error) {
  console.error('Error fetching translation:', error);
  }

 return translationText;
}

function loadTranslations(language) {
 $.getJSON(`translation/${language}.json`, function(data) {
   $('title').text(data.title);
   $('#heading').text(data.heading);
   $('#label').text(data.label);
   $('#my_input').attr('placeholder', data.input_placeholder);
   $('#numbersubmit').text(data.button_text);
   $('#header_of_matrix')?.text(data.fill_the_matrix);
   $('#matrixSubmit')?.text(data.submit);
 });
}

function filterLanguage(language) {
 if (language && language === 'de') {
  return 'de';
 } else {
  return 'en';
 }
}

$(document).ready(function() {
 const browserLanguage = navigator.language;
 var language = browserLanguage.split("-")[0];
 language = filterLanguage(language);

 $('#languageSwitcher').val(language);

 // Load translations for the initial language
 loadTranslations(language);

 // Sprachumschaltung
 $('#languageSwitcher').change(function() {
  var selectedLanguage = filterLanguage($(this).val());
  loadTranslations(selectedLanguage);
 });

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
