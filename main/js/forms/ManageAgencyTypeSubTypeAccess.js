$(document).ready(function(){
 var $manageAgencyTypeSubTypeAccessPage = $("#ManageAgencyTypeSubTypeAccess"),
     $agencyContainer = $manageAgencyTypeSubTypeAccessPage.find(".agencyID"),
     $bondIdContainer = $manageAgencyTypeSubTypeAccessPage.find(".BondTypeID"),
     $bondSubTypeContainer = $manageAgencyTypeSubTypeAccessPage.find(".BondSubTypeID"),
     $submitButton = $manageAgencyTypeSubTypeAccessPage.find(".btn-next"),
     $messageHolder = $manageAgencyTypeSubTypeAccessPage.find("#messageHolder");


   $(".btnCancel").on('click', function(){
    event.preventDefault();
    $("#ManageAgencyTypeSubTypeAccessForm").attr('action', $("#ReferralPage").val());
    $("#ManageAgencyTypeSubTypeAccessForm").submit();
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
 else if($("#BondTypeID").val() == "-1"){//we have to refer to the complete path to get the latest value
  $agencyContainer.attr("class","col-sm-10 agencyID");
  $bondIdContainer.attr("class","col-sm-10 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please Select Bond Type.");
 }
 else if($("#BondSubTypeID").val() == "-1"){//we have to refer to the complete path to get the latest value
  $agencyContainer.attr("class","col-sm-10 agencyID");
  $bondIdContainer.attr("class","col-sm-10 BondTypeID");
  $bondSubTypeContainer.attr("class","col-sm-10 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please Select Bond Subtype.");
 }
 else{
  $bondSubTypeContainer.attr("class","col-sm-10 BondSubTypeID");
  $messageHolder
   .attr("class","hide")
    .html("");
   $("#ManageAgencyTypeSubTypeAccessForm").submit();
 }
 });


});
