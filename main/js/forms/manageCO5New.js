$(document).ready(function(){
 var defaultCurrentDate = new Date();
 $("form").bind("keypress", function(e) {
  if (e.keyCode == 13) return false;
 });
if($("#ToatlIssueAmt").val() !== '')
  $("#ToatlIssueAmt").val(DollarFormat($("#ToatlIssueAmt").val()));

//I) issuedate --> >= deliverydate
$('#issuedate').on('changeDate', function() {
 $('#deliverydate').datepicker("setDate", $('#issuedate').val());
 $('#deliverydate').datepicker("setStartDate", $('#issuedate').val());
 });
//II) maturitydate --> >= current Date when creating --> simply dont allow previous dates in the date picker
$('#maturitydate').datepicker("setStartDate", defaultCurrentDate);
//III) deliverydate --> default same as Issue Date | >= issuedate
// done in the step I
$('#deliverydate').on('changeDate', function() {
 $('#firstPrincipaldate').datepicker("setDate", $('#deliverydate').val());
 $('#firstPrincipaldate').datepicker("setStartDate", $('#deliverydate').val());

 $('#firstInterestdate').datepicker("setDate", $('#deliverydate').val());
 $('#firstInterestdate').datepicker("setStartDate", $('#deliverydate').val());
 });
//IV)firstPrincipaldate --> >deliverydate
// done in the step III
//V)firstInterestdate --> >deliverydate
// done in the step III
});

