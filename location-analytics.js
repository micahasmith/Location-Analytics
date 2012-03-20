var GAH = GAH || {};
GAH.locationAnalytics=(function(){
	var init=function(gaq, onNoSupportFunc){
		var cookieSetting="HGLA3=1"
			doesntSupportFunc=onNoSupportFunc || function(){ document.cookie=cookieSetting; }
			,shouldTest=true
			,i=0
			,len=0
			,geo="";
		if(typeof gaq!=='undefined'){
			if(document.cookie){
				len=document.cookie.length;
				for(;i<len;i+=1){
					if(document.cookie[i].indexOf("HGLA3=")!==-1){
						shouldTest=false;
					}
				}
			}
			if(shouldTest){
				if(navigator.geolocation){
					navigator.geolocation.getCurrentPosition(function(position){
						geo=position.coords.longitude.toString()+","+position.coords.latitude;
						gaq.push(['_setCustomVar',5,"Visitor_GeoLocation",geo,1]);
						document.cookie=cookieSetting;
					},function(){
						gaq.push(['_setCustomVar',5,"Visitor_GeoLocation","error",1]);
					});
				} else {
					gaq.push(['_setCustomVar',5,"Visitor_GeoLocation","denied",1]);
				}
			}
		}
	}
	return {init:init};
})();