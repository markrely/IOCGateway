$(document).ready(function(){

 var index= -1;
 var newTr = "";
 var items = [];
 var tempField = "";

  // $('.pagination').on('click',function(e){
  //   if($('#co5Selected').find('input[type=checkbox]').length >= 1){
  //    $("#co5Info").find('[type=checkbox]').attr("disabled", true);
  //   }
  //   else{
  //    $("#co5Info").find('[type=checkbox]').attr("disabled", false);
  //   }
  // });

 $(".dataTables_filter").find("input").on('change', function(event){
    if($('#co5Selected').find('input[type=checkbox]').length >= 1){
     $("#co5Info").find('[type=checkbox]').attr("disabled", true);
    }
    else{
     $("#co5Info").find('[type=checkbox]').attr("disabled", false);
    }
  });



  if($('#co5Selected').find('input[type=checkbox]').length >= 1){
   $("#co5Info").find('[type=checkbox]').attr("disabled", true);
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
   if($('#co5Selected').find('input[type=checkbox]').length >= 1){
    $("#co5Info").find('[type=checkbox]').attr("disabled", true);
   }
   else{
    $("#co5Info").find('[type=checkbox]').attr("disabled", false);
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
    if($('#co5Selected').find('input[type=checkbox]').length >= 1){
     $("#co5Info").find('[type=checkbox]').attr("disabled", true);
    }
    else{
     $("#co5Info").find('[type=checkbox]').attr("disabled", false);
    }
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

    if($('#co5Selected').find('input[type=checkbox]').length >= 1){
     $("#co5Info").find('[type=checkbox]').attr("disabled", true);
    }
    else{
     $("#co5Info").find('[type=checkbox]').attr("disabled", false);
    }

 });




 });