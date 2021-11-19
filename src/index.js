import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from './currency.js';

$(document).ready(function() {
  let promise = Currency.getCurrency();
  $('#exchange').click(function() {
    promise.then(function(response) {
      const body = JSON.parse(response);
      const input = $('#input').val();
      const inputCurrency = $('#inputCurrency').val();
      const outputCurrency = $('#outputCurrency').val();
      let inputRate = '';
      let outputRate = '';
      let output = '';
      for(const code in body.conversion_rates) {
        if (`${code}` === inputCurrency) {
          inputRate = `${body.conversion_rates[code]}`;
        }
      }
      for(const code2 in body.conversion_rates) {
        if (`${code2}` === outputCurrency){
          outputRate = `${body.conversion_rates[code2]}`;
        }
      }
      output = (inputRate / outputRate) * input;
      output = Math.round(output * 10000) / 10000;
      $('#showExchange').show();
      $('#showConversion').show();
      $('#inputSpan').text(input);
      $('#inputCurrencySpan').text(inputCurrency);
      $('#outputSpan').text(output);
      $('#outputCurrencySpan').text(outputCurrency);
    });
  });
});

