import { createCard, createPlayerInfo, createSimulator } from "./card.js";

let players = await fetch("/players.json").then(response => response.json()).catch(error => console.error('Error:', error));
let searchName = "";

var seasonState = [];
var seasonStateSum = 0;
let seasonButtons = document.getElementById("seasonButtons");

var simulatorDiv;

var currentPlayer;
var [upgrade, setUpgrade] = [1, (value) => { upgrade = value; }];
var [blockState, setBlockState] = [5, (value) => { blockState = value; }];

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

function resetSeasonButton() {
    seasonStateSum = 0;
    for (let i = 0; i < players.length; i++) {
        seasonState[i] = false;
        seasonButtons.childNodes[i].style.opacity = 0.3;
    }
    searchName = "";
    document.getElementById("searchName").value = "";
}

for (let i = 0; i < players.length; i++) {
    seasonButtons.appendChild(makeSeasonButton(i));
}

function searchPlayer() {
    let searchResult = [];
    for (let i = 0; i < players.length; i++) {
        if (seasonStateSum && !seasonState[i]) continue;
        players[i]["players"].forEach(element => {
            if (element["name"].includes(searchName)) {
                searchResult.push({ season: players[i]["season"], season_no: players[i]["season_no"], ...element });
            }
        });
    }
    searchResult.sort((a, b) => (b["ovr"] - a["ovr"]))
    searchResult = searchResult.slice(0, 100);
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
            currentPlayer = element;
            initSimulator();
        });

        playerList.appendChild(player);
    });
}

function initSimulator() {
    simulatorDiv?.remove();
    simulatorDiv = createSimulator(currentPlayer, upgrade, setUpgrade, blockState, setBlockState, initSimulator);
    document.getElementById("simulator").appendChild(simulatorDiv);
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

document.getElementById("resetButton").addEventListener("click", resetSeasonButton);

makePlayerList();

currentPlayer = { season: "ICONTM", ...players[0]["players"][45] }
initSimulator();