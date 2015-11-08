$(document).ready(function() {

    var backgrounds = [
      'url(images/fraise.jpg)',
      'url(images/new-york.jpg)',
      'url(images/road-movie.jpg)'

    ];

  var current = 0;

  function nextBackground() {
    current = current + 1;
    if(current == backgrounds.length)
    {
      current = 0;
    }

        $('.main').css(
         'background-image',
          backgrounds[current]
       );

       setTimeout(nextBackground, 8000);
   };

   setTimeout(nextBackground, 4000);

  $( ".form-inline" ).submit(function( event ) {

      event.preventDefault();

      var proceed = true;

        $(".form-inline input[required=true]").each(function(){
            $(this).css('border-color','');
            if(!$.trim($(this).val())){ //if this field is empty
                $(this).css('border-color','red'); //change border color to red
                proceed = false; //set do not proceed flag
            }
            //check invalid email
            var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
                $(this).css('border-color','red'); //change border color to red
                proceed = false; //set do not proceed flag
            }
        });

        if(proceed) //everything looks good! proceed...
        {
                var email = $('#email-input').val();

                  $.ajax({
                    url: "mail/mail.php",
                    type: "POST",
                    data: {
                      email: email
                    },
                    cache: false,
                    success: function(data, status, xhr) {

                      // Success message
                      if (data.indexOf('OK') != -1) {
                        $('#resultat').html("<div class='alert alert-success'>Votre adresse e-mail a été envoyée</div>");
                        $('#email-input').val('');


                      } else {
                        $('#resultat').html("<div class='alert alert-danger'>Erreur lors de l'envoi, contactez moi à anne-lise@all-pictures.fr<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button></div>");
                      }
                    },
                    error: function(xhr, status, error) {
                        $('#resultat').html("<div class='alert alert-danger'>Erreur technique lors de l'envoi, contactez moi à anne-lise@all-pictures.fr<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button></div>");                    },
                  })
            }
            else {
                $('#resultat').html("<div class='alert alert-danger'>E-mail saisi incorrect <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button></div>");
            }

            $('#resultat').fadeIn().delay(5000).fadeOut()
    });

    //reset previously set border colors and hide all message on .keyup()
    $(".form-inline  input[required=true]").keyup(function() {
        $(this).css('border-color','');
    });
});
