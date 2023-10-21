const upgradeProb = [0.00, 1.00, 0.81, 0.64, 0.50, 0.26, 0.15, 0.07, 0.04, 0.02]
const restoreProb = [
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
const upgradeOvr = [0, 0, 1, 2, 4, 6, 8, 11, 15, 19, 24];

function upgradeClass(i) {
    return (8 <= i) ? "upgrade_gold" :
    (5 <= i) ? "upgrade_silver" :
    (2 <= i) ? "upgrade_cooper" :
    ""
}

export function createCard(player, upgrade, setUpgrade, setUpgrade2) {
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
    var selectText1 = document.createElement('span');
    selectText1.innerHTML = upgrade;
    selectorDiv.appendChild(selectText1);
    var selectText2 = document.createElement('span');
    selectText2.innerHTML = " ∨";
    selectorDiv.appendChild(selectText2);
    selectorDiv.classList = ["selector_wrap " + upgradeClass(upgrade)];

    tempDiv.appendChild(selectorDiv);

    // selector_list
    var selectorListDiv = document.createElement('div');
    selectorListDiv.classList.add("selector_list");
    selectorListDiv.classList.add("hidden");
    var selectorListUl = document.createElement('ul');

    function setTargetUpgrade(i) {
        if (!selectorListDiv.classList.contains("hidden")) {
            selectorListDiv.classList.add("hidden");
        }
        selectText2.innerHTML = "";
        var cardBackWhiteDiv = document.createElement('div');
        cardBackWhiteDiv.classList.add("card_back_upgrade");
        var imgElement = document.createElement('img');
        imgElement.src =
            "https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/card/" + player.season + ".png";
        imgElement.alt = "";
        cardBackWhiteDiv.appendChild(imgElement);
        tempDiv.appendChild(cardBackWhiteDiv);
        var tempResult = (i > upgrade);
        setTimeout(() => {
            if (tempResult) {
                tempDiv.classList.add("upgrade-success");
                ["left", "right"].forEach((side) => {
                    let effectDiv = document.createElement('div');
                    effectDiv.classList.add("success-" + side);
                    let imgElement = document.createElement('img');
                    imgElement.src =
                        "/assets/images/simulator/flame.gif";
                    effectDiv.appendChild(imgElement);
                    tempDiv.appendChild(effectDiv);
                });
            } else {
                tempDiv.classList.add("upgrade-fail");
            }
            ovrDiv.innerHTML = playerOvr + upgradeOvr[i];
            selectorDiv.classList = ["selector_wrap " + upgradeClass(i)];
            selectText1.innerHTML = i;
            selectorListDiv.classList.add("hidden");
        }, 2000);
    }

    for (let i = 1; i < 10; i++) {
        var selectorListLi = document.createElement('li');
        selectorListLi.innerHTML = i;
        selectorListLi.classList = ["selector_item " + upgradeClass(i)];
        selectorListLi.onclick = function () {
            upgrade = i;
            setUpgrade(i);
            setUpgrade2(i);
            ovrDiv.innerHTML = playerOvr + upgradeOvr[i];
            selectorDiv.classList = ["selector_wrap " + upgradeClass(i)];
            selectText1.innerHTML = i;
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

function BlockBar(blockState, SetBlockState) {
    let blockBarInput = document.createElement("input");
    blockBarInput.classList.add("gage-input");
    blockBarInput.type = "range";
    blockBarInput.min = 0.1;
    blockBarInput.max = 5;
    blockBarInput.step = 0.1;
    blockBarInput.value = blockState;
    blockBarInput.oninput = function () {
        SetBlockState(blockBarInput.value);
    }
    return blockBarInput;
}

export function createSimulator(player, upgrade, setUpgrade, blockState, setBlockState, initSimulator) {
    var successProb = upgradeProb[upgrade] * blockState / 5;

    let simulatorDiv = document.createElement("div");
    simulatorDiv.classList.add("simulator");

        let probInfoDiv = document.createElement("div");
        probInfoDiv.classList.add("prob-info");

        let blockDiv = document.createElement("div");
        blockDiv.classList.add("prob-info");
        let blockPrimaryDiv = document.createElement("span");
        blockPrimaryDiv.innerHTML = blockState;
        blockDiv.appendChild(blockPrimaryDiv);
        blockDiv.appendChild(document.createTextNode("칸"));

        let probDiv = document.createElement("div");
        probDiv.classList.add("prob-info");
        let probPrimaryDiv = document.createElement("span");
        probPrimaryDiv.innerHTML = Math.round(successProb * 10000) / 100;
        probDiv.appendChild(document.createTextNode("강화 확률 "));
        probDiv.appendChild(probPrimaryDiv);
        probDiv.appendChild(document.createTextNode("%"));

        let blockBarDiv = document.createElement("div");
        blockBarDiv.classList.add("boost");

        var gageDefaultDiv = document.createElement("div");
        gageDefaultDiv.classList.add("gage");
        gageDefaultDiv.style.backgroundImage = "url(/assets/images/simulator/default.png)";
        blockBarDiv.appendChild(gageDefaultDiv);

        var gageBarDiv = document.createElement("div");
        gageBarDiv.classList.add("gage");
        gageBarDiv.style.backgroundImage = "url(/assets/images/simulator/bar.png)";
        gageBarDiv.style.width = (blockState / 5 * 100) + "%";
        blockBarDiv.appendChild(gageBarDiv);

        function setBlockState2(v) {
            setBlockState(v);
            blockState = v;
            gageBarDiv.style.width = (blockState / 5 * 100) + "%";
            blockPrimaryDiv.innerHTML = blockState;
            successProb = upgradeProb[upgrade] * blockState / 5;
            probPrimaryDiv.innerHTML = Math.round(successProb * 10000) / 100;
        }

        var blockBarInput = BlockBar(blockState, setBlockState2);
        blockBarDiv.appendChild(blockBarInput);

        let blockBarAdviceDiv = document.createElement("div");
        blockBarAdviceDiv.innerHTML = "클릭하여 조절할 수 있습니다.";
        blockBarAdviceDiv.style.color = "#cccccc";

        function setUpgrade2(i) {
            upgrade = i;
            successProb = upgradeProb[upgrade] * blockState / 5;
            probPrimaryDiv.innerHTML = Math.round(successProb * 10000) / 100;
        }

        var [tempDiv, setTargetUpgrade] = createCard(player, upgrade, setUpgrade, setUpgrade2);

        simulatorDiv.appendChild(tempDiv);
        simulatorDiv.appendChild(blockBarDiv);
        simulatorDiv.appendChild(blockBarAdviceDiv);
        simulatorDiv.appendChild(blockDiv);
        simulatorDiv.appendChild(probDiv);

        let simulatorButton = document.createElement("button");
        simulatorButton.classList.add("simulator-button");
        simulatorButton.innerHTML = "강화 시도";
        simulatorDiv.appendChild(simulatorButton);

        var resultMsgDiv = document.createElement("div");

        simulatorButton.addEventListener("click", () => {
            tempDiv.classList.add("upgrade-animation");
            let after = 0;
            if (Math.random() < successProb) {
                setTimeout(() => {
                    resultMsgDiv.innerHTML = "강화 성공!";
                    resultMsgDiv.classList.add("result-msg__success");
                }, 2000);
                after = upgrade + 1;
            } else {
                setTimeout(() => {
                    resultMsgDiv.innerHTML = "강화 실패!";
                    resultMsgDiv.classList.add("result-msg__fail");
                }, 2000);
                let result = Math.random();
                while (restoreProb[upgrade][after] < result) {
                    after++;
                }
            }
            setTargetUpgrade(after);
            blockBarInput.disabled = true;
            simulatorButton.remove();
            let retryButton = document.createElement("button");
            retryButton.classList.add("retry-button");
            retryButton.innerHTML = "다시 시도";
            retryButton.addEventListener("click", initSimulator);
            simulatorDiv.appendChild(retryButton);
            simulatorDiv.appendChild(resultMsgDiv);
        });

    return simulatorDiv;
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
    let posClass =
        (element["position"].includes("M")) ? "MF" :
        (element["position"].includes("B")) ? "DF" :
        (element["position"].includes("GK")) ? "GK" :
        "FW";
    playerPosDiv.classList.add("player-pos", posClass);
    playerPosDiv.innerHTML = element["position"];
    player.appendChild(playerPosDiv);

    let playerOvrDiv = document.createElement("div");
    playerOvrDiv.classList.add("player-ovr");
    playerOvrDiv.innerHTML = element["ovr"];
    player.appendChild(playerOvrDiv);
    return player;
}