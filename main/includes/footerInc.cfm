
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->

 <script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
  <script src="https://cdn.datatables.net/1.10.11/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/fixedheader/3.1.1/js/dataTables.fixedHeader.min.js"></script>
  <script>


  $(document).ready(function() {


   $('#example').dataTable({
       "sDom": "<'row'<'col-md-6'l><'col-md-6'f>r>t<'row'<'col-md-6'i><'col-md-6'p>>",
       "sPaginationType": "full_numbers",
       "scrollX": true,
       "sScrollX": '100%',
       "position": 'relative',
       "oLanguage": {
        "sLengthMenu": "_MENU_ records per page"
       }
     });


} );
  </script>
<cfoutput>



<BR /><BR />
<div class="footer">
	<p class="text_white2" align="center">Copyright &##169; 2014 - #DATEFORMAT(NOW(), "yyyy")# State of Illinois Office of Comptroller. All rights reserved.</p>
</div>
</cfoutput>
</body>
</html>
