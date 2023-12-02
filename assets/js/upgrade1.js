import { createPlayerInfo, createSimulator } from './card.js';
let players = await fetch("/players.json").then(x => x.json()).catch(x => console.error("Error:", x));
let searchName = '';
var seasonState = [];
var seasonStateSum = 0;
let seasonButtons = document.getElementById('seasonButtons');
var simulatorDiv;
var currentPlayer;
var [upgrade, setUpgrade] = [1, (x) => { upgrade = x; }];
var [blockState, setBlockState] = [5, (x) => { blockState = x; }];

for (let i = 0; i < players.length; i++)
    seasonState.push(false);

function makeSeasonButton(i) {
    let seasonButton = document.createElement('button');
    seasonButton.classList.add('season-button', 'btn');
    seasonButton.style.opacity = 0.3;
    let seasonButtonImg = document.createElement('img');
    seasonButtonImg.src = 'https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/season/' + players[i][0] + ".png";
    seasonButton.appendChild(seasonButtonImg);
    seasonButton.onclick = function () {
        seasonState[i] = !seasonState[i];
        seasonStateSum += seasonState[i] ? -1 : 1;
        seasonButton.style.opacity = 0.3 + seasonState[i] * 0.7;
    };
    return seasonButton;
}

function resetSeasonButton() {
    seasonStateSum = 0;
    for (let s = 0; s < players.length; s++) {
        seasonState[s] = false;
        seasonButtons.childNodes[s].style.opacity = 0.3;
    }
    searchName = '';
    document.getElementById("searchName").value = '';
}

for (let i = 0; i < players.length; i++) {
    seasonButtons.appendChild(makeSeasonButton(i));
}

function searchPlayer() {
    let result = [];
    for (let i = 0; i < players.length; i++) {
        if (seasonStateSum && !seasonState[i])
            continue;

        players[i][2].forEach(player => {
            if (player[0].includes(searchName)) {
                result.push({
                    'season': players[i][0],
                    'season_no': players[i][1],
                    "name": player[0],
                    "id": player[1],
                    "nation": player[2],
                    "position": player[3],
                    "ovr": player[4],
                    "pay": player[5],
                });
            }
        });
    }
    result.sort((a, b) => {
        if (b.ovr > a.ovr)
            return 1;
        else if (a.ovr > b.ovr)
            return -1;
        else if (b.name > a.ovr)
            return 1;
        else if (a.name > b.name)
            return -1;
        return 0;
    });
    result = result.slice(0, 30);
    return result;
}

function makePlayerList() {
    let playerList = searchPlayer();
    let playerListDiv = document.getElementById("playerList");
    playerListDiv.innerHTML = '';
    if (playerList.length == 0) {
        let noResultDiv = document.createElement("div");
        noResultDiv.classList.add("player-info");
        noResultDiv.innerHTML = "검색 결과가 없습니다.";
        playerListDiv.appendChild(noResultDiv);
        return;
    }
    playerList.forEach(season => {
        let playerInfo = createPlayerInfo(season);
        playerInfo.addEventListener("click", () => {
            currentPlayer = season;
            initSimulator();
        });
        playerListDiv.appendChild(playerInfo);
    });
}

function initSimulator() {
    simulatorDiv?.["remove"]();
    simulatorDiv = createSimulator(currentPlayer, upgrade, setUpgrade, blockState, setBlockState, initSimulator);
    document.getElementById('simulator').appendChild(simulatorDiv);
}

document.getElementById("searchName").addEventListener("input", e => {
    searchName = e.target.value;
});

document.getElementById('searchName').addEventListener("keyup", e => {
    if (e.key == "Enter")
        makePlayerList();
});

document.getElementById("searchButton").addEventListener("click", makePlayerList);
document.getElementById('resetButton').addEventListener("click", resetSeasonButton);
makePlayerList();
currentPlayer = {
    'season': "ICONTM",
    'season_no': 100,
    'name': '펠레',
    'id': 190043,
    'nation': 54,
    'position': "CF",
    'ovr': 125,
    'pay': 33
};
initSimulator();

// (async () => {
//     function getResult() {
//         return new Promise((r) => setTimeout(r, 2200));
//     }

//     var success = 0;
//     for (let i = 0; i < 100; i++) {
//         document.getElementsByClassName('simulator-button')[0].click();
//         await getResult();
//         if (document.getElementsByClassName('upgrade-success').length)
//             success++;
//         document.getElementsByClassName('retry-button')[0].click();
//     }
//     console.log(success);
// })();