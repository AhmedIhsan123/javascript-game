let score = 0;
let pointsPerClick = 1;
let health = 100;

let upgrades = [
	{ id: 1, name: "+2 Upgrade", cost: 10, bonus: 2 },
	{ id: 2, name: "+4 Upgrade", cost: 20, bonus: 4 },
	{ id: 3, name: "+8 Upgrade", cost: 40, bonus: 8 },
];

let inventory = [
	{ id: "green", name: "Green Herb", amount: 0 },
	{ id: "red", name: "Red Herb", amount: 0 },
	{ id: "yellow", name: "Yellow Herb", amount: 0},
];

const healthRef = document.querySelector("#health-display");
const scoreRef = document.querySelector("#score-display");
const rateRef = document.querySelector("#rate-display");
const upgradesRef = document.querySelector("#upgrades");
const button = document.querySelector("#click-btn");

const updateHealth = setInterval(() => {
	health--;
	healthRef.textContent = `Health: ${health}`;
	if(health == 0) { clearInterval(updateHealth); }
}, 1000);

function updateDisplay() {
	scoreRef.textContent = `Score: ${score}`;
	rateRef.textContent = `Points per click: ${pointsPerClick}`;
}

function buyUpgrade(id) {
	const found = upgrades.find((fid) => fid.id == id);
	if (score >= found.cost) {
		score = score - found.cost;
		pointsPerClick = pointsPerClick + found.bonus;
		updateDisplay();
		renderUpgrades();
	}
}

function renderUpgrades() {
	upgradesRef.innerHTML = "";
	upgrades.forEach((el) => {
		let div = document.createElement("div");
		let buyBtn = document.createElement("button");
		div.innerHTML = `<strong>${el.name}</strong> Cost: ${el.cost} | +${el.bonus} per click `;
		buyBtn.textContent = "Buy";
		const found = upgrades.find((fid) => fid.id == el.id);
		if (found.cost > score) { buyBtn.disabled = true; }
		else { buyBtn.disabled = false; }
		buyBtn.addEventListener("click", () => { buyUpgrade(el.id); });
		div.appendChild(buyBtn);
		upgradesRef.appendChild(div);
	});
}

button.addEventListener("click", function () {
	health = health + pointsPerClick;
	updateDisplay();
	renderUpgrades();
});

renderUpgrades();
