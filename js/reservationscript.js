(function() {
    $(document).ready(function() {
        console.log("gi");
        var myLoop = setInterval(function(){
            $(".squarespace-opentable-new-age-wrapper").find(".ot-button").removeClass("ot-dtp-picker-button");
            $(".squarespace-opentable-new-age-wrapper").find(".ot-button").addClass("ot-button-my-button");    
            if ($(".squarespace-opentable-new-age-wrapper").find(".ot-button").hasClass("ot-button-my-button")) {
                clearInterval(myLoop);
            }
        }, 100);
    });
})();