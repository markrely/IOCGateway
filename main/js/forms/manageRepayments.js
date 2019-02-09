$(document).ready(function(){
 var $manageRepaymentFundPage = $("#ManageRepaymentFund"),
     $RepaymentFundNameContainer = $manageRepaymentFundPage.find(".RepaymentFundName"),
     $submitButton = $manageRepaymentFundPage.find(".btn-next"),
     $messageHolder = $manageRepaymentFundPage.find("#messageHolder");

 $(".btnCancel").on('click', function(){
  event.preventDefault();
  $("#ManageRepaymentFundForm").attr('action', $("#ReferralPage").val());
  $("#ManageRepaymentFundForm").submit();
  });


  $('.btn-default').click(function(){
   $("#ManageRepaymentFundForm").attr('action', 'ManageBondType.cfm');
   $('#ManageRepaymentFundForm').submit();
    AddNewBtnClick();

   });
 $submitButton.click(function(event){
  event.preventDefault();

 if($('#RepaymentFundName').val().trim() == "")//we have to refer to the complete path to get the latest value
 {
  $RepaymentFundNameContainer.attr("class","col-sm-10 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter Repayment Fund Name.");
 }
 else{
  $RepaymentFundNameContainer.attr("class","col-sm-10 RepaymentFundName");
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
    $("#ReferralPage").val('../general/ManageRepayments.cfm');
    $("#action").val('Add');
    $("#ManageRepaymentFundForm").attr('action', 'ManageBondSubTypes.cfm');
    $("#ManageRepaymentFundForm").submit();
    });
}