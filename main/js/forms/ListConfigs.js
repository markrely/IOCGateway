 $(document).ready(function(){
   $(".selectedID").click(function(){
    event.preventDefault();
    $("#ConfigId").val($(this).data('info'));
    $("#ReferralPage").val('../general/ListConfigs.cfm');
    $("#action").val('edit');
    $("#ListConfigform").submit();
    });

  });
