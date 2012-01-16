
/*
                  Verdict.coffee 0.0.0.0.0.1
 (c) 2011 Radagaisus MIT open-source license
 Inspired by tangle.js - http://worrydream.com/Tangle/
 
 requirements: jQuery        http://www.jquery.com/
*/

/*
 usage:
  add adjustable_number class if you want some spiffy css
  $("#cookies").numbers
    max: 200
    min: 0
    step: 1
    integer: false
*/

(function() {

  (function($) {
    $.format || ($.format = {});
    $.format.num = function(num) {
      return ('' + num).replace(/(\d+)(\..*)?/, function($0, $1, $2) {
        return $1.replace(/(\d)(?=(\d{3})+$)/g, '$1,') + ($2 || '');
      });
    };
    return $.fn.numbers = function(o) {
      var defaults, number_drag;
      defaults = {
        step: 1,
        integer: true,
        growth: 2
      };
      o = $.extend(defaults, o);
      number_drag = function(elem) {
        elem.css('cursor', 'col-resize');
        elem.mousedown(function(e) {
          var x;
          document.body.onselectstart = function() {
            return false;
          };
          document.body.style.MozUserSelect = "none";
          document.body.onmousedown = function() {
            return false;
          };
          document.body.style.cursor = "col-resize";
          x = e.pageX;
          return $(window).bind('mousemove.numbers', function(change) {
            var dir, val;
            dir = 2 * (x < change.pageX) - 1;
            val = Number(elem.text().replace(/,/g, ''));
            val = Math.max(Math.min(val + dir * o.step * (Math.abs(change.pageX - x) / o.growth), o.max || Infinity), o.min || -Infinity);
            if (o.integer != null) val = Math.floor(val);
            elem.text($.format.num(val));
            x = change.pageX;
            return elem.trigger('verdict_change', val);
          });
        });
        return $(window).mouseup(function() {
          $(window).unbind('mousemove.numbers');
          document.body.onselectstart = null;
          document.body.style.MozUserSelect = "";
          document.body.onmousedown = null;
          return document.body.style.cursor = "inherit";
        });
      };
      return this.each(function() {
        return number_drag($(this));
      });
    };
  })(window.jQuery);

  /* 
   usage:
    add adjustable_bool class if you want some spiffy css
    $("#cookies").bool_select
      first: 'something'
      second: 'another thing'
  */

  (function($) {
    return $.fn.bool_select = function(o) {
      var bool;
      bool = function(elem, first) {
        return elem.click(function(e) {
          if (elem.text() === o.first) {
            elem.text(o.second);
          } else {
            elem.text(o.first);
          }
          return elem.trigger('verdict_change', elem.text());
        });
      };
      return this.each(function() {
        return bool($(this));
      });
    };
  })(window.jQuery);

}).call(this);
