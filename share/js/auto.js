

   //声明一个worker;
     var controlShow={};
     var worker;
	 var hoursArr=Array();
    //初始化调用方法
	//var languageSet={"Category-en":"Category","ALL-en":"ALL","ALL-zh-cn":"全部","Special-en":"Special","Special-zh-cn":"推荐"};
	var languageArray=sessionStorage.getItem("language");
	languageArray = eval('('+languageArray+')');
    function workerInit(){


 if(typeof(EventSource)!=="undefined")
  {
  var source=new EventSource("/worker.php");
  source.onmessage=function(event)
    {
			

			//alert(event.data);
			 $.each(hoursArr, function(i, n){
							
											
								  		
                                if(n.from>n.to){
								n.to="D240000";
								} 
								if(n.from<=event.data && event.data<=n.to){

											
											 
											  if($("#main").data(n.from+n.to)!="hide"){
												$("#main").data(n.from+n.to,"hide");
												$("."+n.from+n.to).hide();
												}
									
								}else{
									
												if($("#main").data(n.from+n.to)!="show"){
												$("#main").data(n.from+n.to,"show");
												$("."+n.from+n.to).show();
												}
								}
								
							  if(n.from>n.to){
								n.from="D000000";
											if(n.from<=event.data && event.data<=n.to){

												
												 
												  if($("#main").data(n.from+n.to)!="hide"){
													$("#main").data(n.from+n.to,"hide");
													$("."+n.from+n.to).hide();
													}
										
									}else{
										
													if($("#main").data(n.from+n.to)!="show"){
													$("#main").data(n.from+n.to,"show");
													$("."+n.from+n.to).show();
													}
									}
								} 
								 
						
						
						
						
						
										  
											
									
			 })
    }
  }



      /*  if(window.Worker){
            var worker=new Worker('/js/worker.js');

		
		    worker.postMessage(true);
            worker.onmessage=function(event){
               
                console.log("XXXXXXXXXXXXXXXXXXXXXXXX");
						 //alert( event.data);
						/*   $.each(hoursArr, function(i, n){

							console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA");
							
							console.log(event.data);
								if(n.from<=event.data && event.data<=n.to){
								  
									
									
									 if($("#main").data(n.from+n.to)!="hide"){
									$("#main").data(n.from+n.to,"hide");
									
									$("."+n.from+n.to).hide();
									}
									
								}else{
									
									if($("#main").data(n.from+n.to)!="show"){
									$("#main").data(n.from+n.to,"show");
									//console.log("4444444444444444444444");
									$("."+n.from+n.to).show();
									}
								}
							})*/

          //  };
           

          
        //}
    }
