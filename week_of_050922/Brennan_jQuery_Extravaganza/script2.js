// Setting text of an element using vanilla JavaScript
document.getElementById("stuff").textContent = "HELLLOOOOOOOOO";

// Setting text of an element using JQuery
$('#stuff').text("HELLOOOOOO");

// After three seconds, change the text from Hello to Goodbye
setTimeout(function(){
    $('#stuff').text('GOOOODBBYEEEEE')
}, 3000)

// Here we use JQuery's each() method to find every element with the class "random" and bold the text.
$('.random').each(function(){
    $(this).css('font-weight','bold');
})

// Here we add a disgusting border to every <ol>, in case you couldn't find them or something.
$('ol').each(function(){
    $(this).css('border','5px inset fuchsia');
})

// Here we use JQuery's find() method to find all <li> that are children of any element with the class "foods," then we italicize the text.
$('.foods').find('li').css('font-style','italic');

// Here we add some CSS to every <li> using JQuery.
$('li').css({"border": "1px solid black", "padding": ".5rem", "list-style-type":"none"});

// Here we check every <li> using JQuery's each() method to see if the text is equal to "Slippers," and if it is, we change the background color.
$('li').each(function(){
    if ($(this).text() == "Slippers") {        // We GET the text by just calling $('elementName').text()
        $(this).text('NOT Slippers')           // We SET the text by calling $('elementName').text('set text here')
        $(this).css('background', 'hotpink');  // We'll also make the background hot pink, because hot pink is cool
    }
});

//===-===-===-===-===-===-===-===-===-===-===-===
//=-                                          =-=
//=-=   LET'S GET A LITTLE MORE COMPLICATED   =-=
//=-=                                         =-=
//===-===-===-===-===-===-===-===-===-===-===-===

// Here we use JQuery's closest() method to find the closest <div> that is a direct parent of the "#superspan" element, 
// THEN we use find() again to find the <h3> (a child of the <div>) and change it's color to orange.
// We can't only use closest('h3') here because the "#superspan" is not a direct child of the <h3>...
// the <h3> is a sibling of the <ol> that contains the <li> that contains the <span id="superspan"> element. (check HTML lines 36-47)
$('#superspan').closest('div').find('h3').css('color','orange');

// Quick and easy Dark Mode! When we click the dark mode button...
$('#modeToggle').on('click',function(){
    $(this).toggleClass('btn-dark');          // we "toggle" the btn-dark class on the '#modeToggle' button itself. Toggling means if it has the class, we remove it, and if it doesn't, we add it. 
    $('body').toggleClass('bg-dark');         // we toggle the bg-dark class on the body
    if ($('body').hasClass('bg-dark')) {      // then we check to see if the body HAS the bg-dark class
        $('body').css('color','white');       // if it does, we set all the text on the page to white (some are overruled in other places)
        $('h1').css('color','black');         // here we'll overrule the white text on the "My Faves" header. If you remove this line, that text would also be white.
        $(this).text('Use Light Mode');       // we also have to change the text of the button so it doesn't say "Use Dark Mode" when you're already in Dark Mode.
    } else {                                  // if the body does NOT have the bg-dark class...
        $('body').css('color', 'black');      // we set the text back to black (again, overruled in some places)
        $(this).text('Use Dark Mode');        // we change the button text back.
    }
})

$('li').each(function(){
    var text = $(this).text();                                                   // Get the text of each <li>
    if (text[0] == "S"){                                                         // If the text starts with "S"...
        $(this).css('border-right','2rem solid gray')                            // Create a thick gray border on the right side
        $(this).siblings().not('.random').css('border-left','1rem solid gold');  // Find all the siblings of this <li> and if it does NOT have the class "random", add a gold border to the left
    }    
})

var test = '<div style="height: 1.5rem; background:teal; width:50%; display:inline-block"></div>'            // Make a teal half-width inline div, save it to a variable 
var test2 = $('<div>').css({"background":"green","height":"1.5rem","width":"50%","display":"inline-block"})  // Make a green half-width inline div (a little differently this time), save to variable
$('ol').append(test);                                                                                        // Append the teal div to the end of each <ol>
$('ol').append(test2);                                                                                       // Append the green div to the end of each <ol>

$('h3').on('click',function(){                     // when we click one of the categories   
    $(this).siblings().toggleClass('sneaky');      // toggle the class "sneaky"
    if ($(this).siblings().hasClass('sneaky')) {   // if the element is sneaky now
        $(this).siblings().slideUp();              // hide it (smoothly) with JQuery's slideUp() method
    } else {                                       // otherwise...
        $(this).siblings().slideDown();            // show it (smoothly) with JQuery's slideDown() method
    }
})