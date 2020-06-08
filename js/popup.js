

$('.toggle__label').mouseup(function(){

    const checked = $(this).find('.toggle__fake-input').hasClass('toggle__fake-input_on');

    if (checked) {
        $(this).find('.toggle__fake-input').removeClass('toggle__fake-input_on');
        $(this).find('.toggle__fake-input-circle').removeClass('toggle__fake-input-circle_on');

    } else {
        $(this).find('.toggle__fake-input').addClass('toggle__fake-input_on');
        $(this).find('.toggle__fake-input-circle').addClass('toggle__fake-input-circle_on');
        
    }  
});

