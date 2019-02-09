$(document).ready(function(){
 var $manageSecondaryCategoryPage = $("#ManageCategoryForm"),
     $CategoryNameContainer = $manageSecondaryCategoryPage.find(".CategoryName"),
     $submitButton = $manageSecondaryCategoryPage.find(".btn-next"),
     $messageHolder = $manageSecondaryCategoryPage.find("#messageHolder");

 $(".btnCancel").on('click', function(){
  event.preventDefault();
  $("#ManageCategoryForm").attr('action', $("#ReferralPage").val());
  $("#ManageCategoryForm").submit();
  });


  $('.btn-default').click(function(){
   $("#ManageCategoryForm").attr('action', 'ManageBondType.cfm');
   $('#ManageCategoryForm').submit();
    AddNewBtnClick();

   });
 $submitButton.click(function(event){
  event.preventDefault();

 if($('#BondCategoryName').val().trim() == "")//we have to refer to the complete path to get the latest value
 {
  $CategoryNameContainer.attr("class","col-sm-10 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter Bond Type Name.");
 }
 else{
  $CategoryNameContainer.attr("class","col-sm-10 CategoryName");
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
    $("#ReferralPage").val('../general/ManageCategories.cfm');
    $("#action").val('Add');
    $("#ManageCategoryForm").attr('action', 'ManageBondSubTypes.cfm');
    $("#ManageCategoryForm").submit();
    });
}