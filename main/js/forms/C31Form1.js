$(document).ready(function(){


  if($("#hdnTotalCotrlVal").val() == 1){
     $("#forOriginalIssuePremiumAmt").attr('disabled', 'disabled');
     calculatec31page1sum();
  }

  //Diable all fields based on Status and UserRole. Only in MatuityGrid Page we have to make it read only when it is in 3(Approved) state also
// 2(Submitted), 5 (Closed)
//console.log($("#hdnCurrentstatusID").val());
// 3- 4 Normal Users.
//console.log($("#hdnUserRoleId").val());
if(($("#hdnUserRoleId").val() == "3" || $("#hdnUserRoleId").val() == "4") && ($("#hdnCurrentstatusID").val() == "2" || $("#hdnCurrentstatusID").val() == "5")){
 $("#RefundingBond :input:not('[name=btnsaveCurrentGridTop], [name=btnsaveCurrentGrid]')").attr("disabled", true);
}


  $('#btnsaveCurrentGridTop').click( function(){
     if($("#hdnTotalCotrlVal").val() == 1){
      var tempTotal = parseFloat(parseFloat(DollarFormat($("#forCostofIssuanceAmt").val()).replace(/\$|\,|\(|\)/g,''))
        + parseFloat(DollarFormat($("#forUnderwritersAmt").val()).replace(/\$|\,|\(|\)/g,''))).toFixed(2);
       $("#hdnforCostsofIssuanceforNewDebtAmt").val(DollarFormat(tempTotal));

       tempTotal = parseFloat($("#forDebtServiceAccountAmt").val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
       $("#hdnforDebtServiceReserveAccountNewBondsAmt").val(DollarFormat(tempTotal));
       tempTotal = parseFloat($("#forOriginalIssueDiscountAmt").val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
       $("#hdnforOriginalIssueDiscountforNewDebtAmt").val(DollarFormat(tempTotal));
       tempTotal = parseFloat($("#forPrincipalAmtforrefunding").val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
       $("#hdnforPrincipalAmtofNewDebt").val(DollarFormat(tempTotal));
       tempTotal = parseFloat($("#forAccuredInerestAmt").val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
       $("#hdnforAccruedInterestonNewDebtAmt").val(DollarFormat(tempTotal));
       tempTotal = parseFloat($("#forOriginalIssuePremiumAmt").val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
       $("#hdnforOriginalIssuePremiumonNewDebtAmt").val(DollarFormat(tempTotal));
       tempTotal = parseFloat($("#forAdditioanlFundsAmt").val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
       $("#hdnforAdditionalFundsProvidedByAgencyAmt").val(DollarFormat(tempTotal));
     }
       if(($("#hdnUserRoleId").val() == "3" || $("#hdnUserRoleId").val() == "4") && ($("#hdnCurrentstatusID").val() == "2" || $("#hdnCurrentstatusID").val() == "5")){
        $("#RefundingBond :input:not('[name=btnsaveCurrentGridTop], [name=btnsaveCurrentGrid]')").attr("disabled", false);
       }
       $(this).closest('form').submit();
  });

  $('#btnsaveCurrentGrid').click( function(){
   if($("#hdnTotalCotrlVal").val() == 1){
    var tempTotal = parseFloat(parseFloat(DollarFormat($("#forCostofIssuanceAmt").val()).replace(/\$|\,|\(|\)/g,''))
      + parseFloat(DollarFormat($("#forUnderwritersAmt").val()).replace(/\$|\,|\(|\)/g,''))).toFixed(2);
     $("#hdnforCostsofIssuanceforNewDebtAmt").val(DollarFormat(tempTotal));

     tempTotal = parseFloat($("#forDebtServiceAccountAmt").val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
     $("#hdnforDebtServiceReserveAccountNewBondsAmt").val(DollarFormat(tempTotal));
     tempTotal = parseFloat($("#forOriginalIssueDiscountAmt").val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
     $("#hdnforOriginalIssueDiscountforNewDebtAmt").val(DollarFormat(tempTotal));
     tempTotal = parseFloat($("#forPrincipalAmtforrefunding").val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
     $("#hdnforPrincipalAmtofNewDebt").val(DollarFormat(tempTotal));
     tempTotal = parseFloat($("#forAccuredInerestAmt").val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
     $("#hdnforAccruedInterestonNewDebtAmt").val(DollarFormat(tempTotal));
     tempTotal = parseFloat($("#forOriginalIssuePremiumAmt").val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
     $("#hdnforOriginalIssuePremiumonNewDebtAmt").val(DollarFormat(tempTotal));
     tempTotal = parseFloat($("#forAdditioanlFundsAmt").val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
     $("#hdnforAdditionalFundsProvidedByAgencyAmt").val(DollarFormat(tempTotal));
    }
     if(($("#hdnUserRoleId").val() == "3" || $("#hdnUserRoleId").val() == "4") && ($("#hdnCurrentstatusID").val() == "2" || $("#hdnCurrentstatusID").val() == "5")){
      $("#RefundingBond :input:not('[name=btnsaveCurrentGridTop], [name=btnsaveCurrentGrid]')").attr("disabled", false);
     }
     $(this).closest('form').submit();
  });

 $("#forPrincipalAmtforrefunding").blur(function () {
  calculatec31page1sum();
 });
 $("#forOriginalIssueDiscountAmt").blur(function () {
  calculatec31page1sum();
  if ($("#forOriginalIssueDiscountAmt").val().trim() == "$0.00"){
   $("#forOriginalIssuePremiumAmt").removeAttr('disabled');
   $("#forOriginalIssuePremiumAmt").focus();
  }
  else if($("#forOriginalIssueDiscountAmt").val().indexOf('(') == -1){
    $(".forOriginalIssueDiscountAmt").attr("class","col-sm-9 forOriginalIssueDiscountAmt has-error");
    $("#forOriginalIssueDiscountAmt").focus();
    $("#messageHolderTop").text("OID should be entered as a negative number, bond premium should be entered in next Line.")
    .attr("class","alert alert-danger");
  }
  else{
   $(".forOriginalIssueDiscountAmt").attr('class', 'col-sm-9 forOriginalIssueDiscountAmt');
   $("#messageHolderTop").text("").attr("class","hide");
   $("#forOriginalIssuePremiumAmt").attr('disabled', 'disabled');
  }
 });
 $("#forOriginalIssuePremiumAmt").blur(function () {
  calculatec31page1sum();
  if ($("#forOriginalIssuePremiumAmt").val().trim() == "$0.00"){
   $("#forOriginalIssueDiscountAmt").removeAttr('disabled');
  }
  else
   $("#forOriginalIssueDiscountAmt").attr('disabled', 'disabled');
 });

  $("#forAccuredInerestAmt").blur(function () {
   calculatec31page1sum();
  });
 $("#forAdditioanlFundsAmt").blur(function () {
  calculatec31page1sum();
 });
 $("#forCostofIssuanceAmt").blur(function () {
  calculatec31page1sum();
 });
 $("#forUnderwritersAmt").blur(function () {
  calculatec31page1sum();
 });
 $("#forEscrowRefundedAmt").blur(function () {
  calculatec31page1sum();
 });
 $("#forDebtServiceAccountAmt").blur(function () {
  calculatec31page1sum();
 });
 $("#forOtherAmt").blur(function () {
  calculatec31page1sum();
 });

 });



function calculatec31page1sum()
{
   //Calculate the totals on onblur event of forAccountingGainontheRefundingOldDebtAmt
   var tempTotal = parseFloat($("#forAccuredInerestAmt").val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
   $("#forAccuredInerestUsesAmt").val(DollarFormat(tempTotal));

   tempTotal = parseFloat(
   parseFloat(DollarFormat($("#forPrincipalAmtforrefunding").val()).replace(/\$|\,|\(|\)/g,'')) +
   parseFloat(DollarFormat($("#forOriginalIssueDiscountAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
   parseFloat(DollarFormat($("#forOriginalIssuePremiumAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
   parseFloat(DollarFormat($("#forAccuredInerestAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
   parseFloat(DollarFormat($("#forAdditioanlFundsAmt").val()).replace(/\$|\,|\(|\)/g,''))
   ).toFixed(2);
   $("#totalSourcesAmt").val(DollarFormat(tempTotal));

   if($("#forOtherAmt").val().indexOf('(') != -1){
    tempTotal = parseFloat(
    parseFloat(DollarFormat($("#forCostofIssuanceAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
    parseFloat(DollarFormat($("#forUnderwritersAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
    parseFloat(DollarFormat($("#forEscrowRefundedAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
    parseFloat(DollarFormat($("#forAccuredInerestUsesAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
    parseFloat(DollarFormat($("#forDebtServiceAccountAmt").val()).replace(/\$|\,|\(|\)/g,'')) -
    parseFloat(DollarFormat($("#forOtherAmt").val()).replace(/\$|\,|\(|\)/g,''))
    ).toFixed(2);
   }
   else
   {
     tempTotal = parseFloat(
    parseFloat(DollarFormat($("#forCostofIssuanceAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
    parseFloat(DollarFormat($("#forUnderwritersAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
    parseFloat(DollarFormat($("#forEscrowRefundedAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
    parseFloat(DollarFormat($("#forAccuredInerestUsesAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
    parseFloat(DollarFormat($("#forDebtServiceAccountAmt").val()).replace(/\$|\,|\(|\)/g,'')) +
    parseFloat(DollarFormat($("#forOtherAmt").val()).replace(/\$|\,|\(|\)/g,''))
    ).toFixed(2);
   }
    $("#totalUsesAmt").val(DollarFormat(tempTotal));
    if($("#totalSourcesAmt").val() !== $("#totalUsesAmt").val()){
     $("#messageHolder").text("Sources and Uses of a Bond Sale should be equal. Please review your entries.")
     .attr("class","alert alert-danger");
    }
    else
     $("#messageHolder").attr("class","hide");
}
