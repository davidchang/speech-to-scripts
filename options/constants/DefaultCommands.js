var convertFunctionToString = fn => `(${fn.toString()})()`;

// TODO can this be replaced with ES6 interpolated strings?
var search = () => {
  var options = {
    'ask': 'http://www.ask.com/web?q=%s',
    'bing': 'http://www.bing.com/search?q=%s',
    'google': 'https://www.google.com/search?q=%s',
    'yahoo': 'http://search.yahoo.com/search?p=%s'
  };
  var query = captured;

  var getSearchEngineRegex = new RegExp('(.*) on (google|bing|ask|yahoo)$');
  var searchEngine = getSearchEngineRegex.exec(query);

  if (!searchEngine) {
    searchEngine = 'google';
  } else {
    query = searchEngine[searchEngine.length - 2];
    searchEngine = searchEngine[searchEngine.length - 1];
    if (!options[searchEngine]) {
      searchEngine = 'google';
    }
  }

  window.open(options[searchEngine].replace('%s', encodeURIComponent(query)));
};

var imageSearch = () => {
  var options = {
    'ask': 'http://www.ask.com/pictures?q=%s',
    'bing': 'http://www.bing.com/images/search?q=%s',
    'flickr': 'http://www.flickr.com/search/?q=%s',
    'google': 'https://www.google.com/search?tbm=isch&q=%s',
    'imgur': 'http://imgur.com/gallery?q=%s',
    'yahoo': 'http://images.search.yahoo.com/search/images?p=%s'
  };
  var query = captured;

  var getSearchEngineRegex = new RegExp('(.*) on (ask|bing|flickr|google|imgur|yahoo)$');
  var searchEngine = getSearchEngineRegex.exec(query);

  if (!searchEngine) {
    searchEngine = 'google';
  } else {
    query = searchEngine[searchEngine.length - 2];
    searchEngine = searchEngine[searchEngine.length - 1];
    if (!options[searchEngine]) {
      searchEngine = 'google';
    }
  }

  window.open(options[searchEngine].replace('%s', encodeURIComponent(query)));
};

var videoSearch = () => {
  var options = {
    'ask': 'http://www.ask.com/youtube?q=%s',
    'bing': 'http://www.bing.com/videos/search?q=%s',
    'dailymotion': 'http://www.dailymotion.com/relevance/search/%s',
    'google': 'https://www.google.com/search?tbm=vid&q=%s',
    'hulu': 'http://www.hulu.com/search?q=%s',
    'metacafe': 'http://www.metacafe.com/topics/%s',
    'netflix': 'http://dvd.netflix.com/Search?v1=%s',
    'twitch': 'http://www.twitch.tv/search?query=%s',
    'vimeo': 'http://vimeo.com/search?q=%s',
    'youtube': 'https://www.youtube.com/results?search_query=%s'
  };
  var query = captured;

  var getSearchEngineRegex = new RegExp('(.*) on (ask|bing|dailymotion|google|hulu|metacafe|netflix|twitch|vimeo|youtube)$');
  var searchEngine = getSearchEngineRegex.exec(query);

  if (!searchEngine) {
    searchEngine = 'youtube';
  } else {
    query = searchEngine[searchEngine.length - 2];
    searchEngine = searchEngine[searchEngine.length - 1];
    if (!options[searchEngine]) {
      searchEngine = 'youtube';
    }
  }

  window.open(options[searchEngine].replace('%s', encodeURIComponent(query)));
};

var mapSearch = () => {
  var options = {
    'google': 'https://maps.google.com/maps?q=%s',
    'bing': 'http://www.bing.com/maps/?q=%s',
    'yahoo': 'http://maps.yahoo.com/#q=%s'
  };
  var query = captured;

  var getSearchEngineRegex = new RegExp('(.*) on (google|bing|yahoo)$');
  var searchEngine = getSearchEngineRegex.exec(query);

  if (!searchEngine) {
    searchEngine = 'google';
  } else {
    query = searchEngine[searchEngine.length - 2];
    searchEngine = searchEngine[searchEngine.length - 1];
    if (!options[searchEngine]) {
      searchEngine = 'google';
    }
  }

  window.open(options[searchEngine].replace('%s', encodeURIComponent(query)));
};

