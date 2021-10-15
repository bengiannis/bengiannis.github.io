var disableDarkModeTransitionForAnchor = false;
var disableAutoplay = false;

// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {

    disableDarkModeTransitionForTweaksAnchor = true;
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 500, function() {
                // Callback after animation
                // Must change focus!

        disableDarkModeTransitionForTweaksAnchor = false;
                var $target = $(target);
                $target.focus();
                if ($target.is(":focus")) { // Checking if the target was focused
                return false;
                } else {
                $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
                };
            });
        }
    }
});

$(document).ready(function() {
    if (disableAutoplay) {
        $("video").each(function(i, obj) {
            obj.removeAttribute('autoplay');
        });
    }

    window.addEventListener('resize', function(){updateForNewScrollPosition()}, true);

    updateForNewScrollPosition();
    document.getElementById("year").innerHTML=(new Date).getFullYear();

    $("select").change(function(){
        updateContactFormErrorMessagesRemoveOnly();
        $(this).css({color: "white"});
    });
    
    $('input').on('keyup paste',updateContactFormErrorMessagesRemoveOnly);
    
    $('textarea').on('keyup',updateContactFormErrorMessagesRemoveOnly);

    //animating in: before
    $(".fjr-hero").each(function(i, obj) {
        $(this).addClass('fjr-hero-before');
    });

    $(".opening-hero-graphic").each(function(i, obj) {
        $(this).removeClass('opacity-zero');
    });

    $(".warning-bar").each(function(i, obj) {
        $(this).removeClass('opacity-zero');
    });
});

$(window).scroll(function() {
    updateForNewScrollPosition();
});

function updateForNewScrollPosition() {
    var scrollPos = $(window).scrollTop();
    //var windowHeight = $(window).height();

    /*if (scrollPos >= 40) {
        $(".navigation-bar").each(function(i, obj) {
            $(this).addClass('navigation-bar-effects');
        });
    }
    else {
        $(".navigation-bar").each(function(i, obj) {
            $(this).removeClass('navigation-bar-effects');
        });
    }

    if (scrollPos >= 250) {
        $(".favicon").each(function(i, obj) {
            $(this).addClass('nav-left-item-hide');
        });
        $(".nav-logo-name").each(function(i, obj) {
            $(this).removeClass('nav-left-item-hide');
        });
    }
    else {
        $(".nav-logo-name").each(function(i, obj) {
            $(this).addClass('nav-left-item-hide');
        });
        $(".favicon").each(function(i, obj) {
            $(this).removeClass('nav-left-item-hide');
        });
    }*/

    if (!disableDarkModeTransitionForAnchor) {
        /*$(".dark-mode-trigger").each(function(i, obj) {
            var topDistance = $(this).offset().top;
            if ( (topDistance+400) < scrollPos ) {
                
                $(".dark-mode-nav").each(function(i, obj) {
                    $(this).addClass('dark-mode');
                });
            }
            else {
                $(".dark-mode-nav").each(function(i, obj) {
                    $(this).removeClass('dark-mode');
                });
            }
        });*/
        $(".dark-mode-body-trigger").each(function(i, obj) {
            var topDistance = $(this).offset().top;
            if ( (topDistance+600) < scrollPos ) {
                
                $("body").each(function(i, obj) {
                    $(this).addClass('dark-mode-body');
                });
            }
            else {
                $("body").each(function(i, obj) {
                    $(this).removeClass('dark-mode-body');
                });
            }
        });
    }

    //animating in: after
    transitionElement(".fjr-hero", "fjr-hero-before", ".fjr-section", scrollPos);
}

function transitionElement(elementName, elementNameBefore, anchorName, scrollPos) {
    var windowHeight = $(window).height();

    var topDistance = 0;
    $(anchorName).each(function(i, obj) {
        topDistance = $(this).offset().top;
    });

    $(elementName).each(function(i, obj) {
        if ( (topDistance-(windowHeight*0.5)) < scrollPos) {
            $(this).removeClass(elementNameBefore);
        }
        else {
            //$(this).addClass(elementNameBefore);
        }
    });
}

function waveHand() {
}

function lightAnchorClicked() {
    /*$(".dark-mode-nav").each(function(i, obj) {
        $(this).removeClass('dark-mode');
    }).deladelay( 5000 );*/

    setTimeout(function() {
        //disableDarkModeTransitionForTweaksAnchor = false;
    }, 500);
}

function darkAnchorClicked() {
    /*$(".dark-mode-nav").each(function(i, obj) {
        $(this).addClass('dark-mode');
    });*/

    setTimeout(function() {
    }, 500);
}

