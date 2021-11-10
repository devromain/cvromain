$(function () { 
    

    $(".navbar a, footer a").on("click", function(event) {
        event.preventDefault();
        var hash = this.hash;
        $('body').animate({scrollTop: $(hash).offset().top} , 900 ,function(){window.location.hash = hash;})

    });

/* aprés envoi du mail */
    $('#contact-form').submit(function(e) {
        e.preventDefault();/* empeche de passer par a une autre page */
        $('.comments').empty();/* remise à zero des commentaires */
        var postdata = $('#contact-form').serialize();/* création de variable pour la récupération du post à envoyer au php */
        
        $.ajax({
            type: 'POST',
            url: 'php/contact.php',/* chemin d'envoi de la variable postdata */
            data: postdata,
            dataType: 'json',/* type de data */
            success: function(result) {
                 
                if(result.isSuccess) 
                {
                    $("#contact-form").append("<p class='thank-you'>Votre message à bien été envoyé. Merci de m'avoir contacté :)</p>");
                    $("#contact-form")[0].reset();/* met à zero le formulaire de contact aprés l'envois*/
                }
                else
                {
                    $("#firstname + .comments").html(result.firstnameError);
                    $("#name + .comments").html(result.nameError);
                    $("#email + .comments").html(result.emailError);
                    $("#phone + .comments").html(result.phoneError);
                    $("#message + .comments").html(result.messageError);
                }                
            }
        });
    });

})