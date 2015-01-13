(function(){var anchoredLink,assets,assetsChanged,browserCompatibleDocumentParser,browserSupportsPushState,cacheCurrentPage,changePage,constrainPageCacheTo,createDocument,crossOriginLink,currentState,executeScriptTags,extractAssets,extractLink,extractTitleAndBody,fetchHistory,fetchReplacement,handleClick,ignoreClick,initialized,installClickHandlerLast,intersection,noTurbolink,nonHtmlLink,nonStandardClick,pageCache,recallScrollPosition,referer,reflectNewUrl,reflectRedirectedUrl,rememberCurrentAssets,rememberCurrentState,rememberCurrentUrl,rememberInitialPage,resetScrollPosition,samePageLink,triggerEvent,visit,__indexOf=[].indexOf||function(e){for(var t=0,r=this.length;r>t;t++)if(t in this&&this[t]===e)return t;return-1};initialized=!1,currentState=null,referer=document.location.href,assets=[],pageCache=[],createDocument=null,visit=function(e){return browserSupportsPushState?(cacheCurrentPage(),reflectNewUrl(e),fetchReplacement(e)):document.location.href=e},fetchReplacement=function(e){var t;return triggerEvent("page:fetch"),t=new XMLHttpRequest,t.open("GET",e,!0),t.setRequestHeader("Accept","text/html, application/xhtml+xml, application/xml"),t.setRequestHeader("X-XHR-Referer",referer),t.onload=function(){return function(){var r;return r=createDocument(t.responseText),assetsChanged(r)?document.location.href=e:(changePage.apply(null,extractTitleAndBody(r)),reflectRedirectedUrl(t),resetScrollPosition(),triggerEvent("page:load"))}}(this),t.onabort=function(){return console.log("Aborted turbolink fetch!")},t.send()},fetchHistory=function(e){var t;return cacheCurrentPage(),(t=pageCache[e.position])?(changePage(t.title,t.body),recallScrollPosition(t),triggerEvent("page:restore")):fetchReplacement(document.location.href)},cacheCurrentPage=function(){return rememberInitialPage(),pageCache[currentState.position]={url:document.location.href,body:document.body,title:document.title,positionY:window.pageYOffset,positionX:window.pageXOffset},constrainPageCacheTo(10)},constrainPageCacheTo=function(e){return delete pageCache[currentState.position-e]},changePage=function(e,t){return document.title=e,document.documentElement.replaceChild(t,document.body),executeScriptTags(),currentState=window.history.state,triggerEvent("page:change")},executeScriptTags=function(){var script,_i,_len,_ref,_ref1,_results;for(_ref=document.body.getElementsByTagName("script"),_results=[],_i=0,_len=_ref.length;_len>_i;_i++)script=_ref[_i],(""===(_ref1=script.type)||"text/javascript"===_ref1)&&_results.push(eval(script.innerHTML));return _results},reflectNewUrl=function(e){return e!==document.location.href?(referer=document.location.href,window.history.pushState({turbolinks:!0,position:currentState.position+1},"",e)):void 0},reflectRedirectedUrl=function(e){var t;return(t=e.getResponseHeader("X-XHR-Current-Location"))?window.history.replaceState(currentState,"",t):void 0},rememberCurrentUrl=function(){return window.history.replaceState({turbolinks:!0,position:window.history.length-1},"",document.location.href)},rememberCurrentState=function(){return currentState=window.history.state},rememberCurrentAssets=function(){return assets=extractAssets(document)},rememberInitialPage=function(){return initialized?void 0:(rememberCurrentUrl(),rememberCurrentState(),createDocument=browserCompatibleDocumentParser(),initialized=!0)},recallScrollPosition=function(e){return window.scrollTo(e.positionX,e.positionY)},resetScrollPosition=function(){return window.scrollTo(0,0)},triggerEvent=function(e){var t;return t=document.createEvent("Events"),t.initEvent(e,!0,!0),document.dispatchEvent(t)},extractAssets=function(e){var t,r,n,o,i;for(o=e.head.childNodes,i=[],r=0,n=o.length;n>r;r++)t=o[r],(t.src||t.href)&&i.push(t.src||t.href);return i},assetsChanged=function(e){return intersection(extractAssets(e),assets).length!==assets.length},intersection=function(e,t){var r,n,o,i,c;for(e.length>t.length&&(i=[t,e],e=i[0],t=i[1]),c=[],n=0,o=e.length;o>n;n++)r=e[n],__indexOf.call(t,r)>=0&&c.push(r);return c},extractTitleAndBody=function(e){var t;return t=e.querySelector("title"),[null!=t?t.textContent:void 0,e.body]},browserCompatibleDocumentParser=function(){var e,t,r,n;return e=function(e){return(new DOMParser).parseFromString(e,"text/html")},t=function(e){var t;return t=document.implementation.createHTMLDocument(""),t.open("replace"),t.write(e),t.close,t},window.DOMParser&&(r=e("<html><body><p>test")),1===(null!=r&&null!=(n=r.body)?n.childNodes.length:void 0)?e:t},installClickHandlerLast=function(e){return e.defaultPrevented?void 0:(document.removeEventListener("click",handleClick),document.addEventListener("click",handleClick))},handleClick=function(e){var t;return e.defaultPrevented||(t=extractLink(e),"A"!==t.nodeName||ignoreClick(e,t))?void 0:(visit(t.href),e.preventDefault())},extractLink=function(e){var t;for(t=e.target;t!==document&&"A"!==t.nodeName;)t=t.parentNode;return t},samePageLink=function(e){return e.href===document.location.href},crossOriginLink=function(e){return location.protocol!==e.protocol||location.host!==e.host},anchoredLink=function(e){return(e.hash&&e.href.replace(e.hash,""))===location.href.replace(location.hash,"")||e.href===location.href+"#"},nonHtmlLink=function(e){return e.href.match(/\.[a-z]+(\?.*)?$/g)&&!e.href.match(/\.html?(\?.*)?$/g)},noTurbolink=function(e){for(var t;!t&&e!==document;)t=null!=e.getAttribute("data-no-turbolink"),e=e.parentNode;return t},nonStandardClick=function(e){return e.which>1||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey},ignoreClick=function(e,t){return crossOriginLink(t)||anchoredLink(t)||nonHtmlLink(t)||noTurbolink(t)||nonStandardClick(e)},browserSupportsPushState=window.history&&window.history.pushState&&window.history.replaceState&&void 0!==window.history.state,browserSupportsPushState&&(rememberCurrentAssets(),document.addEventListener("click",installClickHandlerLast,!0),window.addEventListener("popstate",function(e){var t;return(null!=(t=e.state)?t.turbolinks:void 0)?fetchHistory(e.state):void 0})),this.Turbolinks={visit:visit}}).call(this);