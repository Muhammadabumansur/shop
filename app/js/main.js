var moduleShop = (function () {

    var init = function () {          
        _setUpListeners();
        _slider();
        _select();
        _columnizer();
        _firstCome();
    };

    var _setUpListeners = function () {
        $('.filters__title.active').hover(_showOpen, _hideOpen);
        $('.filters__title.no_active').hover(_showClose, _hideClose);
        $('.filters__title').on('click', _accordeon);
        $('.color__link').on('click', _colorChange);
        $(".reset-filter").on('click', _resetCheckbox);
        $('.sort__view').on('click', _changeSortView);
        $('.slideshow_pic').on('click', _slideShow);
    };
    
    // Иконка при наведении на раздел аккордеона
    var _showOpen = function () {
      $('.open_filters').remove();      
      $(this).prepend('<i class="close_filters"></i>');
    };
    var _hideOpen = function () {
      $('.close_filters').remove();
    };
    var _showClose = function () {
      $('.close_filters').remove();     
      $(this).prepend('<i class="open_filters"></i>');
    };
    var _hideClose = function () {
      $('.open_filters').remove();
    };

    // Аккордеон
    var _accordeon = function (e) {
      e.preventDefault();

      var $this = $(this),
          item = $this.closest('.basic__item'),
          content = item.find('.basic_inner'),
          duration = 300;

      if($this.hasClass('no_active')) {
        $this.removeClass('no_active');
        $this.addClass('active');
        content.stop(true, true).slideDown(duration);
        $('.filters__title.active').hover(_showOpen, _hideOpen);        
      } else { 
        content.stop(true, true).slideUp(duration);
        $this.removeClass('active');
        $this.addClass('no_active');
        $('.filters__title.no_active').hover(_showClose, _hideClose);     
      };
    };

    // Фильтр по цветам
    var _colorChange = function (e) {
      e.preventDefault();
      $(this).hasClass("choosen")?$(this).removeClass("choosen"):$(this).addClass("choosen");
    };

    //очистка чекбоксов
    var _resetCheckbox = function (e) {
      e.preventDefault();

      var $this = $(this),
          item = $this.siblings('.checkbox__item'),
          inputs = item.find('input:checkbox');

      $.each(inputs, function() {
        inputs.removeAttr("checked");
      });
    };

    // Вид продукции
    var _changeSortView = function (e) {
      e.preventDefault();
      //удаляем активный класс
      for (var i = 0; i < 3; i++) {
        $('.sort__view'+ i +'-hover').removeClass('sort__view'+ i +'-hover');
      }
      var items = $(this).closest('.sort__view-item'),
          item = $(this).children(),
          itemPosition = items.index(),
          viewActiveClass = 'sort__view'+ itemPosition +'-hover',
          content = $('.content').children('ul'),
          contentClass = 'products_list'+ itemPosition +'';
      //меняем вид продукции и добавляем активный класс
      if(!content.hasClass(contentClass)){
          content.removeClass();
          content.addClass(contentClass);
          item.addClass(viewActiveClass);
      };
    };

    // Слайдер с ценой
    var _slider = function() {
      $( ".price_range__slider" ).slider({
          range: true,
          min: 0,
          max: 30000,
          values: [ 100, 13000 ],
          slide: function( event, ui ) {
            $( "#price_range1" ).val(ui.values[ 0 ]);
            $( "#price_range2" ).val(ui.values[ 1 ]);
          }
        });
        $( "#price_range1" ).val(  $( ".price_range__slider" ).slider( "values", 0 ));
        $( "#price_range2" ).val(  $( ".price_range__slider" ).slider( "values", 1 ));
    };

    // Две колонки текста
    var _columnizer = function() { 
      $('.text_info').columnize({columns: 2});
    }

    // select
    var  _select = function() {
      $(".js-example-basic-single").select2({
          minimumResultsForSearch: Infinity
      });
    }

    // slideshow
    var _slideShow = function(e) {
      e.preventDefault();

      var item = $(this).closest('.mini__item'),
          container = $(this).closest('.products__slideshow'),
          display = container.find('.slideshow'),
          path = item.find('img').attr('src'),
          duration = 200;

      if (!item.hasClass('mini__item-active')) {
        item.addClass('mini__item-active').siblings().removeClass('mini__item-active');
        display.find('img').fadeOut(duration, function() {
          $(this).attr('src', path).fadeIn(duration);
        });
      };
    };

    // first
    var _firstCome = function() {
      var items = $('.mini__list');
      for (var i = 0; i < items.length; i++) {
        $('.mini__list')[i].children[0].setAttribute("class", "mini__item mini__item-active")
      }
    }

    return {
        init : init
    };
    
}) ();

moduleShop.init();

