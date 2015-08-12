(function($, window, undefined){
$.fn.box=function(method){
	var defaults={
		width:0,
		height:0,
		ref:false,
		title:false,
		closebutton:true,
		type:"img",
		caption:false,
		onStart:false,
		onLoad:false,
		onClose:false,
		onError:false
	}
	var body=$("body"),win=$(window);
	var methods={
		init:function(o){
			o=$.extend({},defaults,o||{});
			return this.each(function(){
				var el=this;
				var opt=$.extend({},o);
				opt.ref=$(el).attr("href")||opt.ref;
				opt.title=$(el).attr("title")||opt.title;
				var loading=$("<div class='loading'>"),overlay=$("<div class='box'>"),image=$(new Image()),container=$("<div class='boxcontent'>"),close=$("<span class='close'>"),title=$("<p class='caption'>"+opt.title+"</p>");
				var loadingfade=function(){
					loading.fadeOut("fast",function(){$(this).remove();});
				},closeappend=function(){
					if(opt.closebutton){
						container.append(close);
						el.box.closebutton=close;
					}
				},captionappend=function(){
					if(opt.caption&&opt.title){
						container.append(title);
						el.box.title=title;
					}
				};
				close.click(function(){
					$(el).box("close");
				});
				el.box=opt;
				if(body.css("overflow")==""){
					if(body.css("overflow-x")!=""){
						el.box.overflowx=body.css("overflow-x");
					}
					if(body.css("overflow-y")!=""){
						el.box.overflowy=body.css("overflow-y");
					}
				}
				else{
					el.box.overflow=body.css("overflow");
				}
				body.append(overlay).css({"overflow":"hidden"});
				overlay.css({"top":win.scrollTop(),"left":win.scrollLeft()}).click(function(){
					$(el).box("close");
				});
				el.box.overlay=overlay;
				overlay.append(loading);
				loading.css({"display":"block","position":"absolute","left":(win.width()/2)-(loading.width()/2),"top":(win.height()/2)-(loading.height()/2)}).click(function(e){
					e.stopPropagation();
				});
				win.resize(function(){
					loading.css({"left":(win.width()/2)-(loading.width()/2),"top":(win.height()/2)-(loading.height()/2)});
				});
				el.box.loading=loading;
				overlay.append(container);
				container.click(function(e){
					e.stopPropagation();
				});
				el.box.container=container;
				if($.isFunction(opt.onStart)){
					var defered=opt.onStart(el.box);
				}
				if(opt.type=="img"){
					image.load(function(){
						loadingfade();
						container.append(image);
						el.box.image=image;
						closeappend();
						captionappend();
						var mheight=win.height()/2;
						if(el.box.width==0&&el.box.height==0){
							el.box.width=this.width;
							el.box.height=this.height;
							var positionimg=function(){
								mheight=win.height()/2;
								if(win.width()<el.box.width){
									container.css({"width":"90%","height":"auto"});
									image.css({"width":"100%","height":"auto"});
									container.css({"top":function(){return mheight-(container.height()/2)},"height":container.height()});
									image.css({"height":"100%"});
									if(image.height()>win.height()){
										container.css({"height":"90%","top":function(){return mheight-(container.height()/2)}});
										image.css({"height":"100%","width":"auto"});
										container.css({"width":image.width()});
									}
								}
								else if(win.height()<el.box.height){
									container.css({"height":"90%","top":function(){return mheight-(container.height()/2)}});
									image.css({"height":"100%","width":"auto"});
									container.css({"width":image.width()});
									image.css({"width":"100%"});
									if(image.width()>win.width()){
										container.css({"width":"90%","height":"auto"});
										image.css({"width":"100%","height":"auto"});
										container.css({"top":function(){return mheight-(container.height()/2)}});
									}
								}
								else{
									container.css({"width":el.box.width,"height":el.box.height,"top":function(){return mheight-(el.box.height/2)}});
									image.css({"width":"100%","height":"100%"});
								}
							}
							positionimg();
							win.resize(function(){
								positionimg();
							});
						}
						else{
							image.css({"width":function(){if(el.box.width!=0)return el.box.width; else return "auto"},"height":function(){if(el.box.height!=0)return el.box.height; else return "auto"}});
							container.css({"width":image.width(),"height":image.height()});
							overlay.css({"overflow":"auto"});
							if(container.height()>win.height()){
								container.css({"top":"0px"});
							}
							else{
								container.css({"top":function(){return mheight-(container.height()/2)}});
							}
							win.resize(function(){
								container.css({top:(win.height()/2)-container.height()/2});
							});
						}
						if(defered&&defered.promise){
							defered.done(function(){
								if($.isFunction(opt.onLoad)){
									opt.onLoad(el.box);
								}
							});
						}
						else if($.isFunction(opt.onLoad)){
								opt.onLoad(el.box);
						}
					}).attr({
						src: opt.ref
					}).error(function(){
						loadingfade();
						if($.isFunction(el.box.onError)){
							el.box.onError(el.box);
						}
						else{
							container.html("Error").addClass("error");
							container.css({"display":""});
							var msgh=$(this).height()/2;
							container.css({"top":function(){return (win.height()/2)-msgh}});
							closeappend();
							win.resize(function(){
								container.css({"top":function(){return (win.height()/2)-msgh}});
							});
						}
					});
				}
				else if(opt.type="html"){
					closeappend();
					var wrap=$("<span>");
					container.append(wrap);
					wrap.load(opt.ref, function(response, status, xhr) {
						loadingfade();
						if (status == "error") {
							var msg = "Sorry but there was an error: ";
							wrap.html(msg + xhr.status + " " + xhr.statusText);
						}
						if(defered&&defered.promise){
							defered.done(function(){
								if($.isFunction(opt.onLoad)){
									opt.onLoad(el.box);
								}
							});
						}
						else if($.isFunction(opt.onLoad)){
								opt.onLoad(el.box);
						}
					});
					captionappend();
				}
			});
		},
		close:function(){
			return this.each(function(){
				var el=this,closefunction,defered;
				closefunction=function(){
					if(el.box.overflow){
						body.css({"overflow":el.box.overflow});
					}
					else{
						body.css({"overflow-x":el.box.overflowx,"overflow-y":el.box.overflowy});
					}
					el.box.overlay.remove();
				};
				if($.isFunction(el.box.onClose)){
					defered=el.box.onClose(el.box);
					if(defered&&defered.promise){
						defered.done(function(){
							closefunction();
						});
					}
					else{
						closefunction();
					}
				}
				else{
					closefunction();
				}
			});
		}
	};
	if(methods[method]){
		return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
	}else if(typeof method==='object'||!method){
		return methods.init.apply(this,arguments);
	}else{
		$.error('Method '+method+' does not exist on jQuery.box');
	}
};
})(jQuery, window);