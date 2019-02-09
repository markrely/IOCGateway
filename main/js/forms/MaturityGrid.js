$(document).ready(function(){

if(($("#hdnUserRoleId").val() == "3" || $("#hdnUserRoleId").val() == "4") && ($("#hdnCurrentstatusID").val() == "2" || $("#hdnCurrentstatusID").val() == "3"
 || $("#hdnCurrentstatusID").val() == "5")){
 $("#maturityGrid :input:not('[id=btnsaveCurrentGridTop], [id=btnsaveCurrentGrid]')").attr("disabled", true);
}


$("#dataLink").click(function(event) {
 //https://github.com/mmochetti/tableExport.jquery.plugin
 $('#paymentGrid').tableExport({type:'csv',escape:'false',tableName:'DebtServiceSchedule', objName:'dataLink'});
});


 $("form").bind("keypress", function(e) {
  if (e.keyCode == 13) return false;
 });

  $("#btnsaveCurrentGrid").click(function(event){
    event.preventDefault();
    $("#btnsaveCurrentGridTop").trigger( "click" );
  });

  $("#btnsaveCurrentGridTop").click(function(event){
    event.preventDefault();
    var bMatflag = 0;
    var bTerflag = 0;
    var bCallflag = 0;
    var dateReg = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
 $("#SubmitType").val('Save');
    $('input[name^="maturdt"]').each(function(index, value){
     //console.log($(this).val());
     if(! dateReg.test($(this).val()) ) {
      bMatflag = 1;
       //$(this)parent("td").attr("class","formaturdt has-error");
     }
    });
    if(bMatflag == 1 ) {
       $("#messageHolderBottom").attr("class","alert alert-danger").html("Please eneter Valid Maturity Date.");
       $("#messageHolder").attr("class","alert alert-danger").html("Please eneter Valid Maturity Date (mm/dd/yyyy).");
   }

    $('input[name^="termdt"]').each(function(index, value){
     //console.log($(this).val());
     if(! dateReg.test($(this).val()) ) {
      bTerflag = 1;
     }
    });
    if(bTerflag == 1 ) {
       $("#messageHolderBottom").attr("class","alert alert-danger").html("Please eneter Valid Term Date.");
       $("#messageHolder").attr("class","alert alert-danger").html("Please eneter Valid Term Date (mm/dd/yyyy).");

   }

    $('input[name^="calldt"]').each(function(index, value){
     //console.log($(this).val());
     if(! dateReg.test($(this).val()) ) {
      bCallflag = 1;
     }
    });
    if(bCallflag == 1 ) {
       $("#messageHolderBottom").attr("class","alert alert-danger").html("Please eneter Valid Call Date.");
       $("#messageHolder").attr("class","alert alert-danger").html("Please eneter Valid Call Date (mm/dd/yyyy).");

   }
   if(bMatflag == 0 && bTerflag == 0 && bCallflag == 0){
    $("#messageHolderBottom").attr("class","hide").html("");
    $("#messageHolder").attr("class","hide").html("");
    if(($("#hdnUserRoleId").val() == "3" || $("#hdnUserRoleId").val() == "4") && ($("#hdnCurrentstatusID").val() == "2" || $("#hdnCurrentstatusID").val() == "3"
     || $("#hdnCurrentstatusID").val() == "5")){
     $("#maturityGrid :input:not('[id=btnsaveCurrentGridTop], [id=btnsaveCurrentGrid]')").attr("disabled", false);
    }

     $(this).closest('form').submit();
   }


  });

 //*******************************************
 /* CUSTOM TABLE OPERATIONS
 /********************************************/

 var newRow = "";
 var index= -1;
 var maxYesNoSwitch = 0;
 var maxYesNoSwitchId = "";
 var maxCheckbox = 0;
 var maxCheckboxId = "";
 var columnSelectFlag = "";
 var tempColumnSelectFlag = "";

 $(function(){

 $("#totalprincipal").val(DollarFormat($("#totalprincipal").val()));

  $("#MaturityGrid").find("input[name='principal']").each(function(){
    $(this).val(DollarFormat($(this).val()));
  });

$("#MaturityGrid").find("input[name='principal']").click(function() {$(this).select();});



  $("#MaturityGrid").find("input[name='callprice']").each(function(){
   $(this).val(DollarFormat($(this).val()));
  });

  $("#MaturityGrid thead").on('click','th',function(e) {
   tempColumnSelectFlag = $(this).html().toLowerCase().replace(" ","");
   if(typeof $(this).data("hname") != "undefined")
    tempColumnSelectFlag = $(this).data("hname");
   $('#MaturityGrid').find(".selected").removeClass("selected");
   if(tempColumnSelectFlag !== columnSelectFlag && tempColumnSelectFlag !== ""){
    columnSelectFlag = tempColumnSelectFlag;
    $(this).attr("class", "selected");
    $("#MaturityGrid").find("input[name='" + columnSelectFlag.trim() + "']").closest("td").attr("class", "selected");
    $("#MaturityGrid").find("input[name*='" + columnSelectFlag.trim() + "']").closest("td").attr("class", "selected");
   }
   else{columnSelectFlag = "";}
  });

$(document).on("change", ".principal", function() {

 var sum = 0
 $(".principal").each(function(){
   sum = parseFloat(parseFloat(sum) + parseFloat($(this).val().replace(/\$|\,|\(|\)/g,''))).toFixed(2);
   console.log($(this).val());
 });

  $(".totalPrice").val(DollarFormat(sum));

});

 $("#MaturityGrid").find("input[type='text']").on("blur",function() {
   if(columnSelectFlag !== ""){
    $("#MaturityGrid").find("input[name^='" + columnSelectFlag + "']").val($(this).val());
    //Remove the class for all the rows
    $('#MaturityGrid').find(".selected").removeClass("selected");
    columnSelectFlag = "";
   }
   var sum = 0
 $(".principal").each(function(){
   sum = parseFloat(parseFloat(sum) + parseFloat($(this).val().replace(/\$|\,|\(|\)/g,''))).toFixed(2);
   console.log($(this).val());
 });

  $(".totalPrice").val(DollarFormat(sum));
  });

  $("#MaturityGrid").find("input[type='checkbox']").on("click",function() {
   if(columnSelectFlag !== ""){
    $("#MaturityGrid").find("input[name*='" + columnSelectFlag.trim() + "']").prop('checked', $(this).is(':checked'));
    //Remove the class for all the rows
    $('#MaturityGrid').find(".selected").removeClass("selected");
    columnSelectFlag = "";
   }
  });

  $('#MaturityGrid').on('click','tr',function(e){
    index=$(this).index();
    $(this).closest("tr").siblings().removeClass("highlighted");
    $(this).toggleClass("highlighted");
    //console.log(index , "onRowClick");
  });

  $('#btnCopyCurrentRow').on('click',function(e){
   copyCurrentRow();
  });

  $('#TopbtnInsertCopiedRow').on('click',function(e){
   copyCurrentRow();
   InsertCopiedRow();
  });

  $('#btnInsertCopiedRow').on('click',function(e){
   copyCurrentRow();
   InsertCopiedRow();
  });

  $('#TopbtnDeleteCurrentRow').on('click',function(e){
   deleteCurrentRow();
  });

  $('#btnDeleteCurrentRow').on('click',function(e){
   //console.log("Hai");
   deleteCurrentRow();
  });

 });
 function copyCurrentRow(){
  if(index < 0) {

   $("#messageHolder")
    .attr("class","alert alert-danger")
     .html("Please select a row and then click on Copy Selected Row.");
  }
  else{
   var newRowVar = "";

   var tempIndex = index + 1;
   newRow = "<tr>" + $("#MaturityGrid tr:eq(" + tempIndex + ")").html() + "</tr>";

    newRowVar = $(newRow).find("input").attr('name');
 //console.log(newRowVar);
 $(newRow).find("input").each(function(){
  $(this).attr('name');
     var item=$(this);

    var currentName = item.attr("name");

    var tempName = currentName.replace(/\d+/g, '').replace('_','') + '_';
    var newName = tempName + $("#MaturityGrid").find("input[name^='" +tempName + "']").length;

    newRow = newRow.replace(currentName , newName,"all");//.replace(tempId , maxCheckboxId);
  });

  //console.log(newRow);


   $newRow = $(newRow);


  }
 }
 function deleteCurrentRow(){
  if(index < 0){
   $("#messageHolder")
    .attr("class","alert alert-danger")
     .html("Please select a row and then click on Delete Selected Row.");
  }
  else{


     $("#MaturityGrid tbody>tr").eq(index).remove();




 var sum = 0
 $(".principal").each(function(){
  //sum = sum + parseFloat($(this).val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
   sum = parseFloat(parseFloat(sum) + parseFloat($(this).val().replace(/\$|\,|\(|\)/g,''))).toFixed(2);
 });

  $(".totalPrice").val(DollarFormat(sum));




 }
 }
 function InsertCopiedRow(){
  if(index < 0){
   $("#messageHolder")
    .attr("class","alert alert-danger")
     .html("Please slect a row then click on Duplicate Row.");
  }
  else{

  $("#MaturityGrid tbody>tr").eq(index).after($newRow);
  $(".maturDt").datepicker();
  $(".termDt").datepicker();

  var sum = 0
 $(".principal").each(function(){
  //sum = sum + parseFloat($(this).val().replace(/\$|\,|\(|\)/g,'')).toFixed(2);
   sum = parseFloat(parseFloat(sum) + parseFloat($(this).val().replace(/\$|\,|\(|\)/g,''))).toFixed(2);
 });

  $(".totalPrice").val(DollarFormat(sum));

 }
 }


}); // end ready function

 function DollarFormat(num) {
  if(num !== undefined){
   num = num.toString().replace(/\$|\,|\(|\)/g,'');
   //console.log(num);
   if(isNaN(num))
   num = "0";
   sign = (num == (num = Math.abs(num)));
   num = Math.floor(num*100+0.50000000001);
   cents = num%100;
   num = Math.floor(num/100).toString();

   if(cents<10)
   cents = "0" + cents;
   for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
   num = num.substring(0,num.length-(4*i+3))+','+
   num.substring(num.length-(4*i+3));
   //return (((sign)?'':'-') + num + '.' + cents);
   return (((sign) ? '' : '(') + '$' + num + '.' + cents + ((sign) ? '' : ')'));
  }
 }

 function DollarRateFormat(num) {
  if(num !== undefined){
   num = num.toString().replace(/\$|\,|\(|\)/g,'');
   //console.log(num, parseInt(num.toString()), num- parseInt(num.toString()));
   if(isNaN(num))
   num = "0";
   sign = (num == (num = Math.abs(num)));
   return (((sign) ? '' : '(') + parseFloat(num, 10).toFixed(8) + ((sign) ? '' : ')'));
  }
 }
