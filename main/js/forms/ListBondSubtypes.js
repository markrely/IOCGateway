 $(document).ready(function(){
  $(".selectedBondID").click(function(){
     event.preventDefault();
     $("#BondSubTypeID").val($(this).data('info'));
     $("#ReferralPage").val('../general/ListBondSubtypes.cfm');
     $("#action").val('edit');
     $("#EditBondSubTypeform").submit();
  });
   //$(".selectedBondID").click(function(){
    //$("#example").find("tbody a").click(function(){
    $( "#example" ).on( "click", 'tbody a', function() {
     event.preventDefault();
     $("#BondSubTypeID").val($(this).data('info'));
     $("#ReferralPage").val('../general/ListBondSubtypes.cfm');
     $("#action").val('edit');
     $("#EditBondSubTypeform").submit();
    });
    checkBoxPrep();
    $('input[type="text"]').change(function(event) {
       checkBoxPrep();
    });
    $(".pagination").click(function(event) {
     checkBoxPrep();
    });

  });
function checkBoxPrep(){
   $(".yesnoswitch-checkbox").on('click', function(){
      event.preventDefault();
      $("#BondSubTypeID").val($(this).data('item'));
      $("#hdnCurrentRow").val($(this).data('id'));
      $("#hdnIsActive").val($(this).data('itemswitch'));
      $("#EditBondSubTypeform").attr('action', 'ListBondSubtypes.cfm');
      $("#action").val('delete');
      $('#myModal').modal('show');
      //$("#EditBondSubTypeform").submit();
   });
   $('.modal').on('click', '.btn-primary', function(){
    $('#EditBondSubTypeform').submit();
    });
   $('.modal').on('click', '.btn-default', function(){
    if($("#hdnIsActive").val() == 0){
     $("#myyesnoswitch"+$("#hdnCurrentRow").val()).attr('checked', false);
    }
    else{
     $("#myyesnoswitch"+$("#hdnCurrentRow").val()).attr('checked', true);
    }

    });
}