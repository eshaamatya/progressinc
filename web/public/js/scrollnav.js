$(document).ready(function(){
            if(window.location.hash) {
                var hash = window.location.hash;
                $(document.body).animate({
                    'scrollTop':   $( hash).offset().top - 100
                }, 1000);
            } else {
              // Fragment doesn't exist
            }
            $('.scroll-to').click(function(e){
                e.preventDefault();
                var hash = $(this).attr('href');
                $(document.body).animate({
                    'scrollTop':   $(hash).offset().top - 100
                }, 1000);
            })
        });