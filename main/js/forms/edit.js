$(document).ready(function(){
 $(".logDetails").click(function(event) { //get the onclik of the detail icon
  if($(this).children('#logdetailIcon').hasClass('fa fa-chevron-up')){// see if it is closed or open
   $(this).children('#logdetailIcon').attr("class","fa fa-chevron-down");// change the icon
   $("#logDetails").find('#'+$(this).data('rowid')).attr("style","display:display");// display details
  }
  else{
   $(this).children('#logdetailIcon').attr("class","fa fa-chevron-up");// change the icon
   $("#logDetails").find('#'+$(this).data('rowid')).attr("style","display:none");// display details
  }
 });
});
