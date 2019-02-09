$(document).ready(function(){
 var $manageAgencyPage = $("#ManageAgency"),
     $agencyNameContainer = $manageAgencyPage.find(".agencyName"),
     $submitButton = $manageAgencyPage.find(".btn-next"),
     $messageHolder = $manageAgencyPage.find("#messageHolder"),
     $messageHolderBottom = $manageAgencyPage.find("#messageHolderBottom");

 $submitButton.click(function(event){
 event.preventDefault();
// if(!$('#numberofPrincipalPayments').val().match(/^[0-9]+$/))//!(Number($('#numberofPrincipalPayments').val()) > 0))
//   alert("ENter Positive Number");
// alert(Number($('#numberofPrincipalPayments').val()));

 if($('#agencyName').val().trim() == "")//we have to refer to the complete path to get the latest value
 {
  $agencyNameContainer.attr("class","col-sm-10 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter Agency Name.");
  $messageHolderBottom
     .attr("class","alert alert-danger")
      .html("Please enter Agency Name.");
 }
 else{
  $agencyNameContainer.attr("class","col-sm-10 agencyName");
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