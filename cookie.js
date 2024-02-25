function start_game() {
    let total_cookies = 0;
    let current_cookies = 0;
    let cookie_click_increase = 1;
    let check_cookies_complete = 0;
    const cookie = document.getElementById("cookie");
    const current_cookie_count = document.getElementById("current_cookie_count");
    const upgrade_one = document.getElementById("upgrade_one");

    function cookie_exists() {
        var cookies = document.cookie.split('; ');
        cookies.forEach(function(c){
        if(c.match(/current_cookies=.+/)) {
        console.log(true);
        check_cookies()
        }
        });
    }

    function check_cookies() {
        let temp_current_cookies = getCookie("current_cookies");
        let temp_click_increase = getCookie("cookie_click_increase");

        if (temp_click_increase > 1) {
            upgrade_one.remove();
        }

        current_cookies = parseInt(temp_current_cookies);
        cookie_click_increase = parseInt(temp_click_increase);
        current_cookie_count.innerHTML = current_cookies + " cookies";
    }

    function getCookie(cookieName) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${cookieName}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
    }

    if (check_cookies_complete == 0) {
        cookie_exists()
        check_cookies_complete = 1
    }


    upgrade_one.addEventListener("click", function() {
        if(current_cookies > 100) {
            current_cookies = current_cookies - 100;
            cookie_click_increase = 2;
            current_cookie_count.innerHTML = current_cookies + " cookies";
            upgrade_one.remove();
        }

    })

    function return_cursor_loc(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;

        return { x: mouseX, y: mouseY };
    }

    function add_to_counter() {
        current_cookies += cookie_click_increase;
        total_cookies += cookie_click_increase

        current_cookie_count.innerHTML = current_cookies + " cookies";
    }

    cookie.addEventListener("click", function(event) {
        add_to_counter()
        
        document.cookie = "current_cookies=" + current_cookies
        document.cookie = "cookie_click_increase=" + cookie_click_increase;

        let current_cursor_loc = return_cursor_loc(event);

        let cookie_addition = document.createElement("div");
        cookie_addition.className = "cookie_addition fade_up";
        cookie_addition.innerText = "+" + cookie_click_increase;
        document.body.appendChild(cookie_addition);


        cookie_addition.style.left = current_cursor_loc.x - 10 + "px";
        cookie_addition.style.top = current_cursor_loc.y - 30 + "px";

        setTimeout(function() {
            document.body.removeChild(cookie_addition);
        }, 4000);

    });

}

start_game()