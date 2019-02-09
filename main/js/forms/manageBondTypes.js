$(document).ready(function(){
 var $manageBondTypePage = $("#ManageBondTypeForm"),
     $bondTypeNameContainer = $manageBondTypePage.find(".BondTypeName"),
     $submitButton = $manageBondTypePage.find(".btn-next"),
     $messageHolder = $manageBondTypePage.find("#messageHolder");


   $(".btnCancel").on('click', function(){
    event.preventDefault();
    $("#ManageBondTypeForm").attr('action', $("#ReferralPage").val());
    $("#ManageBondTypeForm").submit();
    });


 $submitButton.click(function(event){
 event.preventDefault();
 if($('#BondTypeName').val() == "")//we have to refer to the complete path to get the latest value
 {
  $bondTypeNameContainer.attr("class","col-sm-10 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter Bond Type Name.");
 }
 else{
  $bondTypeNameContainer.attr("class","col-sm-10 BondTypeName");
  $messageHolder
   .attr("class","hide")
    .html("");
   $("#ManageBondTypeForm").submit();
 }
 });


});

