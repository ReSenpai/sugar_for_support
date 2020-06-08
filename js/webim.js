/**
 * Re Senpai [2020]
 */
setTimeout(function() {
   /**
    * HTML Code Warehouse
    */
   const html = {
      button: {
         copyMessge: '<input type="button" value="COPY" class="ss-button ss-button_message" >',
         copyURL: '<input type="button" value="COPY" id="copy_url" class="ss-button ss-button_url">',
         copyEmail: '<input type="button" value="COPY" id="copy_email" class="ss-button">'
      },
      parse : {
         contact: '#visitor_contact_info_div > div',
         message: '.message_text_wrapper',
         urlBox: '#current_chat_id_div',
         copyEmail: '#copy_email',
         copyURL: '#copy_url',
      }
   }
   /**
    * Class to add buttons to Webim
    */
   class SS {
      constructor () {
      }
      /**
       * Method for adding buttons
       * @param {string} sellector Path to sellector
       * @param {string} button Add button html
       */
      static addButton (sellector, button) {
         try {
            $(sellector).append(button);
         } catch (error) {
            console.log(`Ошибка в class SS, метод - addButton; (${error})`);
         }
      }
      /**
       * Method for adding copy event for buttons Url and Mail
       * @param {string} sellector Button id
       * @param {string} value What we want to copy
       */
      static copyUrlMail (sellector, value, event = 'click') {
         try {
            $(sellector).on(event, function(){
               if (value == 'url') {
                  value = `https://okkotv001.webim.ru${document.querySelector('#current_chat_id').getAttribute('href')}`;
               } else if (value == 'email') {
                  value = document.querySelector('#visitor_email').textContent;
               }
               let $temp = $("<input>");
               $("body").append($temp);
               $temp.val(value).select();
               document.execCommand("copy");
               $temp.remove(); 
            });
         } catch (error) {
            console.log(`Ошибка в class SS, метод - copyUrlMail; (${error})`);
         }
      }
      /**
       * Method for adding copy event for buttons Message
       */
      static copyMessge () {
         try {
            $("body").on("click", ".ss-button_message", function() {
               let $temp = $("<input>");
               $("body").append($temp);
               $temp.val($(this).siblings('.message_text').text()).select();
               document.execCommand("copy");
               $temp.remove();
            });
         } catch (error) {
            console.log(`Ошибка в class SS, метод - copyMessage; (${error})`);
         }
      }
   } 
   SS.addButton(html.parse.message, html.button.copyMessge);
   SS.addButton(html.parse.urlBox, html.button.copyURL);
   SS.addButton(html.parse.contact, html.button.copyEmail);
   SS.copyUrlMail(html.parse.copyEmail, 'email');
   SS.copyUrlMail(html.parse.copyURL, 'url');
   SS.copyMessge();
}, 100)