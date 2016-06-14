var FrontMembers_welcomeInfo01 = {
	/*
	 * 登录后，点击退出执行表单提交
	 * formName：form表单的id
	 * compId：组件id
	*/
	goLogout: function(formName, compId){
		var welcomeInfoForm = document.getElementById(formName);
		welcomeInfoForm.action = "/FrontMembers.do?method=welcomeInfoLogout01&compId="+ compId;
		welcomeInfoForm.submit();
	},

	/*
	 * 退出执行的页面跳转。退出链接参数为空，则跳转到当前页面
	 * href_exit：配置文件中，退出链接参数
	 * href_orignalPage：点击退出前，当前页面的链接地址
	*/
	goExitPage: function(href_exit, href_orignalPage){
		if(href_exit == null || href_exit == ''){
			window.open(href_orignalPage, "_self");
		} else {
			window.open(href_exit, "_self");
		}
	},

	/*
	 * 根据不同的时间段，返回不同的问候语
	*/
	welcomeWords: function(){
	    var d = new Date();
	    var hour = d.getHours();
	    if (hour >= 0 && hour < 8)
	    {
	     return i18n_frontmembers_welcomeinfo01_goodmorning;
	    } else if(hour >=8 && hour < 12){
	     return i18n_frontmembers_welcomeinfo01_goodforenoon;
	    } else if(hour >=12 && hour < 13){
	     return i18n_frontmembers_welcomeinfo01_goodnoon;
	    } else if(hour >=13 && hour < 18){
	     return i18n_frontmembers_welcomeinfo01_goodafternoon;
	    } else if(hour >=18 && hour < 24){
	     return i18n_frontmembers_welcomeinfo01_goodnight;
	    }
    },

    /*
	 * 向页面写入问候语的内容
	*/
    showWelcomeWords: function(){
    	var returnValue = FrontMembers_welcomeInfo01.welcomeWords();
    	document.write(returnValue);
    },

	/*
	 * 执行页面跳转。如果链接地址为空，则跳转到当前页面
	 * href_page：配置文件中的链接地址
	 * href_openstyle：配置文件中的链接的打开方式
	*/
	goToPage: function(href_page, href_openstyle, returnSourcePage){
		//聚合页面的请求URL
		var location = document.location;
		//聚合页面请求URL的路径部分
		var sourceUrl = location.pathname;
		if(href_page == null || href_page == ''){
			window.open(sourceUrl, href_openstyle);
		} else {
			//如果要返回登录注册成功后要返回当前页面
			if(returnSourcePage=='true'){
				window.open(href_page+"?returnUrl="+sourceUrl, href_openstyle);
			}else{
				window.open(href_page, href_openstyle);
			}
		}
	},
	
    /*
	 * 将页面完整地址写入页面隐藏域
	 * formName：form表单id
	*/
    initHidden: function(formName){
	    var welcomeInfoForm = document.getElementById(formName);
	    // 获取页面完整URL
	    var sourceUrl = window.location.href;
        welcomeInfoForm.sourceUrl.value = sourceUrl;
    }

}