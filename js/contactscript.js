/*
Contact Form Submit JS
*/
(function() {

    $(document).ready(function() {
		$('#contactsubmitbtn').one("click", function() {
    		//alert("WORKS");
    		var fullName = '' + $('#contactfname').val() + ' ' + $('#contactlname').val();
    		var email = '' + $('#email-yui_3_17_2_1_1524206063241_7627-field').val();
    		var subject = '' + $('#text-yui_3_17_2_1_1524206063241_7628-field').val();
    		var message = '' + $('#textarea-yui_3_17_2_1_1524206063241_7629-field').val();
    		//alert('' + fullName + ', ' + email + ', ' + subject + ', ' + message);
		    $.ajax({
		        url: '/contactmail.php',
		        type: 'POST',
		        data: {
		            name: '' + fullName,
		            email: '' + email,
		            subject: '' + subject,
		            message: '' + message
		        },
		        error: function (request, error) {
			        //console.log(arguments);
			        //alert(" Can't do because: " + error);
			        alert("Cannot send email");
			    },
		        success: function(msg) {
		            //alert('Email Sent');
		            $('.form-submission-text').removeClass('hidden');
		            $('form').addClass('hidden');
		        }               
		    });
		});
	});
})();