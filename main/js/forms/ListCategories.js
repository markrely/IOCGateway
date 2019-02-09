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
    $("#BondCategoryID").val($(this).data('info'));
    $("#ReferralPage").val('../general/ListCategories.cfm');
    $("#action").val('edit');
    $("#ListCategoriesForm").submit();
    });
}
function checkBoxPrep(){
   $(".yesnoswitch-checkbox").on('click', function(){
      event.preventDefault();
      $("#BondCategoryID").val($(this).data('item'));
      $("#hdnCurrentRow").val($(this).data('id'));
      $("#hdnIsActive").val($(this).data('itemswitch'));
      $("#ListCategoriesForm").attr('action', 'ListCategories.cfm');
      $("#action").val('delete');
      $('#myModal').modal('show');
   });
   $('.modal').on('click', '.btn-primary', function(){
    $('#ListCategoriesForm').submit();
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