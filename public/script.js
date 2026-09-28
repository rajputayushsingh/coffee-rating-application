const coffeeGrid = document.getElementById("coffeeGrid");
const leaderboard = document.getElementById("leaderboard");

async function loadCoffees() {
    try {
        const response = await fetch("/api/coffee");
        const coffees = await response.json();

        displayCoffees(coffees);
        displayLeaderboard(coffees);

    } catch (error) {
        console.error("Error:", error);
    }
}

function displayCoffees(coffees) {

    coffeeGrid.innerHTML = "";

    coffees.forEach((coffee) => {

        const card = document.createElement("div");

        card.className = "coffee-card";

        card.innerHTML = `
            <h3>${coffee.name}</h3>

            <p>${coffee.description}</p>

            <div class="vote-count">
                ⭐ Votes: ${coffee.votes}
            </div>

            <button onclick="voteCoffee('${coffee._id}')">
                Vote ☕
            </button>
        `;

        coffeeGrid.appendChild(card);
    });
}

async function voteCoffee(id) {

    try {

        const response = await fetch(`/api/coffee/${id}/vote`, {
            method: "POST"
        });

        const updatedCoffee = await response.json();

        if (!response.ok) {
            alert(updatedCoffee.message);
            return;
        }

        // Refresh data without reloading page
        loadCoffees();

    } catch (error) {
        console.error("Voting error:", error);
    }
}

function displayLeaderboard(coffees) {

    leaderboard.innerHTML = "";

    const topCoffees = [...coffees]
        .sort((a, b) => b.votes - a.votes)
        .slice(0, 5);

    topCoffees.forEach((coffee, index) => {

        const item = document.createElement("div");

        item.className = "leaderboard-item";

        item.innerHTML = `
            <span>
                ${index + 1}. ${coffee.name}
            </span>

            <strong>
                ⭐ ${coffee.votes} votes
            </strong>
        `;

        leaderboard.appendChild(item);
    });
}

loadCoffees();