function validateKeyboardInput(ObjectReference, ValidationType) {
    var bReturnValue = false;
    try {
        ObjectReference.onkeydown = ObjectReference.onkeypress;

        var iEventKeyCode = event.keyCode;
        var sValue = ObjectReference.value;
        //alert(iEventKeyCode);
        //console.log(iEventKeyCode);
        if(iEventKeyCode == 13)
                {
                    return false;
                }
        switch (iEventKeyCode) {
            case 8:
                {
                    return true;
                }
            case 9:
                {
                    return true;
                }
            case 13:
                {
                    return true;
                }
            case 16:
                {
                    return true;
                }
            case 20:
                {
                    return true;
                }
            case 32:
                {
                    return true;
                }
            // case 35:
            //     {
            //         return true;
            //     }
            // case 36:
            //     {
            //         return true;
            //     }
            // case 37:
            //     {
            //         return true;
            //     }
            case 39:
                {
                    return true;
                }
            default:
                {
                    break;
                }
        }

        var oAcceptableAsciiKeyCode = new Array();

        if (ValidationType == 'Integer') {
            oAcceptableAsciiKeyCode.push(45, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57);
            oAcceptableAsciiKeyCode.push(96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107);
        }
        if (ValidationType == 'SignedInteger') {
            oAcceptableAsciiKeyCode.push(45, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57);
            oAcceptableAsciiKeyCode.push(96, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107);//97(a)

            var iInstanceOfThePeriodCount = 0;
            for (i = 0; i < sValue.length; i++) {
                if (sValue[i] == '-') {
                    iInstanceOfThePeriodCount++;
                }
            }

            if (iInstanceOfThePeriodCount == 0) {
                oAcceptableAsciiKeyCode.push(189);
                oAcceptableAsciiKeyCode.push(109);
            }

        }
        else if (ValidationType == 'Float') {
            oAcceptableAsciiKeyCode.push(45, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57);
            oAcceptableAsciiKeyCode.push(96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 190,46,189,110);
            var iInstanceOfThePeriodCount = 0;
            for (i = 0; i < sValue.length; i++) {
                if (sValue[i] == '.') {
                    iInstanceOfThePeriodCount++;
                }

            }

            if (iInstanceOfThePeriodCount == 0) {
                oAcceptableAsciiKeyCode.push(46);
            }


        }
        else if (ValidationType == 'Alphanumeric') {
            oAcceptableAsciiKeyCode.push(45, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57);
            oAcceptableAsciiKeyCode.push(96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107);

            oAcceptableAsciiKeyCode.push(65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90);
            oAcceptableAsciiKeyCode.push(91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122);
            oAcceptableAsciiKeyCode.push(189, 190);
        }
        else if (ValidationType == 'Phone') {
            //-() 189,40,41
            oAcceptableAsciiKeyCode.push(40, 41, 45, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57);
            oAcceptableAsciiKeyCode.push(96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 189, 109);
        }


        else if (ValidationType == 'Zip') {
            //- 189
            oAcceptableAsciiKeyCode.push(45, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57);
            oAcceptableAsciiKeyCode.push(96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 189);
        }
        else if (ValidationType == 'SSN') {
            //- 189
            oAcceptableAsciiKeyCode.push(45, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57);
            oAcceptableAsciiKeyCode.push(96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 189);
        }
        else if (ValidationType == 'Date') {
            // // 191
            oAcceptableAsciiKeyCode.push(45, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57);
            oAcceptableAsciiKeyCode.push(96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 191,111);
        }

        var bInputIsAcceptable = false;

        for (i = 0; i < oAcceptableAsciiKeyCode.length; i++)
         {
             if (oAcceptableAsciiKeyCode[i] == iEventKeyCode)
            {
                bInputIsAcceptable = true;
                break;
            }
        }
        //console.log("isAccep", bInputIsAcceptable);
        if (bInputIsAcceptable == false)
        {
          bReturnValue = false;
          event.returnValue = false;
         }
    }

    catch (oException)
    {
      console.log("Keyboard Exception", oException);
    }
    //console.log("Final", bReturnValue)
    return bReturnValue;
};

 $(".redirect").on('click', function(){
    $("#maturityGrid").attr('action', "../payments/ManageCO8.cfm");
    $("#maturityGrid").submit();
    });

