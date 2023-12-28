document.addEventListener("DOMContentLoaded", function () {
    const missileShooter = document.getElementById("missile-shooter");

    document.addEventListener("mousemove", function (event) {
        // Move the missile shooter with the mouse
        missileShooter.style.left = event.clientX + "px";
    });

    document.addEventListener("click", function (event) {
        // Shoot a red missile when the mouse is clicked
        createRedMissile(event.clientX, event.clientY);
    });

    // Create blue missiles at regular intervals
    setInterval(function () {
        createBlueMissile();
    }, 1000); // Adjust the firing interval

    function createBlueMissile() {
        const randomX = Math.random() * window.innerWidth;
        const missile = document.createElement("div");
        missile.className = "missile blue-missile";
        missile.style.left = randomX + "px";
        missile.style.top = "0px";
        document.body.appendChild(missile);
        animateMissile(missile);
    }

    function createRedMissile(initialX, initialY) {
        const missile = document.createElement("div");
        missile.className = "missile red-missile";
        missile.style.left = initialX + "px";
        missile.style.bottom = "20px"; // Adjust the starting position
        document.body.appendChild(missile);
        animateRedMissile(missile, initialX, initialY);
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

    function animateRedMissile(missile, targetX, targetY) {
        let position = { x: parseFloat(missile.style.left), y: parseFloat(missile.style.bottom) };

        const missileInterval = setInterval(function () {
            position.y += 5; // Adjust the speed of the missile
            missile.style.bottom = position.y + "px";

            // Check for collisions with cities or other game elements
            // Implement your collision detection logic here

            // If the missile reaches the target or collides, stop the animation
            if (position.y >= window.innerHeight - 20) { // Adjust the ending position
                clearInterval(missileInterval);
                document.body.removeChild(missile);
                
                // Create explosion at the clicked position
                createExplosion(targetX, targetY);
            }
        }, 20);
    }

    function createExplosion(x, y) {
        const explosion = document.createElement("div");
        explosion.className = "explosion";
        explosion.style.left = x + "px";
        explosion.style.top = y + "px";
        document.body.appendChild(explosion);

        // Remove the explosion element after a short delay
        setTimeout(function () {
            document.body.removeChild(explosion);
        }, 500);
    }
});
