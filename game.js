document.addEventListener("DOMContentLoaded", function () {
    const missileShooter = document.getElementById("missile-shooter");
    const gameContainer = document.getElementById("game-container");

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
        animateMissile(missile, "blue");
    }

    function createRedMissile(initialX, initialY) {
        const missile = document.createElement("div");
        missile.className = "missile red-missile";
        missile.style.left = missileShooter.style.left;
        missile.style.bottom = "20px"; // Adjust the starting position
        document.body.appendChild(missile);

        const targetX = initialX;
        const targetY = gameContainer.offsetHeight - 20; // Adjust the ending position

        const distance = Math.sqrt(Math.pow(targetX - parseFloat(missile.style.left), 2) + Math.pow(targetY - parseFloat(missile.style.bottom), 2));

        const missileSpeed = 5; // Adjust the speed of the missile
        const time = distance / missileSpeed; // Time = Distance / Speed

        animateRedMissile(missile, targetX, targetY, time);
    }

    function animateMissile(missile, type) {
        let position = { x: parseFloat(missile.style.left), y: parseFloat(missile.style.top) };

        const missileInterval = setInterval(function () {
            position.y += type === "blue" ? 2 : 5; // Adjust the speed of the missile
            missile.style.top = position.y + "px";

            // Check for collisions with cities or other game elements
            // Implement your collision detection logic here

            // If the missile reaches the top or collides, stop the animation
            if (position.y >= window.innerHeight) {
                clearInterval(missileInterval);
                document.body.removeChild(missile);
            }

            // Check if the missile is within the explosion range
            const explosions = document.querySelectorAll(".explosion");
            explosions.forEach((explosion) => {
                const explosionRadius = 25; // Adjust the explosion radius
                const explosionCenterX = parseFloat(explosion.style.left) + explosionRadius;
                const explosionCenterY = parseFloat(explosion.style.top) + explosionRadius;

                const distanceToExplosion = Math.sqrt(
                    Math.pow(explosionCenterX - position.x, 2) + Math.pow(explosionCenterY - position.y, 2)
                );

                if (distanceToExplosion < explosionRadius) {
                    // Missile is within the explosion range, remove it
                    clearInterval(missileInterval);
                    document.body.removeChild(missile);
                }
            });
        }, 20);
    }

    function animateRedMissile(missile, targetX, targetY, time) {
        let position = { x: parseFloat(missile.style.left), y: parseFloat(missile.style.bottom) };
        const totalFrames = Math.ceil(time / 0.02); // Assuming 20 milliseconds per frame

        const missileInterval = setInterval(function () {
            position.y += (targetY - position.y) / totalFrames; // Adjust the speed of the missile
            missile.style.bottom = position.y + "px";

            // Check for collisions with cities or other game elements
            // Implement your collision detection logic here

            // If the missile reaches the target or collides, stop the animation
            if (position.y >= targetY) {
                // Create explosion at the clicked position
                createExplosion(targetX, targetY);

                clearInterval(missileInterval);
                document.body.removeChild(missile);
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
