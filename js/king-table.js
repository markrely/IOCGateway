$(document).ready(function(){

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

  $("#myTable").find("input[type='text']:not('.date-picker')").each(function(){
   $(this).val(DollarFormat($(this).val()));
  });

  $("#myTable thead").on('click','th',function(e) {
   tempColumnSelectFlag = $(this).html().toLowerCase().replace(" ","");
   if(typeof $(this).data("hname") != "undefined")
    tempColumnSelectFlag = $(this).data("hname");
   $('#myTable').find(".selected").removeClass("selected");
   if(tempColumnSelectFlag !== columnSelectFlag && tempColumnSelectFlag !== ""){
    columnSelectFlag = tempColumnSelectFlag;
    $(this).attr("class", "selected");
    $("#myTable").find("input[name='" + columnSelectFlag.trim() + "']").closest("td").attr("class", "selected");
    $("#myTable").find("input[name*='" + columnSelectFlag.trim() + "']").closest("td").attr("class", "selected");
   }
   else{columnSelectFlag = "";}
  });

 $(".paging_bootstrap").click(function() {
   $('#myTable').find(".selected").removeClass("selected");
   $("#myTable").find("input[name*='" + columnSelectFlag.trim() + "']").closest("td").attr("class", "selected");
 });

  $("#myTable").find("input[type='text']").blur(function() {
   if(columnSelectFlag !== ""){
    $("#myTable").find("input[name='" + columnSelectFlag + "']").val($(this).val());
    //Remove the class for all the rows
    $('#myTable').find(".selected").removeClass("selected");
    columnSelectFlag = "";
   }
  });

  $("#myTable").find("input[type='checkbox']").click(function() {
   if(columnSelectFlag !== ""){
    $("#myTable").find("input[name*='" + columnSelectFlag.trim() + "']").prop('checked', $(this).is(':checked'));
    //Remove the class for all the rows
    $('#myTable').find(".selected").removeClass("selected");
    columnSelectFlag = "";
   }
  });

  $('#myTable').on('click','tr',function(e){
    index=$(this).index();
    $(this).closest("tr").siblings().removeClass("highlighted");
    $(this).toggleClass("highlighted");
    console.log(index , "onRowClick");
  });

  $('#btnCopyCurrentRow').on('click',function(e){
   copyCurrentRow();
  });

  $('#btnInsertCopiedRow').on('click',function(e){
   copyCurrentRow();
   InsertCopiedRow();
  });

  $('#btnDeleteCurrentRow').on('click',function(e){
   deleteCurrentRow();
  });

 });
 function copyCurrentRow(){
  if(index < 0) {
   //alert("Please select a row and then click on Copy Selected Row");
   $("#messageHolder")
    .attr("class","alert alert-danger")
     .html("Please select a row and then click on Copy Selected Row.");
  }
  else{
   var tempIndex = index + 1;
   newRow = "<tr>" + $("#myTable tr:eq(" + tempIndex + ")").html() + "</tr>";

   //Calculate the maximum value for the id
   $("#myTable tbody tr").find(".yesnoswitch-checkbox").each(function(){
   $this = parseInt( $(this).attr('id').replace("myyesnoswitch","") );
   if ($this > maxYesNoSwitch) maxYesNoSwitch = $this;
   });
   maxYesNoSwitch = maxYesNoSwitch + 1
   maxYesNoSwitchId = "myyesnoswitch" + maxYesNoSwitch;

   //Calculate the maximum value for the id
   $("#myTable tbody tr").find("input[id^='checkbox']").each(function(){
   $this = parseInt( $(this).attr('id').replace("checkbox","") );
   if ($this > maxCheckbox) maxCheckbox = $this;
   });
   maxCheckbox = maxCheckbox + 1
   maxCheckboxId = "checkbox" + maxCheckbox;

   var tempId = $(newRow).find("input[id^='checkbox']").attr("id");
   newRow = newRow.replace(tempId , maxCheckboxId).replace(tempId , maxCheckboxId).replace(tempId , maxCheckboxId);

   //console.log(tempId, newRow);

   tempId = $(newRow).find(".yesnoswitch-checkbox").attr('id');
   newRow = newRow.replace(tempId , maxYesNoSwitchId).replace(tempId , maxYesNoSwitchId).replace(tempId , maxYesNoSwitchId);
   //Replace all the input values so that it will copy latest values.
   //$("#myTable").find("input[id='principal']").val()
   //1) Step one find all inputs
   //$("#myTable").find("input[type='text']").each(function(){
    $("#myTable tr:eq(" + tempIndex + ")").find("input[type='text']").each(function(){
    //console.log("All Input Id :", $(this).val(), $this);
    var tempVarName = $(this).attr('name');
    var tempOldValue = $(newRow).find("input[name='" + tempVarName + "']").val();
    var tempNewValue = $(this).val();
    newRow = newRow.replace(tempOldValue , tempNewValue)
    //console.log(newRow);
    });
   $newRow = $(newRow);
   //2) Step two find all check boxes
   $("#myTable tr:eq(" + tempIndex + ")").find("input[type='checkbox']").each(function(){
     //console.log("All checkbox Id :", $(this).attr('name'), $(this).is(':checked'));
     tempVarName = $(this).attr('name');
     tempOldValue = $(newRow).find("input[name='" + tempVarName + "']").is(':checked');
     tempNewValue = $(this).is(':checked');
     var tempReplacementVal = tempVarName + '" checked';
     if(tempOldValue !== tempNewValue){
      if(tempNewValue == true && (tempVarName.toLowerCase().indexOf("myyesnoswitch") >= 0)){
       $newRow.find("input[name='" + maxYesNoSwitchId +"']").prop('checked', true);
      }
     }
    if(tempOldValue !== tempNewValue){
     if(tempNewValue == true && (tempVarName.toLowerCase().indexOf("checkbox") >= 0)){
      $newRow.find("input[name='" + maxCheckboxId +"']").prop('checked', true);
     }
    }
     //newRow = newRow.replace(tempOldValue , tempNewValue)
     console.log(tempVarName, tempOldValue, tempNewValue);
     });
  }
 }
 function deleteCurrentRow(){
  if(index < 0){
   $("#messageHolder")
    .attr("class","alert alert-danger")
     .html("Please select a row and then click on Delete Selected Row.");
  }
  else{
   //console.log(index, "deleteClick");
   $("#myTable tbody>tr").eq(index).remove();
   index = -1;
 }
 }
 function InsertCopiedRow(){
  if(index < 0){
   $("#messageHolder")
    .attr("class","alert alert-danger")
     .html("Please slect a row then copy a row before clicking on Insert Copied Row.");
  }
  else{

  $("#myTable tbody>tr").eq(index).after($newRow);
  $(".maturDt").datepicker();
  $(".termDt").datepicker();
  var strArray = $("#myTable_info").html().match(/(\d+)/g);
  var tempMessage = "Showing " + strArray[0] +" to " + (parseInt(strArray[1]) + 1)  + " of " + (parseInt(strArray[2]) + 1) +" entries";
  $("#myTable_info").html(tempMessage);
 }
 }

	//*******************************************
	/*	JQUERY DATA TABLE
	/********************************************/


	if( $('.datatable').length > 0 ) {
		$('.datatable').dataTable({
			"sDom": "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-6'i><'col-md-6'p>>",
			"sPaginationType": "bootstrap",
			"oLanguage": {
				"sLengthMenu": "_MENU_ records per page"
			}
		});
	}

 if( $('#myTable').length > 0 ) {
  $('#myTable').dataTable({
   "sDom": "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-6'i><'col-md-6'p>>",
    "bSort": false,
    "bFilter": false,
   "sPaginationType": "bootstrap",
   "oLanguage": {
    "sLengthMenu": "_MENU_ records per page"
   }
  });
 }


	//*******************************************
	/*	CUSTOMER SUPPORT TICKET TABLE
	/********************************************/

	if( $('#ticket-table').length > 0 ) {
		$('#ticket-table').dataTable({
			"sDom": "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'>",
			"bPaginate": false,
		});
	}


	//*******************************************
	/*	JQGRID INIT
	/********************************************/

	var grid = $('#jqgrid');

	if( $('#jqgrid').length > 0 ) {
		grid.jqGrid({
			url: 'php/jqgrid/server.php?q=1',
			mtype: 'GET',
			datatype: 'json',
			colNames: [' ', 'Inv No','Client ID', 'Date', 'Amount','Tax','Total', 'Closed', 'Ship Via', 'Notes'],
			colModel:[
				{ name:'myac', width:80, fixed:true, sortable:false, resize:false, formatter:"actions",
					formatoptions:{
						keys: true,
					}
				},
				{ name:'invid', index:'invid', key:true, width:80, sorttype: "number", searchoptions:{sopt:['eq','ne','lt','le','gt','ge']} },
				{ name:'client_id', index:'client_id', width:100, editable:true,  },
				{ name:'invdate', index:'invdate', width:100, editable:true, sorttype:"date",
					formatter:"date",
					formatoptions:{
						srcformat:"ISO8601Short", // http://www.trirand.com/jqgridwiki/doku.php?id=wiki:predefined_formatter
						newformat:"m/d/Y"
					},
					searchoptions:{
						dataInit:function(el){
							setTimeout(function() {
								$(el).attr('placeholder', 'mm/dd/yyyy');
							}, 500);
						}
					},
					editoptions:{
						dataInit:function(el){
							$(el).datepicker({format:'mm-dd-yyyy'})
							.on('changeDate', function(){
								$(this).datepicker('hide'); // force close the calendar
							});
						}
					}
				},
				{ name:'amount', index:'amount', align:"right", width: 85, editable:true, editrules: {number:true}, searchrules:{number:true}, searchoptions:{sopt:['eq','ne','lt','le','gt','ge']} },
				{ name:'tax', index:'tax', align:"right", width: 60, editrules: {number:true}, editable:true },
				{ name:'total', index:'total', align:"right", width: 100, editable:true, editrules: {number:true}, searchrules:{number:true}, searchoptions:{sopt:['eq','ne','lt','le','gt','ge']} },
				{ name:'closed', index:'closed', width:80, editable:true, edittype: "checkbox", editoptions:{value: "Yes:No"} },
				{ name:'ship_via', index:'ship_via', width: 85, editable:true, edittype: "select", editoptions:{value: "FedEx:FedEx;TNT:TNT"} },
				{ name:'note', index:'note', sortable:false, width: 200, editable:true, edittype: "textarea", editoptions:{rows: "2", cols: "20"} }
			],
			height: 300,
			rowNum: 10,
			rowList: [10, 20, 30],
			pager: 'jqgrid-pager',
			sortname: 'invid',
			viewrecords: true,
			sortorder: "asc",
			editurl: "php/jqgrid/server-edit.php",
			caption: "Working Editable Table",
			multiselect: true,
			onSelectRow: function(rowid){
				$("#"+rowid+"_invdate").datepicker({dateFormat:"m/d/Y"})
				.on('changeDate', function(){
					$(this).datepicker('hide'); // force close the calendar
				});
			}
		});

		resize_the_grid();

		if( $('#jqgrid').length > 0 ) {
			grid.jqGrid( 'navGrid', '#jqgrid-pager', { add:true, edit:true, view:true, del:true, search:true, refresh:true},
				{}, {}, {},
				{ multipleSearch: true, multipleGroup: true, /* showQuery: true  (nice for debugging) */ }
			);
		}
	}

	function resize_the_grid() {
		if( $('#jqgrid').length > 0 ) {
			grid.fluidGrid({base:'#jqgrid-wrapper', offset:-20});
		}
	}

	$(window).resize(resize_the_grid);

}); // end ready function