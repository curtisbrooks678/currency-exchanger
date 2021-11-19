import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Currency from './currency.js'

$(document).ready(function() {
  let promise = Currency.getCurrency();
  $('#exchange').click(function() {
    promise.then(function(response) {
      const body = JSON.parse(response);
      const input = $('#input').val();
      const inputCurrency = $('#inputCurrency').val();
      const outputCurrency = $('#outputCurrency').val();
      let inputPrice = '';
      let outputPrice = '';
      let output = '';
      // for(const property in body.conversion_rates) {
      //   if(inputCurrency === `${body[i].name}`) {
      //     inputPrice = `${body[i].price}`;
      //   }
      // }
      // for(let i=0; i<body2.length; i++) {
      //   if(outputCurrency === `${body[i].name}`) {
      //     outputPrice = `${body[i].price}`;
      //   }
      // }
      output = (inputPrice / outputPrice) * input;
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