function contactFormSendButtonPressed() {
    var formHasErrors = updateContactFormErrorMessages();

    if (!formHasErrors) {
        $(".form-submit-button").each(function(i, obj) {
            $(this).html("Sending");
            $(this).addClass('disabled-button');
        });

        var formNameElement = document.getElementById("form-name");
        var formEmailElement = document.getElementById("form-email");
        var formCategoryElement = document.getElementById("form-category");
        var formMessageElement = document.getElementById("form-message");

        var templateParams = {
            name: formNameElement.value,
            email: formEmailElement.value,
            category: formCategoryElement.value,
            message: formMessageElement.value
        };
        
        emailjs.send('service_mvjrmnw', 'template_73kn1ie', templateParams).then(function(response) {
            console.log('Contact Form success', response.status, response.text);
            $(".final-error").each(function(i, obj) {
                $(this).addClass('form-error-hide');
            });
            collapseFormCompletion();
        }, function(error) {
            console.log('Contact form failed', error);
            $(".final-error").each(function(i, obj) {
                $(this).removeClass('form-error-hide');
            });
        });
    }
}

function updateContactFormErrorMessages() {
    var formHasErrors = false;

    var formNameElement = document.getElementById("form-name");
    var formEmailElement = document.getElementById("form-email");
    var formCategoryElement = document.getElementById("form-category");
    var formMessageElement = document.getElementById("form-message");

    if (!formNameElement.checkValidity()) {
        formHasErrors = true;
        $(".name-form-error").each(function(i, obj) {
            $(this).removeClass('form-error-hide');
        });
    }
    else {
        $(".name-form-error").each(function(i, obj) {
            $(this).addClass('form-error-hide');
        });
    }

    if (!formEmailElement.checkValidity()) {
        formHasErrors = true;
        $(".email-form-error").each(function(i, obj) {
            $(this).removeClass('form-error-hide');
        });
    }
    else {
        $(".email-form-error").each(function(i, obj) {
            $(this).addClass('form-error-hide');
        });
    }

    if (!formCategoryElement.checkValidity() || (formCategoryElement.value == "none")) {
        formHasErrors = true;
        $(".category-form-error").each(function(i, obj) {
            $(this).removeClass('form-error-hide');
        });
    }
    else {
        $(".category-form-error").each(function(i, obj) {
            $(this).addClass('form-error-hide');
        });
    }

    if (!formMessageElement.checkValidity()) {
        formHasErrors = true;
        $(".message-form-error").each(function(i, obj) {
            $(this).removeClass('form-error-hide');
        });
    }
    else {
        $(".message-form-error").each(function(i, obj) {
            $(this).addClass('form-error-hide');
        });
    }

    return formHasErrors;
}

function updateContactFormErrorMessagesRemoveOnly() {
    var formHasErrors = false;

    var formNameElement = document.getElementById("form-name");
    var formEmailElement = document.getElementById("form-email");
    var formCategoryElement = document.getElementById("form-category");
    var formMessageElement = document.getElementById("form-message");

    if (formNameElement.checkValidity()) {
        $(".name-form-error").each(function(i, obj) {
            $(this).addClass('form-error-hide');
        });
    }

    if (formEmailElement.checkValidity()) {
        $(".email-form-error").each(function(i, obj) {
            $(this).addClass('form-error-hide');
        });
    }

    if (formCategoryElement.checkValidity() && (formCategoryElement.value != "none")) {
        $(".category-form-error").each(function(i, obj) {
            $(this).addClass('form-error-hide');
        });
    }

    if (formMessageElement.checkValidity()) {
        $(".message-form-error").each(function(i, obj) {
            $(this).addClass('form-error-hide');
        });
    }

    return formHasErrors;
}

function collapseFormCompletion() {
    $(".form-show-after-submission").each(function(i, obj) {
        $(this).removeClass('form-element-hide');
    });
    $(".form-hide-after-submission").each(function(i, obj) {
        $(this).addClass('form-element-hide');
    });
}

/*var floatingTransitionsEnabled = true;

$(document).ready(function() {
    if (!floatingTransitionsEnabled) {
        $(".floating-element").each(function(i, obj) {
            showElementImmediately($(this));
        });
    }
    $(".floating-element-immediate").each(function(i, obj) {
        showElementImmediately($(this));
    });
});

$(window).scroll(function() {
    $(".floating-element").each(function(i, obj) {
        showElementIfScrolledOnScreen($(this));
    });
});

function showElementImmediately(element) {
    element.addClass('floating-element-after');
}

function showElementDelayed(element) {
    element.addClass('floating-element-after-delayed');
}

function showElementIfScrolledOnScreen(element) {
    if (elementIsOnScreen(element)) {
        showElementImmediately(element);
    }
}

function elementIsOnScreen(element) {
    //returns a boolean

    var scrollPos = $(window).scrollTop();
    var windowHeight = $(window).height();

    return ((scrollPos > element.offset().top - (0.7*windowHeight)) || ((element.height() > 300) && (scrollPos > element.offset().top - windowHeight + (0.8*element.height()))));
}*/