// JavaScript Document
$(document).ready(function() {
  $(function(){
    var width = $('.brand').width() / 2;
    $('.brand').css('margin-left',-width);
  });
  if ($('.website_blog').length) {
    $('header a.navbar-brand img').css('max-height', '75px');

		function breakList(numOfLists, list){
			var ul = list.addClass("sides");
			var lis = ul.children()
			var listLength = list.children('ul > li').length;
			var numInRow = Math.ceil(listLength / numOfLists);
			var newCol = $('<ul />', {"class": "nav navbar-nav navbar-right sides"}).insertAfter(ul);
			lis.each(function(i) {
				i > numInRow-1 && $(this).appendTo(newCol); // Move `li` elements with index greater than middle
			});
		}
		breakList(2, $("#top_menu"));
		$('#mainnavbar').css('height', '50px');
		$('.page2fix').css('paddingTop', '0px');
		$('.sides').css('paddingTop', '0px');
		$('header a.navbar-brand img').css('max-height', '75px');
        function page_transist(event) {
            event.preventDefault();
            newLocation = $('.js_next')[0].href;
            var top = $('.cover_footer').offset().top;
            $('.cover_footer').animate({
                height: $(window).height()+'px'
            }, 300);
            $('html, body').animate({
                scrollTop: top
            }, 300, 'swing', function() {
               window.location.href = newLocation;
            });
        }
        function animate(event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            var target = $(this.hash);
            $('html, body').stop().animate({
                'scrollTop': target.offset().top - 32
            }, 500, 'swing', function () {
                window.location.hash = 'blog_content';
            });
        }

        var content = $("div[enable_chatter_discuss='True']").find('p[data-chatter-id]');
        if (content) {
            openerp.jsonRpc("/blog/get_user/", 'call', {}).then(function(data){
                $('#discussions_wrapper').empty();
                new openerp.website.blog_discussion({'content' : content, 'public_user':data[0]});
            });
        }

        $('.js_fullheight').css('min-height', $(window).height());
        $(".js_tweet").share({'author_name':$('#blog_author').text()});
        $('.cover_footer').on('click',page_transist);
        $('a[href^="#blog_content"]').on('click', animate);

    }
	else{
		$('header a.navbar-brand img').css('max-height', '75px');
		function breakList(numOfLists, list){
			var ul = list.addClass("sides");
			var lis = ul.children()
			var listLength = list.children('ul > li').length;
			var numInRow = Math.ceil(listLength / numOfLists);
			var newCol = $('<ul />', {"class": "nav navbar-nav navbar-right sides"}).insertAfter(ul);
			lis.each(function(i) {
				i > numInRow-1 && $(this).appendTo(newCol); // Move `li` elements with index greater than middle
			});
		}
		breakList(2, $("#top_menu"));

		function doStuff(){
			landscape = window.orientation? window.orientation=='landscape' : true;

			if(landscape && window.innerWidth > 991){
				$('header a.navbar-brand img').css('max-height', '250px');

				//code here

				$(function(){
					var width = $('.brand').width() / 2;
					$('#mainnavbar').data('size','big');
					$('.brand').css('margin-left',-width);
				});
				$('#mainnavbar').data('size','big');
				$(window).scroll(function() {
					var originalState = $("#wrap").clone();
					var hT = $('#inanon').offset().top,
					   hH = $('#inanon').outerHeight(),
					   wH = $(window).height(),
					   wS = $(this).scrollTop(),
					   element = document.querySelector('#ahbmenu');
					console.log((hT-wH) , wS);

					if (wS > (hH+5)){
						$("#mainnavbar").removeClass("navbar-static-top").addClass("navbar-fixed-top");
						$('#wrap').addClass("wrap-top");
						if($('#mainnavbar').data('size') == 'big'){
							$('#mainnavbar').data('size','small');
							$('#mainnavbar').stop().animate({
								height:'50px'
							},1000);
							$('.wrap-top').animate({
								marginTop: '50px'
							}, 1000);
							$('.sides').css('paddingTop', '100px');
							$('.sides').animate({
								paddingTop: '0px'
							}, 1000);
							$('header a.navbar-brand img').css('height', '250px');
							$('header a.navbar-brand img').animate({
								height: '100px'
							}, 1000);
							$('header a.navbar-brand img').finish();
					   }

					}
					else{
						$("#mainnavbar").removeClass("navbar-fixed-top").addClass("navbar-static-top");
						$('#wrap').removeClass("wrap-top");
						$("#wrap").removeAttr('style');
						$('.page2fix').css('margin', '0px', 'paddingTop', '10px');
						if($('#mainnavbar').data('size') == 'small'){
							$('#mainnavbar').data('size','big');
							$('#mainnavbar').stop().animate({
								height:'250px'
							},1000);
							$('.sides').animate({
								paddingTop: '100px'
							}, 1000);
							$('header a.navbar-brand img').animate({
								height: '250px'
							}, 1000);
						}

					}

				});

			}
			else{
        $('header a.navbar-brand img').css('max-height', '100px');
				$(function(){
				  var width = $('.brand').width() / 2;
				  $('.brand').css('margin-left',-width);
				});
				$(window).scroll(function() {
					var originalState = $("#wrap").clone();
					var hT = $('#inanon').offset().top,
					   hH = $('#inanon').outerHeight(),
					   wH = $(window).height(),
					   wS = $(this).scrollTop(),
					   element = document.querySelector('#ahbmenu');
					console.log((hT-wH) , wS);

					if (wS > (hH+5)){
						$("#mainnavbar").removeClass("navbar-static-top").addClass("navbar-fixed-top");
					}


					else{
						$("#mainnavbar").removeClass("navbar-fixed-top").addClass("navbar-static-top");
					}

				});

			}
		}
		window.onload=window.onresize=doStuff;
		if(window.onorientationchange){
			window.onorientationchange=doStuff;
		}

		if ($("#headanon")){
			document.getElementById('inanon').appendChild(
				document.getElementById('page1')
			);
		}
		else{

		}

	}

});
$('.pull-down').each(function() {
    $(this).css('margin-top', $(window).height()-$(this).height())
});