function sortArr(m,n){
    return m-n;
}
Number.prototype.mytoFixed = function(num){
	var tempnum = this.toFixed(num+4);
	 return Number(Math.round(tempnum+'e'+num)+'e-'+num);
};
Date.prototype.Format = function (fmt) { 
    var o = {
        "M+": this.getMonth() + 1, 
        "d+": this.getDate(), 
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds() 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
 function formatFloat(src, pos)
{
return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);
}
Array.prototype.remove=function(dx)
　{
　　if(isNaN(dx)||dx>this.length){return false;}
　　for(var i=0,n=0;i<this.length;i++)
　　{
　　　　if(this[i]!=this[dx])
　　　　{
　　　　　　this[n++]=this[i]
　　　　}
　　}
　　this.length-=1
　}
function toDecimal(x,n) {       
                var f=parseFloat(x);    
                if (isNaN(f)) {   
                    return false;   
                }   
                var leg=10;
                if(n==2){
                    leg=100;
                }else if(n==3){
                    leg=1000;
                }else if(n==4){
                    leg=10000;
                }else if(n==5){
                    leg=100000;
                }
                var f = Math.round(x*leg)/leg; 
                var s = f.toString();   
                var rs = s.indexOf('.');   
                if (rs < 0) {   
                    rs = s.length;   
                    s += '.';   
                }   
                while (s.length <= rs + n) {   
                    s += '0';   
                }   
                return s;  
        }   
var showSigleHtmlArr=Array(); //大图HTML 
var spMenu=Array(),spMenuInt=0; //推荐菜
var defaultPrice=Array();    //双价格，外送，堂食，取堂吃默认值
var opArray=Array();         //Size价格，替代0
 var moveArr=Array(); //删除不要的菜
var optionPanelArr=Array(); //外送外
/*********************LOADHTML* Begin*****************************/

 var hoursInt=0;
function LoadHtml(url)

{  

										
	// console.time("======================");	
//	enLanguage
	$.ui.showMask("load...");
		
     var mkey=sessionStorage.getItem("key");
	 var folder=sessionStorage.getItem("folder");
/**A********JSON解释开始**JSON-URL 组类别-类别-菜-{Option}********************************************************/
	$.getJSON(url, function (data){
   // alert("K");
    // alert(url);
      //dump(data);

     var version=data.Result;
	  var versionOld=localStorage.getItem(mkey+"V");

	  if(version!=versionOld){
				$.each(localStorage,function(key,val){
					if(key.indexOf(mkey+"_")==0){
					
					 localStorage.removeItem(key);//清除c的值
					}
					
				})
			localStorage.setItem(mkey+"V",version);
	  }

	
 var mutiplyDisp={"en":"display:none","zh-cn":"display:none","fr":"display:none"};
 $.each(languageArray, function(laint, laObj){
												    
													 $.each(laObj, function(laintkey, laObjV){
														
														if(laint==0){
														$("#enLanguage").text(laObjV);
														 mutiplyDisp[laintkey]="";
														}
														 if(laintkey != "en"){
																    
																	 $("#enLanguage").on("touchstart",function(){
																	 
																	  if($("#enLanguage").text()=="ENGLISH"){
																		
																		 $("#enLanguage").text(laObjV);
																		 $(".en").css("display","none");
																	    $("."+laintkey).css("display","");
																	}else{
																		
																	$("#enLanguage").text("ENGLISH");
																	 $(".en").css("display","");
																	 $("."+laintkey).css("display","none");

																	}			
																	})	
																														 
														       }

														})


															




										})


           
	var GroupHtml="",MenuContent="",menuSpContent="",OptionsHtml="",showSigleHtml="",showSpHtml="",MenuContentItem="";//MenuContentItem过渡处理推荐菜单
	 


					
	 		
	 
	 
	 //大图标志
	  var showPhoto=40;
    //隐藏左边无菜 菜单
	
	 var hideCategory=Array();
	 var hideInt=0,imgInt=-1;//大图标志
     // defaultPrice=Array();defaultInt=0;
      var optionPanelInt=0;
      opArray=Array();opSize=0; //删除外送的与默认价格与大小

  //左边多语言.
  GroupHtml='<li class="divider">Category</li><li><a class="theme theme-none" data-ignore="true" href="javascript:MenuLink(\'ALL\')"><span class="en" style="'+mutiplyDisp["en"]+'">ALL</span>'
 +'<span class="zh-cn" style="'+mutiplyDisp["zh-cn"]+'">全部</span></a></li><li  id="leftMenuSp" class="leftMenuSp" style="position：relative;"><a class="theme theme-none" data-ignore="true" href="javascript:MenuLink(\'contentMenuSp\')">'
 +'<span class="en" style="font-weight:600;color:red;'+mutiplyDisp["en"]+'">Special</span><span class="zh-cn" style="font-weight:600;color:red;'+mutiplyDisp["zh-cn"]+'">推荐</span></a> </li>';
   //中间多语言.
  languageName='<span class="en" style="font-weight:600;color:red;'+mutiplyDisp["en"]+'">Special</span><span class="zh-cn" style="font-weight:600;color:red;'+mutiplyDisp["zh-cn"]+'">推荐</span>';
  

  menuSpContent='<li class="divider" style="background:#512e14;color:#f1d226;padding:0.5em" id="contentMenuSp" >';
  menuSpContent+=languageName+'<span style="float:right;margin-top:-5px;padding:0px 5px 10px 30px;" class="centerMenuExp"><span class="fa fa-caret-square-o-up fa-lg" style="float:right;padding-top:6px;"></span></span></li>';
 
/**B***第一层data.categoryGroup 组类别  n.systemGenerated true为系统参数 **************************************************************/
//alert("OK");
  $.each(data.categoryGroup, function(i, n){
		    var categoryArr=Array();
				//if(n.systemGenerated==false){
						
						topId=n.id;
						

					                	//languageArray=[{"en":"english"},{"zh-cn":"中文"}];
										disp="display:";
										var languageName="";
										$.each(languageArray, function(laint, laObj){
													var tempLgName="";
													$.each(laObj, function(laintkey, laObjV){
														if(typeof(n[laintkey])!="undefined" && n[laintkey] !=""){
														 tempLgName=n[laintkey]
														}else{tempLgName=n["en"];}

														languageName+='<span style="'+disp+'" class="'+laintkey+'">'+tempLgName+'</span>';
														disp="display:none";
														})
										})

										var hours="";
										var hoursSign="";
										if(typeof(n.hours)!="undefined" && n.hours!=null){
										var h=n.hours;hours=h.from+"~"+h.to;
										var hobj={};
										var hFrom="D"+h.from.replace(/:/g,'')+"00";
										var hTo="D"+h.to.replace(/:/g,'')+"00";
										
										
                                        hoursSign=hFrom+hTo;
										hobj.from=hFrom;
										hobj.to=hTo;
										hoursArr[hoursInt]=hobj;
										hoursInt++;
										}        


						/** 多语言********************************************
							            var languageName="";
										var languageOptionName="";
										var nameArray=Array();
										var firstName="";
										var firstEnglishName="";
										
	
		
						/*********************************/

						GroupHtml+='<li  style="border-bottom:solid #512E14 1px;height:2em" class="divider"  id="leftMenu'+topId+'">'+languageName+'<span class="fa fa-caret-square-o-up leftMenuExp" style="float:right"></span></li>';
						if($.isArray(n.category) && typeof(n.category) != "undefined"){
						categoryArr=n.category;
						}else if(typeof(n.category) != "undefined"){
						categoryArr[0]=n.category;
						}

						//console.log(GroupHtml);
/**C***第二层categoryArr 菜单类别**************************************************************/
					 
					  $.each(categoryArr,function(c,nn){
							  var saleItemsArr=Array();	
							  var gId=nn.id;
							  var languageName="";
									/***********多言begin***************/
										disp="display:";
										var languageName="";
										$.each(languageArray, function(laint, laObj){
													var tempLgName="";
													$.each(laObj, function(laintkey, laObjV){
														if(typeof(nn[laintkey])!="undefined" && nn[laintkey] !=""){
														 tempLgName=nn[laintkey]
														}else{tempLgName=nn["en"];}

														languageName+='<span style="'+disp+'" class="'+laintkey+'">'+tempLgName+'</span>';
														disp="display:none";
														})
										})
									/***********多言End***************/	
								if(typeof(nn.saleItems) != "undefined" ){
							  GroupHtml+='<li class="leftMenu'+topId+'" id="leftMenu'+gId+'" style="position：relative;"><a class="theme theme-none" href="javascript:MenuLink(\'contentMenu'+gId+'\')" data-ignore="true"><font color="#fff">'+languageName+'</font></a></li>';
							  MenuContent+='<li class="divider" style="background:#512e14;color:#f1d226;padding:0.5em" id="contentMenu'+gId+'" >'+languageName+'<span style="float:right;margin-top:-5px;padding:0px 5px 10px 30px;" class="centerMenuExp"><span class="fa fa-caret-square-o-down fa-lg" style="float:right;padding-top:6px;"></span></span></li>';
											}
							 // }else{
							  // hideCategory[hideInt]="leftMenu"+gId;
							  //  hideInt+=1;
							 // }
								if(typeof(nn.saleItems) != "undefined" && $.isArray(nn.saleItems)){
								saleItemsArr=nn.saleItems;
								}else if(typeof(nn.saleItems) != "undefined"){
								saleItemsArr[0]=nn.saleItems;
								}	
/**D***第三层categoryArr 菜名**************************************************************/									
                          	  $.each(saleItemsArr,function(cc,nnn){
						               var itemHas=1;//存在
									    var tempPr=0;
										var price=nnn.pr;
										
										var id=nnn.id;
										var taxRate=nnn.tR;
										var outTaxRate=nnn.oR;
										if(price==0 && typeof(nnn.tempPr)!="undefined"){
										tempPr=nnn.tempPr;
										}else{
										tempPr=price;
										}
										/***********多言begin***************/
										disp="display:";
										var languageName="";
										$.each(languageArray, function(laint, laObj){
													var tempLgName="";
													$.each(laObj, function(laintkey, laObjV){
														if(typeof(nnn[laintkey])!="undefined" && nnn[laintkey].replace(/(^\s*)|(\s*$)/g, "") !=""){
														 tempLgName=nnn[laintkey]
														}else{tempLgName=nnn["en"];}

														languageName+='<span style="'+disp+'" class="'+laintkey+'">'+tempLgName+'</span>';
														disp="display:none";
														})
										})
									/***********多言End***************/	
										
										
								

							             var spicy="display:none;"; if(typeof(nnn.spicy)!="undefined"){spicy="display:;"};
										var special=""; if(typeof(nnn.recommended)!="undefined"){special="special"};
										var thumbPath=nnn.tP;
										var thumbPathSmall="";
										
									    if(typeof(nnn.tP) != "undefined" && nnn.tP !=null){
										var photoArray=thumbPath.split("/");
										var pName=photoArray[photoArray.length-1];
										pName=pName.replace(/%/g,"");
										thumbPath="/autoInfo/"+mkey+"/phone/"+pName;
									    thumbPathSmall="/autoInfo/"+mkey+"/small/"+pName;
										}else{
										thumbPath="/"+folder+"/img/logo-big.png";
										thumbPathSmall="/"+folder+"/img/logo-60x60.png";
										}
										var defaultPhoto="/"+folder+"/img/logo-60x60.png";
										
										

		/***********中间部分**************/
		                           
										
										 
        
									//	}


         if(tempPr>0){     

		
		var tempShowSigleHtml="";
		tempShowSigleHtml+='<div class="bigClass" id="big'+id+'"  style="background: url(\''+thumbPath+'\');background-repeat: no-repeat;background-position: center;background-size:cover;width:100%;height:100%" >';
		tempShowSigleHtml+='<div style="position:relative;width:100%;height:100%;color:#fff;font-wight:900">';
		tempShowSigleHtml+='<a class="share" shareid="'+id+'"  style="font-weight:900;border-radius: 4px;-webkit-border-radius: 4px;-moz-border-radius: 4px;position:absolute;top:10px;right:15px;padding:8px 12px 8px 12px;background-color:rgba(0,0,205,0.8);color:#fff">Share</a>';
		tempShowSigleHtml+='<div style="position:absolute;bottom:0px;width:100%;height:80px;border-top:solid #0c0c0c 1px;">';
		tempShowSigleHtml+='<div    imgUrl="'+thumbPath+'" id="bigName'+id+'" style="border-radius: 6px;-webkit-border-radius: 6px;-moz-border-radius: 6px;position:absolute;bottom:45px;left:10px;color:red;background-color:rgba(0,0,0,0.8);color:#fff;padding:5px;">'+languageName+'</div>';
		tempShowSigleHtml+='<div id="bigPrice'+id+'" style="border-radius: 6px;-webkit-border-radius: 6px;-moz-border-radius: 6px;position:absolute;bottom:10px;left:10px;color:red;background-color:rgba(0,0,0,0.8);color:#fff;padding:5px;">$'+tempPr+'</div>';
		tempShowSigleHtml+='<div proid="'+id+'" style="position:absolute;bottom:35px;right:10px;color:red;padding:5px 5px 5px 5px;" class="bigPlus fa fa-plus-square fa-2x"></div>';
		tempShowSigleHtml+='<div  proid="'+id+'" class="bigMinus fa fa-minus-square fa-2x" style="position:absolute;bottom:0px;right:10px;color:red;padding:5px 5px 5px 5px;"></div>';
		tempShowSigleHtml+='<div class="'+hoursSign+'" style="position:absolute;bottom:5px;right:10px;color:#fff;background-color:#0c0c0c;height:63px;line-height:63px;padding:0 4px;border-radius:4px;-webkit-border-radius:4px;-moz-border-radius:4px;">'+hours+'</div>';
		//showSigleHtml+='<div  class="'+hoursSign+'" style="position:absolute;bottom:0px;right:10px;color:red;padding:5px 5px 5px 5px;background-color:#0c0c0c;"></div>';

		tempShowSigleHtml+='<img  src="./home/restaurant/photo/spicy.png" style="'+spicy+'position:absolute;width:16px;height:28px;bottom:80px;right:15px;" />';
		tempShowSigleHtml+='</div></div></div>';
		// $saleItemsArray[$saleItemsInt]["tempPr"]
		if(special =="special"){
		showSpHtml+=tempShowSigleHtml;
		menuSpContent+='<li class="contentMenuSp"  id="pro'+id+'" style="position:relative;margin-top:3px;padding:0px;height:80px;background:#fff">';
        menuSpContent+='<img  class="bigClass" imgId="'+id+'"  id="img'+id+'"  style="position:absolute;width:70px;height:70px;" src="'+thumbPathSmall+'"  onerror="this.src=\''+defaultPhoto+'\';this.onerror=null;"  /> ';
		menuSpContent+='<img  src="./home/restaurant/photo/spicy.png" style="'+spicy+'position:absolute;width:16px;height:28px;bottom:0;left:65px;" />';
        menuSpContent+='<div  style="display:inline-block;margin-left:85px;">';
        menuSpContent+='<a  data-transition="none" style="color:black;position:absolute;top:1em;font-weight:600" id="mutiLaguage'+id+'" >'+languageName+'</a><div id="proContent'+id+'" style="color:red;position:absolute;bottom:1em;">$'+tempPr+'</div>';
        menuSpContent+='<a  class="addToCart" ordertime="'+hoursSign+'"  gpId="sp'+gId+'" proId="'+id+'" proName="'+name+'" proPrice="'+price+'" proTaxRate="'+taxRate+'"  proOutTaxRate="'+outTaxRate+'"   proThumbPath="'+thumbPath+'" style="position:absolute;right:0;top:15px;right:1em;margin-top:-1em;padding:35px;"><span class="orderButton" style="position:absolute;right:0;top:50%;right:1em;margin-top:-1em;">Order</span></a>';
		menuSpContent+='<a class="'+hoursSign+'" style="display:none;position:absolute;right:0;top:15px;right:1em;margin-top:-1em;padding:35px;z-index:1000"><span class="'+hoursSign+'" style="display:none;border-radius:3px;-webkit-border-radius:3px;-moz-border-radius:3px;position:absolute;right:-2px;top:50%;right:1em;margin-top:-1.1em;z-index:1000;padding:8px 5px;background-color:#0c0c0c;color:#fff">'+hours+'</span></a>';								
	
		}else{
		showSigleHtml+=tempShowSigleHtml;
		MenuContent+='<li class="contentMenu'+gId+'"  id="pro'+id+'" style="display:none;position:relative;margin-top:3px;padding:0px;height:80px;background:#fff">';
        MenuContent+='<img  class="bigClass" imgId="'+id+'"  id="img'+id+'"  style="position:absolute;width:70px;height:70px;" src="'+thumbPathSmall+'"  onerror="this.src=\''+defaultPhoto+'\';this.onerror=null;"  /> ';
		MenuContent+='<img  src="./home/restaurant/photo/spicy.png" style="'+spicy+'position:absolute;width:16px;height:28px;bottom:0;left:65px;" />';
        MenuContent+='<div  style="display:inline-block;margin-left:85px;">';
        MenuContent+='<a  data-transition="none" style="color:black;position:absolute;top:1em;font-weight:600" id="mutiLaguage'+id+'" >'+languageName+'</a><div id="proContent'+id+'" style="color:red;position:absolute;bottom:1em;">$'+tempPr+'</div>';
        MenuContent+='<a  class="addToCart" ordertime="'+hoursSign+'"  gpId="'+gId+'" proId="'+id+'" proName="'+name+'" proPrice="'+price+'" proTaxRate="'+taxRate+'"  proOutTaxRate="'+outTaxRate+'"   proThumbPath="'+thumbPath+'" style="position:absolute;right:0;top:15px;right:1em;margin-top:-1em;padding:35px;"><span class="orderButton" style="position:absolute;right:0;top:50%;right:1em;margin-top:-1em;">Order</span></a>';
		MenuContent+='<a class="'+hoursSign+'" style="display:none;position:absolute;right:0;top:15px;right:1em;margin-top:-1em;padding:35px;z-index:1000;"><span class="'+hoursSign+'" style="display:none;border-radius:3px;-webkit-border-radius:3px;-moz-border-radius:3px;position:absolute;right:-2px;top:50%;right:1em;margin-top:-1.1em;z-index:1000;padding:8px 5px;background-color:#0c0c0c;color:#fff">'+hours+'</span></a>';								
		}
	   var menuOptionsHtml="";											
//=========================================================================ItemPrice=============================================================//
	
	   if(typeof(nnn.itemPrice) != "undefined"){
		var itemPriceArr=Array();
       if($.isArray(nnn.itemPrice)){
			itemPriceArr=nnn.itemPrice;
		}else{
		itemPriceArr[0]=nnn.itemPrice;
		}
			 menuOptionsHtml+='<li style="margin-top:8px;border:0;width:100%;border;solid red 1px" class="divider"  name="Size" style="border:0;width:auto">Size</li>';
		
		var sizeClass="frClass";
        $.each(itemPriceArr,function(m,nnnn){
			 var opId=nnnn.id; opName=nnnn.size; opPrice=nnnn.price;
menuOptionsHtml+='<li style="height:28px;text-align:center;vertical-align:middle;margin:1px;padding:1px;">&nbsp;<label  style="line-height:28px;height:28px;font-size:0.8em;border-radius: 5px;border: 1px solid #ccc;box-shadow: 0 1px 5px 0 #ccc;padding:1px;text-align:left;position:absolute;left:0;width:100%;"><input  opType="size" disable style="display:inline" class="'+sizeClass+'" name="radio'+id+'"  onclick="optionRadio(this)"  type="radio" 	opId="'+opId+'" opName="'+opName+'"  opPrice="'+opPrice+'" value="'+opPrice+'" />&nbsp;'+opName+'<span style="float:right">$'+opPrice+'&nbsp;</span></label></li>';
 sizeClass="";
      })
	   
	   }

//=========================================================================optoins=============================================================//
if(typeof(nnn.options) != "undefined"){
 menuOptionsHtml+=' <li style="margin-top:8px;border:0;width:100%;" class="divider" >Options</li>';
																	var sizeCount=0;
																	var sizeClass="frClass";
																	var optionsArr=Array();
																	if($.isArray(nnn.options)){
																	optionsArr=nnn.options;
																	}else{
																	optionsArr[0]=nnn.options;
																  }	


$.each(optionsArr,function(k,nnnn){
if(sizeCount>0){sizeClass="";}sizeCount++;
 var opId=nnnn.id;  opPrice=nnnn.price;
 opName="";
	/***********多言begin***************/
											disp="display:";
										var languageName="";
										$.each(languageArray, function(laint, laObj){
													var tempLgName="";
													$.each(laObj, function(laintkey, laObjV){
														if(typeof(nnnn[laintkey])!="undefined" && nnn[laintkey].replace(/(^\s*)|(\s*$)/g, "") !=""){
														 tempLgName=nnnn[laintkey]
														}else{tempLgName=nnnn["en"];}

														languageName+='<span style="'+disp+'" class="'+laintkey+'">'+tempLgName+'</span>';
														disp="display:none";
														})
										})

//console.log(languageName);
 menuOptionsHtml+='<li style="width:100%;height:28px;text-align:center;vertical-align:middle;margin:1px;padding:1px;">&nbsp;<label  style="line-height:28px;height:28px;font-size:0.8em;border-radius: 5px;border: 1px solid #ccc;box-shadow: 0 1px 5px 0 #ccc;padding:1px;text-align:left;position:absolute;left:0;width:100%;"><input opType="op" style="display:inline" class="'+sizeClass+'"  name="radio'+id+'"  onclick="optionRadio(this)"  type="radio" 	opId="'+opId+'" opName="'+opName+'"  opPrice="'+opPrice+'" value="'+opPrice+'" />&nbsp;<span>'+languageName+'</span><span style="float:right">$'+opPrice+'&nbsp;</span></label></li>';
})
}
//=========================================================================attribute=============================================================//
if(typeof(nnn.attributes) != "undefined"){
	var attributesArr=Array();
												attributesArr=nnn.attributes;
												if($.isArray(nnn.attributes)){
												attributesArr=nnn.attributes;
												}else{
												attributesArr[0]=nnn.attributes;

											 }	


$.each(attributesArr,function(n,nnnn){
	if(typeof(nnnn.minNumberOfSelectionAllowed)!="undefined"){
																					var min=0;
																					var max="more";
																					if(nnnn.minNumberOfSelectionAllowed !="" ){
																						max=nnnn.maxNumberOfSelectionAllowed;
																					}
																				    var sign="";
																					var opGrId=nnnn.id;
																					var opGrName=nnnn.name;
																					if(nnnn.minNumberOfSelectionAllowed !=""){
																					min=nnnn.minNumberOfSelectionAllowed
																						sign="min";
																					}

 menuOptionsHtml+=' <li  style="width:100%;margin-top:8px;border:0;" class="divider checkmax check'+sign+'"   min="'+min+'" liId="'+opGrId+'" name="'+nnnn.name+'" style="border:0" >'+nnnn.name+'['+min+'~'+max+']</li>';

	
	
												$.each(nnnn.options,function(m,nnnnn){
														if(typeof(nnnnn) != "undefined"){
														var opId=nnnnn.id;
			 var opPrice=0;
			 var opName=nnnnn.name;
			// var languageName="";
			 /***********多言begin***************/
									
										disp="display:";
										var languageName="";
										$.each(languageArray, function(laint, laObj){
													var tempLgName="";
													$.each(laObj, function(laintkey, laObjV){
														if(typeof(nnnnn[laintkey])!="undefined" && nnnnn[laintkey] !=""){
														 tempLgName=nnnnn[laintkey]
														}else{tempLgName=nnnnn["en"];}

														languageName+='<span style="'+disp+'" class="'+laintkey+'">'+tempLgName+'</span>';
														disp="display:none";
														})
										})
									/***********多言End***************/

	if(typeof(nnnnn.price)!="undefined"){opPrice=nnnnn.price;	}
				menuOptionsHtml+='<li style="height:28px;text-align:center;vertical-align:middle;margin-top:2px;padding:1px;">&nbsp;<label  style="line-height:28px;height:28px;font-size:0.8em;border-radius: 5px;border: 1px solid #ccc;box-shadow: 0 1px 5px 0 #ccc;padding:1px;text-align:left;position:absolute;left:0;width:100%;"><input opType="attr" style="display:inline" opgrname="'+opGrName+'" opgrid="'+opGrId+'" name="check'+opGrId+'"  onclick="optionCheck(this)"  value="'+opPrice+'" type="checkbox"  min="'+min+'" max="'+max+'"	opId="'+opId+'" opName="'+opName+'"  opPrice="'+opPrice+'" /><span>'+languageName+'</span><span style="float:right;">$'+formatFloat(opPrice,2)+'&nbsp;</span></label></li>';																		
		}
										           
	})
																	           
}
})


}
//=========================================================================combo=============================================================//
if(typeof(nnn.comboItem) != "undefined"){
	var comboArr=Array();
												comboArr=nnn.comboItem;
												if($.isArray(nnn.comboItem)){
												comboArr=nnn.comboItem;
												}else{
												comboArr[0]=nnn.comboItem;
											 }	

 $.each(comboArr,function(m,nnnn){
				
				//dump(nnnn);
				var seleItemArr=Array();
				if($.isArray(nnnn.saleItems)){
				seleItemArr=nnnn.saleItems;
				}else{
				seleItemArr[0]=nnnn.saleItems;
				}
                   var min=0;
				   var opGrId=nnnn.id;
				   var opGrName=nnnn.name;	
					var max=nnnn.numOfSelectionsAllowed;
					var sign="min";
				menuOptionsHtml+=' <li style="margin-top:8px;border:0;" class="divider checkmax check'+sign+'"   min="'+min+'" liid="'+opGrId+'" name="'+nnnn.name+'" style="border:0" >'+nnnn.name+'['+min+'~'+max+']</li>';
				$.each(seleItemArr,function(mm,nnnnn){
			if(typeof(nnnnn) != "undefined"){
			 var opId=nnnnn.id;
			 var opPrice=0;
			 var opName=nnnnn.name;
if(typeof(nnnnn.price)!="undefined"){opPrice=nnnnn.price;	}
    menuOptionsHtml+='<li style="height:28px;text-align:center;vertical-align:middle;margin:1px;padding:1px;">&nbsp;<label  style="line-height:28px;height:28px;font-size:0.8em;border-radius: 5px;border: 1px solid #ccc;box-shadow: 0 1px 5px 0 #ccc;padding:1px;text-align:left;position:absolute;left:0;width:100%;"><input optype="comb" style="display:inline" opgrname="'+opGrName+'"  opgrid="'+opGrId+'" name="check'+opGrId+'"  onclick="optionCheck(this)"  type="checkbox"  min="'+min+'" max="'+max+'"	opId="'+opId+'" opName="'+opName+'"  opPrice="'+opPrice+'" value="'+opPrice+'" />'+opName+'<span style="float:right">$'+formatFloat(opPrice,2)+'</span>&nbsp;</label></li>';
				 }
					})
 })

}

//=================================================================AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==========================

if(menuOptionsHtml!=""){
//console.log(menuOptionsHtml);

 OptionsHtml+='<div  id="panel'+id+'" class="panel" data-header="topHead" data-unload="unloadedPanel"  data-load="loadedPanel" style="padding:0;margin:0" ><div id="div'+id+'">';
								OptionsHtml+='<div style="border-bottom:solid #e6e6e6 1px;height:60px;line-height:30px;margin-bottom:2px;background-color:#e6e6e6;color:#48321e;font-weight:900;"><div style="float:left;padding:0px;text-indent:5px">'+languageName+'</div>';
								OptionsHtml+='<div style="float:right;padding:0px;font-weight:900;padding-right:8px;text-align:right;	">$'+price+'<div  id="submitPrice"></div></div></div>';
								OptionsHtml+='<div style="height:40px;line-height:40px;margin:0;padding:0;border-bottom:solid #e6e6e6 1px;font-weight:600"><div style="float:left">&nbsp;Quantity</div><div style="float:right">';
								OptionsHtml+='<div  style="float:right;line-height:35px;"><span class="fa fa-minus-square fa-lg" style="padding:15px 10px 15px 15px;color:red;" onclick="addQty(\'-\')"></span><input readonly style="text-align:center;border:0px;font-size:20px;padding:0 3px 0 3px;width:35px" class="proOptQty" value="1"></input><span class="fa fa-plus-square fa-lg" style="color:red;padding:15px 15px 15px 10px" onclick="addQty(\'+\')"></span>&nbsp;</div>';
								OptionsHtml+='<pre></div></div>';
                                OptionsHtml+='<ul id="ulist" class="list inset" style="width:100%;margin:0;padding:2px 5px 2px 5px;">';
								OptionsHtml+=menuOptionsHtml;
								OptionsHtml+='<li style="text-align:center;margin:0;padding:0;height:150px;line-height:100px;"><div style="margin-top:15px;background-color:#e6e6e6;width:100%;"><a id="submit" class="submitCart button"  style="width:90%;margin-top:25px;height:50px;line-height:40px;background:#FCD209">ADD TO CART</a></div></li></ul></div></div>';
menuOptionsHtml="";

}

}


		
							 })

								
		})
			
	})
  	
     
  $("#default_sidemenu .list").append(GroupHtml); 
  $("#main #ulist").append(menuSpContent); 
  $("#content").append(OptionsHtml);
  $("#mainHide #mainGigPhoto").append(showSpHtml+showSigleHtml);
  setTimeout(function(){workerInit();}, 50);
	$.ui.hideMask();
//分段加载=================================================================
 setTimeout(function(){ $("#main #ulist").append(MenuContent);
 /***********加事件中间******/
	//$("#ulist .divider").on("touchstart",function(){
	
	
	//})
	
	$("#ulist .divider").bind("singleTap",function(){
		  //var pId=$(this).parent();
		  var vClass=$(this).attr("id");
		  
		  $("#ulist ."+vClass).toggle();

			 var a= $(this).find(".fa-lg");
		
		    if(a.hasClass("fa fa-caret-square-o-down fa-lg")){
			a.removeClass("fa fa-caret-square-o-down fa-lg");
			a.addClass("fa fa-caret-square-o-up fa-lg");
		  }else{
			a.removeClass("fa fa-caret-square-o-up fa-lg");
			a.addClass("fa fa-caret-square-o-down fa-lg");
		  }


	})
 
$("#main .addToCart").on("touchstart",function(event){
	$.ui.showMask("load...");
    addCart(this,0,event);
  
})	
//大图
$("#main .bigClass").on("touchstart",function(){
  $.ui.showMask("load...");
  setTimeout(function(){history.pushState("order", "order", "./order");   }, 0 );
  
 var bigPhotoHtml="";
showSigleHtmlArr=Array();
var allDiv=$("#mainHide #mainGigPhoto .bigClass");
var len=allDiv.length;
var moveI="big"+$(this).attr("imgid");
for(var i=0;i<len;i++){

 if($(allDiv[i]).attr("id")==moveI){
	moveI=i;
	
	}
  if(typeof($(allDiv[i]).prop("outerHTML"))!="undefined"){
   showSigleHtmlArr[i]=$(allDiv[i]).prop("outerHTML");
  }
}


    var orderMax=len;
	$("#showPhoto").data("orderMax",orderMax);
  
	order=moveI;
    var orderBegin=order-20;
    var orderEnd=order+20;
	if(orderBegin<0){orderBegin=Math.abs(orderBegin);orderBegin=orderBegin%orderMax;orderBegin=orderMax-orderBegin;}else{orderBegin=orderBegin%orderMax;}
    if(orderEnd<0){orderEnd=Math.abs(orderEnd);orderEnd=orderEnd%orderMax;orderEnd=orderMax-orderEnd;}else{orderEnd=orderEnd%orderMax;}
    $("#showPhoto").data("orderEnd",orderEnd);
	$("#showPhoto").data("orderBegin",orderBegin);
	
	if(orderBegin>orderEnd){
		for(var i=orderBegin;i<orderMax;i++){
		bigPhotoHtml+=showSigleHtmlArr[i];}

		for(var i=0;i<=orderEnd;i++){
		bigPhotoHtml+=showSigleHtmlArr[i];}

	}
   for(var i=orderBegin;i<=orderEnd;i++){
	   if(typeof(showSigleHtmlArr[i])!="undefined"){
			bigPhotoHtml+=showSigleHtmlArr[i];
	   }
	}
   	var  shwoHeight=window.innerHeight-45; 
   	
	$("#showPhoto").empty();
    $("#showPhoto").append('<div id="carousel" class="carousel" style="top:0;height:'+shwoHeight+'px">'+bigPhotoHtml+'</div>');
	
    $("#showPhoto").get(0).addEventListener("touchstart", bigPhotoStart, false);
   
	  $("#showPhoto .share").on("touchstart",postToFaceBook);
	   
 //  optionPanel();
   init_carousel();
   bigPhtoEvent();
   
  
  $.ui.loadContent("#showPhoto" ,false,false,'down');
   carousel.onMoveIndex(20,-1);
   //做一次吧
storageCart();
 $.ui.hideMask();
});
//大图
$(".submitCart").bind("tap",submitCart);
 storageCart();//清
 }, 50);

//分段加载======================================================================




/***********加事件左边******/
//GroupHtml+='<li  style="border-bottom:solid #512E14 1px;height:2em" class="divider"  id="leftMenu'+topId+'">'+languageName+'<span class="fa fa-caret-square-o-up" style="float:right"></span></li>';

	$("#menu ul .divider ").on("touchstart",function(){
	    
		  var vClass=$(this).attr("id");
		  $("#menu ul ."+vClass).toggle();
		    var a= $(this).children(".leftMenuExp");
		
		    if(a.hasClass("fa fa-caret-square-o-down")){
			a.removeClass("fa fa-caret-square-o-down");
			a.addClass("fa fa-caret-square-o-up");
		  }else{
			a.removeClass("fa fa-caret-square-o-up");
			a.addClass("fa fa-caret-square-o-down");
		  }
		
	})
	





   })

  



 		
}
/*********************LOADHTML* End**********************************************************************/



 function showBigPhoto(o){

   }

function chi(){
if($("#enLanguage").text()=="ENGLISH"){

 $(".en").css("display","");
 $(".zh-cn").css("display","none");
}else{

 $(".en").css("display","none");
$(".zh-cn").css("display","");
}
}

var  carousel
function init_carousel() {
			        carousel=$("#carousel").carousel({
					pagingDiv: "carousel_dots",
					pagingCssName: "carousel_paging2",
					pagingCssNameSelected: "carousel_paging2_selected",
					preventDefaults:false,
					wrap:false
					
					//Set to false to disable the wrap around
	});
}

var  spCarousel
function init_spCarousel() {
			        spCarousel=$("#carousel").carousel({
					pagingDiv: "carousel_dots",
					pagingCssName: "carousel_paging2",
					pagingCssNameSelected: "carousel_paging2_selected",
					preventDefaults:false,
					wrap:true //Set to false to disable the wrap around
	});
}

function bigPhtoEvent(){
	//大图加菜
$("#showPhoto .bigPlus").on("touchstart",function(event){
 addCart("#pro"+$(this).attr("proid")+" .addToCart",9,event); 
//var restaurantJson=JSON.parse(sessionStorage.getItem("restaurantInfo"));
  //   var key=restaurantJson.key;
//bigPhoto(key);
})	
//大图减菜
$("#showPhoto .bigMinus").on("touchstart",function(event){
     var mkey=sessionStorage.getItem("key");
	if( sessionStorage.getItem("tableId")==""){
			mkey=mkey+"g";
			}
      var val=$(this).attr("proid"); 
	  var key=mkey+"_"+val;
	//  console.log("XXXXXXXXX==>"+val);
	//  console.log("XXXXXXXXX==>"+$("#pro"+val).text());

	 if(localStorage.getItem(key)!=null){	
	 var dataStr = localStorage.getItem(key);
	 var dataJson = eval('(' + dataStr + ')');
     dataJson.proQty=parseInt(dataJson.proQty)-1;
     localStorage.setItem(key,JSON.stringify(dataJson));
	 storageCart();
	  }	

})	
}
//大图动态添加
function bigPhotoStart(){
   // $.ui.disableRightSideMenu();
	//$.ui.disableSideMenu();
	
	 if(carousel.carouselIndex==40 || carousel.carouselIndex==0 ){
		 
		var bigP=20;
		if(carousel.carouselIndex==0){bigP=-20;}
		var bigMax=40;
		var bigPhotoHtml="";

        var orderBegin=parseInt($("#showPhoto").data("orderBegin"))+bigP;

		var orderEnd=parseInt($("#showPhoto").data("orderEnd"))+bigP;
        var orderMax=parseInt($("#showPhoto").data("orderMax"));	
	
    $("#showPhoto").data("orderEnd",orderEnd);
	$("#showPhoto").data("orderBegin",orderBegin);
	$("#showPhoto").data("orderMax",orderMax);
if(orderBegin<0){orderBegin=Math.abs(orderBegin);orderBegin=orderBegin%orderMax;orderBegin=orderMax-orderBegin;}else{orderBegin=orderBegin%orderMax;}
    if(orderEnd<0){orderEnd=Math.abs(orderEnd);orderEnd=orderEnd%orderMax;orderEnd=orderMax-orderEnd;}else{orderEnd=orderEnd%orderMax;}
if(orderBegin>orderEnd){
		for(var i=orderBegin;i<orderMax;i++){
		
		if(typeof(showSigleHtmlArr[i])!="undefined"){
			bigPhotoHtml+=showSigleHtmlArr[i];
	   }
		}
		for(var i=0;i<=orderEnd;i++){
			if(typeof(showSigleHtmlArr[i])!="undefined"){
			bigPhotoHtml+=showSigleHtmlArr[i];
	   }}

	}

   for(var i=orderBegin;i<=orderEnd;i++){
			if(typeof(showSigleHtmlArr[i])!="undefined"){
			bigPhotoHtml+=showSigleHtmlArr[i];
	   }
	
	}

	$("#showPhoto").empty();
   $("#showPhoto").append('<div id="carousel" class="carousel">'+bigPhotoHtml+'</div>');

    $("#showPhoto").get(0).addEventListener("touchstart", bigPhotoStart, false);
  // $("#showPhoto").get(0).addEventListener("touchend", bigPhotoEnd, false);
     $("#showPhoto .share").on("touchstart",postToFaceBook);
   init_carousel();
//chi();//中英
    bigPhtoEvent();//添加删除
 //   optionPanel();//是否有减号
	/*.each(opArray,function(c,nn){
	    var key= "#"+nn.key.replace("proContent","bigPrice");
		if($(key).length>0){
		$(key).html(nn.name);
		}

   })*/
     carousel.onMoveIndex(21,-1);

    
   
   }
}


function optionPanel(){
optionPanelStr=","+optionPanelArr.toString();
//console.log("==>"+optionPanelStr);
$.each($("#showPhoto .bigMinus"),function(i,n){
		 var k=","+$(n).attr("proid");
		 if(optionPanelStr.indexOf(k)>=0){
		  $(n).remove();
		 }
	 })

}
function allInput(){
	 var n= $(".proOptQty").val();	
  
	 var price=parseFloat($("#main .proPrice").val());
	    //看元素是否存在
		
		if($("#panel"+$("#main .proId").val()+" input:checked").length>0){
			
			var obj=$("#panel"+$("#main .proId").val()+" input:checked");
			
		$.each(obj,function(i,n){
	    price+= parseFloat($(n).val());
		})
		} 
		$("#panel"+$("#main .proId").val()+" #submitPrice").text("subTotal:$"+formatFloat(price*n,2));

}

function optionRadio(o){
  var name=$(o).attr("name");
   $.each($('input[name="'+name+'"]'),function(i,n){
	    $(n).parent().css("background", "white");
		$(n).parent().css("color", "black");
  })
	    $(o).parent().css("background", "#512E14");
		$(o).parent().css("color", "#FFBB05");
        $(o).prop("checked","checked");	
	    allInput();
   	


}
function optionCheck(o){

	 if($(o).is(":checked")==true){
	 $(o).parent().css("background", "#512E14");
	 $(o).parent().css("color", "#FFBB05");
     //$(o).parent().addClass("icon check big");
	 }else{
	 $(o).parent().css("background", "white");
	 $(o).parent().css("color", "black");
	 //$(o).parent().removeClass("icon check big");
	 }

var cl=$(o).attr("name");
var max=$(o).attr("max");
if(max=="more"){max=100};

if($("input[name='"+cl+"']:checked").length==max){
		  $.each($("input[name='"+cl+"']"),function(i,n){
					
					if(n.checked==false){
					$(n).attr('disabled','disabled');
					 $(n).parent().css("background", "#ccc");
					}
		})
		  
}else{
	$.each($("input[name='"+cl+"']"),function(i,n){
	   if($(n).attr('disabled')=='disabled'){
	      $(n).removeAttr("disabled");
		  $(n).parent().css("background", "white");	
	   }
	})
}

		allInput();

		
}


function storageCart(){
	
var mkey=sessionStorage.getItem("key");
			if( sessionStorage.getItem("tableId")==""){
			mkey=mkey+"g";
			}
var gpArray=Array();var gpJson=new Object();
var proArray=Array();var proJson=new Object();
var allPrice=0;
var allQty=0;
var moveJson=new Object();

for(var i=0;i<localStorage.length;  i++){
	
	var key=localStorage.key(i);
	if(key.indexOf(mkey+"_")==0){
	  var dataJson=JSON.parse(localStorage.getItem(key));
	
	  var proQty=parseInt(dataJson.proQty);
	  var gpId=dataJson.gpId;
      var proId=dataJson.proId;
	  var proPrice=parseFloat(dataJson.proPrice);
		
		  
			if(typeof(dataJson.options) != "undefined" && typeof(dataJson.options.price) !="undefined"){
				proPrice+=parseFloat(dataJson.options.price);
			}
			
		    $.each(dataJson.attributes,function(i,n){
				//$.each(n.options,function(j,nn){
						proPrice+=parseFloat(n.price);
					//})


		   })
		   
		     //组
			 var tempGpId=gpId;
			if(isNaN(gpId)==true){
				tempGpId="Sp";
			}
			
		   if(typeof(gpJson[tempGpId]) == "undefined"){
			gpJson[tempGpId]=proQty;
			}else{
			gpJson[tempGpId]=parseInt(gpJson[tempGpId])+proQty;
			}
			//产品
			if(typeof(proJson[proId]) == "undefined"){
			proJson[proId]=proQty;
			}else{
			proJson[proId]=parseInt(proJson[proId])+proQty;
			}

			if(proQty<1){
			 moveJson[key]=key;
	        }
		
		   allPrice+=formatFloat(proPrice*proQty,2);
			allPrice=formatFloat(allPrice,2);
		   allQty+=proQty;
//

	}
}

 $.each(gpJson,function(key,val){

     
	 if(val>=1){
	 $.ui.updateBadge("#leftMenu"+key, val, "tl");//tl,tr,bl,blue
	 $.ui.updateBadge("#contentMenu"+key, val,"bl30");//tl,tr,bl,blue
	 
	 
	 }else{
	  $.ui.removeBadge("#leftMenu"+key);
	   $.ui.removeBadge("#contentMenu"+key);	
	 }
 })

 $.each(proJson,function(key,val){
	 if(val>=1){
	 $.ui.updateBadge("#pro"+key, val, "tl");
	 if(typeof("#big"+key) != "undefined"){
	 $.ui.updateBadge("#big"+key,val, "tl");
	 }
	 }else{
	  $.ui.removeBadge("#pro"+key);
	   $.ui.removeBadge("#big"+key);
	  
	 }
 })
$.each(moveJson, function(key, val) { 
localStorage.removeItem(key);
}); 
	
localStorage.setItem(mkey+"$"," $"+toDecimal(allPrice,2)+"<span color='red'>｜</span>"+allQty);
$("#topCart font").html(" $"+toDecimal(allPrice,2)+"<span style='font-size:1.2em'>｜</span>"+allQty);
	
}
 function addQty(n){
	 var count=parseInt($(".proOptQty").val());
		 
		 if(n=="+" && count<100){
			  
			     count+=1; 
			
		 }else if(n=="-" && count>1){
			
			  count-=1; 
		 }
		// alert(count);
		 $(".proOptQty").val(count);
		 if(count==1){
		 //$(".spinner .decrease").css("background-position","0 -150px");
		 }else{
		// $(".spinner .decrease").css("background-position","0 -100px");
		 }
		
		  allInput();
		 }

/*****************************************************************************/
function showList(o,t){
		$("#"+o).toggle();
  
		  var a= $(t).children().eq(0).find("span");
		 

		// $(o).children("div").eq(1).find("span").
  
          if(a.hasClass("fa fa-angle-double-down fa-2x")){
			a.removeClass("fa fa-angle-double-down fa-2x");
			a.addClass("fa fa-angle-double-up fa-2x");
		  }else{
			a.removeClass("fa fa-angle-double-up fa-2x");
			a.addClass("fa fa-angle-double-down fa-2x");
		  }
		 
		


}
/***********************************************************************/

/********************************************************************************************************/
function loadOrderList(){
	
			$("#topHead h1").text("My Order");
			 $("#orderList #ulist").empty();
			 var arr=Array();
/**********************storageBegin*********************************************/
		  var j=0;
		  var curPrice=0;
		  var mkey=sessionStorage.getItem("key");
		 for(var i=0;i<localStorage.length;i++){
			  var key=localStorage.key(i);
			   if(key.indexOf(mkey+"#")==0){ 
				//"|a|b|c".split("|")	//将返回["", "a", "b", "c"]
				arr[j]=key.split("#")[1]; 
				j++;
				 }
		 }
		// arr.sort();
	//	alert("OK");
		 arr.sort(sortArr).reverse();
		 //alert(arr.toString());
		 for(var i=0;i<arr.length;i++){
					
			                var key=mkey+'#'+arr[i];
		                    var orderContent="";
							
						    var orderHead="";
							var allPrice=0;
							var allQty=0;
							var allTax=0;
							var firstDisplay="display:";
							var fiestDownUp="fa fa-angle-double-up fa-2x";
							if(i>=1){
								firstDisplay="display:none";
								fiestDownUp="fa fa-angle-double-down fa-2x";
							}
/**********************storageBegin two*********************************************/
						
								 
						        var dataArray=localStorage.getItem(key);
						       // console.log("SSSSSSSSSSSSSSSSSS");
						        //console.log(dataArray);
								dataArray=eval("("+dataArray+")");
						
						//console.log("SSSSSSSSSSSSSSSSSS");
							    dateKey = new Date(dataArray.create).Format("MM-dd-yyyy hh:mm:ss");
							

	orderHead+='<li onclick="showList(\''+key+'\',this)" class="divider" style="border-top:solid black 1px;background:#fff;padding:0;margin:0;">';
	orderHead+='<div style="line-height:25px;margin:0;padding:0;width:100%">&nbsp;Order NO.'+dataArray.orderNumber+' | '+dataArray.tableSign+'<span style="float:right;color:#FBBB3B" class="'+fiestDownUp+'" style="padding:10px;">&nbsp;&nbsp;</span></div>';			
	  
	  orderHead+='<li id="'+key+'" style="'+firstDisplay+';padding:5px 10px;background:#DFE0E2">';
	  
			var opName="";
			
			$.each(dataArray.order, function(j, n){
			opName="";

			var proId=n.proId;
			var proName=n.proName;
			var proPrice=parseFloat(n.proPrice);
			var proQty=parseInt(n.proQty);
			var proTaxRate=parseFloat(n.proTaxRate);

		 

			  if(typeof(n.options) != "undefined" && typeof(n.options.price) !="undefined"){
				 var addprice=parseFloat(n.options.price);
				 proPrice+=addprice;
				 var addPriceStr="";
				 if(addprice>0){
					 addPriceStr="["+formatFloat(addprice,2)+"]";
				 }
				 opName+=n.options.name+addPriceStr+"&nbsp;|&nbsp;";
			  }
			
		    $.each(n.attributes,function(i,nn){
				//$.each(nn.options,function(j,nnn){
						var addprice=parseFloat(nn.price);
						proPrice+=addprice;
						var addPriceStr="";
						if(addprice>0){
							addPriceStr="["+formatFloat(addprice,2)+"]";
						}
						opName+='<span style="color:#DE5D24">'+nn.name+addPriceStr+'</span><br/>';
					//})


		    })
			
			
			  if(typeof(n.comboOrderDetails) != "undefined"){
					
					$.each(n.comboOrderDetails, function(j, nnn){
					 
							$.each(nnn.items, function(jj, nnnn){
							 opName+='<span style="color:#DE5D24">'+nnnn.name+'</span><br/>';
							})
					
					})
				
				/* var addprice=parseFloat(n.options.price);
				 proPrice+=addprice;
				 var addPriceStr="";
				 if(addprice>0){
					 addPriceStr="["+formatNumber(addprice,'#,##0.00')+"]";
				 }
				 opName+=n.options.name+addPriceStr+"&nbsp;|&nbsp;";*/
			  }
		
		   		 
                 
    
      curPrice=proPrice*proQty;
	  allPrice+=curPrice;


      allTax+=curPrice*proTaxRate;
     
	  
	  //Math.round(100*price*0.076,2)/100
	//  console.log(j+"=="+allPrice);
	  	  //console.log(j+"=="+proTaxRate);
	  //console.log(j+"=="+Math.round(proPrice*100*proTaxRate));

	  allQty+=proQty;

   orderContent+='<div style="overflow:hidden;">';
   orderContent+='<div style="float:left;width:60%">'+proName+'</div><div  style="float:left;width:20%">'+proQty+'</div><div  style="float:right;width:20%;text-align:right;">$'+curPrice.mytoFixed(2)+'</div>';
   orderContent+='</div>';
	orderContent+='<div style="float:left;width:100%">'+opName+'</div>';
   orderContent+='<hr>';


  
})	
	orderContent+='<div style="overflow:hidden;color:red;">';
   orderContent+='<div style="float:left;width:60%;text-align:center;color:red;font-weight:600">Tax:</div><div  style="float:left;width:20%">&nbsp;</div><div  style="float:right;width:20%;text-align:right;">$'+allTax.mytoFixed(2)+'</div>';
   orderContent+='<hr>';
   orderContent+='<div style="float:left;width:60%;text-align:center;font-weight:600">Sub-total:</div><div  style="float:left;width:20%">'+allQty+'</div><div  style="float:right;width:20%;text-align:right;">$'+allPrice.mytoFixed(2)+'</div>';
   orderContent+='</div>';

 orderHead+='<div style="border-bottom:solid black 1px;font-weight:600;color:Red"><p>'+dateKey+'</p>Grand  Total:&nbsp;&nbsp;$'+(allPrice.mytoFixed(2)+allTax.mytoFixed(2)).mytoFixed(2)+'</div>';

//	}
/**********************storageend two**************"*******************************/
 $("#orderList #ulist").append(orderHead+orderContent);
	}
	
	
	chi();
}


/********************************************************************************************************/
		function SubmitOrder(){
			 
		
         //  $("#cartInfo").data("SMError","GO");
		// if(sessionStorage.getItem("key")=="demo001"){
			 
		 $("#afui").popup({
            title:"Self Order",
            message:"<span style='color:#FBBB3B;font-weight:600'>Confirmed Your Order</span>",
            cancelText:"Cancel me",
            cancelCallback:function(){
             //   console.log("Cancel1");
				$.ui.hideMask();
            },
            doneText:"Confirm",
            doneCallback:function(){
				$.ui.showMask("process...");
				
               // console.log("Cancel2");
				SMOrder();
            },
            cancelOnly:false
        });
		   
			 
			 
			 
		/* }else{
			getMapApi();
			setTimeout(checkedSubmit,500);
		 }*/
		}

        function checkedSubmit(){
			
			var cce;
			if($("#cartInfo").data("SMError")=="GO"){

			  cce=setTimeout(checkedSubmit,500);
			}else{
				clearTimeout(cce);
			  if($("#cartInfo").data("SMError")=="YES"){SMOrder(); }
				
				
				
			}  
			 
		}
		
		function SMOrder(){
			
           history.pushState("submitOrder", "order", "./order");
       // alert( $("#SMError").data("SMError"));

	 
		  //$.ui.showMask("process...");
	

            var objStr="";
		    var sign=false;
			var mkey=sessionStorage.getItem("key");
		   
		   
		
		   
		   
		   
		   
		   
		   
		   
		   
		   if( sessionStorage.getItem("tableId")==""){
			mkey=mkey+"g";
			}
			var orderTimeObj={};
             for(var i=0;i<localStorage.length; i++){
			              var key=localStorage.key(i);
							
							if(key.indexOf(mkey+"_")==0){
						     sign=true;
							 var contentStr=localStorage.getItem(key);
								 var dataJson=JSON.parse(contentStr);
								  
								  orderTimeObj[dataJson.orderTime]=	dataJson.orderTime;

													if(i==(localStorage.length-1)){
															objStr+=contentStr+"]";
														}else{
														objStr+=contentStr+","
													}

						      //      var dataJson=JSON.parse(contentStr);
						        //    dataJson.proQty=0;
				                 //	  localStorage.setItem(key,JSON.stringify(dataJson));
								}
			}

			
  var field = "["+objStr.substring(0,objStr.length-1)+"]";



//..var ddd='{"D070000D130000":"D070000D130000"}';

 fields = 'data={"orderTime":'+JSON.stringify(orderTimeObj)+',"tableId":"'+sessionStorage.getItem("tableId")+'","key":"'+sessionStorage.getItem("key")+'","data":' +field+'}';// JSON.stringify(fields);
 
  $.ajax({
        type: "POST",
        url : "submitorder.php",
        data:fields,
        success: function(msg){
				   
		  if(isNaN(msg)==false){

		     ok(msg);
			
			
		  } else{
			$('#afui').popup(msg);
		  }$.ui.hideMask();
        },
			 error:function(data){
			 $('#afui').popup("connection error");
			  $.ui.hideMask();
			}  
      });
 
								
                          


			/*if(sign=="1000000000"){
	         storageCart();
			 localStorage.setItem("	sessionCar"," 0.00| 0");
             localStorage.setItem("order"+new Date().getTime(),"["+objStr.substring(0,objStr.length-1)+"]");
             objStr="";
			}		*/
			//$.ui.loadContent('main',false,false,'up');
	}
function ok(id){

	$.ui.hideMask();
  var backArr=id.replace(/(^\s*)|(\s*$)/g, "").split(".");
  if(backArr.length>=2){
var orderNumber=backArr[0];
  var orderId=backArr[1];
  
  }
   var objStr="";
	var mkey=sessionStorage.getItem("key");
	var tableSign="TABLE:"+sessionStorage.getItem("tableId");
	if( sessionStorage.getItem("tableId")==""){
			mkey=mkey+"g";
			tableSign=" TO GO";
			}
		for(var i=0;i<localStorage.length; i++){
			              var key=localStorage.key(i);
					if(key.indexOf(mkey+"_")==0){
						     var contentStr=localStorage.getItem(key);

												  if(i==(localStorage.length-1)){
															objStr+=contentStr+"]";
														}else{
														objStr+=contentStr+","
													}
												

						             var dataJson=JSON.parse(contentStr);
						              dataJson.proQty=0;
				                	  localStorage.setItem(key,JSON.stringify(dataJson));
									 // location.href="#successfully";
					}
			}

			 storageCart(); //
			 //localStorage.setItem(restaurantJson.key+"$"," 0.00| 0");
             localStorage.setItem(sessionStorage.getItem("key")+"#"+orderId,'{orderNumber:'+orderNumber+',tableSign:"'+tableSign+'",create:'+new Date().getTime()+',order:['+objStr.substring(0,objStr.length-1)+']}');
			/// sesstionStorage.setItem("orderId",id);
			 //history.replaceState(null, "successfully", "#main");
			 $("#successfully #orderId").text(id);
			// history.pushState("order", "order", "./restaurantDine.html");	
             $.ui.loadContent('#orderList',false,false,'up');
			// order#orderList
			 history.replaceState("orderSubmit", "order", "./order");	
}
	
/******************************************************************************************/

function loadCart(){


   //   $("#topHead h1").html('Table:<a href="javascript:changeTable()" >'+sessionStorage.getItem("tableNum")+'</a>'); 
     // $("#topHead h1").text('My Cart'); 

	  var carInfoHtml="";	
	  var carInfoOption="";	
	  var subTotal=0;
	  var Tax=0;
	  var curTotal=0;
	  var sumQty=0;
     $("#cartInfo ul").empty();
   
    
	   carInfoHtml+='<li style="margin:0;padding:0;text-align:center;background-color:#48321D;color:#fff;"><div style="width:55%;font-weight:600;border:none ">Item</div>';
	   carInfoHtml+='<div style="width:15%;font-weight:600;border:none">Price</div>';
	   carInfoHtml+='<div style="width:25%;font-weight:600;border:none">Qty</div>';
       

	   carInfoHtml+='</li>';
	   //	var restaurantJson=JSON.parse(sessionStorage.getItem("restaurantInfo"));
	   var mkey=sessionStorage.getItem("key");
	   			if( sessionStorage.getItem("tableId")==""){
			mkey=mkey+"g";
			}
		$("#cartInfo #tableId").text(sessionStorage.getItem("tableId"));
		for(var i=0;i<localStorage.length;  i++){
	

		var key=localStorage.key(i);
		if(key.indexOf(mkey+"_")==0){
			 var dataJson=JSON.parse(localStorage.getItem(key));
			 var selectOp="";
			 var proQty=parseInt(dataJson.proQty);
			 var proPrice=parseFloat(dataJson.proPrice);
			 var proTaxRate=parseFloat(dataJson.proTaxRate);
			 var selectOpHtml="";
			// var subSign="fa fa-times-circle fa-lg"
		


	
	if(typeof(dataJson.options) != "undefined" && typeof(dataJson.options.price) !="undefined"){
				selectOp='<span style="color:#de5b25;font-weight:600">Options:</span>';	
				 var adPrice="";
				 if(dataJson.options.price!="0"){
				 adPrice="["+formatFloat(dataJson.options.price,2)+"]"; 
				 }
				//selectOp=dataJson.options.name+adPrice+"";
				proPrice+=parseFloat(dataJson.options.price);

			carInfoOption+='<li style="margin:0;padding:0;border-top:dotted #e6e6e6 1px;border-bottom:none;height:20px;"><div  style="line-height:20px;width:100%; border:#fff; text-align:left;border:none ">'+selectOp+dataJson.options.name+adPrice+""+'</div>';
            carInfoOption+='</li>'
			}
			
			//dump(dataJson.attributes);
		    $.each(dataJson.attributes,function(j,nnn){
				
				//$.each(nnn.options,function(jj,nnnn){
				var grName="";
				var adPrice="";
				 if(nnn.price!="0" && typeof(nnn.price)!="undefined"){
				 adPrice="["+formatFloat(nnn.price,2)+"]";
				 proPrice+=parseFloat(nnn.price);
				 }

						//selectOp=nnn.name+adPrice;
						
						if(j==0){
							 grName='<span style="color:#de5b25;font-size:1em;font-weight:600">Options:</span>';
							}
							else{
							grName='<span style="color:#fff;font-size:1em;font-weight:600">Options:</span>';
							}
	    carInfoOption+='<li style="margin:0;padding:0;border-top:dotted #e6e6e6 1px;border-bottom:none;height:20px;"><div style="line-height:20px;width:100%; border:none; text-align:left;font-size:0.9em">'+grName+nnn.name+adPrice+'</div>';
         carInfoOption+='</li>'
				
					//})

		
		   })

            if(typeof(dataJson.comboOrderDetails) != "undefined"){
					
					$.each(dataJson.comboOrderDetails, function(j, nnn){
						var grName="";
							$.each(nnn.items, function(jj, nnnn){
						  if(jj==0){
							 grName='<span style="color:#de5b25;font-size:1em;font-weight:600">'+nnn.keyName+':</span>';
							}
							else{
							 grName='<span style="color:#fff;font-size:1em;font-weight:600">'+nnn.keyName+':</span>';
							}

			carInfoOption+='<li style="margin:0;padding:0;border-top:dotted #e6e6e6 1px;border-bottom:none;height:20px;"><div style="line-height:20px;width:100%; border:none; text-align:left;font-size:0.9em">'+grName+nnnn.name+'</div>';
            carInfoOption+='</li>'
		
							})
					
					})
				
				
			  }
	



          curTotal=formatFloat(proPrice*proQty,2);
	      subTotal+=curTotal;
		  subTotal=formatFloat(subTotal,2);

		 // Tax+=formatFloat(curTotal*proTaxRate,2);
		//  Tax=formatFloat(Tax,2);
		  sumQty+=proQty;


	   carInfoHtml+='<li  style="height:30px;line-height:30px;margin:0;padding: 0 0 0 0;text-align:center;border-bottom:none;border-top:solid black 1px"><div  style="line-height:28px;color:red; width:55%;text-align:left;font-size:0.9em;overflow:hidden;font-weight:600;border:none"><font color="#000">&nbsp;'+dataJson.proName+'</font></div>';
	   carInfoHtml+='<div style="width:15%;text-align:right;border:none">$'+curTotal.mytoFixed(2)+'</div>';
	   carInfoHtml+='<div style="width:30%;line-height:28px;text-align:right;padding:0;border:0" >';
	   carInfoHtml+='<span class="minusCart fa fa-minus-square fa-lg"   key="'+key+'" style="line-height:0px;float:center;color:red;padding:13px 5px 13px 10px;" ></span>';
	   carInfoHtml+='<span style="font-size:1em;line-height:25px;padding:0;border:none">'+proQty+'</span>';
	   carInfoHtml+='<span class="plusCart fa fa-plus-square fa-lg" style="line-height:0px;float:center;color:red;padding:13px 13px 13px 5px;"  key="'+key+'" ></span></div>';
       
	   carInfoHtml+='</li>'+carInfoOption;
	   carInfoOption="";

	
	   }
	}
	 
	  
	  
	  if(carInfoHtml.length>300){
		  Tax=subTotal*proTaxRate;
	   carInfoHtml+='<li  style="height:35px;line-height:35px;margin:0;padding:0;text-align:center;border-top:solid black 1px;border-bottom:none;"><div style="width:55%;text-align:left;font-weight:700;border:none">Total</div>';
	
       carInfoHtml+='<div style="width:15%;text-align:right;border:none">$'+subTotal.mytoFixed(2)+'</div>';
	      carInfoHtml+='<div style="width:25%;border:none;text-align:right;">'+sumQty+'</div>';
	  // carInfoHtml+='<div style="width:10%;">&nbsp;</div>';
	   carInfoHtml+='</li>';
		
	   carInfoHtml+='<li  style="height:35px;line-height:35px;margin:0;padding:0;text-align:center;border:none"><div style="width:55%;text-align:left;center;font-weight:700;border:none">Tax</div>';
	
       carInfoHtml+='<div style="width:15%;text-align:right;border:none;">$'+Tax.mytoFixed(2)+'</div>';
	      carInfoHtml+='<div style="width:1%;border:none;">&nbsp;</div>';
	  // carInfoHtml+='<div style="width:10%;">&nbsp;</div>';
	   carInfoHtml+='</li>';
		
		carInfoHtml+='<li  style="height:35px;line-height:35px;margin:0;padding:0;text-align:center;border:none"><div style="border:none;width:55%;text-align:left;center;font-weight:700"">Grand Total</div>';
	  
       carInfoHtml+='<div style="width:15%;text-align:right;font-weight:600;border:none;">$'+toDecimal(formatFloat(subTotal+Tax,2),2)+'</div>';
	    carInfoHtml+='<div style="width:30%;border:none;">&nbsp;</div>';
	   
	   carInfoHtml+='</li>';
	   	   carInfoHtml+='<li id="SMError" style="color:red">';
	   	   carInfoHtml+='</li>';
	   
	  carInfoHtml+='<div style="text-align:center;height:100px;background:#e6e6e6">';
	   	    // carInfoHtml+=' <a class="button" href="#main" style="width:40%;height:50px;line-height:40px;">Cancel</a>&nbsp;&nbsp;';
	carInfoHtml+=' <a id="submit" class="button" href="javascript:SubmitOrder()"   style="width:90%;margin-top:25px;height:50px;line-height:40px;background:#FCD209">PLACE YOUR ORDER</a></div>';
    carInfoHtml+='</div>';
		 }
	   
	
   $("#cartInfo ul").append(carInfoHtml);//+'</ul><div style="float:left;width:100%;text-align:right;padding:1px 10px;"><p>subTotal:$'+formatNumber(subTotal,'#,##0.00')+'</p><p>Tax:$'+formatNumber(Tax,'#,##0.00')+'</p><p>	Total:$'+formatNumber(subTotal+Tax,'#,##0.00')+'</p></div>');
  

/*
$("#btn" + i).bind("click", { id: i }, dis);

    }

    });

    function dis(evt) {

    alert(evt.data.id);*/
$("#cartInfo .minusCart").on("touchstart",minusCart);
$("#cartInfo .plusCart").on("touchstart",plusCart);
chi();//多语
 $("#cartInfo ul").scroller({useJsScroll:true});
}
function minusCart(){
//alert(a);

//var my_element = $(a);
//var key="";
//　if(my_element.length>0){ 
     var key=$(this).attr("key");  
	  var dataStr = localStorage.getItem(key);
	 var dataJson = eval('(' + dataStr + ')');
     dataJson.proQty=parseInt(dataJson.proQty)-1;
     localStorage.setItem(key,JSON.stringify(dataJson));
//}else{  
  //   key=a;
	//var dataStr = localStorage.getItem(key);
	//var dataJson = eval('(' + dataStr + ')');
   //  dataJson.proQty=parseInt(dataJson.proQty)-1;
   //  localStorage.setItem(key,JSON.stringify(dataJson));
	//$("#showSigleValue"+key.split("_")[1]).text(dataJson.proQty); 
	//if(dataJson.proQty<1){
	//$("#showSigle"+key.split("_")[1]).css("display","none");
//	}
//}     
     
	  storageCart();
	  loadCart();
}

function plusCart(){
//var my_element = $(a) 
//　var key="";
　//if(my_element.length>0){ 
    var key=$(this).attr("key");  
	 var dataStr = localStorage.getItem(key);
	var dataJson = eval('(' + dataStr + ')');
     dataJson.proQty=parseInt(dataJson.proQty)+1;
     localStorage.setItem(key,JSON.stringify(dataJson));
//}else{  
  //   key=a;
	// var dataStr = localStorage.getItem(key);
	//var dataJson = eval('(' + dataStr + ')');
   //  dataJson.proQty=parseInt(dataJson.proQty)+1;
  //   localStorage.setItem(key,JSON.stringify(dataJson));
	//$("#showSigleValue"+key.split("_")[1]).text(dataJson.proQty); 
//	if(dataJson.proQty>=1){
	// $("#showSigle"+key.split("_")[1]).css("display","");
	//}
//} 
   
     storageCart();
	   loadCart();
}
/*

function updateLocalCar(key,sum) {
	var dataStr = localStorage.getItem(key);
	var dataJson = eval('(' + dataStr + ')');
    dataJson.proSum=(parseInt(dataJson.proSum)+parseInt(sum));
    localStorage.setItem(key,JSON.stringify(dataJson));
   	
}
*/

 function MenuLink(n){
/* 
$.ui.showMask("load...");
setTimeout(function(){$.ui.toggleSideMenu()},0);
$.ui.scrollToTop('main');
setTimeout(function(){$.ui.hideMask();window.location.hash="#"+n;},320);
setTimeout(function(){window.location.hash="#";},400);*/
	
	//$.ui.toggleSideMenu();
	$.ui.loadContent('main');
	// $.ui.loadContent('main',false,false,'down');
    //  $.ui.scrollToTop('main');
      setTimeout(function(){$.ui.scrollToTop('main');$.ui.toggleSideMenu();},0);
	$("#main ul li").hide();
      if(n !="ALL"){
		

		  $("#"+n).toggle();
		  $("."+n).toggle();
		}else{
		$("#main ul .divider").show();
		 $(".contentMenuSp").show();
		//$("#main #special").hide();
        }
	
		}
/************************Buy 002************************************************/	 
function moveToCart(o,e) {
var x=$("#img"+o).get(0).offsetParent.offsetLeft;
var y=$("#img"+o).get(0).offsetParent.offsetTop;
var flyElm = $("#img"+o).clone();
flyElm.css({
'position':'absolute',
'top': y+50+'px',
'left': x+50+'px',
'width':'20px',
'height':'20px'
 });
 
$('#ulist').append(flyElm);
var xx=$("#topCart").get(0).offsetLeft;
var yy=e.clientY;
if(e.changedTouches[0].clientY=!"undefined"){
yy=e.changedTouches[0].clientY;
}
setTimeout(function(){
$(flyElm).css3Animate({
                               
                                x: xx+"px",
                                y:-yy+"px",
                                time: "300ms",
                                opacity: .2,
                                callback: function () {
                                   $(flyElm).remove();
                                }
                            });
},1)



}

function moveBigToCart(o,e) {

var flyElm=$('<img src="./img/2.JPG" width="50px" height="50px" />');
flyElm.css({
'position':'absolute',
'width':"30px",
'height':"30px",
'bottom':"3em",
'right':'20px'
 });
$("#showPhoto #carousel").append(flyElm);
//
//var xx=e.clientX;
var yy=e.clientY;
if(e.changedTouches[0].clientY=!"undefined"){
yy=e.changedTouches[0].clientY;
}

setTimeout(function(){
$(flyElm).css3Animate({
                               
								
                                y:-yy+"px",
                                time: "300ms",
                                opacity: .2,
                                callback: function () {
                                   $(flyElm).remove();
                                }
                            });
},1)

//$("#showPhoto #carousel").append(showSigleHtml);showSigleHtml="";	
//$('#showPhoto #carousel').append(flyElm);



}


					function addCart(o,s,e){
					 $.ui.showMask("load...");
                      
					$(".proOptQty").val(1);
				    var proId=$(o).attr("proId");
					var price=parseFloat($(o).attr("proPrice"));
					var addPrice=0;
					$("#gpId").val($(o).attr("gpId"));
					$("#proId").val(proId);
					$("#proName").val($("#mutiLaguage"+proId).html());
                    $("#proPrice").val(price);
					$("#proTaxRate").val($(o).attr("proTaxRate"));
					$("#proOutTaxRate").val($(o).attr("proOutTaxRate"));
					$("#proThumbPath").val($(o).attr("proThumbPath"));
					$("#orderTime").val($(o).attr("orderTime"));
					//ordertime
					
					//panel 存在则表示有Option数据 没有直接加入购物车
			
				    if($("#panel"+proId).length>0){
						
						  $.ui.loadContent("#panel"+proId,false,false,'down');
						  $("#div"+proId).scroller({useJsScroll:true});
						  if(s==9){
							//  console.log("xxxxxxxxxxxxxxx"+s);
						  history.pushState("photo", "photo", "./order");
						  }
						 // $.ui.hideMask();
						  //初始化radion checked
						 // var obj=$("#panel"+proId+" .frClass");
						  if($("#panel"+proId+" .frClass").length>0){
							 
						   var obj=$("#panel"+proId+" .frClass");
						   var radioArr=Array();
							if($.isArray(obj)){
							radioArr=obj;
							}else{
							radioArr[0]=obj;
							}
							
						  }
						 $.each(radioArr,function(m,n){
							optionRadio(n);
						})
					
					  if($("#panel"+proId+" input[type=checkbox]").length>0){
						      var obj=$("#panel"+proId+" input[type=checkbox]");
						
							  $.each(obj,function(i,n){
							  $(n).parent().css("background", "white");
							  $(n).removeAttr("disabled");
							  $(n).parent().removeClass("icon check big");
							  $(n).parent().css("color", "black"); 
							  $(n).prop('checked',false); 
							  })
					  }
							
						   allInput();
						   //setTimeout
							   setTimeout(function(){$.ui.hideMask();},300);
						   
						                         
						   
					}
					else //动画+加入购物车
					{
						if(s==1){
							 var kk=parseInt($("#showSigleValue"+proId).text());
							
							 $("#showSigleValue"+proId).text(kk+1); 
							 $("#showSigle"+proId).css("display","");
						//moveBigToCart(proId,e);
						}else{
							
					//	moveToCart(proId,e);
						}
						
						submitQuickCart();
					}

					
					}
					
/************************Option 003************************************************/	

function changeOption(o){
		  
          /********************option Name *********************************/
		//  alert("gogo");
          //alert($('#op6816 :radio[name="ovId6814"]:checked').attr("name"));

		  var opOptionId=$("#ovId"+o).attr("opOptionId");
          var opName=$("#ovId"+o).attr("opName");
		  var opValueId=$("#ovId"+o).attr("opValueId");
          var opType=$("#ovId"+o).attr("opType");
		  var  opAtp=$("#ovId"+o).attr("opAtp");

		
		 


		//  var opPir=$("#ovId"+o).attr("opPri");
         /***********************Mian to Here *********************************************/
          var proName=$("#main .sifuProName").val();
          var proSku=$("#main .sifuPro").val();
	      var proImgUrl=$("#main .sifuImgUrl").val();
		  var proPri=$("#main .sifuProPri").val(); //原价
       



		
	   //  alert(proPri); alert(opAtp);
		 // var addPri=$("#ovId"+o+" input:eq(0)").val(opAtp);
           //alert(o);sku,o,op,p,ap
		   //alert(op);
		 
			    $("#modalContainer .tempPri").val(opAtp); //单个option 如果多个要怎样处理

				var addPri=$("#modalContainer .tempPri").val(); //多option 处理
		

			     var price=parseFloat(parseFloat(proPri)+parseFloat(addPri),2);

	
			$("#op"+opOptionId+ " span").css("background","#EAF3FC");
            $("#op"+opOptionId+ " span").css("color","black");

			$("#span"+opValueId).css("background","red");
            $("#span"+opValueId).css("color","white");
			  
			 $("#submit"+proSku).text("$"+price );
		

	
		}

/****************************004  Submit Order ********************************************/
          function	submitCart(){
			
          var gpId=$("#main #gpId").val();
		  var proId=$("#main #proId").val();
          var proName=$("#main #proName").val();
	      var proPrice=$("#main #proPrice").val();
		  var proOutTaxRate=$("#main #proOutTaxRate").val(); //原价
          var proTaxRate=$("#main #proTaxRate").val(); //原价
		  var proThumbPath=$("#main #proThumbPath").val(); //原价
		  var orderTime=$("#main #orderTime").val(); //原价	
		  var proSize="";
          //var proQty=parseInt($(".spinner input").val()); //原价
			var mkey=sessionStorage.getItem("key");
			if( sessionStorage.getItem("tableId")==""){
			mkey=mkey+"g";
			}
			var proQty=1;
			if(typeof($(".proOptQty").val()) != "undefined"){proQty=$(".proOptQty").val();}
		    var sign=true;
		 
	     //合格
		 $.each($('#panel'+proId+' .checkmin'),function(i,n){
		    var selectLength=$('#panel'+proId+' input[name="check'+$(n).attr("liId")+'"]:checked').length;
		   if(selectLength<$(n).attr("min")){
			   $('#afui').popup($(n).attr("name")+": At least "+$(n).attr("min"));
			  //alert($(n).attr("name")+": At least "+$(n).attr("min"));
			   
			    sign=false;
			   return false;
			  }
		
		 })	
			if(sign==true){
					
    var radionJson = new Object();
	var radioObj=$('#panel'+proId+' input[type="radio"]:checked');
	

	var key=mkey+"_"+proId;
		//alert(radioObj.attr("opid"));
	 if( typeof(radioObj) != "undefined" && typeof(radioObj.attr("opid")) != "undefined"){ 
			$.each(radioObj,function(j,vv){
				if($(vv).attr("optype")=="size"){
				proPrice=$(vv).attr("opprice");
				proName+="["+$(vv).attr("opname")+"]";
				proSize=$(vv).attr("opname");
				key+="-"+$(vv).attr("opid");
				}else{
				radionJson.id=$(vv).attr("opid");
				//console.log("xxxxxxxxxxx2015/2015/4/1=============>"+$(vv).attr("opname"));
				//radionJson.name=$(vv).attr("opname");
				//
				radionJson.name=$(vv).parent().children("span").html();
//console.log("xxxxxxxxxxx2015/2015/4/1=============>"+$(vv).parent().children("span").html());
				//alert($(vv).attr("opname"));
				//alert($(vv).parent().children("span").html());
				//radionJson.name=$(vv).children("span").eq(1).html();
				//alert($(vv).html());
				radionJson.price=$(vv).attr("opprice");
				key+="-"+radionJson.id;
			   }
			})

		
	 }

	     var comBegin="";
		 var comName="";
         var comArr=Array();
		 var itemArr=Array();
		 var itemArrInt=0;
		 var itemInt=0;
		 var itemObj=new Object();

		 var attrItemInt=0;
		 var attrItemArr=Array();
         $.each($('#panel'+proId+' input[type="checkbox"]:checked'),function(j,nn){
			 var type=$(nn).attr("optype");
			 
			 if(type=="comb"){
			var tempId= $(nn).attr("opgrid");
			 
			 if(comBegin !=tempId){
			 if(comBegin!=""){
			 itemObj.key=comBegin;
			 
			 itemObj.keyName=comName;
			 itemObj.items=itemArr;
			 comArr[itemArrInt]=itemObj;
			 itemArrInt++;
			 //初始化
			 itemObj=new Object();
			 itemArr=Array();
			 itemInt=0;
			}
			comBegin=tempId;
			comName= $(nn).attr("opgrname");
			 }
            checkJson=new Object();
			checkJson.id=$(nn).attr("opid");
			checkJson.name=$(nn).attr("opname");
			checkJson.price=$(nn).attr("opprice");
			itemArr[itemInt]=checkJson;
			itemInt++;
			key+="-"+checkJson.id;

   }else{
		    checkJson=new Object();
			checkJson.id=$(nn).attr("opid");
			checkJson.name=$(nn).parent().children("span").html();
			//console.log("AAAAAAAAAAAAAAAAA");
			//console.log($(nn).parent().children("span").html());
			//console.log("BBBBBBBBBBBBBBBBBBBBBBB");
			checkJson.price=$(nn).attr("opprice");

			key+="-"+checkJson.id;
			attrItemArr[attrItemInt]=checkJson;
			attrItemInt++;
		
   }		
 })
/************************************************/	
 if(comBegin !=""){
    itemObj.key=comBegin;
	itemObj.keyName=comName;
	itemObj.items=itemArr;
    comArr[itemArrInt]=itemObj;
 }

   var cartInfo=new Object();
   cartInfo["gpId"]=gpId;
   cartInfo["proId"]=proId;
   cartInfo["proName"]=proName;
   cartInfo["proPrice"]=proPrice;
   cartInfo["proTaxRate"]=proTaxRate;
   cartInfo["proOutTaxRate"]=proOutTaxRate;
   cartInfo["proThumbPath"]=proThumbPath;
   cartInfo["proQty"]=proQty;
   cartInfo["orderTime"]=orderTime;	
   cartInfo["size"]=proSize;
   cartInfo["options"]=radionJson;
   cartInfo["attributes"]=attrItemArr;
   cartInfo["comboOrderDetails"]=comArr;	
 
   	if(localStorage.getItem(key)==null){
			localStorage.setItem(key,JSON.stringify(cartInfo));
       	}else{
    var dataStr = localStorage.getItem(key);
	var dataJson = eval('(' + dataStr + ')');
	 dataJson.proQty=parseInt(dataJson.proQty)+parseInt(proQty);
     localStorage.setItem(key,JSON.stringify(dataJson));
        }
  //alert("s");
  

 
 
    storageCart();
	$.ui.goBack();

  if(typeof(carousel)!="undefined"){
    carousel.refreshItems();
   }
	if(typeof(spCarousel)!="undefined"){
    spCarousel.refreshItems();
   }

 //  storageCart();
 // bigPhotoStart();
//  bigPhotoEnd();
  //$("#afui").goBack();
//  setTimeout(function(){ $.ui.goBack();},2000) ;
 // alert("s");
  //  alert("s");
     //history.go(-2);

 }

}	
		  

	
	 function submitQuickCart(){
		   $.ui.hideMask();
		  var mkey=sessionStorage.getItem("key");
		  if( sessionStorage.getItem("tableId")==""){
			mkey=mkey+"g";
			}
		  var gpId=$("#main #gpId").val();
		  var proId=$("#main #proId").val();
          var proName=$("#main #proName").val();
	      var proPrice=$("#main #proPrice").val();
		  var proOutTaxRate=$("#main #proOutTaxRate").val(); //原价
          var proTaxRate=$("#main #proTaxRate").val(); //原价
		  var proThumbPath=$("#main #proThumbPath").val(); //原价
		  var orderTime=$("#main #orderTime").val(); //原价		
          //var proQty=parseInt($(".spinner input").val()); //原价

		   var proQty=1;
		   var sign=true;
		 
	     //合格
		 $.each($('#panel'+proId+' .checkmin'),function(i,n){
		    var selectLength=$('#panel'+proId+' input[name="check'+$(n).attr("liId")+'"]:checked').length;
		   if(selectLength<$(n).attr("min")){
			   $('#afui').popup($(n).attr("name")+": At least "+$(n).attr("min"));
			  //alert($(n).attr("name")+": At least "+$(n).attr("min"));
			   
			    sign=false;
			   return false;
			  }
		
		 })	
			if(sign==true){
					
    var radionJson = new Object();
	var radioObj=$('#panel'+proId+' input[type="radio"]:checked');
	
	var key=mkey+"_"+proId;
		//alert(radioObj.attr("opid"));
	 if( typeof(radioObj) != "undefined" && typeof(radioObj.attr("opid")) != "undefined"){ 
		radionJson.id=radioObj.attr("opid");
		radionJson.name=radioObj.attr("opname");
		radionJson.price=radioObj.attr("opprice");

		key+="-"+radionJson.id;
	 }
   var checkArray=Array();
    var checkArrayJson=new Object();
	var checkJson=new Object();
    var checkArrayOP=Array();
	$.each($('#panel'+proId+' .checkmax'),function(i,n){
		checkArrayJson=new Object();
	     var opgrid=$(n).attr("liid");
		 var opgrname=$(n).attr("name");
		 checkArrayJson["id"]= opgrid;
	     checkArrayJson["name"]= opgrname;
		 checkArrayOP=Array();
		 
		 $.each($('#panel'+proId+' input[name="check'+opgrid+'"]:checked'),function(j,nn){
			checkJson=new Object();
			checkJson.id=$(nn).attr("opid");
			
			checkJson.name=$(nn).attr("opname");
			checkJson.price=$(nn).attr("opprice");
			checkArrayOP[j]=checkJson;
			key+="-"+checkJson.id;
		 })
			 checkArrayJson["options"]=checkArrayOP;
			 checkArray[i]=checkArrayJson;											//check38
	})
		
   var key=mkey+'_';
   var cartInfo=new Object();
   cartInfo["gpId"]=gpId;
   cartInfo["proId"]=proId;
   cartInfo["proName"]=proName;
   cartInfo["proPrice"]=proPrice;
   cartInfo["proTaxRate"]=proTaxRate;
   cartInfo["proOutTaxRate"]=proOutTaxRate;
   cartInfo["proThumbPath"]=proThumbPath;
   cartInfo["proQty"]=proQty;
   cartInfo["orderTime"]=orderTime;
   cartInfo["options"]=new Object();
   cartInfo["attributes"]=new Array();
    key+=proId;
   	if(localStorage.getItem(key)==null){
			localStorage.setItem(key,JSON.stringify(cartInfo));
       	}else{
    var dataStr = localStorage.getItem(key);
	var dataJson = eval('(' + dataStr + ')');
	 dataJson.proQty=dataJson.proQty+proQty;
     localStorage.setItem(key,JSON.stringify(dataJson));
        }




  storageCart();
 // $.ui.goBack();	



		 }
}	

  function showHide(obj, objToHide) {
                var el = $("#" + objToHide)[0];

                if (obj.className == "expanded") {
                    obj.className = "collapsed";
                } else {
                    obj.className = "expanded";
                }
                $(el).toggle();

            }

















/**************************************/
 var position_option = {
                enableHighAccuracy: true,
                maximumAge: 20000,
                timeout: 20000
            };

function getMapApi(){
if(navigator.geolocation){
			
			navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionError, position_option);

		}else{
                	$("#cartInfo").data("SMError","NO");
					
					 $('#afui').popup("Failure Information");
					  $.ui.hideMask();
            }
	
}
function getPositionSuccess( position ){
      var latmin=sessionStorage.getItem("latmin");
	  var latmax=sessionStorage.getItem("latmax");
	  var lngmin=sessionStorage.getItem("lngmin");
	  var lngmax=sessionStorage.getItem("lngmax");
	  var accuracymax=sessionStorage.getItem("accuracymax");
	  if(accuracymax==null || typeof(accuracymax)=="undefined"){
	  accuracymax=10000000;
	  }
		var accuracy=position.coords.accuracy;  // && accuracy<=500
	    var lat = position.coords.latitude;
        var lng = position.coords.longitude;
		//console.log(accuracymax);

		if(lat>=latmin && lat<=latmax && lng>=lngmin && lng<=lngmax  ){
			
			$("#cartInfo").data("SMError","YES");
			
		}else{
			$("#cartInfo").data("SMError","NO");
			
			$('#afui').popup("Distance Out Of Range");
			$.ui.hideMask();
			
		}
      
}
function getPositionError(error) {
   $("#cartInfo").data("SMError","NO");
   
   $('#afui').popup("PositionError Information");
   $.ui.hideMask();
	/*switch (error.code) {
        case error.TIMEOUT:
            alert("连接超时，请重试");
            break;
        case error.PERMISSION_DENIED:
            alert("您拒绝了使用位置共享服务，查询已取消");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("获取位置信息失败");
            break;
    }*/
}


  
