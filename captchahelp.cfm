
<!DOCTYPE html>
<!--[if IE 9 ]><html class="ie ie9" lang="en" class="no-js"> <![endif]-->
<!--[if !(IE)]><!--><html lang="en" class="no-js"> <!--<![endif]-->
<!---<head>--->
 <!---<title>Vendor Payments</title>--->
 <meta charset="utf-8">
 <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
 <meta name="description" content="Vendor Payments">
 <meta name="author" content="Gary Ashbaugh">

       <!-- Bootstrap core CSS -->
     <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/bootstrap-glyphicons.min.css" rel="stylesheet">
<div class="container">
<h1>How does this verification work?</h1>


Automated programs can't "read" the images you see in the boxes: only humans can. When you select the image, it ensures us that the content is coming from a real person. This also helps to reduce system loads which improves website performance.<br><br>

If you don't see an image, make sure your browser is set to display images and try again. If you're not sure what image is being requested refer to the list below. If you're incorrect, you'll get another chance to select an image.<br><br>


<cfset ListSorted = "">

 <cfinvoke
  component="security.IOCSecurity"
  method="DisplayCaptchaDictionary"
  returnvariable="qCD">
 </cfinvoke>
<div class="row"> <div class="col-sm-12"><u><b>Below is the list of possible images</b></u></div> </div>
<div class="row"> <div class="col-sm-12">&nbsp;</div> </div>
<div class="row" style="border: solid 1px;">
<cfoutput query="qCD">
 <div class="form-group">
  <div class="col-sm-2 text-right"><i class="#qCD.GlyphiconsName#"></i></div>
  <div class="col-sm-2 text-left">#qCD.GlyphiconsDescription#</div>
 </div>
</cfoutput>
<div>
</div>