var directionsSearch = () => {
  var options = {
    'google': 'http://maps.google.com/maps?daddr=%s'
  };
  var query = captured;

  window.open(options.google.replace('%s', encodeURIComponent(query)));
};

var musicSearch = () => {
  var options = {
    'amazon': 'https://www.amazon.com/gp/dmusic/mp3/player#searchSongs/searchTerm=%s',
    'google': 'https://play.google.com/music/listen?u=0#%s_sr',
    'grooveshark': 'http://grooveshark.com/#!/search?q=%s',
    'lastfm': 'http://www.last.fm/search?q=%s',
    'pandora': 'http://www.pandora.com/search/%s',
    'soundcloud': 'https://soundcloud.com/search?q=%s',
    'spotify': 'https://play.spotify.com/search/%s',
    'youtube': 'http://www.youtube.com/results?search_query=%s'
  };
  var query = captured;

  var getSearchEngineRegex = new RegExp('(.*) on (amazon|google|grooveshark|lastfm|pandora|soundcloud|spotify|youtube)$');
  var searchEngine = getSearchEngineRegex.exec(query);

  if (!searchEngine) {
    searchEngine = 'youtube';
  } else {
    query = searchEngine[searchEngine.length - 2];
    searchEngine = searchEngine[searchEngine.length - 1];
    if (!options[searchEngine]) {
      searchEngine = 'youtube';
    }
  }

  window.open(options[searchEngine].replace('%s', encodeURIComponent(query)));
};

var clickOn = () => {
  $('a, button').each(function() {
    console.log('$(this).text().trim().toLowerCase()', $(this).text().trim().toLowerCase());
    if (captured === $(this).text().trim().toLowerCase()) {
      console.log('CLICKING!!!');
      $(this).click();
    }
  });
};

var playPandora = () => {
  $(captured === 'stop' ? '.pauseButton' : '.playButton').click();
};

var thumbsUpOrDownPandora = () => {
  $(captured === 'up' ? '.thumbUpButton' : '.thumbDownButton').click();
};

var nextSongPandora = () => {
  $('.skipButton').click();
};

var defaultCommands = [
  {
    'keywords' : '^alert hello',
    'script' : 'alert("hello");'
  },
  {
    'keywords' : '^show me google',
    'script' : 'window.open("http://google.com")'
  },
  {
    'keywords' : '^open my tabs',
    'script' : 'window.open("http://facebook.com");\nwindow.open("http://twitter.com");\nwindow.open("http://echojs.com");'
  },
  {
    'keywords' : '^search for (.*)',
    'script' : convertFunctionToString(search)
  },
  {
    'keywords' : '^show me (?:pictures|images|pics|an image|a picture|a pic) of (.*)',
    'script' : convertFunctionToString(imageSearch)
  },
  {
    'keywords' : '^show me (?:videos|a video|a vid) of (.*)',
    'script' : convertFunctionToString(videoSearch)
  },
  {
    'keywords' : '^show me a map of (.*)',
    'script' : convertFunctionToString(mapSearch)
  },
  {
    'keywords' : '^get directions to (.*) from (.*)',
    'script' : convertFunctionToString(directionsSearch)
  },
  {
    'keywords' : '^play (.*)',
    'script' : convertFunctionToString(musicSearch)
  },
  {
    'keywords' : '^click on (.*)',
    'script' : convertFunctionToString(clickOn)
  },
  {
    'keywords' : '(stop|start) playing pandora',
    'script' : convertFunctionToString(playPandora)
  },
  {
    'keywords' : 'thumbs (up|down)',
    'script' : convertFunctionToString(thumbsUpOrDownPandora)
  },
  {
    'keywords' : 'next song',
    'script' : convertFunctionToString(nextSongPandora)
  },
  {
    'keywords' : 'open pandora',
    'script' : 'window.open("http://pandora.com")'
  }
];

export default defaultCommands;