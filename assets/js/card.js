export function createCard(player, upgrade, setUpgrade) {
    const upgradeOvr = [0, 0, 1, 2, 4, 6, 8, 11, 15, 19, 24];

    var tempDiv = document.createElement('div');
    tempDiv.classList.add("thumb", player.season);

    // back
    var cardBackDiv = document.createElement('div');
    cardBackDiv.classList.add("card_back");
    var imgElement = document.createElement('img');
    imgElement.src =
        "https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/card/" + player.season + ".png";

    imgElement.alt = "";

    cardBackDiv.appendChild(imgElement);
    tempDiv.appendChild(cardBackDiv);

    // back
    // var cardBackDiv = document.createElement('div');
    // cardBackDiv.classList.add("card_back_white");
    // var imgElement = document.createElement('img');
    // imgElement.src =
    //     "https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/card/" + player.season + ".png";
    // imgElement.alt = "";
    // cardBackDiv.appendChild(imgElement);
    // tempDiv.appendChild(cardBackDiv);

    // faceon
    var faceonDiv = document.createElement('div');
    faceonDiv.classList.add("img");

    var faceonElement = document.createElement('img');
    faceonElement.src =
        "https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersActionHigh/p" + player.id + ".png";
    faceonElement.onerror = function () {
        faceonElement.src = "https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersHigh/p" + Number.parseInt(player.id.toString().substring(3)).toString() + ".png";
        faceonElement.onerror = function () {
            faceonElement.src = "https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/players/not_found.png";
        }
    };
    faceonDiv.appendChild(faceonElement);
    tempDiv.appendChild(faceonDiv);

    //ovr
    var playerOvr = player.ovr;
    var ovrDiv = document.createElement('div');
    ovrDiv.classList.add("ovr");
    ovrDiv.innerHTML = playerOvr + upgradeOvr[upgrade];
    tempDiv.appendChild(ovrDiv);

    // position
    var positionDiv = document.createElement('div');
    positionDiv.classList.add("position");
    positionDiv.innerHTML = player.position;
    tempDiv.appendChild(positionDiv);

    // season
    var seasonDiv = document.createElement('div');
    seasonDiv.classList.add("season");
    var imgElement = document.createElement('img');
    imgElement.src =
        "https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/season/" + player.season + "_big.png";
    seasonDiv.appendChild(imgElement);
    tempDiv.appendChild(seasonDiv);

    // upgrade
    var selectorDiv = document.createElement('div');
    selectorDiv.classList.add("selector_wrap");
    selectorDiv.innerHTML = upgrade;

    if (8 <= upgrade) {
        selectorDiv.classList.add("upgrade_gold");
    } else if (5 <= upgrade) {
        selectorDiv.classList.add("upgrade_silver");
    } else if (2 <= upgrade) {
        selectorDiv.classList.add("upgrade_cooper");
    }
    tempDiv.appendChild(selectorDiv);

    // selector_list
    var selectorListDiv = document.createElement('div');
    selectorListDiv.classList.add("selector_list");
    selectorListDiv.classList.add("hidden");
    var selectorListUl = document.createElement('ul');

    function setTargetUpgrade(i) {
        var cardBackDiv = document.createElement('div');
        cardBackDiv.classList.add("card_back_upgrade");
        var imgElement = document.createElement('img');
        imgElement.src =
            "https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/card/" + player.season + ".png";
        imgElement.alt = "";
        cardBackDiv.appendChild(imgElement);
        tempDiv.appendChild(cardBackDiv);
        setTimeout(() => {
            tempDiv.removeChild(cardBackDiv);
        }, 2100);
        setTimeout(() => {
            setUpgrade(i);
            ovrDiv.innerHTML = playerOvr + upgradeOvr[i];
            if (8 <= i) {
                selectorDiv.classList = ["selector_wrap upgrade_gold"];
            } else if (5 <= i) {
                selectorDiv.classList = ["selector_wrap upgrade_silver"];
            } else if (2 <= i) {
                selectorDiv.classList = ["selector_wrap upgrade_cooper"];
            } else {
                selectorDiv.classList = ["selector_wrap"];
            }
            selectorDiv.innerHTML = i;
            selectorListDiv.classList.add("hidden");
        }, 2000);
    }

    for (let i = 1; i < 10; i++) {
        var selectorListLi = document.createElement('li');
        selectorListLi.innerHTML = i;
        if (8 <= i) {
            selectorListLi.classList = ["selector_item upgrade_gold"];
        } else if (5 <= i) {
            selectorListLi.classList = ["selector_item upgrade_silver"];
        } else if (2 <= i) {
            selectorListLi.classList = ["selector_item upgrade_cooper"];
        } else {
            selectorListLi.classList = ["selector_item"];
        }
        selectorListLi.onclick = function () {
            setUpgrade(i);
            ovrDiv.innerHTML = playerOvr + upgradeOvr[i];
            if (8 <= i) {
                selectorDiv.classList = ["selector_wrap upgrade_gold"];
            } else if (5 <= i) {
                selectorDiv.classList = ["selector_wrap upgrade_silver"];
            } else if (2 <= i) {
                selectorDiv.classList = ["selector_wrap upgrade_cooper"];
            } else {
                selectorDiv.classList = ["selector_wrap"];
            }
            selectorDiv.innerHTML = i;
            selectorListDiv.classList.add("hidden");
        };
        selectorListUl.appendChild(selectorListLi);
    }
    selectorListDiv.appendChild(selectorListUl);
    tempDiv.appendChild(selectorListDiv);

    selectorDiv.addEventListener("click", function () {
        if (selectorListDiv.classList.contains("hidden")) {
            selectorListDiv.classList.remove("hidden");
        } else {
            selectorListDiv.classList.add("hidden");
        }
    });

    // name wrap
    var nameWrapDiv = document.createElement('div');
    nameWrapDiv.classList.add("name_wrap");
    var seasonDiv = document.createElement('div');
    seasonDiv.classList.add("season");
    var imgElement = document.createElement('img');
    imgElement.src =
        "https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/season/" + player.season + ".png";
    seasonDiv.appendChild(imgElement);
    nameWrapDiv.appendChild(seasonDiv);
    var nameDiv = document.createElement('div');
    nameDiv.classList.add("name");
    nameDiv.innerHTML = player.name;
    nameWrapDiv.appendChild(nameDiv);
    tempDiv.appendChild(nameWrapDiv);

    // pay
    var payDiv = document.createElement('div');
    payDiv.classList.add("pay");
    payDiv.innerHTML = player.pay;
    tempDiv.appendChild(payDiv);

    return [tempDiv, setTargetUpgrade];
}

export function createPlayerInfo(element) {
    let player = document.createElement("div");
    player.classList.add("player-info");

    let faceonElement = document.createElement('img');
    faceonElement.classList.add("faceon");
    var playerId = element["id"].toString();
    faceonElement.src =
        "https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersActionHigh/p" + playerId + ".png";
    faceonElement.onerror = function () {
        faceonElement.src = "https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersHigh/p" + Number.parseInt(playerId.substring(3)).toString() + ".png";
        faceonElement.onerror = function () {
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
    return player;
}