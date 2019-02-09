$(document).ready(function(){
 var $manageAgencyPage = $("#ManageFaqContainer"),
     $FaqTitleContainer = $manageAgencyPage.find(".faqTitle"),
     $FaqDescContainer = $manageAgencyPage.find(".faqDesc"),
     $submitButton = $manageAgencyPage.find(".btn-next"),
     $messageHolder = $manageAgencyPage.find("#messageHolder");

 $submitButton.click(function(event){
 event.preventDefault();

 if($('#faqTitle').val() == "")//we have to refer to the complete path to get the latest value
 {
  $FaqTitleContainer.attr("class","col-sm-10 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter FAQ Title.");
 }
 else if($('#faqDesc').val().trim() == "")//we have to refer to the complete path to get the latest value
 {
  $FaqTitleContainer.attr("class","col-sm-10 faqTitle");
  $FaqDescContainer.attr("class","col-sm-10 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter FAQ Description.");
 }
 else{
  $FaqTitleContainer.attr("class","col-sm-10 faqTitle");
  $FaqDescContainer.attr("class","col-sm-10 faqDesc");
  $messageHolder
   .attr("class","hide")
    .html("");
   $('#ManageFaq').submit();
 }
 });


});