(function(){function n(){}function r(e){this.path=e;this.at_2x_path=e.replace(/\.\w+$/,function(e){return"@2x"+e})}function a(e){this.el=e;this.path=new r(this.el.getAttribute("src"));var t=this;this.path.check_2x_variant(function(e){if(e)t.swap()})}var e=typeof exports=="undefined"?window:exports;var t={check_mime_type:true};e.Retina=n;n.configure=function(e){if(e==null)e={};for(var n in e)t[n]=e[n]};n.init=function(t){if(t==null)t=e;var n=t.onload||new Function;t.onload=function(){var e=document.getElementsByTagName("img"),t=[],r,i;for(r=0;r<e.length;r++){i=e[r];t.push(new a(i))}n()}};n.isRetina=function(){var t="(-webkit-min-device-pixel-ratio: 1.5),                      (min--moz-device-pixel-ratio: 1.5),                      (-o-min-device-pixel-ratio: 3/2),                      (min-resolution: 1.5dppx)";if(e.devicePixelRatio>1)return true;if(e.matchMedia&&e.matchMedia(t).matches)return true;return false};e.RetinaImagePath=r;var i,s,o;if(localStorage){if(localStorage.retinajs_confirmed_paths){try{r.confirmed_paths=JSON.parse(localStorage.retinajs_confirmed_paths)}catch(u){r.confirmed_paths={}}}else{r.confirmed_paths={}}if(localStorage.retinajs_skip_paths){try{r.skip_paths=JSON.parse(localStorage.retinajs_skip_paths)}catch(u){r.skip_paths={}}}else{r.skip_paths={}}i=false;s=function(){if(!i){i=true;setTimeout(o,10)}};o=function(){if(localStorage){try{localStorage.retinajs_confirmed_paths=JSON.stringify(r.confirmed_paths);localStorage.retinajs_skip_paths=JSON.stringify(r.skip_paths)}catch(t){s=o=function(){}}}i=false}}else{r.confirmed_paths={};r.skip_paths={};s=o=function(){}}r.prototype.is_external=function(){return!!(this.path.match(/^https?\:/i)&&!this.path.match("//"+document.domain))};r.prototype.check_2x_variant=function(e){var n,i=this;if(this.is_external()){return e(false)}else if(r.skip_paths[this.at_2x_path]){return e(false)}else if(r.confirmed_paths[this.at_2x_path]){return e(true)}else{n=new XMLHttpRequest;n.open("HEAD",this.at_2x_path);n.onreadystatechange=function(){if(n.readyState!=4){return e(false)}if(n.status>=200&&n.status<=399){if(t.check_mime_type){var o=n.getResponseHeader("Content-Type");if(o==null||!o.match(/^image/i)){r.skip_paths[i.at_2x_path]=1;s();return e(false)}}r.confirmed_paths[i.at_2x_path]=1;s();return e(true)}else{r.skip_paths[i.at_2x_path]=1;s();return e(false)}};n.send()}};e.RetinaImage=a;a.prototype.swap=function(e){function n(){if(!t.el.complete){setTimeout(n,5)}else{t.el.setAttribute("width",t.el.offsetWidth);t.el.setAttribute("height",t.el.offsetHeight);t.el.setAttribute("src",e)}}if(typeof e=="undefined")e=this.path.at_2x_path;var t=this;n()};if(n.isRetina()){n.init(e)}})()