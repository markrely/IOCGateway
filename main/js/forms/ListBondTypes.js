 $(document).ready(function(){
  $(".selectedBondID").click(function(){
     event.preventDefault();
    $("#BondTypeID").val($(this).data('info'));
    $("#ReferralPage").val('../general/ListBondTypes.cfm');
    $("#action").val('edit');
    $("#ListBondTypeform").submit();
  });

   //$(".selectedBondID").click(function(){
   $( "#example" ).on( "click", 'tbody a', function() {
    event.preventDefault();
    $("#BondTypeID").val($(this).data('info'));
    $("#ReferralPage").val('../general/ListBondTypes.cfm');
    $("#action").val('edit');
    $("#ListBondTypeform").submit();
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
      $("#BondTypeID").val($(this).data('item'));
      $("#hdnCurrentRow").val($(this).data('id'));
      $("#hdnIsActive").val($(this).data('itemswitch'));
      $("#ListBondTypeform").attr('action', 'ListBondTypes.cfm');
      $("#action").val('delete');
      $('#myModal').modal('show');
   });
   $('.modal').on('click', '.btn-primary', function(){
    $('#ListBondTypeform').submit();
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