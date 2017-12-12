define(["jquery", "qlik"],
//define(["jquery", "./simpletable.css"],

function ($, qlik) {

	/* 'use strict';
	$("<style>").html(qlik).appendTo("head"); */
	
	var app;
	app = qlik.currApp(this);
	var doc;
	var fileName;
	var field_Name;
	var field_Values = [];
	var field_Value;
	var temp_FieldName;
	var temp1_FieldName;
	var temp_TimeOut;
    var id_Value;   
	var span_id_Value;	
	var tbl_id;
    var i = 0;
    var j = 0;
	temp_TimeOut=0;	
	var color_Code="#EC865D";
	var timeOutFunction;
    return {
        definition: {
            type: "items",
            component: "accordion",
            items: {
                 settings: {
                    uses: "settings",					
                    items:
					{
								    id1_Name: {
								        ref: "var_Field_Name",
								        label: "Field Name",
								        type: "string",
								        defaultValue: ""
								    },
									id2_Name: {
								        ref: "var_Time_Period",
								        label: "Time Period in Sec",
								        type: "string",
								        defaultValue: "1"
								    }
					}
                }

            }
        },
        paint: function ($element, layout) {

            temp_FieldName = layout.var_Field_Name;
            //fileName = layout.var_File_Name;
            temp1_FieldName = app.field(temp_FieldName);
            temp1_FieldName.getData();
			
			var spanText="Select one by one from ";
			if(layout.var_Field_Name.length > 0)
				spanText="Select one by one from  '"+temp_FieldName+"'";

			id_PlayImage_Value=layout.qInfo.qId + "_my_Playimage_automate";
			id_StopImage_Value=layout.qInfo.qId + "_my_Stopimage_automate";
			id_PauseImage_Value=layout.qInfo.qId + "_my_Pauseimage_automate";
			id_ResumeImage_Value=layout.qInfo.qId + "_my_Resumeimage_automate";
			id_LoadingImage_Value=layout.qInfo.qId + "_my_Loadingimage_automate";
			
			span_id_Value=layout.qInfo.qId + "_my_span_automate";
			tbl_id==layout.qInfo.qId + "_automate_tbl_ID";
			
            var html =		"<table id='"+tbl_id+"' style='margin-left:10px;'>"+
								"<tr>"+
									"<td align='justify'>"+										
										
										"<a id='"+id_PlayImage_Value+"' name='my_Playimage_automate' title='Play' style='text-decoration: none; font-size: 26px; color: "+color_Code+"; padding:0 0 0 0;cursor: pointer;margin-top:10px;'> &#9658;</a>"+
																				
										"<span id='"+span_id_Value+"' style=''>  "+
											
											"<a id='"+id_ResumeImage_Value+"' name='my_Resumeimage_automate' title='Resume' disabled style='text-decoration: none; font-size: 26px; color: "+color_Code+"; opacity:0.3;padding:0 0 0 0;cursor: pointer;display:none;'> &#9658;</a>"+
											"<a id='"+id_PauseImage_Value+"' name='my_Pauseimage_automate' title='Pause' disabled style='text-decoration: none; font-size: 24px; color: "+color_Code+"; cursor:not-allowed;opacity:0.3;padding:0 0 0 10px;' height='40px' width='40px'> &#10074;&#10074; </a>"+
											"<a id='"+id_StopImage_Value+"' name='my_Stopimage_automate' title='Stop' style='text-decoration: none; font-size: 34px; color: "+color_Code+"; cursor:not-allowed;opacity:0.3;padding:0 0 0 10px;' height='40px' width='40px'> &#9632; </a>"+
											
											"<input type='image' id='"+id_LoadingImage_Value+"' name='my_Loading_automate' style='display:none;padding:2px 0 1px 20px;cursor: wait;' src='/extensions/AeS_Play_Button/Loading_small.gif' >"+
											
											
										"</span>"+
									"</td>"+
								"</tr>"+
							"</table>";
					
			
			

            var container = $("#qv-toolbar-container").html();
			
			
            $element.html(html);
         
			

            
			
			
			
            $("#"+id_PlayImage_Value).click(
				function (event) {
						
					  var x;
						//if (confirm("\nAre you want to continue the printing process by '"+temp_FieldName+"' field ?\n\n") == true) {   opacity: 0.5;
							
								//alert(value);
							
								temp1_FieldName.rows.forEach(function (value) {
									j = j + 1;
								});
								//alert(j +" > "+"1");
								if (j < 1) {
									alert("Given field name does not exists in this application.");
								}								
								else {								
									
									document.getElementById(id_PlayImage_Value).style.display = 'none'; 
									document.getElementById(span_id_Value).style.display = '';
									document.getElementById(id_LoadingImage_Value).style.display = '';
									
									document.getElementById(id_PauseImage_Value).style.display = '';
									document.getElementById(id_PauseImage_Value).style.opacity = '1';
									document.getElementById(id_PauseImage_Value).style.cursor = 'pointer';
									document.getElementById(id_PauseImage_Value).disabled=false;
									
									document.getElementById(id_ResumeImage_Value).style.display = '';
									document.getElementById(id_ResumeImage_Value).style.opacity = '0.3';
									document.getElementById(id_ResumeImage_Value).style.cursor = 'not-allowed';
									document.getElementById(id_ResumeImage_Value).disabled=true;
									
									document.getElementById(id_StopImage_Value).style.display = '';
									document.getElementById(id_StopImage_Value).style.opacity = '1';
									document.getElementById(id_StopImage_Value).style.cursor = 'pointer';
									document.getElementById(id_StopImage_Value).disabled=false;
								  
									field_Values = [];
									temp1_FieldName.rows.forEach(function (value) {
										field_Values.push(value.qText);
									});
									field_Values.push("");
																		
									start_Process();									
								}
						//} 
				} // inbuild function
			); // click event
			function start_Process() {

				app.field(temp_FieldName).clear();
                app.field(temp_FieldName).selectMatch(field_Values[i], true);
			
				
                if (++i == field_Values.length) {
					app.doSave();
					stopSelection();
                    return;
                }
				var time=layout.var_Time_Period*1000;
				//alert(i+" ---> "+ field_Values[i] +" ---> "+time);
				
                timeOutFunction=window.setTimeout(start_Process, time);
				
            }
			$("#"+id_PauseImage_Value).click(
				function (event) {
					
								document.getElementById(id_PlayImage_Value).style.display = 'none';
								document.getElementById(span_id_Value).style.display = '';
								document.getElementById(id_LoadingImage_Value).style.display = 'none';
								
								document.getElementById(id_PauseImage_Value).style.display = '';
								document.getElementById(id_PauseImage_Value).style.opacity = '0.3';
								document.getElementById(id_PauseImage_Value).style.cursor = 'not-allowed';
								document.getElementById(id_PauseImage_Value).disabled=true;
								
								document.getElementById(id_ResumeImage_Value).style.display = '';
								document.getElementById(id_ResumeImage_Value).style.opacity = '1';
								document.getElementById(id_ResumeImage_Value).style.cursor = 'pointer';
								document.getElementById(id_ResumeImage_Value).disabled=false;
								
								document.getElementById(id_StopImage_Value).style.display = '';
								document.getElementById(id_StopImage_Value).style.opacity = '1';
								document.getElementById(id_StopImage_Value).style.cursor = 'pointer';
								document.getElementById(id_StopImage_Value).disabled=false;
								
								temp_TimeOut=0;
								
								clearTimeout(timeOutFunction);
								app.doSave();
								
				} // inbuild function
			); // click event
			$("#"+id_ResumeImage_Value).click(
				function (event) {
									
								document.getElementById(id_PlayImage_Value).style.display = 'none';
								document.getElementById(span_id_Value).style.display = '';
								document.getElementById(id_LoadingImage_Value).style.display = '';
								
								document.getElementById(id_PauseImage_Value).style.display = '';
								document.getElementById(id_PauseImage_Value).style.opacity = '1';
								document.getElementById(id_PauseImage_Value).style.cursor = 'pointer';
								document.getElementById(id_PauseImage_Value).disabled=false;
								
								document.getElementById(id_ResumeImage_Value).style.display = '';
								document.getElementById(id_ResumeImage_Value).style.opacity = '0.3';
								document.getElementById(id_ResumeImage_Value).style.cursor = 'not-allowed';
								document.getElementById(id_ResumeImage_Value).disabled=true;
								
								document.getElementById(id_StopImage_Value).style.display = '';
								document.getElementById(id_StopImage_Value).style.opacity = '1';
								document.getElementById(id_StopImage_Value).style.cursor = 'pointer';
								document.getElementById(id_StopImage_Value).disabled=false;
								
								start_Process();
						
				} // inbuild function
			); // click event
			$("#"+id_StopImage_Value).click(
				function (event) {
						
						
					  var x;
						//if (confirm("\nAre you sure, You want to stop the selection process?") == true) {
							
								stopSelection();
						//} 
				} // inbuild function
			); // click event
			function stopSelection()
			{																
								document.getElementById(id_PlayImage_Value).style.display = '';
								document.getElementById(span_id_Value).style.display = '';
								
								document.getElementById(id_LoadingImage_Value).style.display = 'none';
								
								document.getElementById(id_PauseImage_Value).style.display = '';
								document.getElementById(id_PauseImage_Value).style.opacity = '0.3'; 
								document.getElementById(id_PauseImage_Value).style.cursor = 'not-allowed';
								document.getElementById(id_PauseImage_Value).disabled=true;
								
								document.getElementById(id_ResumeImage_Value).style.display = 'none';
								document.getElementById(id_ResumeImage_Value).style.opacity = '0.3';
								document.getElementById(id_ResumeImage_Value).style.cursor = 'not-allowed';
								document.getElementById(id_ResumeImage_Value).disabled=true;
								
								document.getElementById(id_StopImage_Value).style.display = '';
								document.getElementById(id_StopImage_Value).style.opacity = '0.3';
								document.getElementById(id_StopImage_Value).style.cursor = 'not-allowed';
								document.getElementById(id_StopImage_Value).disabled=true;
								
								 i = 0;
								 j = 0;
								temp_TimeOut=0;
								//app.doSave();
								clearTimeout(timeOutFunction);
								app.field(temp_FieldName).clear();
								app.doSave();
			}
        }
    };

});
