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
    $("#AgencyTypeSubTypeID").val($(this).data('info'));
    $("#ReferralPage").val('../general/ListAgencyTypeSubTypeAccess.cfm');
    $("#action").val('add');
    $("#ListAgencyTypeSubTypeform").submit();
    });
}
function checkBoxPrep(){
   $(".yesnoswitch-checkbox").on('click', function(){
      event.preventDefault();
      $("#AgencyTypeSubTypeID").val($(this).data('item'));
      $("#hdnCurrentRow").val($(this).data('id'));
      $("#hdnIsActive").val($(this).data('itemswitch'));
      $("#ListAgencyTypeSubTypeform").attr('action', 'ListAgencyTypeSubTypeAccess.cfm');
      $("#action").val('delete');
      $('#myModal').modal('show');
   });
   $('.modal').on('click', '.btn-primary', function(){
    $('#ListAgencyTypeSubTypeform').submit();
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