import processMatrix from './floyd-warshall.js';

const my_input = "my_input";
const str_matrix_dimensions = "matrix_dimensions";

// Here starts everything
$(document).ready(function() {
 handleMatrixSubmit();
 createfield(); // An empty Matrix should be created at the beginning, just so the page is not empty

 handleLanguageAndChanges();
});

// Funktion global verfügbar machen
window.createfield = createfield;
export async function createfield() {
 let n = await $('#my_input').val();
 $("#matrix").html('');
 if (n <= 20 && n >= 2) {

  $("#matrix").html('');

  const text = await getTranslationTextAsync("fill_the_matrix");
  $("#matrix").append('<h2 id="header_of_matrix" >' + text + '</h2>')

  //$("#matrix").append('<form id="matrixinput" method="post" onsubmit="return false"><br>');

  let inputs = '<form id="matrixform"><br>';
  inputs += '<input type="hidden" id="'+ str_matrix_dimensions +'" value="'+ n +'">';

  for (let i = 0; i < n; i++) {
   for (let k = 0; k < n; k++) {
    inputs += '<input value="0" min="0" type="number" id="r' + i + 'c' + k + '" name="r' + i + 'c' + k + '" class="matrix_input">';
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
 for (let i = 1; i <= n; i++) {
   $("#matrix").append('<span>Item ' + i + ' </span><input id="rolo_add' + i + '" name="addposition"  type="text" value="" required/><br>');
 }
 */

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
   $('#calculationDone')?.text(data.calculationDone);
 });
}

function filterLanguage(language) {
 if (language && language === 'de') {
  return 'de';
 } else {
  return 'en';
 }
}

function handleLanguageAndChanges() {
 const browserLanguage = navigator.language;
 let language = browserLanguage.split("-")[0];
 language = filterLanguage(language);

 $('#languageSwitcher').val(language);

 // Load translations for the initial language
 loadTranslations(language);

 // Sprachumschaltung
 $('#languageSwitcher').change(function() {
  let selectedLanguage = filterLanguage($(this).val());
  loadTranslations(selectedLanguage);
 });
}

function handleMatrixSubmit() {
    // Handle form submission dynamically
    $(document).on('submit', '#matrixform', function(event) {
     event.preventDefault();
  
     let matrix = [];
     let matrixDimensions = parseInt($('#' + str_matrix_dimensions).val());
  
     for (let i = 0; i < matrixDimensions; i++) {
         let row = [];
         for (let k = 0; k < matrixDimensions; k++) {
             row.push(parseInt($('#r' + i + 'c' + k).val()) || 0);
         }
         matrix.push(row);
     }

     let resultHtml = processMatrix(matrix);
  
     $("#matrixresponse").html(`<h2 id="calculationDone">${getTranslationText("calculationDone")}</h2>`);

     $("#matrixresponse").append(resultHtml);
   });
}