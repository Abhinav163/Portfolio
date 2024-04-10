        // Get the button
        let mybutton = document.getElementById("myBtn");
        window.onscroll = function() {scrollFunction()};
        function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
        }
        function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        }
        var i = 0;
        var txt = 'A Front-End Web Developer ‎ ';
        var speed = 160;
        function typeWriter() {
                if (i < txt.length) {
                    document.getElementById("typer").innerHTML += txt.charAt(i);
                    i++;
                    setTimeout(typeWriter, 160);
                }
        }