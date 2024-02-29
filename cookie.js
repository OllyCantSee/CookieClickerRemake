function start_game() {
    let total_cookies = 0;
    let current_cookies = 0;
    let cookie_click_increase = 1;
    let current_purchase_limit = 15;
    let cookies_psecond = 0;
    let number_of_cursors = 0;
    let cursor_cookies_psecond = 0.1;
    let check_cookies_complete = 0;
    let interval_started = false;
    const cookie = document.getElementById("cookie");
    const current_cookie_count = document.getElementById("current_cookie_count");
    const upgrade_one = document.getElementById("upgrade_one");
    const upgrade_two = document.getElementById("upgrade_two");
    const upgrade_three = document.getElementById("upgrade_three");
    const cursor_upgrade = document.getElementById("add_cursor");
    const add_cursor_price = document.getElementById("add_cursor_price");
    const add_cursor_quantity = document.getElementById("add_cursor_quantity");
    const current_cookies_psecond = document.getElementById("current_cookies_psecond");
    const mainCookieSection = document.getElementById('cookie_cursors_section');
    const cursor = document.querySelector('.cookie_cursor');
    add_cursor_price.innerText = current_purchase_limit;
    add_cursor_quantity.innerHTML = number_of_cursors;

    cursor_upgrade.addEventListener("click", function() {
        if(current_cookies >= current_purchase_limit) {
                current_cookies = current_cookies - current_purchase_limit;
                current_purchase_limit = Math.round(current_purchase_limit + current_purchase_limit * 0.2, 1);
                number_of_cursors += 1;

                let cookies_psecond_now = get_cookies_psecond();
                cookies_psecond_now = cookies_psecond_now.toFixed(1);

                current_cookies_psecond.innerHTML = "per second: " + cookies_psecond_now;
                update_visual_cookies();
                add_cursor_price.innerText = current_purchase_limit;
                add_cursor_quantity.innerHTML = number_of_cursors;

                let add_cookie_cursor = document.createElement("img");
                add_cookie_cursor.src = "RotatedCookieCursor.png";
                add_cookie_cursor.className = "cookie_cursor";
                mainCookieSection.appendChild(add_cookie_cursor);
        }
        if (!interval_started) {
            setInterval(add_cookies_psecond, 1000)
            interval_started = true;
        }
        update_page_title();
        check_cursor_cookies();
    })

    function cookie_exists() {
        let cookies = document.cookie.split('; ');
        cookies.forEach(function(c){
        if(c.match(/current_cookies=.+/)) {
            console.log(true);
            check_cookies();
        }
        });
    }

    function check_cookies() {
        let temp_current_cookies = getCookie("current_cookies");
        let temp_click_increase = getCookie("cookie_click_increase");

        if (temp_click_increase > 1) {
            upgrade_one.remove();
        }
        if (temp_click_increase > 3) {
            upgrade_two.remove();
        }

        current_cookies = parseInt(temp_current_cookies);
        cookie_click_increase = parseInt(temp_click_increase);
        if (cookie_click_increase == 2) {
            cursor_cookies_psecond = 0.2;
            let cookies_psecond_now = get_cookies_psecond();
            cookies_psecond_now = cookies_psecond_now.toFixed(1);
            current_cookies_psecond.innerHTML = "per second: " + cookies_psecond_now;
        }
        if (cookie_click_increase == 4) {
            cursor_cookies_psecond = 0.4;
            let cookies_psecond_now = get_cookies_psecond();
            cookies_psecond_now = cookies_psecond_now.toFixed(1);
            current_cookies_psecond.innerHTML = "per second: " + cookies_psecond_now;
        }
        if (cookie_click_increase == 6) {
            cursor_cookies_psecond = 0.8;
            let cookies_psecond_now = get_cookies_psecond();
            cookies_psecond_now = cookies_psecond_now.toFixed(1);
            current_cookies_psecond.innerHTML = "per second: " + cookies_psecond_now;
        }
        current_cookie_count.innerHTML = Math.round(current_cookies, 1) + " cookies";
        update_page_title();
        check_cursor_cookies();
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


    upgrade_one.onclick = function() {
        if(current_cookies >= 100) {
            current_cookies = current_cookies - 100;
            cookie_click_increase = cookie_click_increase * 2;
            current_cookie_count.innerHTML = Math.round(current_cookies, 1) + " cookies";
            upgrade_one.remove();
            cursor_cookies_psecond = cursor_cookies_psecond * 2;
            let cookies_psecond_now = get_cookies_psecond()
            cookies_psecond_now = cookies_psecond_now.toFixed(1);
            current_cookies_psecond.innerHTML = "per second: " + cookies_psecond_now;
            update_page_title()
        }

        check_cursor_cookies() 

    }

    upgrade_two.onclick = function() {
        if(current_cookies >= 500) {
            current_cookies = current_cookies - 500;
            cookie_click_increase = cookie_click_increase * 2;
            current_cookie_count.innerHTML = Math.round(current_cookies, 1) + " cookies";
            upgrade_two.remove();
            cursor_cookies_psecond = cursor_cookies_psecond * 2;
            let cookies_psecond_now = get_cookies_psecond()
            cookies_psecond_now = cookies_psecond_now.toFixed(1);
            current_cookies_psecond.innerHTML = "per second: " + cookies_psecond_now;
            update_page_title()
        }

        check_cursor_cookies() 

    }

    upgrade_three.onclick = function() {
        if(current_cookies >= 10000) {
            current_cookies = current_cookies - 10000;
            cookie_click_increase = cookie_click_increase * 2;
            current_cookie_count.innerHTML = Math.round(current_cookies, 1) + " cookies";
            upgrade_three.remove();
            cursor_cookies_psecond = cursor_cookies_psecond * 2;
            let cookies_psecond_now = get_cookies_psecond()
            cookies_psecond_now = cookies_psecond_now.toFixed(1);
            current_cookies_psecond.innerHTML = "per second: " + cookies_psecond_now;
            update_page_title()
        }

        check_cursor_cookies() 

    }

    function return_cursor_loc(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;

        return { x: mouseX, y: mouseY };
    }

    function add_to_counter() {
        current_cookies += cookie_click_increase;
        total_cookies += cookie_click_increase

        current_cookie_count.innerHTML = Math.round(current_cookies, 1) + " cookies";
        check_cursor_cookies() 
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
        create_cookie();
        update_page_title()
        check_cursor_cookies()


        let random_x_adjust = Math.random() * (10);

        cookie_addition.style.left = current_cursor_loc.x - 10 + random_x_adjust + "px";
        cookie_addition.style.top = current_cursor_loc.y - 30 + "px";

        setTimeout(function() {
            document.body.removeChild(cookie_addition);
        }, 4000);

    });

    function add_cookies_psecond() {
        let previous_integer_part = Math.floor(current_cookies); 
        let addition_psecond = cursor_cookies_psecond * number_of_cursors;
        current_cookies += addition_psecond;
    
        let current_integer_part = Math.floor(current_cookies);
    
        if (current_integer_part > previous_integer_part) {
            create_cookie();
            current_cookie_count.innerHTML = Math.round(current_cookies) + " cookies";
            update_page_title()
        }
    }

    function get_cookies_psecond() {
        cursors_total = cursor_cookies_psecond * number_of_cursors;
        cookies_psecond = cursors_total;
        return cookies_psecond;
    }

    check_cursor_cookies() 

    function create_cookie() {
        let cookie_image = document.createElement("img");
        cookie_image.src = "Cookie Image.png";
        cookie_image.className = "fall_down";
        document.body.appendChild(cookie_image);

        let random_x = Math.random() * (530);

        cookie_image.style.left = random_x + "px";

        setTimeout(() => {
            document.body.removeChild(cookie_image);
        }, 1600);
    }

    function update_visual_cookies() {
        let current_decimal = current_cookies.toString().split(".")
        if (current_decimal == 0.9) {
            current_cookie_count.innerHTML = Math.ceil(current_cookies, 1) + " cookies";
        } else {
            current_cookie_count.innerHTML = Math.floor(current_cookies, 1) + " cookies";
        }
    }

    function update_page_title() {
        document.title = Math.round(current_cookies) + " cookies - Cookie Clicker";
    }

    function check_cursor_cookies() {
        //UPGRADE 1
        if (document.getElementById("upgrade_frame_1") !== null) {
            if (current_cookies >= 100) {
                const upgrade_frame_1 = document.getElementById("upgrade_frame_1");
                upgrade_frame_1.src = "UpgradeFrame.png";
            } else {
                upgrade_frame_1.src = "UpgradeFrameDark.png";
            }
        }
        
        // UPGRADE 2
        if (document.getElementById("upgrade_frame_2") !== null) {
            if (current_cookies >= 500) {
                const upgrade_frame_2 = document.getElementById("upgrade_frame_2");
                upgrade_frame_2.src = "UpgradeFrame.png";
            } else {
                upgrade_frame_2.src = "UpgradeFrameDark.png";
            }
        }

        // UPGRADE 3
        if (document.getElementById("upgrade_frame_3") !== null) {
            if (current_cookies >= 500) {
                const upgrade_frame_3 = document.getElementById("upgrade_frame_2");
                upgrade_frame_3.src = "UpgradeFrame.png";
            } else {
                upgrade_frame_3.src = "UpgradeFrameDark.png";
            }
        }
    }

    window.onload = function () {
        const numCursors = 100;
        const radius = 200; // Adjust as needed
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        for (let i = 0; i < numCursors; i++) {
            const angle = (i / numCursors) * 2 * Math.PI;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            createCursor(x, y);
        }
    };

    function createCursor(x, y) {
        const cursor = document.createElement('div');
        cursor.className = 'cookie_cursors';
        cursor.style.left = x + 'px';
        cursor.style.top = y + 'px';
        document.body.appendChild(cursor);
    }

    update_page_title()
    check_cursor_cookies() 

}



start_game()