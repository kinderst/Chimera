/*
Contact Form Submit JS
*/
(function() {

    $(document).ready(function() {
    	$('#pssubmitbtn').one("click", function() {
    		//alert("WORKS");
    		var fullName = '' + $('#psfname').val() + ' ' + $('#pslname').val();
    		var phoneNum = '' + $('#psphoneone').val() + '-' + $('#psphonetwo').val() + '-' + $('#psphonetwo').val();
    		var email = '' + $('#email-yui_3_17_2_1_1524773905796_1472-field').val();
    		var theDate = '' + $("#psmonth").val() + '/' + $("#psday").val() + '/' + $("#psyear").val();
    		var theTime = '' + $("#pshour").val() + ':' + $("#psminute").val();
    		var partySize = +$("#psguests").val();
    		//alert('' + fullName + ', ' + phoneNum + ', ' + email + ', ' + partySize);
		    $.ajax({
		        url: '/psmail.php',
		        type: 'POST',
		        data: {
		            name: '' + fullName,
		            phone: '' + phoneNum,
		            email: '' + email,
		            date: '' + theDate,
		            time: '' + theTime,
		            partysize: '' + partySize
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