$(document).ready(function(){
 var $manageBondTypePage = $("#ManageBondType"),
     $bondTypeNameContainer = $manageBondTypePage.find(".bondtype"),
     $submitButton = $manageBondTypePage.find(".btn-next"),
     $messageHolder = $manageBondTypePage.find("#messageHolder"),
     $messageHolderBottom = $manageBondTypePage.find("#messageHolderBottom");

 $submitButton.click(function(event){
 event.preventDefault();
// if(!$('#numberofPrincipalPayments').val().match(/^[0-9]+$/))//!(Number($('#numberofPrincipalPayments').val()) > 0))
//   alert("ENter Positive Number");
// alert(Number($('#numberofPrincipalPayments').val()));

 if($('#bondtype').val().trim() == "")//we have to refer to the complete path to get the latest value
 {
  $bondTypeNameContainer.attr("class","col-sm-10 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter Bond Type Name.");
  $messageHolderBottom
     .attr("class","alert alert-danger")
      .html("Please enter Bond Type Name.");
 }
 else{
  $bondTypeNameContainer.attr("class","col-sm-10 bondtype");
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