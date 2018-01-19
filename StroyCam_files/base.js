(function() {
  // Начало секции публичных параметров
  var maxKeywordsStringLength = 200;
  var maxWordLength = 40;
  // Конец секции публичных параметров

  var WINDOW_MIN_WIDTH = 320;
  var WINDOW_MAX_WIDTH = 450;

  var FULLSCREEN_BANNER_TYPE = 'Fullscreen';

  var windowLink = top.window;
  var documentLink = top.document;

  var isDeviceMobileByScreen = checkDeviceIsMobileByScreen();
  var isDeviceMobileByUA = checkDeviceIsMobileByUA();
  var bannerType = getBannerType();

  var isDeviceSuitable = isDeviceMobileByScreen || (bannerType === FULLSCREEN_BANNER_TYPE && isDeviceMobileByUA);

  if (isDeviceSuitable) {
    if (documentLink.readyState === 'loading') {
      documentLink.addEventListener('DOMContentLoaded', initializeFn);
    } else {
      initializeFn();
    }
  }

  var trackingParams = {
    noMobile: !isDeviceMobileByScreen,
    ua: windowLink.navigator.userAgent,
    width: windowLink.innerWidth,
  };

  addTrackingPixel(trackingParams);

  function checkDeviceIsMobileByScreen() {
    return (windowLink.innerWidth >= WINDOW_MIN_WIDTH) && (windowLink.innerWidth <= WINDOW_MAX_WIDTH);
  }

  function checkDeviceIsMobileByUA() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent);
  }

  function getBannerType() {
    var pathParts = '/145047668/MF/Fullscreen'.split('/');
    return pathParts[pathParts.length - 1];
  }

  function addTrackingPixel(trackingParams) {
    var paramsString = '';
    var delim = '?';

    for (var param in trackingParams) {
      var value = trackingParams[param];
      paramsString += (delim + param + '=' + encodeURIComponent(value));
      delim = '&';
    }

    new Image().src = 'http://d.mobilebanner.ru/p.gif' + paramsString;
  }

  function initializeFn() {
    windowLink.googletag = windowLink.googletag || {};
    windowLink.googletag.cmd = windowLink.googletag.cmd || [];

    initializeDfp();
    setupDfp();
    makeBannerPlace();

    function setupDfp() {
      windowLink.googletag.cmd.push(function() {
        setTargeting();
  
        var slot = windowLink.googletag.defineSlot('/145047668/MF/Fullscreen', [[1, 1]], 'div-gpt-ad-3709494');
        
        
          windowLink.segId = ['71105', '71153', '711535', '7171', '7191', '770000'];
          slot = slot.setTargeting('seg_id', windowLink.segId);
        
        
        
        slot.addService(windowLink.googletag.pubads());
        windowLink.googletag.pubads().enableSingleRequest();
        windowLink.googletag.enableServices();
      });
    }

    function initializeDfp() {
      var gads = documentLink.createElement('script');
      var useSSL = 'https:' == documentLink.location.protocol;
      var node = documentLink.getElementsByTagName('script')[0];
      
      gads.async = true;
      gads.type = 'text/javascript';
      gads.src = (useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js';
      
      node.parentNode.insertBefore(gads, node);
    }

    function makeBannerPlace() {
      var div = documentLink.createElement('div');
      var ad = documentLink.createElement('script');
      
      ad.type = 'text/javascript';
      ad.text = "googletag.cmd.push(function() { googletag.display('div-gpt-ad-3709494'); });";

      div.id = 'div-gpt-ad-3709494';
      div.appendChild(ad);
      documentLink.body.appendChild(div);
    }

    function setTargeting() {
      var ads = windowLink.googletag.pubads();
      var location = documentLink.location;

      ads.setTargeting('site_url', [location.toString()]);
      ads.setTargeting('site_hash', [location.hash.toString().substr(1, 200)]);
      ads.setTargeting('site_domain', [location.hostname.toString()]);
      ads.setTargeting('site_refferer', [documentLink.referrer.toString()]);
      ads.setTargeting('keywords', [getKeywordsString()]);
      ads.setTargeting('sbc', ['zCALOHu1L0raSkoW12dodQ==']);
    }

    function getKeywordsString() {
      var searchTags = ['keywords', 'description'];
      var keyWords = [];

      if (documentLink.title) {
        var words = stringToArray(documentLink.title);
        keyWords = keyWords.concat(words);
      }

      var tags = documentLink.getElementsByTagName('meta');
      for (var i = 0; i < tags.length; i++) {
        var tag = tags[i];
        var tagName = tag.getAttribute('name');

        if (tagName && searchTags.indexOf(tagName.toLowerCase()) !== -1) {
          tagContent = tag.getAttribute('content');
          var words = stringToArray(tagContent);
          keyWords = keyWords.concat(words);
        }
      }

      for (var i = 0; i < keyWords.length; i++) {
        if (keyWords[i].length > maxWordLength) {
          keyWords[i] = keyWords[i].substr(0, maxWordLength);
        }
      }

      var resultKeyWordsStr;
      for (var i = 1; i < keyWords.length + 1; i++) {
        var subKeyWords = keyWords.slice(0, i);
        var subKeyWordsStr = subKeyWords.join(' ');
        if (subKeyWordsStr.length <= maxKeywordsStringLength) {
          resultKeyWordsStr = subKeyWordsStr;
        }
      }

      return resultKeyWordsStr;

      function stringToArray(str) {
        return str.replace(/[^a-zA-Z0-9а-яА-Я- ]+/g, ' ').replace(/\s\s+/g, ' ').trim().split(' ');
      }
    }
  }
})();
