
var GAH = GAH || {};
GAH.locationAnalytics=(function(){
	var init=function(gaq, onNoSupportFunc){
		var cookieSetting="HGLA=1"
			doesntSupportFunc=onNoSupportFunc || function(){ document.cookie=cookieSetting; }
			,shouldTest=true
			,i=0
			,len=0;
		if(typeof gaq!=='undefined'){
			if(document.cookie){
				len=document.cookie.length;
				for(;i<len;i+=1){
					if(document.cookie[i].indexOf("HLA=")!==-1){
						shouldTest=false;
					}
				}
			}
			if(shouldTest){
				if(navigator.geolocation){
					navigator.geolocation.getCurrentPosition(function(position){
						gaq.push(['_setCustomVar',1,"Visitor_GeoLocation_Long",position.coords.longitude,1]);
						gaq.push(['_setCustomVar',2,"Visitor_GeoLocation_Lat",position.coords.latitude,1]);
						document.cookie=cookieSetting;
					},function(){
						doesntSupportFunc();
					});
				} else {
					doesntSupportFunc();
				}
			}
		}
	}
	return {init:init};
})();