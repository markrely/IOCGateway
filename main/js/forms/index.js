$(document).ready(function(){
 var $form;
 $("#index-page .btn-danger").click(function(event){
  event.preventDefault();
  $("input[name='returnState']").attr("value", "Delete");
  $("input[name='returnState']").attr("name", "Delete");
  $("#pu_ID").val($(this).attr("data-puId"));
  $("#myModal").modal('show');
 });

  $("#dtnDelete").click(function(event){
   $("#myModal").modal('hide');
   $("#pendingUserForm").submit();
 });

/* $deleteButton.click(function(event){
   var $form=this;
   puid = $(this).attr("data-puId");
   $resetPage.find("#pu_ID").val(puid);
   event.preventDefault();
   $resetPage.find("#myModal").modal('show');
 });*/


/* $("#dtnDelete").click(function(event){
  $("#myModal").modal('hide');
   //$form.submit();
   //alert(puid);
   $("#pendingUserForm").submit();
 });*/

}); // end ready function


