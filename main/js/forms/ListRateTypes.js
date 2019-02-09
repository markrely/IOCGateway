 $(document).ready(function(){
    HyperLinkPrep();
    checkBoxPrep();
    $('input[type="text"]').change(function(event) {
       checkBoxPrep();
       HyperLinkPrep();
    });
    $(".pagination").click(function(event) {
     checkBoxPrep();
     HyperLinkPrep();
    });

  });
function HyperLinkPrep(){
   $(".selectedID").on('click', function(){
    event.preventDefault();
    $("#RateTypeID").val($(this).data('info'));
    $("#ReferralPage").val('../general/ListRateTypes.cfm');
    $("#action").val('add');
    $("#ListRateTypeform").submit();
    });
}
function checkBoxPrep(){
   $(".yesnoswitch-checkbox").on('click', function(){
      event.preventDefault();
      $("#RateTypeID").val($(this).data('item'));
      $("#hdnCurrentRow").val($(this).data('id'));
      $("#hdnIsActive").val($(this).data('itemswitch'));
      $("#ListRateTypeform").attr('action', 'ListRateTypes.cfm');
      $("#action").val('delete');
      $('#myModal').modal('show');
   });
   $('.modal').on('click', '.btn-primary', function(){
    $('#ListRateTypeform').submit();
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