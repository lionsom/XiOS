function localnavUpdate() {
	function basicPath(path) {
		if(!path) {
			path = this;
		}
		
		return path.replace(/index\.\w+$/,'').replace(/^https?:\/\/[\w\.]+/,'').toLowerCase();
	}
	
	String.prototype.basicPath = basicPath;
	
	var page = location.pathname.basicPath();
	var navItems = document.querySelectorAll('#localnav .localnav-menu-link');
	
	navItems.forEach(function(navItem) {
		if(navItem.href.basicPath() == page) {
			navItem.classList.add('current');
			navItem.setAttribute('aria-disabled', 'true');
		}
	});
}

localnavUpdate();
window.addEventListener('DOMContentLoaded', localnavUpdate);