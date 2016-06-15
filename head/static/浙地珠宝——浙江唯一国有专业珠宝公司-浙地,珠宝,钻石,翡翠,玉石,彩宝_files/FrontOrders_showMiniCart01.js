var FrontOrders_showMiniCart01 = {
		topPosition:"0",
		leftPosition:"0",
		alignLeft:true,
		timeout:"",
		countFlag:"1",
		tempCountFlag:"",
		clearTimeOut:new Object(),
		 /**
		  * 提供添加商品到购物车中
		  *
		  */
		 addProduct:function(adddata,targetOpen){
		 	var compid = FrontOrders_showMiniCart01.compId;//document.getElementById("minicartcomp").value;
		 	$(document).ready(function(){
				jQuery.ajax({
		           type: "POST",
		           url: "/FrontOrders.do?method=addProductToCart&compId="+compid,
		           data:adddata,
		           dataType: "text",
		           cache: false,
		           success: function(data){
		           		if(data != null){
		           			var message = data.split("^");
		           			/*
		           			 * [0]-成功标志 
		           			 * [1]-个数 
		           			 * [2]-金额 
		           			 * [3]操作标志(0-去购物车页面,1-停留原页面,2-显示提示层)
		           			 * [4]跳转的page 
		           			*/ 
		           			if(message[0]=='0'){//0-新添加成功
		           				if(document.getElementById(FrontOrders_showMiniCart01.compId+"_showcount") != null){
		           					document.getElementById(FrontOrders_showMiniCart01.compId+"_showcount").innerHTML = "&nbsp;("+message[1]+")&nbsp;";
		           				}
				 				if(document.getElementById(FrontOrders_showMiniCart01.compId+"_showMoney") != null){
				 					document.getElementById(FrontOrders_showMiniCart01.compId+"_showMoney").innerHTML = message[2];
				 				}
				 				if(message[3]=='mycart'){
				 					//跳转到我的购物车
				 					//window.open(message[4]);
				 					//alert("购物车");
				 					if(targetOpen != null ){
				 						if(targetOpen=='_blank'){
				 							jQuery.ajax({
						 						type: "POST",
						 						url: "/FrontOrders.do?method=getProductList&compId="+compid,
						 						data:"",
						 						dataType: "html",
						 						cache: false,
						 						success: function(returndata){
						 								if(document.getElementById(compid+"_playmessage") != null){
						 									document.getElementById(compid+"_playmessage").innerHTML = returndata;
						 								}
						 						   		//$("#"+compid+"_showTips").show();
						 				           }
						 				      	});
				 							window.open(message[4],"","toolbar=yes, menubar=yes, scrollbars=yes, resizable=yes, location=yes, status=yes");	
				 						}else if(targetOpen=='_self'){
				 						window.location.href=message[4];
				 					}else{
				 						window.location.href=message[4];
									}
								}else{
									window.location.href=message[4];
								}
				 				}else if(message[3]=='thispage'){
				 					//弹出一个提示层，一秒后消失
				 					//alert("提示层==="+message[5]);
				 					FrontOrders_showMiniCart01.miniTips(message[5]);
				 					jQuery.ajax({
				 						type: "POST",
				 						url: "/FrontOrders.do?method=getProductList&compId="+compid,
				 						data:"",
				 						dataType: "html",
				 						cache: false,
				 						success: function(returndata){
				 								if(document.getElementById(compid+"_playmessage") != null){
				 									document.getElementById(compid+"_playmessage").innerHTML = returndata;
				 								}
				 						   		//$("#"+compid+"_showTips").show();
				 				           }
				 				      	});
				 				}else if(message[3]=='TipLayer'){
				 					//弹出提示层
				 					//alert("提示层"+ message[1]+"===="+message[2]+"===="+message[5]);
				 					FrontOrders_showMiniCart01.popUpLayer(message[1],message[2],message[5]);
				 					
				 					jQuery.ajax({
				 						type: "POST",
				 						url: "/FrontOrders.do?method=getProductList&compId="+compid,
				 						data:"",
				 						dataType: "html",
				 						cache: false,
				 						success: function(returndata){
				 								if(document.getElementById(compid+"_playmessage") != null){
				 									document.getElementById(compid+"_playmessage").innerHTML = returndata;
				 								}
				 						   		//$("#"+compid+"_showTips").show();
				 				           }
				 				      	});
				 				}
			 			 	}else if(message[0]=='1'){//1-添加/更新失败
			 							
			 			 	}else if(message[0]=='2'){//2-商品已经被删除或者下架了
		 						//弹出一个提示层，说明商品已经被删除或者下架了
			 			 		alert(i18n_orders_errormessage);
		 				 	}else if(message[0]=='3'){//3-总金额过大
		 				 		alert(i18n_orders_totalamount);
		 						//弹出一个提示层，说明总金额过大
		 				 	}else if(message[0]=='4'){//4-不支持非会员购物
		 				 		window.location.href=message[4];
		 				 		//window.open(message[4],"_parent");
		 				 	}else if(message[0]=='5'){//5-商品数额大于999
		 				 		alert(i18n_orders_maxamount);
		 				 	}
		           		}
          			}
      			 });
		 	});
		 },
		 
		 //--------------------------------------
  isMouseLeaveOrEnter:function(e, el) {  
     if (e.type != 'mouseout' && e.type != 'mouseover') return false;  
     //在标准浏览器下使用relatedTarget，在IE下mouseout时使用toElement，mouseover使用fromElement  
     var reltg = e.relatedTarget ? e.relatedTarget : e.type == 'mouseout' ? e.toElement:e.fromElement;  
     //检测reltg是否是el的子孙结点  
     while (reltg && reltg != el)  
         reltg = reltg.parentNode;  
     //如果reltg遍历至空则说明不是子孙结点，返回true；如果reltg==el则表明reltg是el的子孙结点，返回false;  
     return (reltg != el);  
 },  
 showFindProductListSlide:function(){
 	var name = FrontOrders_showMiniCart01.compId+"_shopping-stat";
 	var t = document.getElementById(trim(name));
 	t.onmouseover = function(e){
 		e = e||event;
 		if(FrontOrders_showMiniCart01.isMouseLeaveOrEnter(e,t)){
 			FrontOrders_showMiniCart01.findProductListSlide();
 		}
 	}
 	t.onmouseout = function(e){
 		e = e||event;
 		if(FrontOrders_showMiniCart01.isMouseLeaveOrEnter(e,t)){
 			FrontOrders_showMiniCart01.closeProductListSlide();
 		}
 	}
 },	 

		 //--------------------------------------
		 
		/**
		*迷你购物车 划出层
		*
		**/
	findProductListSlide:function(){
		FrontOrders_showMiniCart01.compId;
		var compid = document.getElementById("minicartcomp").value;
			jQuery.ajax({
				type: "POST",
				url: "/comp-"+FrontOrders_showMiniCart01.compId+"?ajax=true",
				data:"",
				dataType: "html",
				cache: false,
				success: function(returndata){						
						jQuery("#"+FrontOrders_showMiniCart01.compId+"_showTips .minicar-body").html(returndata);
	           }
	      	});
			$("#"+compid+"_showTips").show();
		},
		/**
		*隐藏 迷你购物车 划出层
		*
		**/
		closeProductListSlide:function(){
			var compid = FrontOrders_showMiniCart01.compId;//document.getElementById("minicartcomp").value;
			if (!jQuery("#" + compid+"_showTips").is(":hidden")) {
							$("#"+compid+"_showTips").hide();
				}
		},
		
		/**
 		 * 删除指定商品 & 清空商品
 		 * productId--商品Id,delnumber--元素的位置
		 */
		deleteProduct:function(detailId){
			var compid = FrontOrders_showMiniCart01.compId;//document.getElementById("minicartcomp").value;
			$(document).ready(function(){
				jQuery.ajax({
			           type: "POST",
			           url: "/FrontOrders.do?method=deleteProductByProductId&compId="+compid,
			           data:"detailId="+detailId,
			           dataType: "text",
			           cache: false,
			           success: function(returndata){
					//alert(returndata);
			           var dataarr = returndata.split("^"); 
			           /*
			           	*dataarr[0] -- 操作流向
			           	*dataarr[1] -- 跳转路径URL
			           	*dataarr[2] -- 个数
			           	*dataarr[3] -- 总金额
			           	*
			           */
			           		if(dataarr[0]=='notmember'){
			           				//不支持非会员操作
			           			}else if(dataarr[0]=='noproduct'){
			           				//列表中没有商品
			           				//清空操作
			           				$("#"+compid+"_playmessage").empty(); 
			           				if(document.getElementById(FrontOrders_showMiniCart01.compId+"_showcount")!= null){
			           					document.getElementById(FrontOrders_showMiniCart01.compId+"_showcount").innerHTML = "&nbsp;(0)&nbsp;";
			           				}
			           				if(document.getElementById(FrontOrders_showMiniCart01.compId+"_showMoney")!= null){
			           					document.getElementById(FrontOrders_showMiniCart01.compId+"_showMoney").innerHTML = '0.00';
			           				}
			           				if(document.getElementById(compid+"_playmessage")!= null){
			           					//alert("_playmessage");
			           					document.getElementById(compid+"_playmessage").innerHTML = '您还没有挑选商品！';
			           				}
			           				$("#"+compid+"_showTips").show();
			           			}else if(dataarr[0]=='cleanall'){
			           				//清空操作
			           				$("#"+compid+"_playmessage").empty(); 
			           				if(document.getElementById(FrontOrders_showMiniCart01.compId+"_showcount")!= null){
			           					document.getElementById(FrontOrders_showMiniCart01.compId+"_showcount").innerHTML = "&nbsp;(0)&nbsp;";
			           				}
			           				if(document.getElementById(FrontOrders_showMiniCart01.compId+"_showMoney")!= null){
			           					document.getElementById(FrontOrders_showMiniCart01.compId+"_showMoney").innerHTML = '0.00';
			           				}
			           				if(document.getElementById(compid+"_playmessage")!= null){
			           					//alert("_playmessage");
			           					document.getElementById(compid+"_playmessage").innerHTML = '您还没有挑选商品！';
			           				}
			           				$("#"+compid+"_showTips").show();
			           			}else{
			           				$('#'+dataarr[0]+"_minicart").remove();
			           				if(document.getElementById(FrontOrders_showMiniCart01.compId+"_showcount") !=null){
			           					document.getElementById(FrontOrders_showMiniCart01.compId+"_showcount").innerHTML = "&nbsp;("+dataarr[2]+")&nbsp;";
			           				}
			           				if(document.getElementById(FrontOrders_showMiniCart01.compId+"_tipscount") != null){
			           					document.getElementById(FrontOrders_showMiniCart01.compId+"_tipscount").innerHTML = dataarr[2];
			           				}
			           				if(document.getElementById(FrontOrders_showMiniCart01.compId+"_showMoney") != null){
			           					document.getElementById(FrontOrders_showMiniCart01.compId+"_showMoney").innerHTML = dataarr[3];
			           				}
			           				if(document.getElementById(FrontOrders_showMiniCart01.compId+"_tipsmoney")!= null){
			           					document.getElementById(FrontOrders_showMiniCart01.compId+"_tipsmoney").innerHTML = dataarr[3];
			           				}
			           			}
	          			},
	          			error:function(){
	          				alert("error");
	          			}
	      			 });
      			  });
		},
		
		/*
		 * 提示是否添加成功
		 * (1 秒后消失)
		 */
		miniTips:function(name){
			var compid = FrontOrders_showMiniCart01.compId;//document.getElementById("minicartcomp").value;
			FrontOrders_showMiniCart01.displayTips(compid+"_miniTips");
			if(document.getElementById(FrontOrders_showMiniCart01.compId+"_productminiTips") !=null){
				document.getElementById(FrontOrders_showMiniCart01.compId+"_productminiTips").innerHTML = this.grammarstr(name);
			}
		},
	    /*
		 * 弹出层，可选页面流转
		 */
		popUpLayer:function(count,money,name){
			//document.getElementById("minicartcomp").value;
			//var compid = FrontOrders_showMiniCart01.compId;
			var compid = document.getElementById("minicartcomp").value;
			FrontOrders_showMiniCart01.displayTips(compid+"_PopUpLayer");
			
			if(document.getElementById(FrontOrders_showMiniCart01.compId+"_showcountLayer")!=null){
				document.getElementById(FrontOrders_showMiniCart01.compId+"_showcountLayer").innerHTML = count;
			}
			if(document.getElementById(FrontOrders_showMiniCart01.compId+"_showMoneyLayer") != null){
				document.getElementById(FrontOrders_showMiniCart01.compId+"_showMoneyLayer").innerHTML = money;
			}
			if(document.getElementById(FrontOrders_showMiniCart01.compId+"_productNameLayer") != null){
				document.getElementById(FrontOrders_showMiniCart01.compId+"_productNameLayer").innerHTML = this.grammarstr(name);
			}
		},
			/**
	 *	功能：显示弹出层
	 *
	 */
	displayTips:function(compid) {
	/*
		屏幕分辨率的高： window.screen.height; 
		屏幕分辨率的宽： window.screen.width; 
	*/
	//定位 位于浏览器可见区域 居中
	var myWidth = 0, myHeight = 0;
	if (typeof (window.innerWidth) == "number") {
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    } else {
        if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else {
            if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                myWidth = document.body.clientWidth;
                myHeight = document.body.clientHeight;
            }
        }
    }
	FrontOrders_showMiniCart01.leftPosition =(myWidth ) / 4+"px";
	if (!!window.ActiveXObject || "ActiveXObject" in window){ 
		FrontOrders_showMiniCart01.topPosition =(myHeight ) / 3 + document.documentElement.scrollTop+"px"; 
	} else if(navigator.userAgent.indexOf('Firefox') >= 0){
		FrontOrders_showMiniCart01.topPosition =(myHeight ) / 3 + document.documentElement.scrollTop+"px";
	}else{
		FrontOrders_showMiniCart01.topPosition =(myHeight ) / 3 + document.body.scrollTop+"px"; 
	}  
	//显示层
	$("#" + compid).show();
				
				/* 页面发生scroll事件时触发 */
				$(window).scroll(
						function() {
							$("#" + compid).css("top",FrontOrders_showMiniCart01.topPosition);
						});

				$("#" + compid).css("top",FrontOrders_showMiniCart01.topPosition);
				$("#" + compid).css("position","absolute");	
				$("#" + compid).css("z-index","101");	
				if (FrontOrders_showMiniCart01.alignLeft) {
					$("#" + compid).css("left",FrontOrders_showMiniCart01.leftPosition);
				} else {
					$("#" + compid).css("left",$("body").innerWidth()- $("#" + compid).outerWidth()- FrontOrders_showMiniCart01.leftPosition);
				}
				//隐藏 提示
				if(compid.indexOf('miniTips')){
					FrontOrders_showMiniCart01.clueTips();
				}
			},
			//隐藏 提示 方法
			hideMiniTips:function(){
				var compid = FrontOrders_showMiniCart01.compId;//document.getElementById("minicartcomp").value;
				jQuery("#" + compid+"_miniTips").fadeOut("slow");// fast
			},
			
	/*
	 *功能：自动关闭提示层
	 *1秒后自动关闭
 	 */
	clueTips:function(){
				//var tempCountFlag = FrontOrders_showMiniCart01.countFlag;
				if(FrontOrders_showMiniCart01.tempCountFlag==0){
					FrontOrders_showMiniCart01.hideMiniTips();
					FrontOrders_showMiniCart01.tempCountFlag = FrontOrders_showMiniCart01.countFlag;
					return ;
				}else{
					FrontOrders_showMiniCart01.clearTimeOut = setTimeout('FrontOrders_showMiniCart01.clueTips()',1000);
					
				}
				FrontOrders_showMiniCart01.tempCountFlag--;
		},
			/**
		*隐藏 迷你购物车 划出层
		*
		**/
		closePopLayer:function(){
			var compid = FrontOrders_showMiniCart01.compId;//document.getElementById("minicartcomp").value;
			if (!jQuery("#" + compid+"_PopUpLayer").is(":hidden")) {
				$("#"+compid+"_PopUpLayer").hide();
			}
			
		}
	
	,
	//迷你购物车我要结账操作
	givenewMoney:function(href_givemoney,total,login,href_login,compId){
		var compid = FrontOrders_showMiniCart01.compId;
		jQuery.ajax({
		type: "POST",
		url: "/FrontOrders.do?method=checkMiniCart&compId="+compId,
		data:"",
		dataType: "text",
		cache: false,
		success: function(returndata){
			//alert("givenewMoney.returndata=="+returndata);
	        var dataarr = returndata.split("^"); 
	         /*
	          *dataarr[0] -- 操作标识
	          *dataarr[1] -- 个数
	          *dataarr[2] -- 优惠前总金额
	          *dataarr[2] -- 优惠后总金额
	          */
	   		if(dataarr[0]=="delete"){
	   		//列表中有商品删除
	   		alert("商品已删除");
	   		var formid = compId+"_MyCartForm";
	   		jQuery.ajax({
					type: "POST",
					url: "/FrontOrders.do?method=getProductList&compId="+compid,
					data:"",
					dataType: "html",
					cache: false,
					success: function(returndata){
							if(document.getElementById(compid+"_playmessage") != null){
								document.getElementById(compid+"_playmessage").innerHTML = returndata;
							}
			      	}
			});
			if(document.getElementById(FrontOrders_showMiniCart01.compId+"_showcount") != null){
   				document.getElementById(FrontOrders_showMiniCart01.compId+"_showcount").innerHTML = "&nbsp;("+dataarr[1]+")&nbsp;";
   			}
 			if(document.getElementById(FrontOrders_showMiniCart01.compId+"_showMoney") != null){
 				document.getElementById(FrontOrders_showMiniCart01.compId+"_showMoney").innerHTML = dataarr[2];
 			}
 			FrontOrders_showMiniCart01.closePopLayer();
	   		}else if(dataarr[0]=="empty"){
	   		//购物车列表中已经没有商品
	   		alert("购物车列表中已经没有商品");
	   		jQuery.ajax({
					type: "POST",
					url: "/FrontOrders.do?method=getProductList&compId="+compid,
					data:"",
					dataType: "html",
					cache: false,
					success: function(returndata){
							if(document.getElementById(compid+"_playmessage") != null){
								document.getElementById(compid+"_playmessage").innerHTML = returndata;
							}
			           }
			   });
		   		if(document.getElementById(FrontOrders_showMiniCart01.compId+"_showcount") != null){
	   				document.getElementById(FrontOrders_showMiniCart01.compId+"_showcount").innerHTML = "&nbsp;(0)&nbsp;";
	   			}
	 			if(document.getElementById(FrontOrders_showMiniCart01.compId+"_showMoney") != null){
	 				document.getElementById(FrontOrders_showMiniCart01.compId+"_showMoney").innerHTML = "0";
	 			}
	 			FrontOrders_showMiniCart01.closePopLayer();
	   		}
	   		
	   		//其他情况
	   		else{
	   			if(dataarr[2]!=null){
					if( parseInt(dataarr[2]) >=100000000){
						//商品总金额大于99999999.99
						alert("商品总金额大于99999999.99");
						return false;
				    }
	   			}
	   			FrontOrders_showMiniCart01.closePopLayer();
				if(login != '0'){
					window.location.href=href_login;
				}else{
					window.location.href=href_givemoney;
				}
			}
           }
      	});
},
grammarstr:function(str){
	 var value="";
	    for(j=0;j<str.length;j++){
	          var ch=str.charAt(j); 
	          if(ch=="&"){
   	    	  value+="&amp;";
   	      }else if(ch=="'"){
   	    	  value+="&#39;";
   	       }else if(ch=="\""){
   	    	   value+="&#34;";
   	       }else if(ch=="<"){
   	           value+="&#60;";
   	       }else if(ch==">"){
   	           value+="&#62;";
   	       }else if(ch=="/"){
   	           value+="&#8260;";
   	       }else{
   	    	   value+=ch;
   	       }
	      }   
	  return value;  
}
}