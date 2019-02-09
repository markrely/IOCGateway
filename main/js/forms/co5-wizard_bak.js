$(document).ready(function(){

$('#demo-wizard').on('change', function(e, data) {
   // validation
   if( $('#form'+data.step).length > 0 ) {
    $('#form'+data.step).parsley('validate');
    if( !$('#form'+data.step).parsley('isValid') )
     return false;
    }

   // last step button
   $btnNext = $(this).parents('.wizard-wrapper').find('.btn-next');

   if(data.step === 2 && data.direction == 'next') {
    // Carry c31 Part 1 data to part2, Please format the calculated fileds to dollar format
    //alert($("#forPrincipalAmtforrefunding").val());
   // 1.$("#forPrincipalAmtforrefunding").val()
   // 2.$("#forOriginalIssueDiscountAmt").val()
   // 3.$("#forOriginalIssuePremiumAmt").val()
   // 4.$("#forAccuredInerestAmt").val()
   // 5.$("#forAdditioanlFundsAmt").val()
   // 6.$("#forCostofIssuanceAmt").val()
   // 7.$("#forUnderwritersAmt").val()
   // 9.$("#forDebtServiceAccountAmt").val()
   var tempTotal = parseFloat(parseFloat($("#forCostofIssuanceAmt").val().replace(/,/g,''))
    + parseFloat($("#forUnderwritersAmt").val().replace(/,/g,''))).toFixed(2);
   $("#forCostsofIssuanceforNewDebtAmt").val(DollarFormat(tempTotal));
   tempTotal = parseFloat($("#forDebtServiceAccountAmt").val().replace(/,/g,'')).toFixed(2);
   $("#forDebtServiceReserveAccountNewBondsAmt").val(DollarFormat(tempTotal));
   tempTotal = parseFloat($("#forOriginalIssueDiscountAmt").val().replace(/,/g,'')).toFixed(2);
   $("#forOriginalIssueDiscountforNewDebtAmt").val(DollarFormat(tempTotal));
   tempTotal = parseFloat($("#forPrincipalAmtforrefunding").val().replace(/,/g,'')).toFixed(2);
   $("#forPrincipalAmtofNewDebt").val(DollarFormat(tempTotal));
   tempTotal = parseFloat($("#forAccuredInerestAmt").val().replace(/,/g,'')).toFixed(2);
   $("#forAccruedInterestonNewDebtAmt").val(DollarFormat(tempTotal));
   tempTotal = parseFloat($("#forOriginalIssuePremiumAmt").val().replace(/,/g,'')).toFixed(2);
   $("#forOriginalIssuePremiumonNewDebtAmt").val(DollarFormat(tempTotal));
   tempTotal = parseFloat($("#forAdditioanlFundsAmt").val().replace(/,/g,'')).toFixed(2);
   $("#forAdditionalFundsProvidedByAgencyAmt").val(DollarFormat(tempTotal));

   // //Calculate the totals on onblue event of forAccountingGainontheRefundingOldDebtAmt
   // tempTotal = parseFloat($("#forPrincipalAmtOldDebt").val().replace(/,/g,'')).toFixed(2) +
   // parseFloat($("#forAccruedInterestOldDebtAmt").val().replace(/,/g,'')).toFixed(2) +
   // parseFloat($("#forCostsofIssuanceforNewDebtAmt").val().replace(/,/g,'')).toFixed(2) +
   // parseFloat($("#forDebtServiceReserveAccountNewBondsAmt").val().replace(/,/g,'')).toFixed(2) +
   // parseFloat($("#forOriginalIssueDiscountforNewDebtAmt").val().replace(/,/g,'')).toFixed(2) +
   // parseFloat($("#forAmtusedforCurrentProjects").val().replace(/,/g,'')).toFixed(2) +
   // parseFloat($("#forUnamortizedPremiumOldDebtAmt").val().replace(/,/g,'')).toFixed(2) +
   // parseFloat($("#forAccountingLossonRefundingOldDebtAmt").val().replace(/,/g,'')).toFixed(2);
   // $("#forTotalDebtServiceAccountAmt").val(DollarFormat(tempTotal));

   // tempTotal = parseFloat($("#forPrincipalAmtofNewDebt").val().replace(/,/g,'')).toFixed(2) +
   // parseFloat($("#forAccruedInterestonNewDebtAmt").val().replace(/,/g,'')).toFixed(2) +
   // parseFloat($("#forOriginalIssuePremiumonNewDebtAmt").val().replace(/,/g,'')).toFixed(2) +
   // parseFloat($("#forUnamortizedDiscountonOldDebtAmt").val().replace(/,/g,'')).toFixed(2) +
   // parseFloat($("#forUnamortizedIssuanceCostsofOldDebtAmt").val().replace(/,/g,'')).toFixed(2) +
   // parseFloat($("#forAdditionalFundsProvidedByAgencyAmt").val().replace(/,/g,'')).toFixed(2) +
   // parseFloat($("#forAccountingGainontheRefundingOldDebtAmt").val().replace(/,/g,'')).toFixed(2);
   // $("#forCreditServiceAccountAmt").val(DollarFormat(tempTotal));

   }
   if(data.step === 3 && data.direction == 'next') {
    //alert($("#forPrincipalAmtforrefunding").val());
    // Carry c31 Part 2 data to part3, Please format the calculated fileds to dollar format
   }
//Debits
//a.forPrincipalAmtOldDebt
//b.forAccruedInterestOldDebtAmt
//c.forCostsofIssuanceforNewDebtAmt
//d.forDebtServiceReserveAccountNewBondsAmt
//e.forOriginalIssueDiscountforNewDebtAmt
//f.forAmtusedforCurrentProjects
//g.forUnamortizedPremiumOldDebtAmt
//h.forAccountingLossonRefundingOldDebtAmt
//Credits
//a.forPrincipalAmtofNewDebt
//b.forAccruedInterestonNewDebtAmt
//c.forOriginalIssuePremiumonNewDebtAmt
//d.forUnamortizedDiscountonOldDebtAmt
//e.forUnamortizedIssuanceCostsofOldDebtAmt
//f.forAdditionalFundsProvidedByAgencyAmt
//g.forAccountingGainontheRefundingOldDebtAmt

//Debt Sum -->forTotalDebtServiceAccountAmt
//Credit Sum -->forCreditServiceAccountAmt

/*
//forInterestonOldDebtAmt --> onblur
1)forPrincipalAmtOldDebt
2)forCallPremiumOldDebtAmt
3)forInterestonOldDebtAmt
4)forCurrentRefundingReacquisitionPriceAmt
5)forFundsRequiredtobeDepositedintoEscrowFundtoRefundOldDebtAmt
6)forOldDebtOutstandingAmt
7)forUnamortizedIssuancecostsforOldDebtAmt
8)forUnamortizedPremiumfortheOldDebtAmt
9)forUnamortizedDiscountfortheOldDebtAmt
10)forNetCarryingAmountoftheOldDebt
11)forCreditServiceAccountAmt
*/
  });

$("#forPrincipalAmtOldDebt").blur(function () {
 calculatec31page2sum();
});
$("#forAccruedInterestOldDebtAmt").blur(function () {
 calculatec31page2sum();
});
$("#forAmtusedforCurrentProjects").blur(function () {
 calculatec31page2sum();
});
$("#forUnamortizedPremiumOldDebtAmt").blur(function () {
 calculatec31page2sum();
});
$("#forAccountingLossonRefundingOldDebtAmt").blur(function () {
 calculatec31page2sum();
});
$("#forUnamortizedDiscountonOldDebtAmt").blur(function () {
 calculatec31page2sum();
});
$("#forUnamortizedIssuanceCostsofOldDebtAmt").blur(function () {
 calculatec31page2sum();
});
$("#forAccountingGainontheRefundingOldDebtAmt").blur(function () {
 calculatec31page2sum();
});

});

