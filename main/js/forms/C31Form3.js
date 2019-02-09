$(document).ready(function(){

if(($("#hdnUserRoleId").val() == "3" || $("#hdnUserRoleId").val() == "4") && ($("#hdnCurrentstatusID").val() == "2" || $("#hdnCurrentstatusID").val() == "5")){
 $("#RefundingBond :input:not('[id=btnsaveC31Form3], [name=btnsaveTopC31Form3]')").attr("disabled", true);
}

  calculatec31page3sum();

  //Page3
  $("#forPrincipalAmtOldDebtReacq").blur(function () {
   calculatec31page3sum();
  });
  $("#forCallPremiumOldDebtAmt").blur(function () {
   calculatec31page3sum();
  });
  $("#forInterestonOldDebtAmt").blur(function () {
   calculatec31page3sum();
  });
  $("#forFundsRequiredtobeDepositedintoEscrowFundtoRefundOldDebtAmt").blur(function () {
   calculatec31page3sum();
  });
  $("#forOtherAmtIII").blur(function () {
   calculatec31page3sum();
  });

$("form").submit(function(e) {
    if(($("#hdnUserRoleId").val() == "3" || $("#hdnUserRoleId").val() == "4") && ($("#hdnCurrentstatusID").val() == "2" || $("#hdnCurrentstatusID").val() == "5")){
    $("#RefundingBond :input:not('[id=btnsaveC31Form3], [name=btnsaveTopC31Form3]')").attr("disabled", false);
   }
});


});



function calculatec31page3sum()
{
   //Calculate the totals on onblue event of forAccountingGainontheRefundingOldDebtAmt
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

   tempTotal = 0;
   tempTotal = parseFloat(
   parseFloat(DollarFormat($("#forPrincipalAmtOldDebtReacq").val()).replace(/\$|\,|\(|\)/g,'')) +
   parseFloat(DollarFormat($("#forCallPremiumOldDebtAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
   parseFloat(DollarFormat($("#forInterestonOldDebtAmt").val()).replace(/\$|\,|\(|\)/g,''))
   ).toFixed(2);
   $("#forCurrentRefundingReacquisitionPriceAmt").val(DollarFormat(tempTotal));

  if($("#forOtherAmtIII").val().indexOf('(') != -1){

   tempTotal = parseFloat(
   /*
     parseFloat(DollarFormat($("#forOldDebtOutstandingAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
     parseFloat(DollarFormat($("#forUnamortizedIssuancecostsforOldDebtAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
     parseFloat(DollarFormat($("#forUnamortizedPremiumfortheOldDebtAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
     parseFloat(DollarFormat($("#forUnamortizedDiscountfortheOldDebtAmt").val()).replace(/\$|\,|\(|\)/g,''))
   */
   parseFloat(DollarFormat($("#forOldDebtOutstandingAmt").val()).replace(/\$|\,|\(|\)/g,'')) -
   parseFloat(DollarFormat($("#forUnamortizedIssuancecostsforOldDebtAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
   parseFloat(DollarFormat($("#forUnamortizedPremiumfortheOldDebtAmt").val()).replace(/\$|\,|\(|\)/g,'')) -
   parseFloat(DollarFormat($("#forUnamortizedDiscountfortheOldDebtAmt").val()).replace(/\$|\,|\(|\)/g,'')) -
   parseFloat(DollarFormat($("#forOtherAmtIII").val()).replace(/\$|\,|\(|\)/g,''))
  //Add New Other amount Koppi
   ).toFixed(2);
  }
  else{
   tempTotal = parseFloat(
   /*
     parseFloat(DollarFormat($("#forOldDebtOutstandingAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
     parseFloat(DollarFormat($("#forUnamortizedIssuancecostsforOldDebtAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
     parseFloat(DollarFormat($("#forUnamortizedPremiumfortheOldDebtAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
     parseFloat(DollarFormat($("#forUnamortizedDiscountfortheOldDebtAmt").val()).replace(/\$|\,|\(|\)/g,''))
   */
   parseFloat(DollarFormat($("#forOldDebtOutstandingAmt").val()).replace(/\$|\,|\(|\)/g,'')) -
   parseFloat(DollarFormat($("#forUnamortizedIssuancecostsforOldDebtAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
   parseFloat(DollarFormat($("#forUnamortizedPremiumfortheOldDebtAmt").val()).replace(/\$|\,|\(|\)/g,'')) -
   parseFloat(DollarFormat($("#forUnamortizedDiscountfortheOldDebtAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
   parseFloat(DollarFormat($("#forOtherAmtIII").val()).replace(/\$|\,|\(|\)/g,''))
  //Add New Other amount Koppi
   ).toFixed(2);
  }
   $("#forNetCarryingAmountoftheOldDebt").val(DollarFormat(tempTotal));

   tempTotal = parseFloat(
   parseFloat(DollarFormat($("#forCurrentRefundingReacquisitionPriceAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
   parseFloat(DollarFormat($("#forFundsRequiredtobeDepositedintoEscrowFundtoRefundOldDebtAmt").val()).replace(/\$|\,|\(|\)/g,'')) -
   parseFloat(DollarFormat($("#forNetCarryingAmountoftheOldDebt").val()).replace(/\$|\,|\(|\)/g,''))
   ).toFixed(2);
   $("#forTotaAmt").val(DollarFormat(tempTotal));
}

