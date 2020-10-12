
$('.message_text_wrapper').append('<input type="button" value="COPY" class="ss-button ss-button_message" >');

$('#current_chat_id_div').append('<input type="button" value="COPY" id="copy_url" class="ss-button ss-button_url " >');

$('.visitor_contact_info_table').parents('.visit-info-block-wrapper').append('<input type="button" value="COPY" id="copy_email" class="ss-button" >');


$('#copy_email').on('click',function(){
   
   let $temp = $("<input>");
   $("body").append($temp);
   $temp.val($('#visitor_email').text()).select();
   document.execCommand("copy");
   $temp.remove();
    
});

$('#copy_url').on('click',function(){
   
   let $temp = $("<input>");
   $("body").append($temp);
   $temp.val(`https://okkotv001.webim.ru${$("#current_chat_id").attr("href")}`).select();
   document.execCommand("copy");
   $temp.remove();
    
});

$("body").on("click", ".ss-button_message", function() {

   let $temp = $("<input>");
   $("body").append($temp);
   $temp.val($(this).siblings('.message_text').text()).select();
   document.execCommand("copy");
   $temp.remove();
});
