<CFIF Not IsDefined ("session.EULA_Uname")>
	<cflocation url="#application.homewww#?error=noentry">
</CFIF>
<CFIF IsDefined ("form.RejectEULA")>
	<cflocation url="#application.homewww#/rejectEULA.cfm">
</CFIF>
<cfinclude template="../includes/header_prep.cfm">
<cfinclude template="../includes/header.cfm">
<cfinclude template="../includes/titlebar.cfm">
<cfform method="post" enctype="application/x-www-form-urlencoded" preloader="no">             
<div class="container">
<!--Begin EULA Content-->
<section id="eula" class="mainBody">

  <article class="primaryContent clearFix">
    <h2 class="eulaHeader">EULA: End User License Agreement</h2>
    
    <div class="eulaContainer">

        <h3>TERMS OF SERVICE</h3>
        
        <p>The use of the PLACE AUDIT website (the "Website"), a product of State of Illinois Office of the Comptroller . ("IOC"), is subject to the following terms and conditions. Use of the Website constitutes an agreement by you, the user, that you agree with these terms and conditions. Further, you acknowledge and agree that your continued use of the Website is also governed by any other agreements you may have with IOC.</p>
        
        <h3>Ownership of Intellectual Property/Usage Restrictions</h3>
        
        <p>IOC owns, solely and exclusively, all rights, title and interest in and to the Website, all the content (including, for example, audio, photographs, illustrations, graphics, other visuals, video, copy, software, etc.), code, data and materials thereon, the look and feel, design and organization of the Website, and the compilation of the content, code, data and materials on the Website, including but not limited to any copyrights, trademark rights, patent rights, database rights, moral rights, sui generis rights and all other intellectual property and proprietary rights. IOC's ownership of all developments, ideas, concepts, know-how, methods or techniques which it develops or conceives of in connection with the Website may be used by IOC as it sees fit including, without limitation, for performance measuring and marketing purposes. Your use of the Website does not grant to you ownership of any content, code, data or materials you may access when using the Website. You agree that you will not take any action which is incompatible with IOC'S intellectual property and proprietary rights. Any such action will grant IOC the immediate right to terminate your access to the Website. The entire content, including look, feel and operation of this Website is protected by United States and worldwide copyright laws and treaty provisions.</p>
        
        <p>To ensure proper use of the Website, safety of its intellectual property, and security of its source code, IOC may track individual users' movement throughout the Website, as well as where the user was immediately prior to entering the Website, and where the user goes immediately upon leaving the Website. Should IOC discover any improper use of the Website, it may terminate your access to the Website.</p>
        
        <p>By continuing to use this Website, you affirm that any use of the Website is only for lawful purposes. The use of any information obtained through the Website is at your own risk and IOC specifically disclaims any warranty or responsibility for the accuracy or quality of information provided or obtained through such use. You agree to indemnify, defend and hold harmless IOC from any claims, costs, liabilities and attorney's fees arising from your use of the Website.</p>
        
        <p>You agree and understand that you are responsible for maintaining the confidentiality of passwords associated with any account you use to access the Website. Accordingly, you agree that you will be solely responsible to IOC for all activities that occur in your account.</p>
        
        <p>By continuing to use this Website, you warrant and agree to use the Website for permissible purposes only. You acknowledge that your use of the Website is limited to object code format only in the form and manner in which access is provided by IOC. You agree that you shall not access the Website other than as expressly permitted. In accordance with these terms, except as stated above, you may not:</p>
        
        <ul>
        <li>Copy, reproduce, modify, use, republish, upload, post, transmit or distribute in any way material from the Website, except with IOC'S express written permission.</li>
        <li>Copy, modify or display trademarks, names or logos appearing in the Website in any way without IOC'S express written permission.</li>
        <li>Redeliver any of the pages, text, images or other content of the Website using "framing" technology without IOC'S express written permission.</li>
        <li>Disassemble, decompile, or reverse engineer the Website.</li>
        <li>Upload any computer viruses, or other contaminants, including any codes or instructions that can improperly access, modify, damage, or disable the Website.</li>
        </ul>
        
        <p>Violation of the above will provide IOC the right to terminate your access to the Website and pursue any other legal remedies to which IOC deems necessary.</p>
        
        <h3>Currency</h3>
        
        <p>All prices displayed on IOC are stated in U.S. Dollars.</p>
        
        <h3>Fees</h3>
        
        <p>Fees are as set forth on our webpage. You hereby agree and acknowledge that you are the only party that IOC will communicate with and deliver information to. To the extent you are acting on a third party's behalf and a third party's credit card is used to process payment, you will be responsible for payment should payment be contested or declined. IOC shall have no responsibility to the third party whatsoever. </p>
        
        <h3>Automatic Renewal</h3>
        
        <p>Subscriptions shall not be automatically renewed unless you select this option during the initial purchase or select this preference in your school's administrative account.</p>
        
        <h3>Refunds</h3>
        
        <p>No refunds will be given after thirty (30) days from the date of transaction. Refunds will only be on a pro-rata basis. To receive a refund, you should contact IOC Customer Support via email at support@IOC.com along with the following information:</p>
        
        <ul>
        <li>Your Name</li>
        <li>Order Number</li>
        <li>Product for which you are requesting a refund</li>
        <li>Reason for Refund</li>
        </ul>
        
        <p>If you have any questions, concerns or comments, please call us at (630) 734-8414.</p>
        
        <h3>Security</h3>
        
        <p>We offer password secured pages for access and use of the Website. We follow reasonable technical and management practices to help protect the confidentiality, security and integrity of data stored in the Website. While no computer system is completely secure, we believe the measures implemented for the Website reduce the likelihood of security problems to a level appropriate to the type of data involved. We employ physical, electronic and procedural safeguards in connection with the collection, storage and disclosure of any personal contact information.</p>
        
        
        <h3>Disclaimer: No Warranty</h3>
        
        <p>The Website, including and without limitation, all services, content, functions and materials, are provided "as is," "as available," without warranty of any kind, either express or implied, including, without limitation, any warranty for information, data, data processing services, uptime or uninterrupted access, any warranties concerning the availability, accuracy, usefulness, or content of information, and any warranties of title, non-infringement, merchantability or fitness for a particular purpose, and we hereby disclaim any and all such warranties, express and implied. We do not warrant that the Website or the services, content, functions or materials contained therein will be timely, secure, uninterrupted or error free, or that defects will be corrected. We make no warranty that the Website will meet your requirements. No advice, results or information, whether oral or written, obtained by you from us or through the Website shall create any warranty not expressly made herein.</p>
        
        <p>IOC also assumes no responsibility, and shall not be liable for any damages to or viruses that may infect your computer equipment or other property on account of your access to or use of the Website or your transfer of any materials, data, text, images, video, or audio from the Website.</p> 
        
        <p>Without limitation of the above in this section, IOC hereby disclaims, and you hereby waive, any and all warranties and representations made in product or services, literature and otherwise on the Website or in correspondence with IOC or its agents.</p>
        
        <p>Data and information is provided for informational purposes only, and is not intended for trading purposes. IOC nor any of its data or content providers shall be liable for any errors or delays in the content, or for any actions taken in reliance thereon.</p>
        

        
        <h3>Amendments and Modifications</h3>
        
        <p>IOC reserves the right to amend the information, services, and/or content of the Website at any time without prior notice. The information and materials contained in the Website and the terms and conditions regarding the access to and use of such information and materials are subject to change without notice. We suggest that you check these terms periodically for changes. These terms can be accessed from the link at the bottom of the Website. If you use the Website after we post changes to the terms, you accept the changed terms.</p>
        
        
        <h3>Disputes and Jurisdiction</h3>
        
        <p>If you are dissatisfied in any way with your transaction on IOC, you agree that you will first attempt to resolve it with us by contacting us with your account information, a written description of your problem, and how best to contact you.</p>
        
        <p>These terms and conditions of use shall be governed by and construed in accordance with the laws of the State of Illinois, without giving effect to any principles of conflicts of law. Any dispute relating in any way to your use of the Website shall be submitted to confidential arbitration in Springfield, Illinois, except that, to the extent you have in any manner violated or threatened to violate IOC'S intellectual property rights, IOC may seek injunctive or other appropriate relief in any State or Federal court in the State of Illinois or elsewhere in its sole discretion, and you consent to exclusive jurisdiction and venue in such courts. Arbitration under this agreement shall be conducted under the rules then prevailing of the American Arbitration Association. The arbitrator's award shall be binding and may be entered as a judgment in any court of competent jurisdiction.</p>
        
        
        
        <p>Copyright &copy; IOC: - All rights reserved.</p>
        
     </div>
     
      
      <div class="buttonsContainer">
        <cfinput class="submitButton" type="submit" name="RejectEula" value="I do NOT accept">
        <cfinput class="submitButton" type="submit" name="Accept" value="I Acknowlege and Accept">
      </div>  
        
     </article>
   </section>

    <cfinput type="hidden" name="EULA" value="true">
    <cfinput type="hidden" name="username" value="#session.EULA_Uname#">
    <cfinput type="hidden" name="password" value="#session.EULA_Pword#">
    <cfinput type="hidden" name="loginform" value="true">

</cfform>   
</div>
<cfinclude template="../includes/footer.cfm">