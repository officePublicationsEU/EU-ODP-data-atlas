(function($){
    $(document).ready(function(){
        var titleSubmenu = "";
        var titleDataSet = "";
        var sectionNumber = "";
        var showSubmenu = '385px'
        var hideSubmenu = '-40%';

        $('.filterList').addClass('disabled');
        $("#overlay").removeClass('no-visible').css({left: '-50vw' }); 


        $('input.search-text').on('focus', function() {
            if (!$(this).data('defaultText')) $(this).data('defaultText', $(this).val());
            if ($(this).val()==$(this).data('defaultText')) $(this).val('');
        });
        $('input.search-text').on('blur', function() {
            if ($(this).val()=='') $(this).val($(this).data('defaultText')); 
        });

        $(".menu-icon a").click(function(){
                $('i',this).toggleClass('close-menu');
                $('.left').toggleClass('open');
                $('section[id^=subsectionSubject]').animate({left: hideSubmenu});
                removeOverlay();
                $('.submenu').removeClass('in').attr('aria-expanded','false');
                $('.side-nav li > a').attr('aria-expanded','false');
                $('#overlay').removeClass('more-info-panel');
            });
        

        $('.left .nav > li > i').click(function(){
            if( $(this).parent().attr('class') == undefined || $(this).parent().attr('class').indexOf('disabled') < 0 ){
                $('.left').toggleClass('open');
                $(".menu-icon a i").toggleClass('close-menu');
                $('.submenu').removeClass('in').attr('aria-expanded','false');
                $('.side-nav li > a').attr('aria-expanded','false');
                $('#overlay').removeClass('more-info-panel');                  
            }                  
        });

        $(".menu-icon a").keydown(function (e) {
            if (e.which === 9){
                if( $('section.left').attr('class').indexOf('open') < 0 ){
                    $('i',this).toggleClass('close-menu');
                    $('.left').toggleClass('open');
                    $('section[id^=subsectionSubject]').animate({left: hideSubmenu});
                    removeOverlay();
                    $('.submenu').removeClass('in').attr('aria-expanded','false');
                    $('.side-nav li > a').attr('aria-expanded','false');
                    $('#overlay').removeClass('more-info-panel');
                }
            }
        });

        
        $('.left .nav > li > a').click(function(){
            var currentItem = $(this).parent().find('ul').attr('id');
            $('#overlay').removeClass('more-info-panel');
            $('.left').addClass('open');
            $(".menu-icon a i").addClass('close-menu');

           $('.left .nav > li' ).each(function( index ) {

                if( $('ul', this).attr('id') != currentItem ){
                    $('ul', this).removeClass('in');
                    $('div.submenu', this).removeClass('in');
                    $('a',this).attr('aria-expanded','false');
                }
            });
            
        });

        $("ul[id^=submenu-] li").click(function(){

            $("ul[id^=submenu-] li").removeClass('active');
            $('#overlay').removeClass('more-info-panel');            
            $(this).addClass('active');
          
            var idSubmenu =  $(this).attr('id');
            
                $('section[id^=subsectionSubject]').css({left: hideSubmenu });
                $('section[id^=subsectionSubject]').removeClass('submenuOpen');

            $('.' + idSubmenu).animate({left: showSubmenu},"slow");
            $('.' + idSubmenu).addClass('submenuOpen');
            removeOverlay();


            sectionNumber = $(this).parent().attr('id').slice($(this).parent().attr('id').indexOf('-')+1,$(this).parent().attr('id').length );
            titleSubmenu = $('a', this).text();

            if( sectionNumber== 1 ){
                
                $('.' + idSubmenu + '> h2').text( titleSubmenu );
                $('.' + idSubmenu + '> h2').prepend( '<i class="fa fa-bullseye" aria-hidden="true">&nbsp;</i>' );
                
            }else{
                $('.' + idSubmenu + '> h2').text( titleSubmenu );
                $('.' + idSubmenu + '> h2').prepend( '<i class="fa fa-university" aria-hidden="true">&nbsp;</i>' );

            } 
        });

        $("#overlay").click(function (){        
            if ($("#overlay_text").length > 0){
               // removeOverlay();
            }
        });
        $(".close-info").click(function (){        
            $('#overlay').removeClass('more-info-panel');
            removeOverlay();
        });
        $('.close-subsection').click(function(){
            $('section[id^=subsectionSubject]').animate({left: hideSubmenu },"slow");
            removeOverlay();
        });



        $('section[id^=subsectionSubject] .content li > label').click(function(){
            
            $(this).parent().parent().parent().parent().animate({left: hideSubmenu },"slow"); 
            $('#overlay').removeClass('more-info-panel'); 
            
            $("section[id^=subsectionSubject] .content li").removeClass('active');

            var hasFilters = $(this).parent().attr('class');
            if( hasFilters == 'has-filters'){
                $('.filterList').removeClass('disabled');
            }else {
                $('.filterList').addClass('disabled');
                $('.filterList .submenu').removeClass('in').attr('aria-expanded','false');
            }

            $(this).parent().addClass('active');

            if( $(this).attr('class') == 'parentItem'  ){
                titleDataSet = $('> span',this).text();
            } else {
                titleDataSet = $(this).text();
            }

            $('header .title h1').text( titleDataSet );          
            $('#overlay h3').text( titleDataSet );
            $('~ button',this).trigger('click');
            $('#overlay').css('display','none');
            $('.more-info').css('display','block');

            if( sectionNumber == 1 ){
                if( $('#overlay_text > p:nth-child(1)').text().indexOf('Publisher') == 0 ){
                    titleSubmenu = $('#overlay_text > p:nth-child(1)').text();  
                }                             
                $('header .title h2').text( titleSubmenu );                
                $('header .title h2').prepend( '<strong>Publisher: </strong>' );
            } else {
                $('header .title h2').text( titleSubmenu );
                $('header .title h2').prepend( '<strong>Publisher: </strong>' );
            }
            $('header .title').animate({opacity: '1'},"slow");
        });

        $('section[id^=subsectionSubject] .content li  .b_info').click(function(){
            $('section[id^=subsectionSubject] .content li .b_info').removeClass('bt-active');
            $(this).addClass('bt-active');
        });

        $('section[id^=subsectionSubject] .content li').click(function(){
            $('#overlay h3').text( $('> label',this).text() ); 
        });

        $('.more-info').click(function(){
            $('#overlay').toggleClass( 'more-info-panel' ); 
        });

        $('input:radio').change(function (e) {
            if (e.target.id != "cb4" && e.target.id != "cb9" && e.target.id != "cb4_1" && e.target.id != "cb4_2") {
                $('#filters_li').css('display', 'none');
            }
        });

        $('#cb4').change(function () {
            var display = this.checked ? 'block' : 'none';
            $('#filters_li').css('display', display);
            $('#filters_li').find("ul.subnavegador:first").slideDown('fast');

        });
        $('#cb9').change(function () {
            var display = this.checked ? 'block' : 'none';
            $('#filters_li').css('display', display);
            $('#filters_li').find("ul.subnavegador:first").slideDown('fast');

        });




    });
})(jQuery);



function removeOverlayLevel2()
{
	$("#overlay_text").text('');
    $("#overlay").animate({left: '250px' },200); 

}
function removeOverlay()
{
	// $("#overlay_text").text('');
    $("#overlay").animate({left: '-550px' },200); 

}
function showInfo(textToShow)
{
	$("#overlay_text").text(textToShow);
    $("#overlay_text").html(textToShow);
    $("#overlay").css('display','block');
    $("#overlay").animate({left: '325px' },200);  
    $("#overlay").animate({left: '960px' },500 );  
}


function toggleFullScreen(elem) {
    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (elem.requestFullScreen) {
        elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
        elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
        }
    } else {
        if (document.cancelFullScreen) {
        document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
        }
    }
}
