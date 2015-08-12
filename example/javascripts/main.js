$(document).ready(function(){
	prettyPrint();
	$(".default").click(function(e){
		e.preventDefault();
		$(this).box();
	});
	$(".caption").click(function(e){
		e.preventDefault();
		$(this).box({
			width:500,
			height:300,
			closebutton:false,
			caption:true
		});
	});
	$(".customAnimation").click(function(e){
		e.preventDefault();
		$(this).box({
			width:500,
			height:300,
			closebutton:true,
			caption:true,
			onStart:function(e){
				var defered=new $.Deferred();
				$(e.container).css({"display":"none"});
				$(e.overlay).css("opacity","0").animate({"opacity":"1"},300,function(){defered.resolve();});
				return defered.promise();
			},
			onLoad:function(e){
				$(e.container).css({"display":""});
				$(e.image).css({"width":"0px"}).animate({"width":"100%"},2000);
			},
			onClose:function(e){
				var defered=new $.Deferred();
				if(e.image){
					$(e.image).animate({"width":"0px"},2000,function(){
						$(e.overlay).stop().animate({"opacity":"0"},1000,function(){defered.resolve();});
					});
				}
				else{
					$(e.overlay).stop().animate({"opacity":"0"},1000,function(){defered.resolve();});
				}
				return defered.promise();
			}
		});
	});
	$(".customAnimation2").click(function(e){
		e.preventDefault();
		var ele=$(this);
		var x=ele.offset().left-$(window).scrollLeft(),y=ele.offset().top-$(window).scrollTop(),w=ele.width(),h=ele.height();
		ele.box({
			closebutton:true,
			caption:true,
			onStart:function(e){
				var defered=new $.Deferred();
					$(e.container).css({"opacity":"0"});
					$(e.overlay).css("opacity","0").animate({"opacity":"1"},1000,function(){defered.resolve();});
					return defered.promise();
				},
				onLoad:function(e){
					$(e.closebutton).css({"opacity":"0"});
					var x1=$(e.container).offset().left,y1=$(e.container).position().top,w1=$(e.container).width(),h1=$(e.container).height();
					$(e.container).css({"opacity":"1","position":"absolute","left":x,"top":y,"width":w,"height":h})
									.animate({"left":x1,"top":y1,"width":w1,"height":h1},2000,function(){
										$(this).css({"position":"relative","left":"0"});
										$(e.closebutton).animate({"opacity":"1"},1000);
									});
				},
				onClose:function(e){
					var defered=new $.Deferred();
					if($(e.container).find(".close").is("span")){
						$(e.closebutton).animate({"opacity":"0"},1000);
					}
					if(e.image){
						$(e.image).animate({"width":"0px"},2000,function(){
							$(e.overlay).stop().animate({"opacity":"0"},1000,function(){defered.resolve();});
						});
					}
					else{
						$(e.overlay).stop().animate({"opacity":"0"},1000,function(){defered.resolve();});
					}
					return defered.promise();
				},
				onError:function(e){
					$(e.container).html("custom error<a href='#'>link</a>").css({"color":"#aa0000","display":"","opacity":"1"});
				}
			});
		});
		$("#b1").click(function(){
			$(this).box({
				ref:"imgs/1.jpg",
				title:"title",
				caption:true
			});
		});
		$("#b2").click(function(){
			var ele=$(this);
			ele.box({
				ref:"imgs/1.jpg",
				title:"title",
				caption:false,
				onStart:function(e){
					var defered=new $.Deferred();
					$(e.container).css({"opacity":"0"});
					$(e.overlay).css({"top":-$(e.overlay).height()}).animate({"top":$(window).scrollTop()},1000,function(){defered.resolve();});
					return defered.promise();
				},
				onLoad:function(e){
					$(e.closebutton).css({"opacity":"0"});
					$(e.title).css({"opacity":"0"});
					var x1=$(e.container).position().left,y1=$(e.container).position().top,w1=$(e.container).width(),h1=$(e.container).height();
					$(e.container).css({"opacity":"1","top":-h1})
									.animate({"top":y1},2000,function(){
										$(e.closebutton).animate({"opacity":"1"},1000);
										$(e.title).animate({"opacity":"1"},1000);
									});
				},
				onError:function(e){
					$(e.container).html("Error").addClass("error");
					$(e.container).css({"display":""});
					$(e.container).css({"opacity":"1"});
					var msgh=$(e.container).height()/2;
					$(e.container).css({"top":function(){return ($(window).height()/2)-msgh}});
					if(e.closebutton){
						var close=$("<span class='close'></span>");
						$(e.container).append(close);
						e.closebutton=close;
						close.click(function(){
							$(e.overlay).remove();
						});
					}
					$(window).resize(function(){
						$(e.container).css({"top":function(){return ($(window).height()/2)-msgh}});
					});
				},
				onClose:function(e){
					var defered=new $.Deferred();
					if(e.closebutton){
						$(e.closebutton).animate({"opacity":"0"},1000);
					}
					if(e.title){
						$(e.title).animate({"opacity":"0"},1000);
					}
					if(e.image){
						$(e.container).animate({"top":$(e.overlay).height()},2000,function(){
							$(e.overlay).stop().animate({"top":$(e.overlay).height()+$(window).scrollTop()},1000,function(){defered.resolve();});
						});
					}
					else{
						$(e.overlay).stop().animate({"opacity":"0"},1000,function(){defered.resolve();});
					}
					return defered.promise();
				}
			});
		});
		$("#b3").click(function(){
			$(this).box({
				ref:"2.html",
				title:"title",
				caption:true,
				type:"html",
				onStart:function(e){
					var defered=new $.Deferred();
					$(e.container).css({"width":"70%","height":"100%","background":"#ffffff","color":"#000000","opacity":"0","position":"relative","word-break": "break-all","text-align":"center"});
					$(e.overlay).css("opacity","0").animate({"opacity":"1"},3000,function(){defered.resolve();});
					return defered.promise();
				},
				onLoad:function(e){
					$(e.container).animate({"opacity":"1"},3000);
					$(e.title).removeClass("caption").css({"position":"absolute","bottom":"0px","left":"0px"});
				}
			});
		});
		function pretty_resize(){
			$(".prettyprint").each(function(){
					var width_parent=$(this).width();
					$(this).find(".linenums").css({"width":width_parent+"px"});
					var swidth=$(this)[0].scrollWidth;
					$(this).find(".linenums").css({"width":swidth+"px"});
			});
		}
		pretty_resize();
		$(window).resize(function(){
			 pretty_resize();
		});
});
