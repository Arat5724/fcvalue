import { createCard, createPlayerInfo } from "./card.js";

let upgradeProb = [0.00, 1.00, 0.81, 0.64, 0.50, 0.26, 0.15, 0.07, 0.04, 0.02]
let restoreProb = [
    [0.00],
    [0.00, 1.00],
    [0.00, 1.00],
    [0.00, 0.65, 1.00],
    [0.00, 0.55, 1.00],
    [0.00, 0.35, 0.75, 1.00],
    [0.00, 0.10, 0.42, 0.78, 1.00],
    [0.00, 0.04, 0.14, 0.44, 0.79, 1.00],
    [0.00, 0.02, 0.06, 0.16, 0.44, 0.79, 1.00],
    [0.00, 0.01, 0.03, 0.07, 0.17, 0.45, 0.79, 1.00]
]

let players = await fetch("/players.json").then(response => response.json()).catch(error => console.error('Error:', error));
let searchName = "손흥민";
let playerGrade = 1;

var seasonState = [];
var seasonStateSum = 0;

var upgrade = 1;
var inputProb = 5;
var successProb = 100;

document.getElementById("ppppp").innerHTML = inputProb + "칸";
document.getElementById("ppppp2").innerHTML = successProb + "%";
document.getElementById("probability-bar").addEventListener("input", (e) => {
    inputProb = e.target.value;
    successProb = upgradeProb[upgrade] * inputProb / 5;
    document.getElementById("ppppp").innerHTML = inputProb + "칸";
    document.getElementById("ppppp2").innerHTML = Math.round(successProb * 10000) / 100 + "%";
});


function setUpgrade(value) {
    upgrade = value;
    successProb = upgradeProb[upgrade] * inputProb / 5;
    document.getElementById("ppppp2").innerHTML = Math.round(successProb * 10000) / 100 + "%";
}

var [card, setTargetUpgrade] = createCard({ season: "ICON", ...players[0]["players"][0] }, upgrade, setUpgrade);
document.getElementById("upgrade-target").appendChild(card);

for (let i = 0; i < players.length; i++) {
    seasonState.push(false);
}

function makeSeasonButton(i) {
    let seasonButton = document.createElement("button");
    seasonButton.classList.add("season-button", "btn")
    seasonButton.style.opacity = 0.3;
    let seasonImage = document.createElement("img");
    seasonImage.src = "https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/season/" + players[i]["season"] + ".png";
    seasonButton.appendChild(seasonImage);
    seasonButton.onclick = function () {
        seasonState[i] = !seasonState[i];
        seasonStateSum += seasonState[i] ? -1 : 1;
        seasonButton.style.opacity = 0.3 + seasonState[i] * 0.7;
    }
    return seasonButton;
}

let seasonButtons = document.getElementById("seasonButtons");

for (let i = 0; i < players.length; i++) {
    seasonButtons.appendChild(makeSeasonButton(i));
}

function searchPlayer() {
    let searchResult = [];
    if (searchName == "") return searchResult;
    for (let i = 0; i < players.length; i++) {
        if (seasonStateSum && !seasonState[i]) continue;
        players[i]["players"].forEach(element => {
            if (element["name"].includes(searchName)) {
                searchResult.push({ season: players[i]["season"], season_no: players[i]["season_no"], ...element });
            }
        });
    }
    searchResult.sort((a, b) => (b["ovr"] - a["ovr"]))
    return searchResult;
}

function makePlayerList() {
    let searchResult = searchPlayer();
    let playerList = document.getElementById("playerList");
    playerList.innerHTML = "";
    if (searchResult.length == 0) {
        let player = document.createElement("div");
        player.classList.add("player-info");
        player.innerHTML = "검색 결과가 없습니다.";
        playerList.appendChild(player);
        return;
    }

    searchResult.forEach(element => {
        let player = createPlayerInfo(element);
        player.addEventListener("click", () => {
            card.remove();
            [card, setTargetUpgrade] = createCard(element, upgrade, setUpgrade);
            document.getElementById("upgrade-target").appendChild(card);
        });

        playerList.appendChild(player);
    });
}


document.getElementById("searchName").addEventListener("input", (e) => {
    searchName = e.target.value;
});

document.getElementById("searchName").addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        makePlayerList();
    }
});

document.getElementById("searchButton").addEventListener("click", makePlayerList);

makePlayerList();

// SEARCH


function tryUpgrade() {
    document.getElementById("upgrade-target").classList.add("upgrade-animation");
    setTimeout(
        () => {
            document.getElementById("upgrade-target").classList.remove("upgrade-animation");

        }, 2000
    );

    if (Math.random() < successProb) {
        setTimeout(
            () => {
                // effects
                let effectDivLeft = document.createElement('div');
                effectDivLeft.classList.add("success-left");
                let imgElementLeft = document.createElement('img');
                imgElementLeft.src =
                    "/assets/images/simulator/flame.gif";
                effectDivLeft.appendChild(imgElementLeft);

                let effectDivRight = document.createElement('div');
                effectDivRight.classList.add("success-right");
                let imgElementRight = document.createElement('img');
                imgElementRight.src =
                    "/assets/images/simulator/flame.gif";
                effectDivRight.appendChild(imgElementRight);

                card.appendChild(effectDivLeft);
                card.appendChild(effectDivRight);
            }, 2000);
        upgradeSuccess();
    } else {
        upgradeFail();
    }
}

function upgradeSuccess() {
    setTargetUpgrade(upgrade + 1);
}

function upgradeFail() {
    let after = 0;
    let result = Math.random();
    while (restoreProb[upgrade][after] < result) {
        after++;
    }
    setTargetUpgrade(after);
}

// function upgradeInfo(grade, d)

document.getElementById("upgrade").addEventListener("click", () => {
    tryUpgrade();
});