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
    //$( "#example" ).on( "click", 'tbody a', function() {
    event.preventDefault();
    $("#AgencyTrusteeID").val($(this).data('info'));
    $("#ReferralPage").val('../general/ListAgencyTrusteeRelation.cfm');
    $("#action").val('add');
    $("#ListAgencyTrusteeform").submit();
    });
}
function checkBoxPrep(){
   $(".yesnoswitch-checkbox").on('click', function(){
      event.preventDefault();
      $("#AgencyTrusteeID").val($(this).data('item'));
      $("#hdnCurrentRow").val($(this).data('id'));
      $("#hdnIsActive").val($(this).data('itemswitch'));
      $("#ListAgencyTrusteeform").attr('action', 'ListAgencyTrusteeRelation.cfm');
      $("#action").val('delete');
      $('#myModal').modal('show');
   });
   $('.modal').on('click', '.btn-primary', function(){
    $('#ListAgencyTrusteeform').submit();
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