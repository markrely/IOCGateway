$(document).ready(function(){
 var $manageRateTypePage = $("#MangeRateTypeForm"),
     $manageRateTypeName = $manageRateTypePage.find(".RateTypeName"),
     $submitButton = $manageRateTypePage.find(".btn-next"),
     $messageHolder = $manageRateTypePage.find("#messageHolder");


   $(".btnCancel").on('click', function(){
    event.preventDefault();
    $("#MangeRateTypeForm").attr('action', $("#ReferralPage").val());
    $("#MangeRateTypeForm").submit();
    });


 $submitButton.click(function(event){
 event.preventDefault();


 if($('#RateTypeName').val() == "")//we have to refer to the complete path to get the latest value
 {
  $manageRateTypeName.attr("class","col-sm-10 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter Rate TypeName.");
 }
 else{
  $manageRateTypePage.attr("class","col-sm-10 RateTypeName");
  $messageHolder
   .attr("class","hide")
    .html("");
   $("#MangeRateTypeForm").submit();
 }
 });


});
