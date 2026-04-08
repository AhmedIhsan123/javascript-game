// Game state
let score = 0;
let pointsPerClick = 1;
let health = 100;
let maxHealth = 100;

let inventory = [
	{ id: "green", name: "Green Herb", amount: 0 },
	{ id: "red", name: "Red Herb", amount: 0 },
	{ id: "yellow", name: "Yellow Herb", amount: 0 },
];

// Rules: array of valid combinations
let mixerCounter = 0;
const validMixes = [
	// Single herbs
	{ combo: ["Green Herb"], effect: { health: 10 } },

	// Two-herb combinations
	{ combo: ["Red Herb", "Green Herb"], effect: { health: 100 } },
	{ combo: ["Green Herb", "Yellow Herb"], effect: { health: 50 } },
	{ combo: ["Green Herb", "Green Herb"], effect: { health: 30 } },

	// Three-herb combinations
	{ combo: ["Red Herb", "Green Herb", "Yellow Herb"], effect: { health: 150 } },
	{
		combo: ["Green Herb", "Green Herb", "Green Herb"],
		effect: { health: maxHealth - 10 },
	},
];

// DOM references
const healthRef = document.querySelector("#health-display");
const healthBarRef = document.querySelector("#health-bar");
const scoreRef = document.querySelector("#score-display");
const rateRef = document.querySelector("#rate-display");
const clickButton = document.querySelector("#click-btn");
const herbsRef = document.querySelectorAll(".herb");
const mixerRef = document.querySelector("#mixer");
const mixBtnRef = document.querySelector("#mix-btn");

// --- Central display update ---
function updateDisplay() {
	// Score & click rate
	scoreRef.textContent = `Score: ${score}`;
	rateRef.textContent = `Points per click: ${pointsPerClick}`;

	// Health text
	healthRef.textContent = `Health: ${health}`;

	// Health bar width
	healthBarRef.style.width = `${(health / maxHealth) * 100}%`;
}

// --- Health modifier helper ---
function changeHealth(amount) {
	health += amount;
	if (health > maxHealth) health = maxHealth;
	if (health < 0) health = 0;
	updateDisplay();
}

// --- Health decay timer ---
const healthDecay = setInterval(() => {
	changeHealth(-1); // decrease by 1 per second
	if (health === 0) clearInterval(healthDecay);
}, 1000);

// --- Click to heal ---
clickButton.addEventListener("click", () => {
	changeHealth(pointsPerClick);
});

// --- Handle herb clicks ---
function handleHerbClicked(hId) {
	switch (hId) {
		case "green-herb":
			addToMixer("Green Herb");
			break;
		case "yellow-herb":
			addToMixer("Yellow Herb");
			break;
		case "red-herb":
			addToMixer("Red Herb");
			break;
		default:
			console.log("Unknown herb clicked");
			break;
	}
}

// --- Add herb to mixer ---
function addToMixer(herbName) {
	if (mixerCounter >= 3) return; // Limit 3 herbs in mixer

	const p = document.createElement("p");
	p.textContent = herbName;

	const btn = document.createElement("button");
	btn.textContent = "Remove";
	btn.addEventListener("click", () => {
		mixerRef.removeChild(p);
		mixerRef.removeChild(btn);
		mixerCounter--;
	});

	mixerRef.appendChild(p);
	mixerRef.appendChild(btn);
	mixerCounter++;
}

// --- Mix herbs ---
function mixHerbs() {
	if (mixerCounter < 1) {
		alert("Add at least 1 herb to mix!");
		return;
	}

	const herbElements = [...mixerRef.querySelectorAll("p")].map(
		(el) => el.textContent,
	);
	const herbCounts = {};
	herbElements.forEach((h) => (herbCounts[h] = (herbCounts[h] || 0) + 1));

	const matchedMix = validMixes.find((mix) => {
		if (!mix || !mix.combo) return false;
		const mixCounts = {};
		mix.combo.forEach((h) => (mixCounts[h] = (mixCounts[h] || 0) + 1));
		for (const h in mixCounts) if (herbCounts[h] !== mixCounts[h]) return false;
		for (const h in herbCounts)
			if (mixCounts[h] !== herbCounts[h]) return false;
		return true;
	});

	if (!matchedMix) {
		alert("Invalid combination. Herbs destroyed!");
		mixerRef.innerHTML = "";
		mixerCounter = 0;
		return;
	}

	// Apply effect using changeHealth
	changeHealth(matchedMix.effect.health);

	// Special yellow herb max health boost
	if (herbElements.includes("Yellow Herb")) {
		maxHealth += 20;
		alert("Yellow herb included! Max health increased by 20.");
		updateDisplay(); // update bar after maxHealth increase
	}

	alert(`Successful mix! Health +${matchedMix.effect.health}`);
	mixerRef.innerHTML = "";
	mixerCounter = 0;
}

// --- Event listeners ---
herbsRef.forEach((herb) =>
	herb.addEventListener("click", () => handleHerbClicked(herb.id)),
);
mixBtnRef.addEventListener("click", () => mixHerbs());

// --- Initial display ---
updateDisplay();
