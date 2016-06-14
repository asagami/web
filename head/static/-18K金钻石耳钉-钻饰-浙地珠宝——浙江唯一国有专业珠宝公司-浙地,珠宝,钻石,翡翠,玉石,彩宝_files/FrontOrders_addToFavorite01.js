var FrontOrders_addToFavorite01 = {
	topPosition:"0",
	leftPosition:"0",
	alignLeft:true,
	compId:"",
	autoclose:"",
	buttonFlag:"0",
	countFlag:"5",
	clearTimeOut:new Object(),
	/*初始化 页面样式，使其隐藏显示
	onloadjsp:function() {
				$("#" + FrontOrders_addToFavorite01.compId).hide();
			},
	*/
		/**
		 * 添加：cookies
		 * 参数：productid  商品id
		 */
	addFavoritesToCookie:function(productid){
		//校验商品是否存在  1：存在 2： 不存在
		$.get("/FrontOrders.do?method=checkProductState&productid="+productid,function(productData){ 
			if(productData == "1"){
				$.get("/FrontOrders.do?method=ifMemberLogin",function(memberid){ 
					if(memberid == 'login'){//会员
						//通过ajax调用action方法
						$.get("/FrontOrders.do?method=getFavoriteState&productid="+productid,function(data){
							if(data =='addsuccess'){//添加成功
								document.getElementById(FrontOrders_addToFavorite01.compId+"_playmessage").innerHTML=i18n_orders_addsuccess;//orders.FrontOrders_addToFavorite01.addsuccess;
								FrontOrders_addToFavorite01.contrlDisplayFavorite();
							}else if(data =='more'){//已经超额添加
								document.getElementById(FrontOrders_addToFavorite01.compId+"_playmessage").innerHTML=i18n_orders_favoritesmessage;//orders.FrontOrders_addToFavorite01.addsuccess;
								FrontOrders_addToFavorite01.contrlDisplayFavorite();
							}else if(data =='exist'){//已经添加过
								document.getElementById(FrontOrders_addToFavorite01.compId+"_playmessage").innerHTML=i18n_orders_exist;//orders.FrontOrders_addToFavorite01.addsuccess;
								FrontOrders_addToFavorite01.contrlDisplayFavorite();
							}
						});
					}else if (memberid == 'nologin'){//非会员
						 var cookiename = "favoritesid";
						 var cookies = document.cookie;
						 var hasfavorites = cookies.indexOf(cookiename + '=');
						 if(hasfavorites == -1){
						 	document.cookie = cookiename+'=' + escape(productid)+';path=/';
						 	document.getElementById(FrontOrders_addToFavorite01.compId+"_playmessage").innerHTML=i18n_orders_addsuccess;
						 	FrontOrders_addToFavorite01.contrlDisplayFavorite();
						 }else{
						 	//id串开始位置
							var start = cookies.indexOf("favoritesid=")+12;
							//id串结束位置
						    var end = cookies.indexOf(';', start);
							if(end==-1){
								end= cookies.length;
							}
							var idStr = cookies.substring(start, end);
							var idStrArray = idStr.split("_");
							//超过最大数
							
							if(idStrArray.length >= 20){
								document.getElementById(FrontOrders_addToFavorite01.compId+"_playmessage").innerHTML=i18n_orders_favoritesmessage;
								FrontOrders_addToFavorite01.contrlDisplayFavorite();
								return ;
							}
								//已经存储过
								for(var i=0;i<idStrArray.length;i++){
									if(idStrArray[i]==productid){
										document.getElementById(FrontOrders_addToFavorite01.compId+"_playmessage").innerHTML=i18n_orders_exist;
										FrontOrders_addToFavorite01.contrlDisplayFavorite();
										return ;
									}
								}
							
								//存储
								document.cookie = cookiename+'=' + escape(idStr+'_'+productid)+';path=/';
								document.getElementById(FrontOrders_addToFavorite01.compId+"_playmessage").innerHTML=i18n_orders_addsuccess;
								FrontOrders_addToFavorite01.contrlDisplayFavorite();
						 }
					}
					
					});
			}else{
				alert(i18n_orders_is_product_delete);
			}
		});
		
			/*if(login_m == 'login'){
				setTimeout('FrontOrders_addToFavorite01.displayFavorite()',200);
			}else{
				FrontOrders_addToFavorite01.displayFavorite();
			}*/
	},
	/**
	 * 添加：cookies 给flash用的方法
	 * 参数：productid  商品id
	 */
	addFavoritesToCookieFlash:function(productid){
		//校验商品是否存在  1：存在 2： 不存在
		$.get("/FrontOrders.do?method=checkProductState&productid="+productid,function(productData){ 
			if(productData == "1"){
				$.get("/FrontOrders.do?method=ifMemberLogin",function(memberid){ 
					if(memberid == 'login'){//会员
						//通过ajax调用action方法
						$.get("/FrontOrders.do?method=getFavoriteState&productid="+productid,function(data){
							return data;
						});
					}else if (memberid == 'nologin'){//非会员
						 var cookiename = "favoritesid";
						 var cookies = document.cookie;
						 var hasfavorites = cookies.indexOf(cookiename + '=');
						 if(hasfavorites == -1){
						 	document.cookie = cookiename+'=' + escape(productid)+';path=/';
						 	return "addsuccess";
						 }else{
						 	//id串开始位置
							var start = cookies.indexOf("favoritesid=")+12;
							//id串结束位置
						    var end = cookies.indexOf(';', start);
							if(end==-1){
								end= cookies.length;
							}
							var idStr = cookies.substring(start, end);
							var idStrArray = idStr.split("_");
							//超过最大数
							
							if(idStrArray.length >= 20){
								/*document.getElementById(FrontOrders_addToFavorite01.compId+"_playmessage").innerHTML=i18n_orders_favoritesmessage;
								FrontOrders_addToFavorite01.contrlDisplayFavorite();*/
								return  "more";
							}
								//已经存储过
								for(var i=0;i<idStrArray.length;i++){
									if(idStrArray[i]==productid){
										return "exist";
									}
								}
								//存储
								document.cookie = cookiename+'=' + escape(idStr+'_'+productid)+';path=/';
								return "addsuccess";
						 }
					}
					
					});
			}else{
				//alert(i18n_orders_is_product_delete);
				return "nothave";
			}
		});
		
			/*if(login_m == 'login'){
				setTimeout('FrontOrders_addToFavorite01.displayFavorite()',200);
			}else{
				FrontOrders_addToFavorite01.displayFavorite();
			}*/
	},
	/*
		控制显示和关闭
	*/
	contrlDisplayFavorite:function(){
			/*if(FrontOrders_addToFavorite01.autoclose=='0'){
				if(FrontOrders_addToFavorite01.buttonFlag=='0'){
					FrontOrders_addToFavorite01.buttonFlag = "1";
					FrontOrders_addToFavorite01.countFlag = '5';
					//FrontOrders_addToFavorite01.clueFavorites();
				}
			}*/
			FrontOrders_addToFavorite01.restartTime();	
			FrontOrders_addToFavorite01.displayFavorite();	
	},
	
	/**
	 *	功能：显示弹出层
	 *
	 */
	displayFavorite:function() {
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
	FrontOrders_addToFavorite01.leftPosition =(myWidth ) / 4+"px";
	FrontOrders_addToFavorite01.topPosition =(myHeight ) / 3 + document.documentElement.scrollTop+"px";
	
	
	
				$("#" + FrontOrders_addToFavorite01.compId).show();
				/* 页面发生scroll事件时触发 */
				$(window).scroll(
						function() {
							$("#" + FrontOrders_addToFavorite01.compId).css(
									"top",
									FrontOrders_addToFavorite01.topPosition);
									
											//+ $(document).scrollTop());
						});

				/* 浮动窗口拖拽事件 
				$("#" + FrontOrders_addToFavorite01.compId).draggable();
				*/
				/* 绑定拖拽事件结束后重新设置距上边距的距离 
				$("#" + FrontOrders_addToFavorite01.compId).bind(
						"dragstop",
						function(ui) {
							FrontOrders_addToFavorite01.topPosition = $("#" + FrontOrders_addToFavorite01.compId)
									.offset().top
									- $(document).scrollTop();
						});
				*/
				
				$("#" + FrontOrders_addToFavorite01.compId).css("top",
						FrontOrders_addToFavorite01.topPosition);
						
				 //alert(FrontOrders_addToFavorite01.stly);
				//$("#" + FrontOrders_addToFavorite01.compId).css("style",
				//		FrontOrders_addToFavorite01.stly);
						
						
				if (FrontOrders_addToFavorite01.alignLeft) {
					//alert("if");
					$("#" + FrontOrders_addToFavorite01.compId).css("left",
							FrontOrders_addToFavorite01.leftPosition);
							
				} else {
				//alert("else");
					$("#" + FrontOrders_addToFavorite01.compId).css(
							"left",
							$("body").innerWidth()
									- $("#" + FrontOrders_addToFavorite01.compId).outerWidth()
									- FrontOrders_addToFavorite01.leftPosition);
				}
				
				FrontOrders_addToFavorite01.changeStyle(FrontOrders_addToFavorite01.compId);
				
				FrontOrders_addToFavorite01.clueFavorites();
			},
	
	
	
		/* 关闭对比浮动框 */
	hideCompare:function() {
		FrontOrders_addToFavorite01.restartTime();
		if (!jQuery("#" + FrontOrders_addToFavorite01.compId).is(":hidden")) {
			jQuery("#" + FrontOrders_addToFavorite01.compId).fadeOut("fast");
		}
		
	},
	/*
		重置计数器
	*/
	restartTime:function(){
		clearTimeout(FrontOrders_addToFavorite01.clearTimeOut);
		FrontOrders_addToFavorite01.countFlag = '5';
	},
	
	   /*
		*功能：显示边框
		*参数：compid 组件id
		*/
	changeStyle:function(compid){
		//document.getElementById(compid+"_s").style.borderBottom = "1px solid #000000";
		//document.getElementById(compid+"_s").style.borderTop = "1px solid #000000";
		//document.getElementById(compid+"_s").style.borderLeft = "1px solid #000000";
		//document.getElementById(compid+"_s").style.borderRight = "1px solid #000000";
		document.getElementById(compid+"_s").style.display = "";
	},
	/*
	 *功能：自动关闭提示层
	 *
 	 */
	clueFavorites:function(){	   
			if(FrontOrders_addToFavorite01.countFlag==0){
				FrontOrders_addToFavorite01.hideCompare();
				FrontOrders_addToFavorite01.countFlag = '5';
				FrontOrders_addToFavorite01.buttonFlag = '0';
				return ;
			}else{
				document.getElementById(FrontOrders_addToFavorite01.compId+"_second").innerHTML = FrontOrders_addToFavorite01.countFlag;
				FrontOrders_addToFavorite01.clearTimeOut = setTimeout('FrontOrders_addToFavorite01.clueFavorites()',1000);
				
			}
			FrontOrders_addToFavorite01.countFlag--;
	}
	
	
}