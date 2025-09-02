'use strict';

(function(window,
	undefined) {

  const url = '/search/services/v1/quick-links/',
        analyticsURL = '/search/services/v1/analytics-quick-links/',
        ul = document.getElementById('defaultlinks')
  
  var store = window.store = {
      get  : function(key) {
          var entry = JSON.parse(localStorage.getItem(key)||"0");

          if (!entry) return null

          if (entry.ttl && entry.ttl + entry.now < now()) {
              localStorage.removeItem(key)
              return null
          }

          return entry.value
      },
      set : function( key, value, ttl ) {
          localStorage.setItem( key, JSON.stringify({
              ttl   : ttl || 0,
              now   : now(),
              value : value
          }) );
      }
  };

  const avoidPaths = [
  ]

  function now () {

    return+new Date

  }

  function includeCheckox(path) {

    let inputChk = document.getElementById("group-input")
    let spanGroup = document.getElementById("group-search-label")
    inputChk.value = path.searchKey
    spanGroup.textContent = path.label

  }

  function pathMatch(paths, avoidPaths){
   
    var pathname = window.location.pathname

    const match = paths.filter(r => pathname.includes(r.path))
    const avoidMatch = avoidPaths.filter(q => pathname.includes(q))

    if(match.length >=1 && avoidMatch.length == 0){

       includeCheckox(match[0])
       var searchGroupContainer = document.getElementsByClassName('search-group-checkbox')
       searchGroupContainer[0].classList.remove('hidden')
      return match[0]
    }
    return false
  }

  function createNode (element) {
    return document.createElement(element)
  }

  function append (parent, el) {
    return parent.appendChild(el)
  }

  function addAnalyticsEvent(id, event = 'click', url) {
    document.getElementById(id).addEventListener(event, function(e) {
      fetch(analyticsURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(getAnalyticsBody(url)),
        keepalive: true
      })
    });
  }

  function getAnalyticsBody(url) {
    
    const body = {
      url : url
    }

    return body;

  }

  function setQuickLinks (url) {

    let lang = 'en'
    if (window.location.href.indexOf("/cn/") > -1) {
      lang = 'cn'
    }
    if (window.location.href.indexOf("/jp/") > -1) {
      lang = 'jp'
    }
    if (window.location.href.indexOf("/kr/") > -1) {
      lang = 'kr'
    }

    var cachedGroupLinks = false; //store.get("groupLinks_" + lang)

    if(cachedGroupLinks){

      let quickLinks = cachedGroupLinks.data
      let pathsData = cachedGroupLinks.config
      let lang = cachedGroupLinks.lang

      if(Array.isArray(quickLinks) && quickLinks.length){

        var pathObj = pathMatch(pathsData, avoidPaths)

        var handlers = {}

        handlers.onChangeGroupCheckbox = function(e, pathObj) {
          onChangeGroupCheckbox(e, pathObj)
        }

        let inputChk = document.getElementById("group-input")
        
        inputChk.addEventListener('change', handlers.onChangeGroupCheckbox)
        inputChk.pathObj = pathObj;
        prepareCheckedState(inputChk);

        quickLinks.map(function (quickLink, index) {
          let li = createNode('li')
          let a = createNode('a')
          a.href = quickLink.url
          a.innerHTML = `${quickLink.title}`
          a.id = 'search-group-link-'+index

          li.classList.add('ac-gn-searchresults-item', 'ac-gn-searchresults-animated')
          a.classList.add('ac-gn-searchresults-link', 'ac-gn-searchresults-link-defaultlinks')
          
          append(li, a)
          append(ul, li)

          let searchContainer = document.getElementById('ac-gn-searchresults')
          searchContainer.classList.remove('hidden')

          addAnalyticsEvent('search-group-link-'+index, 'click', quickLink.url)

        })
      }

    }else{

    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        let quickLinks = data.data
        let pathsData = data.config
        let lang = data.lang
        
        if(Array.isArray(quickLinks) && quickLinks.length){

          var pathObj = pathMatch(pathsData, avoidPaths)

          var handlers = {}

          handlers.onChangeGroupCheckbox = function(e, pathObj) {
            onChangeGroupCheckbox(e, pathObj)
          }

          let inputChk = document.getElementById("group-input")
          
          inputChk.addEventListener('change', handlers.onChangeGroupCheckbox)
          inputChk.pathObj = pathObj;
          prepareCheckedState(inputChk);

          quickLinks.map(function (quickLink, index) {
            let li = createNode('li')
            let a = createNode('a')
            a.href = quickLink.url
            a.innerHTML = `${quickLink.title}`
            a.id = 'search-group-link-'+index

            li.classList.add('ac-gn-searchresults-item', 'ac-gn-searchresults-animated')
            a.classList.add('ac-gn-searchresults-link', 'ac-gn-searchresults-link-defaultlinks')
            
            append(li, a)
            append(ul, li)
  
            let searchContainer = document.getElementById('ac-gn-searchresults')
            searchContainer.classList.remove('hidden')
            
            store.set( "groupLinks_" + lang, data, 60 * 60 * 1000 );
  
            addAnalyticsEvent('search-group-link-'+index, 'click', quickLink.url)
  
          })
          

        }


       

      })
      .catch(function (error) {})
    }

  }

  function onChangeGroupCheckbox(e) {
    let input = e.currentTarget
    let pathObj = e.currentTarget.pathObj
    let searchForm = document.getElementById('ac-gn-searchform')


		if (input.checked == true){

      let searchInput = createNode('input')

      searchInput.type = 'hidden'
      searchInput.id = 'search-hidden-input'

      switch (pathObj.type) {
        case "new-tab":
          
          searchInput.value = pathObj.searchKey
          searchInput.name = 'group'
    
          append(searchForm, searchInput)
          break;

        case "same-tab":

          searchInput.value = pathObj.searchKey         
          searchInput.name = 'type'
    
          append(searchForm, searchInput)
          break;
      
        default:
          break;
      }

    }else{
      if(document.getElementById("search-hidden-input") !== null){

        document.getElementById("search-hidden-input").remove();
        
      }
    }
  }

  function prepareCheckedState(chkBox) {
    let input = chkBox
    let pathObj = chkBox.pathObj
    let searchForm = document.getElementById('ac-gn-searchform')


		if (input.checked == true){

      let searchInput = createNode('input')

      searchInput.type = 'hidden'
      searchInput.id = 'search-hidden-input'

      if(typeof(pathObj.type) !== 'undefined' && pathObj.type.length){
        
        switch (pathObj.type) {
          case "new-tab":
            
            searchInput.value = pathObj.searchKey
            searchInput.name = 'group'
      
            append(searchForm, searchInput)
            break;
  
          case "same-tab":
  
            searchInput.value = pathObj.searchKey         
            searchInput.name = 'type'
      
            append(searchForm, searchInput)
            break;
        
          default:
            break;
        }

      }

    }else{
      if(document.getElementById("search-hidden-input") !== null){

        document.getElementById("search-hidden-input").remove();
        
      }
    }
  }
	
	(function init() {

    window.addEventListener('DOMContentLoaded', function() {
      
      setQuickLinks(url)

    })
		
	}())
	
}(window))
