$(document).ready(function(){
 var $manageAgencyTrusteeRelationPage = $("#ManageAgencyTrusteeRelation"),
     $agencyContainer = $manageAgencyTrusteeRelationPage.find(".agencyID"),
     $trusteeContainer = $manageAgencyTrusteeRelationPage.find(".TrusteeID"),
     $submitButton = $manageAgencyTrusteeRelationPage.find(".btn-next"),
     $messageHolder = $manageAgencyTrusteeRelationPage.find("#messageHolder");


   $(".btnCancel").on('click', function(){
    event.preventDefault();
    $("#ManageAgencyTrusteeRelationForm").attr('action', $("#ReferralPage").val());
    $("#ManageAgencyTrusteeRelationForm").submit();
    });


 $submitButton.click(function(event){
 event.preventDefault();


 if($("#agencyID").val() == "-1")//we have to refer to the complete path to get the latest value
 {
  $agencyContainer.attr("class","col-sm-10 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please Select Issued By / Agency.");
 }
 else if($("#TrusteeID").val() == "-1"){//we have to refer to the complete path to get the latest value
  $agencyContainer.attr("class","col-sm-10 agencyID");
  $trusteeContainer.attr("class","col-sm-10 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please Select Trustee.");
 }
 else{
  $trusteeContainer.attr("class","col-sm-10 TrusteeID");
  $messageHolder
   .attr("class","hide")
    .html("");
   $("#ManageAgencyTrusteeRelationForm").submit();
 }
 });


});
