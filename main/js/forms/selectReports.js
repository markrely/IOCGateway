
$(document).ready(function(){
  var bFlag = 0;
  var $messageHolder = $("#messageHolder");
  $('#startDate').on('changeDate', function() {
   $('#endDate').datepicker("setStartDate", $('#startDate').val());
  });

  //$('[name="submit"]').click(function(event){ // Koppi Change Validation Logic here
 $(".btn[name!='btnCancel']").click(function(event){
   event.preventDefault();
   var bflag = 0;
   if($('#startDate').val() == ""){
      bflag = 1;
      $messageHolder
       .attr("class","alert alert-danger")
        .html("Please select Start Date.");
   }
   else if($('#endDate').val() == ""){
      bflag = 1;
      $messageHolder
       .attr("class","alert alert-danger")
        .html("Please select End Date.");
   }
   else if(bflag == 0){
       var d1 = $('#startDate').val();
       var d2 = $('#endDate').val();
       var diff = new Date(Date.parse(d1) - Date.parse(d2))
       var days  = diff/1000/60/60/24;
       if(days >= 1){
        $messageHolder.attr("class","alert alert-danger").html("End Date can not be greater than Start Date.");
       }
       else{
         $messageHolder.attr("class","hide").html("");
         if($("#reportType").val() == "pdf"){
           $('#searchForm').attr('action', 'GenericPDFReports.cfm');
         }
         $("#hdnRptFormat").val($("#reportType").val());
         $("#hdnRptType").val($(this).attr("href").substring($(this).attr("href").indexOf('=',parseInt($(this).attr("href").indexOf('=')+1))+1,$(this).attr("href").length).substring(0,$(this).attr("href").substring($(this).attr("href").indexOf('=',parseInt($(this).attr("href").indexOf('=')+1))+1,$(this).attr("href").length).indexOf('&')));
         //$("#hdnRptFormat").val($("#reportType").val());
         $("#searchForm").submit();
         //window.open($(this).attr('href')+"&sDate="+ $('#startDate').val() +"&eDate=" +$('#endDate').val(), '_blank');
         //Call SSRS Report here
       }
   }

  });




});

