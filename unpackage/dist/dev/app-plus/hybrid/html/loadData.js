(function(w) {
	function plusReady() {
		
	};
	if (w.plus) {
		console.log(w)
		JSON.stringify(w.plus)
	    plusReady();
	} else {
	    document.addEventListener("plusready", plusReady, false);
	};
	var dtask = null;
	var dysdk = {
		  downloadAndInstall: function(down_url, packName) {
			  console.log(down_url,packName)
		  }
	}
	 w.dysdk = dysdk;
})(window);