/*
	Solid State by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

	// Menu.
		var $menu = $('#menu');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();

				// Hide.
					$menu._hide();

			})
			.find('.inner')
				.on('click', '.close', function(event) {

					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();

					// Hide.
						$menu._hide();

				})
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				});

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

})(jQuery);
// Variáveis globais
let isPlaying = false;
let audioElement;


function setupAudio() {
	let page = window.location.pathname.split('/').pop();
	let audioUrl;

	let isFileProtocol = window.location.protocol === 'file:';


	switch(page) {
		case 'index.html':
			audioUrl = isFileProtocol ? 'audio/main.mp3' : '/audio/main.mp3';
			break;
		case 'elements.html':
			audioUrl = isFileProtocol ? 'audio/Facu.mp3' : '/audio/Facu.mp3';
			break;
		case 'Entrevistas.html':
			audioUrl = isFileProtocol ? 'audio/Entrevista.mp3' : '/audio/Entrevista.mp3';
			break;
		case 'fgv.html':
			audioUrl = isFileProtocol ? 'audio/fgv.mp3' : '/audio/fgv.mp3';
			break;
		case 'generic.html':
			audioUrl = isFileProtocol ? 'audio/gerenciadeProjetos.mp3' : '/audio/gerenciadeProjetos.mp3';
			break;
		case 'ibmec.html':
			audioUrl = isFileProtocol ? 'audio/MBA.mp3' : '/audio/MBA.mp3';
			break;
		case 'Profissoes.html':
			audioUrl = isFileProtocol ? 'audio/Profi.mp3' : '/audio/Profi.mp3';
			break;
		case 'puc.html':
			audioUrl = isFileProtocol ? 'audio/PUC.mp3' : '/audio/PUC.mp3';
			break;
		case 'usp.html':
			audioUrl = isFileProtocol ? 'audio/USP.mp3' : '/audio/USP.mp3';
			break;
	}


	if (audioUrl) {
		audioElement = new Audio(audioUrl);
	}
}

// Função que lida com o clique no mascote
function handleMascoteClick() {
    const mascoteImg = document.getElementById('mascote-img');
    const mascoteVideo = document.getElementById('mascote-video');

    if (!isPlaying) {
        mascoteImg.style.display = 'none';  // Esconde a imagem
        mascoteVideo.style.display = 'block';  // Mostra o vídeo
        mascoteVideo.play();  // Reproduz o vídeo
        audioElement.play();  // Reproduz o áudio

        isPlaying = true;

        // Quando o áudio termina, volta para a imagem
        audioElement.onended = function() {
            mascoteVideo.pause();
            mascoteVideo.currentTime = 0;
            mascoteVideo.style.display = 'none';
            mascoteImg.style.display = 'block';
            isPlaying = false;
        };
    } else {
        // Se já estiver tocando, pausar o áudio e vídeo
        audioElement.pause();
        audioElement.currentTime = 0;  // Reseta o áudio
        mascoteVideo.pause();
        mascoteVideo.currentTime = 0;
        mascoteVideo.style.display = 'none';
        mascoteImg.style.display = 'block';
        isPlaying = false;
    }
}

// Adiciona o evento de clique ao mascote quando a página é carregada
document.addEventListener('DOMContentLoaded', function() {
    setupAudio();  // Configura o áudio com base na página atual
    document.getElementById('mascote-wrapper').addEventListener('click', handleMascoteClick);
});
