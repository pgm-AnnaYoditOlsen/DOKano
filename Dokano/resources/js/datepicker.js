$(function() {
    $.datepicker.regional['nl'] = {
        closeText: 'Sluiten',
        prevText: 'Vorige',
        nextText: 'Volgende',
        currentText: 'Vandaag',
        monthNames: ['januari','februari','maart','april','mei','juni',
        'juli','augustus','september','oktober','november','december'],
        monthNamesShort: ['jan','feb','mrt','apr','mei','jun',
        'jul','aug','sep','okt','nov','dec'],
        dayNames: ['zondag','maandag','dinsdag','woensdag','donderdag','vrijdag','zaterdag'],
        dayNamesShort: ['zo','ma','di','wo','do','vr','za'],
        dayNamesMin: ['zo','ma','di','wo','do','vr','za'],
        weekHeader: 'Wk',
        dateFormat: 'dd-mm-yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['nl']);

    $('#datePicker').datepicker();
});