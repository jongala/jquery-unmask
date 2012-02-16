;(function($){
    $.unmask = {
        defaults : {
            allowAnimations: true,
            bgColor: '',
            closeOnClick : true,
            closeOnEsc : true
        },

        show: function(opts) {
            var $this,
            options,
            sizeMasks,
            $masks,
            transition;

            $this = $(this);
            options = $.extend({}, $.unmask.defaults, opts);

            transition = true;
            $masks = $('.jqmask');
            if($masks.length < 4) {
                $masks.remove();
                for (i=0; i<4; i++){
                    $('<div class="jqmask" id="jqmask' + i + '"></div>').hide().appendTo('body');
                }
                $masks = $('.jqmask');
                if(options.bgColor) {
                    $masks.css('background-color', options.bgColor);
                }
                transition = false;
            }

            if(options.closeOnClick) {
                $masks.bind('click',function(){
                    $.unmask.hide();
                });
            } else {
                $masks.unbind('click');
            };

            if(options.closeOnEsc) {           
                $(document).bind('keydown.unmask', function(e) {
                    if (e.keyCode == 27) {
                        $.unmask.hide();
                    }
                });
            } else {
                $(document).unbind('keydown.unmask');
            }

            sizeMasks = function(transition){
                var o = $this.offset();
                var h = $this.outerHeight();
                var w = $this.outerWidth();

                if(transition === true && options.allowAnimations) {
                    $masks.eq(0).animate({'height':o.top}, 'fast');
                    $masks.eq(1).animate({'top': o.top, 'height': h, 'width': o.left}, 'fast');
                    $masks.eq(2).animate({'top': o.top, 'height': h, 'left': o.left + w}, 'fast');
                    $masks.eq(3).animate({'top': o.top + h}, 'fast');
                } else {
                    $masks.eq(0).css({'height':o.top, 'width':'100%'});
                    $masks.eq(1).css({'top': o.top, 'width': o.left, 'height': h});
                    $masks.eq(2).css({'top': o.top, 'left': o.left + w, 'right':0, 'height': h});
                    $masks.eq(3).css({'top': o.top + h, 'bottom':0, width: '100%'});
                }
            }

            sizeMasks(transition);
            $(window).bind('resize.unmask', sizeMasks);
            $masks.fadeIn('fast');
            return this;
        },

        hide: function() {
            $('.jqmask').fadeOut('fast', function(){$(this).remove()});
            $(window).unbind('resize.unmask');
            return this;
        }
    };

    $.fn.unmask = $.unmask.show;

})(jQuery);