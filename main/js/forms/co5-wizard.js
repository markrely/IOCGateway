 if( $('body').hasClass('comp-wizard') ) {

  //*******************************************
  /* FORM WIZARD
  /********************************************/

  $('#demo-wizard').on('change', function(e, data) {
   // validation
   // if( $('#form'+data.step).length > 0 ) {
   //  $('#form'+data.step).parsley('validate');
   //  if( !$('#form'+data.step).parsley('isValid') )
   //   return false;
   //  }

   // last step button
   $btnNext = $(this).parents('.wizard-wrapper').find('.btn-next');

   if(data.step === 7 && data.direction == 'next') {
    $btnNext.text(' Save My Form')
    .prepend('<i class="fa fa-check-circle"></i>')
    .removeClass('btn-primary').addClass('btn-success');
   }else{
    $btnNext.text('Next ').
    append('<i class="fa fa-arrow-right"></i>')
    .removeClass('btn-success').addClass('btn-primary');
   }

  }).on('finished', function(){
   alert('Your account has been created.');
  });

  $('.wizard-wrapper .btn-next').click( function(){
   $('#demo-wizard').wizard('next');
  });

  $('.wizard-wrapper .btn-prev').click( function(){
   $('#demo-wizard').wizard('previous');
  });

  // $('.wizard-wrapper .btn-Jump').click( function(){
  //  WizardJumpToStep('#step5');
  // });
 }


