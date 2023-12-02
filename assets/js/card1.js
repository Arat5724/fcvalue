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
            (2 <= i) ? "upgrade_cooper" : ""
}

export function createPlayerImg(pid, season_no) {
    var faceonElement = document.createElement('img');
    const spid = (season_no * 1000000 + pid).toString();
    faceonElement.src = 'https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersActionHigh/p' + spid + ".png";
    faceonElement.onerror = function () {
        faceonElement.src = "https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/playersHigh/p" + pid.toString() + ".png";
        faceonElement.onerror = function () {
            faceonElement.src = "https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/players/p" + pid.toString() + '.png';
            faceonElement.onerror = function () {
                faceonElement.src = "https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/players/not_found.png";
            };
        };
    };
    return faceonElement;
}

export function createCard(player, upgrade, setUpgrade, setUpgrade2) {
    var tempDiv = document.createElement("div");
    tempDiv.classList.add("thumb", '0' <= player.season[0x0] && player.season[0x0] <= '9' ? '_' + player.season : player.season);
    var cardBackDiv = document.createElement('div');
    cardBackDiv.classList.add("card_back");
    var imgElement = document.createElement('img');
    imgElement.src = "https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/card/" + player.season + ".png";
    imgElement.alt = '';
    cardBackDiv.appendChild(imgElement);
    tempDiv.appendChild(cardBackDiv);

    var faceonDiv = document.createElement('div');
    faceonDiv.classList.add("img");
    var faceonElement = createPlayerImg(player.id, player.season_no);
    faceonDiv.appendChild(faceonElement);
    tempDiv.appendChild(faceonDiv);

    var playerOvr = player.ovr;
    var ovrDiv = document.createElement("div");
    ovrDiv.classList.add("ovr");
    ovrDiv.innerHTML = playerOvr + upgradeOvr[upgrade];
    tempDiv.appendChild(ovrDiv);

    var positionDiv = document.createElement("div");
    positionDiv.classList.add("position");
    positionDiv.innerHTML = player.position;
    tempDiv.appendChild(positionDiv);

    var nationDiv = document.createElement("div");
    nationDiv.classList.add("nation");
    var nationImgElement = document.createElement("img");
    nationImgElement.src = "https://fco.dn.nexoncdn.co.kr/live/externalAssets/common/countries/smallflags/" + player.nation.toString() + ".png";
    nationDiv.appendChild(nationImgElement);
    tempDiv.appendChild(nationDiv);

    var seasonDiv = document.createElement("div");
    seasonDiv.classList.add("season");
    var imgElement2 = document.createElement("img");
    imgElement2.src = 'https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/season/' + player.season + '_big.png';
    imgElement2.onerror = function () {
        imgElement2.remove();
    };
    seasonDiv.appendChild(imgElement2);
    tempDiv.appendChild(seasonDiv);

    var selectorDiv = document.createElement('div');
    var selectorText1 = document.createElement('span');
    selectorText1.innerHTML = upgrade;
    selectorDiv.appendChild(selectorText1);
    var selectorText2 = document.createElement("span");
    selectorText2.innerHTML = " ∨";
    selectorDiv.appendChild(selectorText2);
    selectorDiv.classList = ["selector_wrap " + upgradeClass(upgrade)];
    tempDiv.appendChild(selectorDiv);

    var selectorListDiv = document.createElement("div");
    selectorListDiv.classList.add("selector_list");
    selectorListDiv.classList.add("hidden");
    var selectorListUl = document.createElement('ul');
    function setTargetUpgrade(i) {
        if (!selectorListDiv.classList.contains("hidden")) {
            selectorListDiv.classList.add('hidden');
        }
        selectorText2.innerHTML = '';
        var cardBackWhiteDiv = document.createElement("div");
        cardBackWhiteDiv.classList.add('card_back_upgrade');
        var imgElement3 = document.createElement("img");
        imgElement3.src = "https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/card/" + player.season + ".png";
        imgElement3.alt = '';
        cardBackWhiteDiv.appendChild(imgElement3);
        tempDiv.appendChild(cardBackWhiteDiv);
        var tempResult = i > upgrade;
        setTimeout(() => {
            if (tempResult) {
                tempDiv.classList.add("upgrade-success");
                ["left", "right"].forEach(side => {
                    let effectDiv = document.createElement("div");
                    effectDiv.classList.add("success-" + side);
                    let imgElement4 = document.createElement('img');
                    imgElement4.src = "/assets/images/simulator/flame.gif";
                    effectDiv.appendChild(imgElement4);
                    tempDiv.appendChild(effectDiv);
                });
            } else {
                tempDiv.classList.add('upgrade-fail');
            }
            ovrDiv.innerHTML = playerOvr + upgradeOvr[i];
            selectorDiv.classList = ["selector_wrap " + upgradeClass(i)];
            selectorText1.innerHTML = i;
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
            selectorText1.innerHTML = i;
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
    var nameWrapDiv = document.createElement("div");
    nameWrapDiv.classList.add("name_wrap");
    var seasonDiv = document.createElement("div");
    seasonDiv.classList.add("season");
    var imgElement = document.createElement("img");
    imgElement.src = 'https://ssl.nexon.com/s2/game/fc/online/obt/externalAssets/season/' + player.season + '.png';
    seasonDiv.appendChild(imgElement);
    nameWrapDiv.appendChild(seasonDiv);
    var nameDiv = document.createElement('div');
    nameDiv.classList.add("name");
    nameDiv.innerHTML = player.name;
    nameWrapDiv.appendChild(nameDiv);
    tempDiv.appendChild(nameWrapDiv);
    var _0x4e7486 = document.createElement("div");
    _0x4e7486.classList.add("pay");
    _0x4e7486.innerHTML = player.pay;
    tempDiv.appendChild(_0x4e7486);
    return [tempDiv, setTargetUpgrade];
}

function BlockBar(blockState, setBlockState) {
    let blockBarInput = document.createElement("input");
    blockBarInput.classList.add("gage-input");
    blockBarInput.type = 'range';
    blockBarInput.min = 0.1;
    blockBarInput.max = 0x5;
    blockBarInput.step = 0.1;
    blockBarInput.value = blockState;
    blockBarInput.oninput = function () {
        setBlockState(blockBarInput.value);
    };
    return blockBarInput;
}

export function createSimulator(player, upgrade, setUpgrade, blockState, setBlockState, initSimulator) {
    var successProb = upgradeProb[upgrade] * blockState / 0x5;

    let simulatorDiv = document.createElement("div");
    simulatorDiv.classList.add('simulator');

    let probInfoDiv = document.createElement("div");
    probInfoDiv.classList.add("prob-info");

    let blockDiv = document.createElement('div');
    blockDiv.classList.add("prob-info");
    let blockPrimaryDiv = document.createElement("span");
    blockPrimaryDiv.innerHTML = blockState;
    blockDiv.appendChild(blockPrimaryDiv);
    blockDiv.appendChild(document.createTextNode('칸'));

    let probDiv = document.createElement("div");
    probDiv.classList.add("prob-info");
    let probPrimaryDiv = document.createElement("span");
    probPrimaryDiv.innerHTML = Math.round(successProb * 10000) / 100;
    probDiv.appendChild(document.createTextNode("\uAC15\uD654 \uD655\uB960 "));
    probDiv.appendChild(probPrimaryDiv);
    probDiv.appendChild(document.createTextNode('%'));

    let blockBarDiv = document.createElement("div");
    blockBarDiv.classList.add('boost');

    var gageDefaultDiv = document.createElement("div");
    gageDefaultDiv.classList.add("gage");
    gageDefaultDiv.style.backgroundImage = "url(/assets/images/simulator/default.png)";
    blockBarDiv.appendChild(gageDefaultDiv);

    var gageBarDiv = document.createElement("div");
    gageBarDiv.classList.add("gage");
    gageBarDiv.style.backgroundImage = 'url(/assets/images/simulator/bar.png)';
    gageBarDiv.style.width = blockState / 0x5 * 0x64 + '%';
    blockBarDiv.appendChild(gageBarDiv);

    function setBlockState2(x) {
        setBlockState(x);
        blockState = x;
        gageBarDiv.style.width = x / 0x5 * 0x64 + '%';
        blockPrimaryDiv.innerHTML = x;
        successProb = upgradeProb[upgrade] * x / 0x5;
        probPrimaryDiv.innerHTML = Math.round(successProb * 0x2710) / 0x64;
    }

    var blockBarInput = BlockBar(blockState, setBlockState2);
    blockBarDiv.appendChild(blockBarInput);

    let blockBarAdviceDiv = document.createElement("div");
    blockBarAdviceDiv.innerHTML = "클릭하여 조절할 수 있습니다.";
    blockBarAdviceDiv.style.color = '#cccccc';
    blockBarAdviceDiv.style.fontSize = "15px";

    function setUpgrade2(x) {
        upgrade = x;
        successProb = upgradeProb[x] * blockState / 0x5;
        probPrimaryDiv.innerHTML = Math.round(successProb * 0x2710) / 0x64;
    }

    var [tempDiv, setTargetUpgrade] = createCard(player, upgrade, setUpgrade, setUpgrade2);

    simulatorDiv.appendChild(tempDiv);
    simulatorDiv.appendChild(blockBarDiv);
    simulatorDiv.appendChild(blockBarAdviceDiv);
    simulatorDiv.appendChild(blockDiv);
    simulatorDiv.appendChild(probDiv);

    let simulatorButton = document.createElement("button");
    simulatorButton.classList.add('simulator-button');
    simulatorButton.innerHTML = "\uAC15\uD654 \uC2DC\uB3C4";
    simulatorDiv.appendChild(simulatorButton);

    var resultMsgDiv = document.createElement("div");
    resultMsgDiv.classList.add("result-msg");
    resultMsgDiv.innerHTML = "&nbsp;";
    simulatorDiv.appendChild(resultMsgDiv);
    simulatorButton.addEventListener("click", () => {
        tempDiv.classList.add("upgrade-animation");
        let after = 0;
        if (Math.random() < successProb) {
            setTimeout(() => {
                resultMsgDiv.innerHTML = "강화 성공!";
                resultMsgDiv.classList = ["result-msg__success"];
            }, 2000);
            after = upgrade + 1;
        } else {
            setTimeout(() => {
                resultMsgDiv.innerHTML = "강화 실패!";
                resultMsgDiv.classList = ["result-msg__fail"];
            }, 2000);
            let result = Math.random();
            while (restoreProb[upgrade][after] < result) {
                after++;
            }
        }
        setTargetUpgrade(after);
        blockBarInput.disabled = true;
        simulatorButton.remove();
        let retryButton = document.createElement('button');
        retryButton.classList.add("retry-button");
        retryButton.innerHTML = "다시 시도";
        retryButton.addEventListener('click', initSimulator);
        simulatorDiv.insertBefore(retryButton, resultMsgDiv);
    });
    return simulatorDiv;
}
export function createPlayerInfo(element) {
    let player = document.createElement("div");
    player.classList.add("player-info");

    let faceonElement = createPlayerImg(element.id, element.season_no);
    faceonElement.classList.add('faceon');
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
