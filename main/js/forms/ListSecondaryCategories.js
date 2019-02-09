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
    $("#SecondaryCategoryID").val($(this).data('info'));
    $("#ReferralPage").val('../general/ListSecondaryCategories.cfm');
    $("#action").val('edit');
    $("#ListSecondaryCategoriesForm").submit();
    });
}
function checkBoxPrep(){
   $(".yesnoswitch-checkbox").on('click', function(){
      event.preventDefault();
      $("#SecondaryCategoryID").val($(this).data('item'));
      $("#hdnCurrentRow").val($(this).data('id'));
      $("#hdnIsActive").val($(this).data('itemswitch'));
      $("#ListSecondaryCategoriesForm").attr('action', 'ListSecondaryCategories.cfm');
      $("#action").val('delete');
      $('#myModal').modal('show');
   });
   $('.modal').on('click', '.btn-primary', function(){
    $('#ListSecondaryCategoriesForm').submit();
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