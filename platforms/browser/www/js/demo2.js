/*
 * blueimp Gallery Demo JS
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */

/* global blueimp, $ */

function loadimage(page,times){
  'use strict'
           //1476368354748
   currenttimestamp = moment().valueOf()
   timeSpace=7000000;
   console.log(page);
   console.log(times);
  // Load demo images from flickr:
  $.ajax({
    // Flickr API is SSL only:
    //url: 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&photoset_id=72157671363511194&api_key=f5b0519289af95b90dfb5f05f3dafb8f&user_id=47073853@N02&page=1&format=json',
    url:'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=f5b0519289af95b90dfb5f05f3dafb8f&format=json',
	data: {
      format: 'json',
	  //,
    //  method: 'flickr.interestingness.getList',
    //  api_key: '7617adae70159d09ba78cfec73c13be3' // jshint ignore:line
		per_page :100,
		page: page ,
		max_upload_date :Math.round(currenttimestamp/1000) - (timeSpace*(times-1)) ,
		min_upload_date :Math.round(currenttimestamp/1000) - (timeSpace*times),
		//min_upload_date :Math.round(moment('2016-06-01 00:00:00', 'YYYY-MM-DD HH:mm:ss').valueOf()/1000),
		sort:"date-taken-desc",
		text:"japan cosplay festival"
    },
    dataType: 'jsonp',
    jsonp: 'jsoncallback'
  }).success(function (result) {
	
	  pages=result.photos.pages;
	  count=result.photos.photo.length;
	  if(count==0){
		getphoto();
		return;
	  }

	  console.log("page"+page)
	  console.log("times"+times)
	  
	  
    var carouselLinks = []
    var linksContainer = $('#links')
	console.log(result)
	console.log(Math.round(currenttimestamp/1000) - (timeSpace*(times-1)))
	console.log(Math.round(currenttimestamp/1000) - (timeSpace*times))
//debugger;
    // Add the demo images as links with thumbnails to the page:

		
	if(page < pages){
		$.each(result.photos.photo , function (index, photo) {
		  var baseUrl = 'https://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret
		  $('<a/>')
			.append($('<img>').prop('src', baseUrl + '_s.jpg'))
			.prop('class', "page" + page)
			.prop('href', baseUrl + '_b.jpg')
			.prop('title', "Download")
			.attr('data-gallery', "")
		   .appendTo(linksContainer)
			//  carouselLinks.push({
			//    href: baseUrl + '_c.jpg',
			//    title: photo.title
			//  })
		})
	
	   if(count<20){
		getphoto();
		return;
	  }
	}else{
		while(callajaximagepage> pages){
			callajaximagepage=r.get();		
		}
		getphoto();
		return;
	}
    // Initialize the Gallery as image carousel:
	/*
    blueimp.Gallery(carouselLinks, {
      container: '#blueimp-image-carousel',
      carousel: true
    })
	*/
  })

  // Initialize the Gallery as video carousel:
  /*
  blueimp.Gallery([
    {
      title: 'Sintel',
      href: 'https://archive.org/download/Sintel/sintel-2048-surround_512kb.mp4',
      type: 'video/mp4',
      poster: 'https://i.imgur.com/MUSw4Zu.jpg'
    },
    {
      title: 'Big Buck Bunny',
      href: 'https://upload.wikimedia.org/wikipedia/commons/7/75/' +
        'Big_Buck_Bunny_Trailer_400p.ogg',
      type: 'video/ogg',
      poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/' +
        'Big.Buck.Bunny.-.Opening.Screen.png/' +
        '800px-Big.Buck.Bunny.-.Opening.Screen.png'
    },
    {
      title: 'Elephants Dream',
      href: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/8/83/' +
        'Elephants_Dream_%28high_quality%29.ogv/' +
        'Elephants_Dream_%28high_quality%29.ogv.360p.webm',
      type: 'video/webm',
      poster: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/' +
        'Elephants_Dream_s1_proog.jpg/800px-Elephants_Dream_s1_proog.jpg'
    },
    {
      title: 'LES TWINS - An Industry Ahead',
      type: 'text/html',
      youtube: 'zi4CIXpx7Bg'
    },
    {
      title: 'KN1GHT - Last Moon',
      type: 'text/html',
      vimeo: '73686146',
      poster: 'https://secure-a.vimeocdn.com/ts/448/835/448835699_960.jpg'
    }
  ], {
    container: '#blueimp-video-carousel',
    carousel: true
  })
  */
}
