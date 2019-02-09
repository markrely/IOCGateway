$(document).ready(function(){

 var index= -1;
 var newTr = "";
 var items = [];
 var tempField = "";


//Diable all fields based on Status and UserRole. Only in MatuityGrid Page we have to make it read only when it is in 3(Approved) state also
// 2(Submitted), 5 (Closed)
//console.log($("#hdnCurrentstatusID").val());
// 3- 4 Normal Users.
//console.log($("#hdnUserRoleId").val());
if(($("#hdnUserRoleId").val() == "3" || $("#hdnUserRoleId").val() == "4") && ($("#hdnCurrentstatusID").val() == "2" || $("#hdnCurrentstatusID").val() == "5")){
 $("#RefundingBond :input:not('[name=btnsaveCurrentGridTop], [name=btnsaveCurrentGrid]')").attr("disabled", true);
}


 $('#co5Info').on('click','tr',function(e){
  //$(".selectItem").on('click',function(e){
  tempField = $(this);
  $(this).find('[type=checkbox]').prop('checked', true);
  if($('#showMainData').find("#hdnSelectedBondList").val().length > 0){
      $('#showMainData').find("#hdnSelectedBondList").val($('#showMainData').find("#hdnSelectedBondList").val() + "," + $(tempField).find('[type=checkbox]').attr('id'));
  }
  else{
     $('#showMainData').find("#hdnSelectedBondList").val($(tempField).find('[type=checkbox]').attr('id'));
  }

  if(($(tempField).find('[type=checkbox]').attr("disabled") == undefined) && ($('#co5Selected').find('input[id=' + $(tempField).find('[type=checkbox]').attr('id') + ']').length == 0)){
   index=$(this).closest("tr").index();
   $(this).closest("tr").siblings().removeClass("highlighted");
   $(this).toggleClass("highlighted");
   newTr = $(this).closest("tr").clone();
   items.push(newTr);
   newTr.appendTo($("#co5Selected"));
   $(this).find('[type=checkbox]').prop("disabled", true).prop('checked', true);
  }
 });

  $('#co5Selected').on('click','tr',function(e){
   var selectedRowIndex = $(this).index();
   var selectedRow = $(this);
   console.log($(selectedRow).find('[type=checkbox]').attr('id'));
   $('#co5Info').find('input[id=' + $(selectedRow).find('[type=checkbox]').attr('id') + ']')
    .prop("disabled", false)
     .prop('checked', false)
      .end();
   if($('#showMainData').find("#hdnSelectedBondList").val().indexOf(",") != -1){
    $('#showMainData').find("#hdnSelectedBondList").val($('#showMainData').find("#hdnSelectedBondList").val().replace(',' + $(selectedRow).find('[type=checkbox]').attr('id'),""));
   }
   else{
       $('#showMainData').find("#hdnSelectedBondList").val($('#showMainData').find("#hdnSelectedBondList").val().replace($(selectedRow).find('[type=checkbox]').attr('id'),""));
   }
   $("#co5Selected tbody>tr").eq(selectedRowIndex).remove();
 });

 $('.pagination').on('click',function(e){
  //alert("This is where we need to clean the check box");
   $('#co5Info').find('[type=checkbox]').each(function(){
     $(this).prop("disabled", false);
     $(this).prop("checked", false);
   });

  $('#co5Selected').find('[type=checkbox]').each(function(){
   var selectedId = $(this).attr("id");
   console.log($('#co5Info').find('input[id=' + selectedId + ']'));
   $('#co5Info').find('input[id=' + selectedId + ']').prop('checked', true).prop('disabled', true);
   });
 });

$("form").submit(function(e) {
    if(($("#hdnUserRoleId").val() == "3" || $("#hdnUserRoleId").val() == "4") && ($("#hdnCurrentstatusID").val() == "2" || $("#hdnCurrentstatusID").val() == "5")){
    $("#RefundingBond :input:not('[name=btnsaveCurrentGridTop], [name=btnsaveCurrentGrid]')").attr("disabled", false);
   }
});


 });