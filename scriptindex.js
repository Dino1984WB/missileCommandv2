document.addEventListener("DOMContentLoaded", function () {
    const missileShooter = document.getElementById("missile-shooter");

    document.addEventListener("mousemove", function (event) {
        // Move the missile shooter with the mouse
        missileShooter.style.left = event.clientX + "px";
    });

    // Create random missiles at regular intervals
    setInterval(function () {
        createRandomMissile();
    }, 2000); // Adjust the firing interval

    function createRandomMissile() {
        const randomX = Math.random() * window.innerWidth;
        const missile = document.createElement("div");
        missile.className = "missile";
        missile.style.left = randomX + "px";
        missile.style.top = "0px";
        document.body.appendChild(missile);
        animateMissile(missile);
    }

    function animateMissile(missile) {
        let position = { x: parseFloat(missile.style.left), y: parseFloat(missile.style.top) };

        const missileInterval = setInterval(function () {
            position.y += 5; // Adjust the speed of the missile
            missile.style.top = position.y + "px";

            // Check for collisions with cities or other game elements
            // Implement your collision detection logic here

            // If the missile reaches the bottom or collides, stop the animation
            if (position.y >= window.innerHeight) {
                clearInterval(missileInterval);
                document.body.removeChild(missile);
            }
        }, 20);
    }
});
