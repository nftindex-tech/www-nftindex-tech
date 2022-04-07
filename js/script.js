jQuery(function ($) {

  setTimeout(function () {
    $(".loader").delay(100).fadeOut().remove();
  }, 500);

  function openBlock(nameClickBl, nameOpenBl) {
      $(nameClickBl).click(function() {
          if($(this).hasClass('open')) {
              $(this).removeClass('open');
              $(nameOpenBl).removeClass('open');
          } else {
              $(this).addClass('open');
              $(nameOpenBl).addClass('open');
          }
          return false;
      });
      $('body').click(function(e) {
        if ($(nameOpenBl).has(e.target).length === 0){
          $(nameOpenBl).removeClass('open');
          $(nameClickBl).removeClass('open');
        }  
      });
  }


  openBlock('.menu-block__btn', '.menu-block__links');
  openBlock('.networks__btn', '.networks__links');
  openBlock('.add-position__btn', '.add-position__block');

  $('.views__link').click(function() {
    $('.views__link').removeClass('active');
    $(this).addClass('active');
  });

  $('.line-item__top').click(function() {
    if($(this).parents('.line-item').hasClass('active')) {
        $(this).parents('.line-item').find('.line-item__bottom').animate({height : 0}, 500, function() {
          $(this).parents('.line-item').removeClass('active');
        });
        $(this).parents('.line-item').find('.line-item__details span').text('Detail');
    } else {
      $(this).parents('.line-item').addClass('active');
      var height1 = $(this).parents('.line-item').find('.line-item__bottom').css('height','auto').outerHeight();
      var answer = $(this).parents('.line-item').find('.line-item__bottom');
      answer.height(1);
      answer.animate({height : height1}, 500);
      $(this).parents('.line-item').find('.line-item__details span').text('Hide');
    }
  });

  $('.grid-item__details').click(function() {
    if($(this).parents('.grid-item').hasClass('active')) {
        $(this).parents('.grid-item').find('.grid-item__bottom').animate({height : 0}, 500, function() {
          $(this).parents('.grid-item').removeClass('active');
        });
        $(this).parents('.grid-item').find('.grid-item__details span').text('Detail');
    } else {
      $(this).parents('.grid-item').addClass('active');
      var height1 = $(this).parents('.grid-item').find('.grid-item__bottom').css('height','auto').outerHeight();
      var answer = $(this).parents('.grid-item').find('.grid-item__bottom');
      answer.height(1);
      answer.animate({height : height1}, 500);
      $(this).parents('.grid-item').find('.grid-item__details span').text('Hide');
    }
  });
   
  $('.popup__copy').click(function() {
    let btn = $(this);
    let walletId = $('.popup__wallet-id').text().trim();
    navigator.clipboard.writeText(walletId);
    btn.addClass('copied');
    setTimeout(function() {
      btn.removeClass('copied');
    }, 2000);
    return false;
  });

  //canvas
  

  $('canvas').each(function(i, e) {
    let can = $(this)[0];
    let spanProcent = $(this).next().find('.percent-text');
    let spanProcentValue = spanProcent.text().split('%')[0];
    let c = can.getContext('2d');

    let color = '#f9c353';
    if (i == 1 || i == 2) {
      color = '#8b73ef';
    }


    let posX = can.width / 2,
    posY = can.height / 2,
    fps = 1000 / 200,
    procent = 0,
    oneProcent = 360 / 100,
    result = oneProcent * parseInt(spanProcentValue);

    c.lineCap = 'round';
    arcMove();

    function arcMove(){
      var deegres = 0;
      var acrInterval = setInterval (function() {
        deegres += 1;
        c.clearRect( 0, 0, can.width, can.height );
        procent = deegres / oneProcent;
        spanProcent.text(procent.toFixed() + '%');
        c.beginPath();
        c.arc( posX, posY, 75, (Math.PI/180) * 270, (Math.PI/180) * (270 + 360) );
        c.strokeStyle = '#dadada';
        c.lineWidth = '3';
        c.stroke();
  
        c.beginPath();
        c.strokeStyle = color;
        c.lineWidth = '3';
        c.arc( posX, posY, 75, (Math.PI/180) * 270, (Math.PI/180) * (270 + deegres) );
        c.stroke();
        if( deegres >= result ) clearInterval(acrInterval);
      }, fps);
      
    }
  });
  
 
  if($('body').hasClass('front-page')) {
    $('.video-block .play').fancybox({
      video: {
          tpl:
              '<video class="fancybox-video" controls controlsList="nodownload" poster="">' +
              '<source src="{{src}}" type="{{format}}" />' +
              'Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!' +
              "</video>",
          format: "", 
          autoStart: true
          }, 
    });
  }
  
  //copy link
  $('.copy').click(function() {
      let textAddress = $(this).attr('data-id');
      copyToClipboard(textAddress);
      return false;
  });

  // return a promise
  function copyToClipboard(textToCopy) {
      // navigator clipboard api needs a secure context (https)
      if (navigator.clipboard && window.isSecureContext) {
          // navigator clipboard api method'
          return navigator.clipboard.writeText(textToCopy);
      } else {
          // text area method
          let textArea = document.createElement("textarea");
          textArea.value = textToCopy;
          // make the textarea out of viewport
          textArea.style.position = "fixed";
          textArea.style.left = "-999999px";
          textArea.style.top = "-999999px";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          return new Promise((res, rej) => {
              // here the magic happens
              document.execCommand('copy') ? res() : rej();
              textArea.remove();
          });
      }
  }
  
  
});