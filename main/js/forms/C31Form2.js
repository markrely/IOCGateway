$(document).ready(function(){

     $("#forCostsofIssuanceforNewDebtAmt").val(DollarFormat($("#hdnforCostsofIssuanceforNewDebtAmt").val()));

     $("#forDebtServiceReserveAccountNewBondsAmt").val(DollarFormat($("#hdnforDebtServiceReserveAccountNewBondsAmt").val()));

     $("#forOriginalIssueDiscountforNewDebtAmt").val(DollarFormat($("#hdnforOriginalIssueDiscountforNewDebtAmt").val()));

     $("#forPrincipalAmtofNewDebt").val(DollarFormat($("#hdnforPrincipalAmtofNewDebt").val()));

     $("#forAccruedInterestonNewDebtAmt").val(DollarFormat($("#hdnforAccruedInterestonNewDebtAmt").val()));

     $("#forOriginalIssuePremiumonNewDebtAmt").val(DollarFormat($("#hdnforOriginalIssuePremiumonNewDebtAmt").val()));

     $("#forAdditionalFundsProvidedByAgencyAmt").val(DollarFormat($("#hdnforAdditionalFundsProvidedByAgencyAmt").val()));

if(($("#hdnUserRoleId").val() == "3" || $("#hdnUserRoleId").val() == "4") && ($("#hdnCurrentstatusID").val() == "2" || $("#hdnCurrentstatusID").val() == "5")){
 $("#RefundingBond :input:not('[name=btnsaveCurrentGridTop], [name=btnsaveCurrentGrid]')").attr("disabled", true);
}


  calculatec31page2sum();
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

  $("#forOtherAmtII").blur(function () {
   calculatec31page2sum();
  });


  $('#btnsaveCurrentGridTop,#btnsaveCurrentGrid').click( function(){
    var tempTotal = parseFloat($("#forPrincipalAmtOldDebt").val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
    $("#forOldDebtOutstandingAmt").val(DollarFormat(tempTotal));

    tempTotal = 0;
    tempTotal = parseFloat($("#forUnamortizedIssuanceCostsofOldDebtAmt").val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
    //$("#forUnamortizedIssuancecostsforOldDebtAmt").val(DollarFormat(tempTotal));
     $("#forUnamortizedIssuancecostsforOldDebtAmt").val(DollarFormat(-tempTotal));

    tempTotal = 0;
    tempTotal = parseFloat($("#forUnamortizedPremiumOldDebtAmt").val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
    $("#forUnamortizedPremiumfortheOldDebtAmt").val(DollarFormat(tempTotal));

    tempTotal = 0;
    tempTotal = parseFloat($("#forUnamortizedDiscountonOldDebtAmt").val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
    //$("#forUnamortizedDiscountfortheOldDebtAmt").val(DollarFormat(tempTotal));
     $("#forUnamortizedDiscountfortheOldDebtAmt").val(DollarFormat(-tempTotal));

    // var tempTotal = parseFloat(parseFloat(DollarFormat($("#forCostofIssuanceAmt").val()).replace(/\$|\,|\(|\)/g,''))
    //   + parseFloat(DollarFormat($("#forUnderwritersAmt").val()).replace(/\$|\,|\(|\)/g,''))).toFixed(2);
    //  $("#hdnforCostsofIssuanceforNewDebtAmt").val(DollarFormat(tempTotal));

    //  tempTotal = parseFloat($("#forDebtServiceAccountAmt").val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
    //  $("#hdnforDebtServiceReserveAccountNewBondsAmt").val(DollarFormat(tempTotal));
    //  tempTotal = parseFloat($("#forOriginalIssueDiscountAmt").val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
    //  $("#hdnforOriginalIssueDiscountforNewDebtAmt").val(DollarFormat(tempTotal));
    //  tempTotal = parseFloat($("#forPrincipalAmtforrefunding").val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
    //  $("#hdnforPrincipalAmtofNewDebt").val(DollarFormat(tempTotal));
    //  tempTotal = parseFloat($("#forAccuredInerestAmt").val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
    //  $("#hdnforAccruedInterestonNewDebtAmt").val(DollarFormat(tempTotal));
    //  tempTotal = parseFloat($("#forOriginalIssuePremiumAmt").val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
    //  $("#hdnforOriginalIssuePremiumonNewDebtAmt").val(DollarFormat(tempTotal));
    //  tempTotal = parseFloat($("#forAdditioanlFundsAmt").val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
    //  $("#hdnforAdditionalFundsProvidedByAgencyAmt").val(DollarFormat(tempTotal));
   if(($("#hdnUserRoleId").val() == "3" || $("#hdnUserRoleId").val() == "4") && ($("#hdnCurrentstatusID").val() == "2" || $("#hdnCurrentstatusID").val() == "5")){
    $("#RefundingBond :input:not('[name=btnsaveCurrentGridTop], [name=btnsaveCurrentGrid]')").attr("disabled", false);
   }

     $(this).closest('form').submit();
  });


});

function calculatec31page2sum()
{
  //Calculate the totals on onblue event of forAccountingGainontheRefundingOldDebtAmt

  var tempTotal = parseFloat(
  parseFloat(DollarFormat($("#forPrincipalAmtOldDebt").val()).replace(/\$|\,|\(|\)/g,'')) +
  parseFloat(DollarFormat($("#forAccruedInterestOldDebtAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
  parseFloat(DollarFormat($("#forCostsofIssuanceforNewDebtAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
  parseFloat(DollarFormat($("#forDebtServiceReserveAccountNewBondsAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
  parseFloat(DollarFormat($("#forOriginalIssueDiscountforNewDebtAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
  parseFloat(DollarFormat($("#forAmtusedforCurrentProjects").val()).replace(/\$|\,|\(|\)/g,'')) +
  parseFloat(DollarFormat($("#forUnamortizedPremiumOldDebtAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
  parseFloat(DollarFormat($("#forAccountingLossonRefundingOldDebtAmt").val()).replace(/\$|\,|\(|\)/g,''))
  ).toFixed(2);
  $("#forTotalDebtServiceAccountAmt").val(DollarFormat(tempTotal));

  if($("#forOtherAmtII").val().indexOf('(') != -1){
    tempTotal = parseFloat(
    parseFloat(DollarFormat($("#forPrincipalAmtofNewDebt").val()).replace(/\$|\,|\(|\)/g,'')) +
    parseFloat(DollarFormat($("#forAccruedInterestonNewDebtAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
    parseFloat(DollarFormat($("#forOriginalIssuePremiumonNewDebtAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
    parseFloat(DollarFormat($("#forUnamortizedDiscountonOldDebtAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
    parseFloat(DollarFormat($("#forUnamortizedIssuanceCostsofOldDebtAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
    parseFloat(DollarFormat($("#forAdditionalFundsProvidedByAgencyAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
    parseFloat(DollarFormat($("#forAccountingGainontheRefundingOldDebtAmt").val()).replace(/\$|\,|\(|\)/g,'')) -
    parseFloat(DollarFormat($("#forOtherAmtII").val()).replace(/\$|\,|\(|\)/g,''))
    //Add new Other amount Koppi
    ).toFixed(2);
  }
  else
  {
   tempTotal = parseFloat(
   parseFloat(DollarFormat($("#forPrincipalAmtofNewDebt").val()).replace(/\$|\,|\(|\)/g,'')) +
   parseFloat(DollarFormat($("#forAccruedInterestonNewDebtAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
   parseFloat(DollarFormat($("#forOriginalIssuePremiumonNewDebtAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
   parseFloat(DollarFormat($("#forUnamortizedDiscountonOldDebtAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
   parseFloat(DollarFormat($("#forUnamortizedIssuanceCostsofOldDebtAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
   parseFloat(DollarFormat($("#forAdditionalFundsProvidedByAgencyAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
   parseFloat(DollarFormat($("#forAccountingGainontheRefundingOldDebtAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
   parseFloat(DollarFormat($("#forOtherAmtII").val()).replace(/\$|\,|\(|\)/g,''))
   //Add new Other amount Koppi
   ).toFixed(2);
  }

   $("#forCreditServiceAccountAmt").val(DollarFormat(tempTotal));

   if($("#forTotalDebtServiceAccountAmt").val() !== $("#forCreditServiceAccountAmt").val()){
   $("#messageHolderStep4").text("Debits must Equal Credits on this form.")
   .attr("class","alert alert-danger");
   }
   else
    $("#messageHolderStep4").attr("class","hide");
}

