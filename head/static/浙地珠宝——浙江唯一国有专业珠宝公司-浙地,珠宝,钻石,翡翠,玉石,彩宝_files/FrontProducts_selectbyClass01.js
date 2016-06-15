 var FrontProducts_selectbyClass01={

    compID :"",
  /*去除原来已选则页签，添加已选择页签，并将原来选择条件项从已选条件中除去，添加当前选择条件项。
  *name  组件name
  *comp  组件ID
  *value 组件value
  */
  
      searchProducts:function(name,comp,value){
      	var  compID=FrontProducts_selectbyClass01.compID;
		var temp="a[name='"+name+"']";
		//移除同一扩展属性样式
	    jQuery(temp).each(function(i){
	         jQuery(this).removeClass("current");
	         });
	     //添加当前扩展属性样式
	    jQuery("#"+comp).addClass("current");	
	    var all_select=""+compID+"_"+name+"_all";
	    
	    if(comp!=all_select)
	    {
	        //alert(value);
	        //alert("#param_"+name);
			jQuery("#"+compID+"_param_"+name).val(value);
			//alert(jQuery("#"+compID+"_param_"+name).val()+name);
			jQuery("#"+compID+"_"+name+"_select").remove();
			
	        value=jQuery("#"+comp).text();
	         
			var template="<span title='"+value+"' name='list_select' id='"+compID+"_"+name+"_select' onclick=FrontProducts_selectbyClass01.deleteCondition(this.id,'"+name+"')>";
			    template=template+value+"<a href='#' title='"+i18n_FrontProducts_selectbyClass01_clear+"'></a></span>";
			
			jQuery("#"+compID+"_selectCondition").prepend(template);
			
			jQuery("#"+compID+"_selected-conditions").show();
		}
		else
		{
		  jQuery("#"+compID+"_"+name+"_select").remove();
		  jQuery("#"+compID+"_param_"+name).val("");
		  var list_select=jQuery("span[name='list_select']").length;
		  if(list_select==0)
			{
			  jQuery("#"+compID+"_selected-conditions").hide();
			}
		}
		jQuery("#"+compID+"_productFilterSearch").submit();
   },
   
   /*去除原来已选则页签 提交
	  *name  组件name
	  *id  组件ID
   */
    deleteCondition:function(id,name){
    	var  compID=FrontProducts_selectbyClass01.compID;
		FrontProducts_selectbyClass01.deleteSelectCondition(id,name);
		jQuery("#"+compID+"_productFilterSearch").submit();
   },
   
   /*去除原来已选则页签 不提交
	  *name  组件name
	  *id  组件ID
   */
    deleteSelectCondition:function(id,name){
    	 var  compID=FrontProducts_selectbyClass01.compID;
		jQuery("#"+id).remove();
		var temp="a[name='"+name+"']";
		//移除同一扩展属性样式
	    jQuery(temp).each(function(i){
	         jQuery(this).removeClass("current");
	         });
	     //添加当前扩展属性样式
	    jQuery("#"+compID+"_"+name+"_all").addClass("current");	
		jQuery("#"+compID+"_param_"+name).val("");
		var list_select=jQuery("span[name='list_select']").length;
		if(list_select==0)
		{
		  jQuery("#"+compID+"_selected-conditions").hide();
		}
   },
   
   /*
    *重新筛选
   */
    deleteConditions:function(){
    	 var  compID=FrontProducts_selectbyClass01.compID;
		jQuery("span[name='list_select']").each(function(i){
                 var name=jQuery(this).attr("id");
                 var compId_length=compID.length;
                     name=name.substring(compId_length+1,name.length-7)
                     //alert(name);
                     FrontProducts_selectbyClass01.deleteSelectCondition(this.id,name);
	      		});
	      		
		jQuery("#"+compID+"_selected-conditions").hide();
		
		jQuery("#"+compID+"_productFilterSearch").submit();
   },
   
   /*
    *初始化已经选则项
   */
    onload:function(compId,temp_specs,temp_keys,parambrandId){
	     FrontProducts_selectbyClass01.compID=compId;
	     var  compID=FrontProducts_selectbyClass01.compID;
		 
	         /*品牌  */		
       	if(parambrandId!=""){
			     
				 var value=jQuery("#"+compID+"_"+parambrandId).text();
	             
			     var template="<span title='"+value+"' name='list_select' id='"+compID+"_productbrand_select' onclick=FrontProducts_selectbyClass01.deleteCondition(this.id,'productbrand')>";
			       
			         template=template+value+"<a href='#' title='"+i18n_FrontProducts_selectbyClass01_clear+"'></a></span>";
			
			     jQuery("#"+compID+"_selectCondition").append(template);
			
			    jQuery("#"+compID+"_selected-conditions").show();
				}     
	      	
	      	
	     
	      //可选属性
         jQuery.each(temp_keys, function(i, n){
			if(n!=""){
				 var value=jQuery("#"+compID+"_key1"+i+""+n).text();
	         
			     var template="<span title='"+value+"' name='list_select' id='"+compID+"_key1"+i+"_select' onclick=FrontProducts_selectbyClass01.deleteCondition(this.id,'key1"+i+"')>";
			         template=template+value+"<a href='#' title='"+i18n_FrontProducts_selectbyClass01_clear+"'></a></span>";
			
			     jQuery("#"+compID+"_selectCondition").append(template);
			
			     jQuery("#"+compID+"_selected-conditions").show();
				}     
	      		}); 		
	      		
	
	      	  //规格   		
         jQuery.each(temp_specs, function(i, n){
			if(n!=""){
				 var value=jQuery("#"+compID+"_"+n).text();
	         
			     var template="<span title='"+value+"' name='list_select' id='"+compID+"_spec"+i+"_select' onclick=FrontProducts_selectbyClass01.deleteCondition(this.id,'spec"+i+"')>";
			       
			         template=template+value+"<a href='#' title='"+i18n_FrontProducts_selectbyClass01_clear+"'></a></span>";
			
			     jQuery("#"+compID+"_selectCondition").append(template);
			
			     jQuery("#"+compID+"_selected-conditions").show();
				}     
	      		});   
	}
	      		
	      	
  }
  
  