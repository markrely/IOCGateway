$(document).ready(function(){

 var index= -1;
 var newTr = "";
 var items = [];
 var tempField = "";

 $('#co5Info').on('click','tr',function(e){
  tempField = $(this);
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
   $('#co5Info').find('input[id=' + $(selectedRow).find('[type=checkbox]').attr('id') + ']')
    .prop("disabled", false)
     .prop('checked', false)
      .end();
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

});

