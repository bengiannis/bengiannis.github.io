var numberOfHeaderImages = 4;

var firstHeaderImage = Math.floor(Math.random() * numberOfHeaderImages);
var headerImages = [];
var currentHeaderImageIndex = 0;

function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

//function buildHeaderImages() {
    for (let i = 0; i < numberOfHeaderImages; i++) {
        if (i != firstHeaderImage) {
            headerImages.push(i);
        }
    }
    shuffle(headerImages);
    headerImages.push(firstHeaderImage);
//}

function changeHeaderBackgroundPt3() {
    $("#background-image-top").fadeOut(0);
}

function changeHeaderBackgroundPt2() {
    console.log("Now2")

    //change bottom
    document.getElementById("background-image-bottom").style.backgroundImage = "url('/images/Transitions/"+(headerImages[currentHeaderImageIndex]).toString()+".jpg')";

    setTimeout(changeHeaderBackgroundPt3, 100);
}

function changeHeaderBackground() {
    currentHeaderImageIndex++;
    if (currentHeaderImageIndex >= numberOfHeaderImages) {
        currentHeaderImageIndex = 0;
    }

    document.getElementById("background-image-top").style.backgroundImage = "url('/images/Transitions/"+(headerImages[currentHeaderImageIndex]).toString()+".jpg')";

    //fade in top
    $("#background-image-top").fadeIn(1800);
    
    setTimeout(changeHeaderBackgroundPt2, 2000);
}

/*function changeHeaderBackground() {
    document.getElementById("background-image").style.backgroundImage = "url('/images/Transitions/"+(headerImages[currentHeaderImageIndex]).toString()+".jpg')";

    currentHeaderImageIndex++;
    if (currentHeaderImageIndex >= numberOfHeaderImages) {
        currentHeaderImageIndex = 0;
    }
}*/

function collapseFormCompletion() {
    $(".form-show-after-submission").each(function(i, obj) {
        $(this).removeClass('form-element-hide');
    });
    $(".form-hide-after-submission").each(function(i, obj) {
        $(this).addClass('form-element-hide');
    });
}

function submitForm() {
    var formNameElement = document.getElementById("form-name");
    var formPhoneElement = document.getElementById("form-phone");
    var formEmailElement = document.getElementById("form-email");
    var formMessageElement = document.getElementById("form-message");

    var templateParams = {
        name: formNameElement.value,
        phone: formPhoneElement.value,
        email: formEmailElement.value,
        message: formMessageElement.value
    };
    
    emailjs.send('service_fxnbtct', 'template_odxu3xd', templateParams).then(function(response) {
        console.log('Contact form success', response.status, response.text);
        collapseFormCompletion();
    }, function(error) {
        console.log('Contact form failed', error);
    });
}

function contactFormSendButtonPressed() {
    $("#form-submit-button").attr('value', 'Sending');
    $("#form-submit-button").addClass('disabled-primary-button');

    setTimeout(submitForm(), 1000);
}

$("#form").submit(function () {
    contactFormSendButtonPressed();
    return false;
});

$(document).ready(function() {
    $(".image-container").addClass("transition-initial");
    $(".image-container").delay(100).queue(function(){
        $(this).addClass("transition-animation").dequeue();
    });
    
    Array.from(document.getElementsByClassName("year")).forEach(
        function(element, index, array) {
            element.innerHTML = (new Date).getFullYear() + " ";
        }
    );

    //changeHeaderBackground();
    $("#background-image-top").fadeOut(0);
    setInterval(changeHeaderBackground, 10*1000);
});
//buildHeaderImages();
/*setInterval(function(){
    changeHeaderBackground()
}, 5000)*/

function updateParallaxImage() {
    var scrollPosition = window.pageYOffset;
    var parallaxImage = document.getElementById("parallax-image");
    var limit = parallaxImage.offsetTop + parallaxImage.offsetHeight;

    if (scrollPosition <= parallaxImage.offsetTop-window.innerHeight) {
        parallaxImage.style.backgroundPositionY = '100%';

    } else if (scrollPosition > limit) {
        parallaxImage.style.backgroundPositionY = '0%';
    }
    else {
        //0 = parallaxImage.offsetTop - window.innerHeight
        //100 = parallaxImage.offsetTop + parallaxImage.offsetHeight
        parallaxImage.style.backgroundPositionY = (100 - 100*(scrollPosition-(parallaxImage.offsetTop - window.innerHeight))/(window.innerHeight + parallaxImage.offsetHeight)) + '%';   
    }
}

window.addEventListener('scroll', function() {
    updateParallaxImage();

    var gallery = document.getElementById("gallery");

    if (window.pageYOffset >= gallery.offsetTop - gallery.offsetHeight + (window.innerHeight*0.3)) {
        var galleryAnimationOrder = [1,3,2,4,5,7,6];
        var galleryAnimationCanonTime = 1000*(1.2/galleryAnimationOrder.length);

        for (let i = 0; i < galleryAnimationOrder.length; i++) {
            var targetImageContainer = "#gallery-image-container-"+galleryAnimationOrder[i];
            $(targetImageContainer).delay(galleryAnimationCanonTime*i).queue(function(){
                $(this).removeClass("transition-initial").dequeue();
            });
        }
    }
});

window.addEventListener('resize', function() {
    updateParallaxImage();
});

//animate anchor links
$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 800, function() {
                var $target = $(target);
                $target.focus();
                if ($target.is(":focus")) {
                return false;
                } else {
                $target.attr('tabindex','-1');
                $target.focus();
                };
            });
        }
    }
});