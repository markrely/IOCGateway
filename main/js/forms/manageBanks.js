$(document).ready(function(){
 var $manageBankPage = $("#MangeBankForm"),
     $bankNameContainer = $manageBankPage.find(".BankName"),
     $submitButton = $manageBankPage.find(".btn-next"),
     $messageHolder = $manageBankPage.find("#messageHolder");


   $(".btnCancel").on('click', function(){
    event.preventDefault();
    $("#MangeBankForm").attr('action', $("#ReferralPage").val());
    $("#MangeBankForm").submit();
    });


 $submitButton.click(function(event){
 event.preventDefault();


 if($('#BankName').val() == "")//we have to refer to the complete path to get the latest value
 {
  $bankNameContainer.attr("class","col-sm-10 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter Bank Name.");
 }
 else{
  $bankNameContainer.attr("class","col-sm-10 BankName");
  $messageHolder
   .attr("class","hide")
    .html("");
   $("#MangeBankForm").submit();
 }
 });


});
