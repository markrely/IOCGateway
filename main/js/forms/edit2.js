$(document).ready(function(){
$(".logDetails").click(function(event) {

 /* Act on the event */
 $(this).children('#logdetailIcon').attr("class","fa fa-chevron-down");
 $("#logDetails").find("#1").attr("style","display:display");
 console.log($(this));
});
});
