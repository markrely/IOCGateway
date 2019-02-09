$(document).ready(function(){
 var $manageBankPage = $("#ManageBank"),
     $bankNameContainer = $manageBankPage.find(".bankName"),
     $submitButton = $manageBankPage.find(".btn-next"),
     $messageHolder = $manageBankPage.find("#messageHolder"),
     $messageHolderBottom = $manageBankPage.find("#messageHolderBottom");

 $submitButton.click(function(event){
 event.preventDefault();
// if(!$('#numberofPrincipalPayments').val().match(/^[0-9]+$/))//!(Number($('#numberofPrincipalPayments').val()) > 0))
//   alert("ENter Positive Number");
// alert(Number($('#numberofPrincipalPayments').val()));

 if($('#bankName').val().trim() == "")//we have to refer to the complete path to get the latest value
 {
  $bankNameContainer.attr("class","col-sm-10 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter Bank Name.");
  $messageHolderBottom
     .attr("class","alert alert-danger")
      .html("Please enter Bank Name.");
 }
 else{
  $bankNameContainer.attr("class","col-sm-10 bankName");
  $messageHolder
   .attr("class","hide")
    .html("");
  $messageHolderBottom
     .attr("class","hide")
      .html("");
   $(this).closest('form').submit();
 }
 });


});