let score = 0;
let pointsPerClick = 1;
let upgrades = [
	{ id: 1, name: "+2 Upgrade", cost: 10, bonus: 2 },
	{ id: 2, name: "+4 Upgrade", cost: 20, bonus: 4 },
	{ id: 3, name: "+8 Upgrade", cost: 40, bonus: 8 },
];

const scoreRef = document.querySelector("#score-display");
const rateRef = document.querySelector("#rate-display");
const upgradesRef = document.querySelector("#upgrades");
const button = document.querySelector("#click-btn");

function updateDisplay() {
	scoreRef.textContent = `Score: ${score}`;
	rateRef.textContent = `Points per click: ${pointsPerClick}`;
}

function buyUpgrade(id) {}

function renderUpgrades() {
	upgradesRef.innerHTML = "";
	upgrades.forEach((el) => {
		let div = document.createElement("div");
		let btn = document.createElement("button");
		btn.textContent = "Buy";
		btn.onclick = buyUpgrade(el.id);
		div.innerHTML = `<p>Name: ${el.name}, Cost: ${el.cost}, Bonus: ${el.bonus}</p>`;
		div.style = "display:flex; align-items: center; gap: 1rem;";
		div.appendChild(btn);
		upgradesRef.appendChild(div);
	});
}

button.addEventListener("click", function () {
	score = score + pointsPerClick;
	updateDisplay();
});

renderUpgrades();
