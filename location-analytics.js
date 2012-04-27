var GAH = GAH || {};
GAH.locationAnalytics=(function(){
	var init=function(cb,onNoSupportFunc){
		var cookieSetting="HGLA3=1"
			doesntSupportFunc=onNoSupportFunc || function(){ document.cookie=cookieSetting; }
			,shouldTest=true
			,i=0
			,len=0
			,geo="";
		
			if(document.cookie){
					if(document.cookie.indexOf("HGLA3=")!==-1){
						shouldTest=false;
					}
			}
			if(shouldTest){
				if(navigator.geolocation){
					navigator.geolocation.getCurrentPosition(function(position){
						geo=position.coords.longitude.toString()+","+position.coords.latitude;
						cb('success',geo);
						document.cookie=cookieSetting;
					},function(){
						cb('error',geo);
					});
				} else {
					cb('denied');
				}
			}
		
	}
	return {init:init};
})();