$(document).ready(function(){

 var index= -1;
 var newTr = "";
 var items = [];
 var tempField = "";

 $('#co5Info').on('click','tr',function(e){
  tempField = $(this);
  if(($(tempField).find('[type=checkbox]').attr("disabled") == undefined) && ($('#co5Selected').find('input[id=' + $(tempField).find('[type=checkbox]').attr('id') + ']').length == 0)){
   index=$(this).closest("tr").index();
   $(this).closest("tr").siblings().removeClass("highlighted");
   $(this).toggleClass("highlighted");
   newTr = $(this).closest("tr").clone();
   items.push(newTr);
   newTr.appendTo($("#co5Selected"));
   $(this).find('[type=checkbox]').prop("disabled", true).prop('checked', true);
  }
 });

  $('#co5Selected').on('click','tr',function(e){
   var selectedRowIndex = $(this).index();
   var selectedRow = $(this);
   $('#co5Info').find('input[id=' + $(selectedRow).find('[type=checkbox]').attr('id') + ']')
    .prop("disabled", false)
     .prop('checked', false)
      .end();
   $("#co5Selected tbody>tr").eq(selectedRowIndex).remove();
 });

 $('.pagination').on('click',function(e){
  //alert("This is where we need to clean the check box");
   $('#co5Info').find('[type=checkbox]').each(function(){
     $(this).prop("disabled", false);
     $(this).prop("checked", false);
   });

  $('#co5Selected').find('[type=checkbox]').each(function(){
   var selectedId = $(this).attr("id");
   console.log($('#co5Info').find('input[id=' + selectedId + ']'));
   $('#co5Info').find('input[id=' + selectedId + ']').prop('checked', true).prop('disabled', true);
   });
 });




$("#forOriginalIssuePremiumAmt").attr('disabled', 'disabled');
calculatec31page1sum();
calculatec31page2sum();

$('#demo-wizard').on('change', function(e, data) {
   // validation
   // if( $('#form'+data.step).length > 0 ) {
   //  $('#form'+data.step).parsley('validate');
   //  if( !$('#form'+data.step).parsley('isValid') )
   //   return false;
   //  }

   // last step button
   $btnNext = $(this).parents('.wizard-wrapper').find('.btn-next');

   if(data.step === 3 && data.direction == 'next') {
    // Carry c31 Part 1 data to part2, Please format the calculated fileds to dollar format
    //alert($("#forPrincipalAmtforrefunding").val());
   // 1.$("#forPrincipalAmtforrefunding").val()
   // 2.$("#forOriginalIssueDiscountAmt").val()
   // 3.$("#forOriginalIssuePremiumAmt").val()
   // 4.$("#forAccuredInerestAmt").val()
   // 5.$("#forAdditioanlFundsAmt").val()
   // 6.$("#forCostofIssuanceAmt").val()
   // 7.$("#forUnderwritersAmt").val()
   // 8.$("#forEscrowRefundedAmt").val()
   // 9.$("#forDebtServiceAccountAmt").val()
   // 10.$("#forOtherAmt").val()
   // 11.$("#totalSourcesAmt").val()
   // 12.$("#totalUsesAmt").val()

   var tempTotal = parseFloat(parseFloat(DollarFormat($("#forCostofIssuanceAmt").val()).replace(/\$|\,|\(|\)/g,''))
    + parseFloat(DollarFormat($("#forUnderwritersAmt").val()).replace(/\$|\,|\(|\)/g,''))).toFixed(2);
   $("#forCostsofIssuanceforNewDebtAmt").val(DollarFormat(tempTotal));

   tempTotal = parseFloat($("#forDebtServiceAccountAmt").val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
   $("#forDebtServiceReserveAccountNewBondsAmt").val(DollarFormat(tempTotal));
   tempTotal = parseFloat($("#forOriginalIssueDiscountAmt").val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
   $("#forOriginalIssueDiscountforNewDebtAmt").val(DollarFormat(tempTotal));
   tempTotal = parseFloat($("#forPrincipalAmtforrefunding").val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
   $("#forPrincipalAmtofNewDebt").val(DollarFormat(tempTotal));
   tempTotal = parseFloat($("#forAccuredInerestAmt").val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
   $("#forAccruedInterestonNewDebtAmt").val(DollarFormat(tempTotal));
   tempTotal = parseFloat($("#forOriginalIssuePremiumAmt").val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
   $("#forOriginalIssuePremiumonNewDebtAmt").val(DollarFormat(tempTotal));
   tempTotal = parseFloat($("#forAdditioanlFundsAmt").val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
   $("#forAdditionalFundsProvidedByAgencyAmt").val(DollarFormat(tempTotal));

   //calculatec31page2sum();

   }
   if(data.step === 4 && data.direction == 'next') {
    // Carry c31 Part 2 data to part3, Please format the calculated fileds to dollar format
    calculatec31page3sum();
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
11)forTotaAmt
*/
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
 //if (parseFloat($("#forOriginalIssueDiscountAmt").val().replace(/\$|\,|\(|\)/g,'')) > 0){
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

/*
//forInterestonOldDebtAmt --> onblur
1)forPrincipalAmtOldDebtReacq
2)forCallPremiumOldDebtAmt
3)forInterestonOldDebtAmt
4)forCurrentRefundingReacquisitionPriceAmt
5)forFundsRequiredtobeDepositedintoEscrowFundtoRefundOldDebtAmt
6)forOldDebtOutstandingAmt
7)forUnamortizedIssuancecostsforOldDebtAmt
8)forUnamortizedPremiumfortheOldDebtAmt
9)forUnamortizedDiscountfortheOldDebtAmt
10)forNetCarryingAmountoftheOldDebt
11)forTotaAmt
*/

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
   // 1.$("#forPrincipalAmtforrefunding").val()
   // 2.$("#forOriginalIssueDiscountAmt").val()
   // 3.$("#forOriginalIssuePremiumAmt").val()
   // 4.$("#forAccuredInerestAmt").val()
   // 5.$("#forAdditioanlFundsAmt").val()
   // 6.$("#forCostofIssuanceAmt").val()
   // 7.$("#forUnderwritersAmt").val()
   // 8.$("#forEscrowRefundedAmt").val()
   // 9.$("#forDebtServiceAccountAmt").val()
   // 10.$("#forOtherAmt").val()
   // 11.$("#totalSourcesAmt").val()
   // 12.$("#totalUsesAmt").val()

   function WizardJumpToStep(stepId){
    // //remove class for li
    // $('.step-content').find(".active").removeClass("active");
    // // add class for li
    // $('.step-content').find(stepId).attr("class","step-pane active");
    // //demo-wizard
    // $('#demo-wizard').find('[data-target=' + stepId + ']').prevAll().attr("class","complete");
    // $('#demo-wizard').find('[data-target=' + stepId + ']').attr("class","active");
    // //remove class for badge span
    // $('#demo-wizard').find('[data-target=' + stepId + ']').prevAll().find(".badge").attr("class","badge badge-success");
    // // add class for badge span
    // $('#demo-wizard').find('[data-target=' + stepId + ']').find(".badge").attr("class","badge badge-info");
    $('#demo-wizard').wizard('selectedItem', {step: 2});
   }