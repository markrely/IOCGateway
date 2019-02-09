$(document).ready(function(){
 var $manageBondSubTypePage = $("#ManageBondSubType"),
     $bondSubTypeNameContainer = $manageBondSubTypePage.find(".bondsubTypeName"),
     $submitButton = $manageBondSubTypePage.find(".btn-next"),
     $messageHolder = $manageBondSubTypePage.find("#messageHolder"),
     $messageHolderBottom = $manageBondSubTypePage.find("#messageHolderBottom");
	 $('.btn-default').click(function(){
			$("#ManageBondSubTypeForm").attr('action', 'ManageBondType.cfm');
			$('#ManageBondSubTypeForm').submit();

			});
 $(".btnCancel").on('click', function(){
  event.preventDefault();
  if($("#ReferralPage").val() !== $("#ParentReferralPage").val()){
     $("#ManageBondSubTypeForm").attr('action', $("#ParentReferralPage").val());
  }
  else{
     $("#ManageBondSubTypeForm").attr('action', $("#ReferralPage").val());
  }
  $("#ManageBondSubTypeForm").submit();
  });

 $submitButton.click(function(event){
  event.preventDefault();
// if(!$('#numberofPrincipalPayments').val().match(/^[0-9]+$/))//!(Number($('#numberofPrincipalPayments').val()) > 0))
//   alert("ENter Positive Number");
// alert(Number($('#numberofPrincipalPayments').val()));

 if($('#bondsubTypeName').val().trim() == "")//we have to refer to the complete path to get the latest value
 {
  $bondSubTypeNameContainer.attr("class","col-sm-10 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter Bond Type Name.");
  $messageHolderBottom
     .attr("class","alert alert-danger")
      .html("Please enter Bond Type Name.");
 }
 else{
  $bondSubTypeNameContainer.attr("class","col-sm-10 bondsubTypeName");
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
$( window ).load(function() {
 $(".BondType").find(".select2-drop").append('<table width="100%"><tr><td class="row"><button class="btn btn-block btn-default btn-xs addnew-item" onClick=""><i class="fa fa-plus-circle"></i> Add New Bond Type</button></div></td></tr></table>');
 AddNewBtnClick();
});

function AddNewBtnClick(){
   $(".addnew-item").on('click', function(){
    event.preventDefault();
    $("#bondTypeID").val('0');
    $("#ReferralPage").val('../general/ManageBondSubTypes.cfm');
    $("#action").val('Add');
    $("#ManageBondSubTypeForm").attr('action', 'ManageBondTypes.cfm');
    $("#ManageBondSubTypeForm").submit();
    });
}