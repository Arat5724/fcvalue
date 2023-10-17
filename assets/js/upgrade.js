let players = await fetch("/players.json").then(response => response.json()).catch(error => console.error('Error:', error));
let searchName = "손흥민";
let playerGrade = 1;

document.getElementById("searchName").addEventListener("input", (e) => {
    searchName = e.target.value;
});

var seasonState = [];
var seasonStateSum = 0;

for (let i = 0; i < players.length; i++) {
    seasonState.push(false);
}

function makeSeasonButton(i) {
    let seasonButton = document.createElement("button");
    seasonButton.classList.add("season-button", "btn")
    seasonButton.style.opacity = 0.5;
    let seasonImage = document.createElement("img");
    seasonImage.src = "https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/season/" + players[i]["season"] + ".png";
    seasonButton.appendChild(seasonImage);
    seasonButton.onclick = function () {
        seasonState[i] = !seasonState[i];
        seasonStateSum += seasonState[i] ? -1 : 1;
        seasonButton.style.opacity = 0.5 + seasonState[i] * 0.5;
    }
    return seasonButton;
}

let seasonButtons = document.getElementById("seasonButtons");

for (let i = 0; i < players.length; i++) {
    seasonButtons.appendChild(makeSeasonButton(i));
}

function seaechPlayer() {
    let searchResult = [];
    for (let i = 0; i < players.length; i++) {
        if (seasonStateSum && !seasonState[i]) continue;
        players[i]["players"].forEach(element => {
            if (element["name"].includes(searchName)) {
                searchResult.push({ "season": players[i]["season"], "season_no": players[i]["season_no"], ...element});
            }
        });
    }
    searchResult.sort((a, b) => (b["ovr"] - a["ovr"]))
    return searchResult;
}

function makePlayerList() {
    let searchResult = seaechPlayer();
    let playerList = document.getElementById("playerList");
    playerList.innerHTML = "";
    searchResult.forEach(element => {
        console.log(element);
        let player = document.createElement("div");
        player.classList.add("player-info");

        let faceonElement = document.createElement('img');
        faceonElement.classList.add("faceon");
        var playerId = element["id"].toString();
        faceonElement.src =
            "https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersActionHigh/p" + playerId +  ".png";
        faceonElement.onerror = function() {
            faceonElement.src = "https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersHigh/p" + Number.parseInt(playerId.substring(3)).toString() +  ".png";
            faceonElement.onerror = function() {
                faceonElement.src = "https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/players/not_found.png";
            }
        };
        player.appendChild(faceonElement);

        let playerNameWrap = document.createElement("div");
        playerNameWrap.classList.add("player-name-wrap");

        let seasonDiv = document.createElement("div");
        seasonDiv.classList.add("season");
        let seasonImage = document.createElement("img");
        seasonImage.src = "https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/season/" + element["season"] + ".png";
        seasonDiv.appendChild(seasonImage);
        playerNameWrap.appendChild(seasonDiv);
        
        let playerNameDiv = document.createElement("div");
        playerNameDiv.classList.add("player-name");
        playerNameDiv.innerHTML = element["name"];
        playerNameWrap.appendChild(playerNameDiv);

        player.appendChild(playerNameWrap);

        let playerPosDiv = document.createElement("div");
        let posClass;
        if (element["position"].includes("M")) {
            posClass = "MF";
        } else if (element["position"].includes("B")) {
            posClass = "DF";
        } else if (element["position"].includes("GK")) {
            posClass = "GK";
        } else {
            posClass = "FW";
        }
        playerPosDiv.classList.add("player-pos", posClass);
        playerPosDiv.innerHTML = element["position"];
        player.appendChild(playerPosDiv);

        let playerOvrDiv = document.createElement("div");
        playerOvrDiv.classList.add("player-ovr");
        playerOvrDiv.innerHTML = element["ovr"];
        player.appendChild(playerOvrDiv);

        playerList.appendChild(player);
    });
}


document.getElementById("searchButton").addEventListener("click", makePlayerList);

makePlayerList();