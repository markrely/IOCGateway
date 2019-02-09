$(document).ready(function(){
 var $manageSecondaryCategoryPage = $("#ManageSecondaryCategoryForm"),
     $SecondaryCategoryNameContainer = $manageSecondaryCategoryPage.find(".SecondaryCategoryName"),
     $submitButton = $manageSecondaryCategoryPage.find(".btn-next"),
     $messageHolder = $manageSecondaryCategoryPage.find("#messageHolder");

 $(".btnCancel").on('click', function(){
  event.preventDefault();
  $("#ManageSecondaryCategoryForm").attr('action', $("#ReferralPage").val());
  $("#ManageSecondaryCategoryForm").submit();
  });


  $('.btn-default').click(function(){
   $("#ManageSecondaryCategoryForm").attr('action', 'ManageBondType.cfm');
   $('#ManageSecondaryCategoryForm').submit();
    AddNewBtnClick();

   });
 $submitButton.click(function(event){
  event.preventDefault();

 if($('#SecondaryCategoryName').val().trim() == "")//we have to refer to the complete path to get the latest value
 {
  $SecondaryCategoryNameContainer.attr("class","col-sm-10 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter Bond Type Name.");
 }
 else{
  $SecondaryCategoryNameContainer.attr("class","col-sm-10 SecondaryCategoryName");
  $messageHolder
   .attr("class","hide")
    .html("");
   $(this).closest('form').submit();
 }
 });


});
$( window ).load(function() {
 $(".BondSubType").find(".select2-drop").append('<table width="100%"><tr><td class="row"><button class="btn btn-block btn-default btn-xs addnew-item" onClick=""><i class="fa fa-plus-circle"></i> Add New Bond SubType</button></div></td></tr></table>');
 AddNewBtnClick();
});

function AddNewBtnClick(){
   $(".addnew-item").on('click', function(){
    event.preventDefault();
    $("#BondSubTypeID").val('0');
    $("#ReferralPage").val('../general/ManageSecondaryCategories.cfm');
    $("#action").val('Add');
    $("#ManageSecondaryCategoryForm").attr('action', 'ManageBondSubTypes.cfm');
    $("#ManageSecondaryCategoryForm").submit();
    });
}