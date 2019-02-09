$(document).ready(function(){
 var $manageFiscalYearPage = $("#MangeFiscalYear"),
     $manageFiscalYear = $manageFiscalYearPage.find(".FiscalYear"),
     $submitButton = $manageFiscalYearPage.find(".btn-next"),
     $messageHolder = $manageFiscalYearPage.find("#messageHolder");


   $(".btnCancel").on('click', function(){
    event.preventDefault();
    $("#MangeFiscalYearForm").attr('action', $("#ReferralPage").val());
    $("#MangeFiscalYearForm").submit();
    });


 $submitButton.click(function(event){
 event.preventDefault();


 if($('#FiscalYearVal').val() == "")//we have to refer to the complete path to get the latest value
 {
  $manageFiscalYear.attr("class","col-sm-10 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter Rate FiscalYear.");
 }
 else{
  $manageFiscalYear.attr("class","col-sm-10 FiscalYear");
  $messageHolder
   .attr("class","hide")
    .html("");
   $("#MangeFiscalYearForm").submit();
 }
 });


});
