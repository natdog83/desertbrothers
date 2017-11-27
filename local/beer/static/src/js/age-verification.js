var modal_content,
modal_screen;

// Start Working ASAP.
$(document).ready(function() {
	av_legality_check();
});


av_legality_check = function() {
	if ($.cookie('age_check') == "yes") {
		// legal!
		// Do nothing?
	} else {
		av_showmodal();

		// Make sure the prompt stays in the middle.
		$(window).on('resize', av_positionPrompt);
	}
};

av_showmodal = function() {
	modal_screen = $('<div id="modal_screen"><video autoplay loop poster="/theme_ahb/static/src/img/bg-home-page-2pints.jpg" id="bgvid"><source src="" type="video/mp4"></video></div>');
	modal_content = $('<div id="modal_content" style="display:none"></div>');
	var modal_content_wrapper = $('<div id="modal_content_wrapper" class="content_wrapper"></div>');
	var modal_regret_wrapper = $('<div id="modal_regret_wrapper" class="content_wrapper" style="display:none;"></div>');

	// Question Content
	var content_heading = $('<h1>Are you 21 or older?</h1>');
	var content_buttons = $('<nav><ul><li><a href="#nothing" class="av_btn av_go" rel="yes">Yes</a></li><li><a href="#nothing" class="av_btn av_no" rel="no">No</a></li></nav');
	var content_text = $('<p>You must verify that you are 21 years of age or older to enter this site.</p>');

	// Regret Content
	var regret_heading = $('<h1>We\'re Sorry!</h1>');
	var regret_buttons = $('<nav><small>I hit the wrong button!</small> <ul><li><a href="#nothing" class="av_btn av_go" rel="yes">I\'m old enough!</a></li></ul></nav>');
	var regret_text = $('<p>You must be 21 years of age or older to enter this site.</p><p>You will be redirected to google in <span id="countdown">5</span>.</p>');

	modal_content_wrapper.append(content_heading, content_buttons, content_text);
	modal_regret_wrapper.append(regret_heading, regret_buttons, regret_text);
	modal_content.append(modal_content_wrapper, modal_regret_wrapper);

	// Append the prompt to the end of the document
	$('body').append(modal_screen, modal_content);
	$("body").addClass("modal-open")

	// Center the box
	av_positionPrompt();

	modal_content.find('a.av_btn').on('click', av_setCookie);
};

av_setCookie = function(e) {
	e.preventDefault();

	var age_check = $(e.currentTarget).attr('rel');

	$.cookie('age_check', age_check, {
		expires: 30,
		path: '/'
	});

	if (age_check == "yes") {
		av_closeModal();
		$(window).off('resize');
	} else {
		av_showRegret();
	}
};

av_closeModal = function() {
	modal_content.fadeOut();
	modal_screen.fadeOut();
	$("body").removeClass("modal-open")
};

av_showRegret = function() {
	modal_screen.addClass('nope');
	modal_content.find('#modal_content_wrapper').hide();
	modal_content.find('#modal_regret_wrapper').show();
	var timer = 5,
		el = document.getElementById('countdown');

	(function t_minus() {
		'use strict';
		el.innerHTML = timer--;
		if (timer >= 0) {
			setTimeout(function () {
				t_minus();
			}, 1000);
		} else {
			window.location.href='http://google.com'
		}
	}());
};

av_positionPrompt = function() {
	var top = ($(window).outerHeight() - $('#modal_content').outerHeight()) / 2;
	var left = ($(window).outerWidth() - $('#modal_content').outerWidth()) / 2;
	modal_content.css({
		'top': top,
		'left': left
	});

	if (modal_content.is(':hidden') && ($.cookie('age_check') != "yes")) {
		modal_content.fadeIn('slow')
	}
};