function start_game() {
    let total_cookies = 0;
    let current_cookies = 0;
    const cookie = document.getElementById("cookie");
    const current_cookie_count = document.getElementById("current_cookie_count");



    function return_cursor_loc(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;

        return { x: mouseX, y: mouseY };
    }

    function add_to_counter(amount) {
        current_cookies += amount;
        total_cookies += amount

        current_cookie_count.innerHTML = total_cookies + " cookies";
    }

    cookie.addEventListener("click", function(event) {
        amount = 1;
        add_to_counter(amount)

        let current_cursor_loc = return_cursor_loc(event);

        let cookie_addition = document.createElement("div");
        cookie_addition.className = "cookie_addition fade_up";
        cookie_addition.innerText = "+" + amount;
        document.body.appendChild(cookie_addition);


        cookie_addition.style.left = current_cursor_loc.x + "px";
        cookie_addition.style.top = current_cursor_loc.y + "px";

        setTimeout(function() {
            document.body.removeChild(cookie_addition);
        }, 4000);


    });

}


start_game()