$("#MaturityGrid").find("input").dblclick(function(){
         $("td.cpnRtHighlight").addClass("noClass");
         $(".cpnRtHighlight").removeClass("cpnRtHighlight");
         $(".selectCopyRow").toggleClass('hide');
         var ctrlName = $(this).attr("id");
         if ((ctrlName.toLowerCase().indexOf("insuredcheckbox") >= 0) ||
          (ctrlName.toLowerCase().indexOf("iscalled") >= 0) ||
          (ctrlName.toLowerCase().indexOf("partialpay") >= 0)){
            $(this).closest("td").removeClass("noClass");
            $(this).closest("td").toggleClass("cpnRtHighlight");

            $("#hdnCtrlType").val('checkBox');
            $("#hdnCtrlValue").val($(this).attr("name"));

         }
        else{
               //$(this).removeClass("cpnRt");
               $(this).toggleClass("cpnRtHighlight");//form-control cpnRt
               $("#hdnCtrlType").val('input');
               $("#hdnCtrlValue").val($(this).attr("name"));
        }
});


  $("#btnUpdateCopiedValue, #TopbtnUpdateCopiedValue").on('click',function(e){

   if($("#hdnCtrlValue").val() == '' || $("input[name^='selectCopyRow']:checked").length == 0){
     $("#messageHolder, #messageHolderBottom")
    .attr("class","alert alert-danger")
     .html("Please slect a column value, select the rows to be copied and then click on Copy Column.");
   }
   else
   {
       // see if the check box is visible
       // see if the check box is checked
       //get the value of the selcted column for copy
       //loop through the checkboxes and get all the ID's and replace the value with the selected value
       //var sList = "";
       $("input[name^='selectCopyRow']:checked").each(function () {
            var TempCtrValue = $("#hdnCtrlValue").val();
            var TempFinalCtrValue = $("#hdnCtrlValue").val().replace(/\d+/g, '') + $(this).attr("name").replace("selectCopyRow","");
            //console.log($("#" + TempCtrValue).val());
            if($("#"+ TempCtrValue).attr("type").toLowerCase() == "checkbox"){
              //var chkboxVal= $("#"+ TempCtrValue).is(':checked');
              var chkboxVal= $("input[name='" + TempCtrValue+"'").is(':checked');
              $("input[name='" + TempFinalCtrValue+"'").prop("checked", chkboxVal);
              //$("#" + TempFinalCtrValue).prop("checked", chkboxVal);
            }else if($("#" + TempFinalCtrValue).hasClass("date-picker")){
               //$("#" + TempFinalCtrValue).datepicker("setDate",$("#" + TempCtrValue).val());
               $("input[name='" + TempFinalCtrValue+"'").datepicker("setDate",$("input[name='" + TempCtrValue+"'").val());
            }else
            {
               //$("#" + TempFinalCtrValue).val($("#" + TempCtrValue).val());
               $("input[name='" + TempFinalCtrValue+"'").val($("input[name='" + TempCtrValue+"'").val());
            }

       });
        $("td.cpnRtHighlight").addClass("noClass");
        $(".cpnRtHighlight").removeClass("cpnRtHighlight");
        $(".selectCopyRow").toggleClass('hide');
        $("#messageHolder, #messageHolderBottom").attr("class","hide").html("");
         $("#hdnCtrlType").val('');
         $("#hdnCtrlValue").val('');
   }



  });