/* 
    Created on : 16 de dez. de 2023, 11:52:59
    Author     : Flávio Pavim
*/


$(function () {
    $('.icons').each(function () {
        var icons = $(this).find('.icon');
        icons.hide();

        var total = icons.length;
        var current = 0;

        setInterval(function () {
            icons.hide();
            icons.eq(current).show();

            current = (current + 1) % total;
        }, 200);
    });
});