function calculatec31page2sum()
{
 //Calculate the totals on onblue event of forAccountingGainontheRefundingOldDebtAmt
 var tempTotal = parseFloat(
 parseFloat($("#forPrincipalAmtOldDebt").val().replace(/,/g,'')) +
 parseFloat($("#forAccruedInterestOldDebtAmt").val().replace(/,/g,'')) +
 parseFloat($("#forCostsofIssuanceforNewDebtAmt").val().replace(/,/g,'')) +
 parseFloat($("#forDebtServiceReserveAccountNewBondsAmt").val().replace(/,/g,'')) +
 parseFloat($("#forOriginalIssueDiscountforNewDebtAmt").val().replace(/,/g,'')) +
 parseFloat($("#forAmtusedforCurrentProjects").val().replace(/,/g,'')) +
 parseFloat($("#forUnamortizedPremiumOldDebtAmt").val().replace(/,/g,'')) +
 parseFloat($("#forAccountingLossonRefundingOldDebtAmt").val().replace(/,/g,''))
 ).toFixed(2);
 $("#forTotalDebtServiceAccountAmt").val(DollarFormat(tempTotal));

 tempTotal = parseFloat(
 parseFloat($("#forPrincipalAmtofNewDebt").val().replace(/,/g,'')) +
 parseFloat($("#forAccruedInterestonNewDebtAmt").val().replace(/,/g,'')) +
 parseFloat($("#forOriginalIssuePremiumonNewDebtAmt").val().replace(/,/g,'')) +
 parseFloat($("#forUnamortizedDiscountonOldDebtAmt").val().replace(/,/g,'')) +
 parseFloat($("#forUnamortizedIssuanceCostsofOldDebtAmt").val().replace(/,/g,'')) +
 parseFloat($("#forAdditionalFundsProvidedByAgencyAmt").val().replace(/,/g,'')) +
 parseFloat($("#forAccountingGainontheRefundingOldDebtAmt").val().replace(/,/g,''))
 ).toFixed(2);
 $("#forCreditServiceAccountAmt").val(DollarFormat(tempTotal));
}