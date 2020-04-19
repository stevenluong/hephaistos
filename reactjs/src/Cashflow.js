import React from 'react';
import Title from './Common/Title';

export default function Cashflow({user, assets,liabilities}) {
  var totalIncomes = 0;
  assets.forEach(a =>{
    totalIncomes = totalIncomes + a.income;
  })
  var totalPayments = 0;
  liabilities.forEach(l =>{
    totalPayments = totalPayments + l.monthlyPayment;
  })
  var cashflow = totalIncomes - totalPayments;
  return (
    <React.Fragment>
      <Title id="assets">Cashflow</Title>
      <h2>{cashflow}{user.currency} per Month</h2>
    </React.Fragment>
  );
}
