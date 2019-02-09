$(document).ready(function(){
 var $manageConfigPage = $("#MangeConfigForm"),
     $reminderDaysContainer = $manageConfigPage.find(".ReminderDays"),
     $delinquentDaysContainer = $manageConfigPage.find(".DelinquentDays"),
     $submitButton = $manageConfigPage.find(".btn-next"),
     $messageHolder = $manageConfigPage.find("#messageHolder");

   $('.form-control').keyup(function () {
       if (this.value != this.value.replace(/[^0-9\.]/g, '')) {
          this.value = this.value.replace(/[^0-9\.]/g, '');
       }
   });


   $(".btnCancel").on('click', function(){
    event.preventDefault();
    $("#MangeConfigForm").attr('action', $("#ReferralPage").val());
    $("#MangeConfigForm").submit();
    });
 $submitButton.click(function(event){
  event.preventDefault();

 if($('#ReminderDays').val().trim() == "")//we have to refer to the complete path to get the latest value
 {
  $reminderDaysContainer.attr("class","col-sm-10 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter Reminder Days.");
 }
 else if($('#DelinquentDays').val().trim() == "")//we have to refer to the complete path to get the latest value
 {
  $reminderDaysContainer.attr("class","col-sm-10 ReminderDays");
  $delinquentDaysContainer.attr("class","col-sm-10 has-error");
  $messageHolder
   .attr("class","alert alert-danger")
    .html("Please enter Delinquent Days.");

 }
 else{
  $delinquentDaysContainer.attr("class","col-sm-10 DelinquentDays");
  $messageHolder
   .attr("class","hide")
    .html("");
   $(this).closest('form').submit();
 }
 });


});