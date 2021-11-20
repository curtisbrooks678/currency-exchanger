import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from './currency.js';

function clearFields() {
  $('#currencyErrors1').text("");
  $('#currencyErrors2').text("");
  $('#showErrors').text("");
}

$(document).ready(function() {
  $('#exchange').click(function() {
    clearFields();
    let promise = Currency.getCurrency();
    promise.then(function(response) {
      const body = JSON.parse(response);
      const input = $('#input').val();
      const inputCurrency = ($('#inputCurrency').val()).toUpperCase();
      const outputCurrency = ($('#outputCurrency').val()).toUpperCase();
      let inputRate = '';
      let outputRate = '';
      let output = '';


      let counter1 = 0;
      for(const code in body.conversion_rates) {
        if (`${code}` === inputCurrency) {
          inputRate = `${body.conversion_rates[code]}`;
        } 
        if (`${code}` !== inputCurrency) {
          counter1++;
        } 
        if (counter1 === 160) {
          $('#showConversion').hide();
          $('#currencyErrors1').text("Your first currency code is entered incorrectly or is not a valid currency code for this application. Please enter a valid currency code from the list below.");
        }
      }

      let counter2 = 0;
      for(const code2 in body.conversion_rates) {
        if (`${code2}` === outputCurrency){
          outputRate = `${body.conversion_rates[code2]}`;
        } 
        if (`${code2}` !== outputCurrency) {
          counter2++;
        } 
        if (counter2 === 160) {
          $('#showConversion').hide();
          $('#currencyErrors2').text("Your second currency code is entered incorrectly or is not a valid currency code for this application. Please enter a valid currency code from the list below.");
        }
      }
      
      if (counter1 < 160 && counter2 < 160) {
        output = (inputRate / outputRate) * input;
        output = Math.round(output * 10000) / 10000;
        $('#showConversion').show();
        $('#inputSpan').text(input);
        $('#inputCurrencySpan').text(inputCurrency);
        $('#outputSpan').text(output);
        $('#outputCurrencySpan').text(outputCurrency);
      }
    }, function (error) {
      $('#showErrors').text(`There was an error processing your request: ${error}`);
    });
  });
});

