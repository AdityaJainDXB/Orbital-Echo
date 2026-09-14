export function initClock() {
    const clock = document.getElementById("clock");
    const date = document.getElementById("greeting");

    function update(){
        const now = new Date();
        clock.textContent = now.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});

        const hour = now.getHours();
        date.textContent =
            hour< 5 ? "Still in orbit" : hour<12 ? "Good morning, Commander" : hour<18 ? "Good afternoon, Commander" : "Good evening, Commander";
    }
    
    update();
    setInterval(update, 15000);
    }