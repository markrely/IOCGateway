jQuery.extend( jQuery.fn.dataTableExt.oSort, {
 "my-currency-pre": function(a) {
        a=a.replace( /[(]/gi, "-" ).replace( /[)]/gi, "" );
        a = (a==="-") ? 0 : a.replace( /[^a-z0-9.-\s]/gi, "" );
        return parseFloat(a);
 },
 "my-currency-asc": function(a,b) {
  return ((a < b) ? -1 : ((a > b) ? 1 : 0));
 },
 "my-currency-desc": function(a,b) {
  return ((a < b) ? 1 : ((a > b) ? -1 : 0));
 }
});

var table = $('#example').dataTable({
   "aoColumnDefs": [
      {"sType": "my-currency", "aTargets": [7]}
   ],
     "initComplete": function(settings, json) {
       // this fixes the fixed first column width issue as well as the alignment issues
       $(window).trigger('resize');
     },
   "ordering": true,
   "info":     true,
   "searching": false,
   "lengthChange": false,
   "scrollX":true,
   "scrollY":        "50vh",
   "scrollCollapse": false,
   "lengthChange":false,
   "pageLength": 50,
   "paging": true,
   "iDisplayLength": 50,
   "order": [],
   "sPaginationType": "bootstrap",
  //  "ordering": true,
  // "info":     false,
  // "searching": false,
  // "lengthChange": false,
  // "scrollY":        "50vh",
  // "scrollX": true,
  // "scrollCollapse": false,
  // "paging":         false,
        "footerCallback": function ( row, data, start, end, display ) {
          //this.api().columns('.sum',{ page: 'current'}).every(function () { //Current page totals
          this.api().columns('.sum').every(function () { //Whole page totals
               var column = this;

              var sum = column
                 .data()
                 .reduce(function (a, b) {
                    if(isNaN(parseInt(a))){
                      if(a.indexOf('(') != -1){
                         var temp1 = -parseFloat(a.replace(/\$|\,|\(|\)/g,'')).toFixed(2);//a.replace(/$/g,"").replace(/,/g,"");
                      }else{
                           var temp1 = parseFloat(a.replace(/\$|\,|\(|\)/g,'')).toFixed(2);//a.replace(/$/g,"").replace(/,/g,"");
                      }
                    }else{
                       var temp1 = a;
                    }
                    if(isNaN(parseInt(b))){
                       if(b.indexOf('(') != -1){
                         var temp2 = -parseFloat(b.replace(/\$|\,|\(|\)/g,'')).toFixed(2);//b.replace(/$/g,"").replace(/,/g,"");
                       }
                       else{
                         var temp2 = parseFloat(b.replace(/\$|\,|\(|\)/g,'')).toFixed(2);//b.replace(/$/g,"").replace(/,/g,"");
                       }
                    }else{
                       var temp2 = b;
                    }

                    return parseFloat(temp1, 10) + parseFloat(temp2, 10);
                 });

              //$(column.footer()).html('$' + sum.toLocaleString());
                $(column.footer()).html(DollarFormat(parseFloat(sum).toFixed(2)));
          });
      }
});


