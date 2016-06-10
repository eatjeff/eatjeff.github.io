/*jQuery(function(){

    var minimized_elements = $('p.propertyds');
    var minimize_character_count = 100;    

    minimized_elements.each(function(){    
        var t = $(this).text();        
        if(t.length < minimize_character_count ) return;

        $(this).html(
            t.slice(0,minimize_character_count )+'<span>... </span><a href="#" class="more">More</a>'+
            '<span style="display:none;">'+ t.slice(minimize_character_count ,t.length)+' <a href="#" class="less">Less</a></span>'
        );

    }); 

    $('a.more', minimized_elements).click(function(event){
        event.preventDefault();
        $(this).hide().prev().hide();
        $(this).next().show();        
    });

    $('a.less', minimized_elements).click(function(event){
        event.preventDefault();
        $(this).parent().hide().prev().show().prev().show();    
    });

});*/