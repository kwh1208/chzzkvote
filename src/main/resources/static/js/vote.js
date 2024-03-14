let chatUser = new Set();
let voteUser = [];
voteUser.push(new Set());
let num = [];
num[0] = 0;
let total = 0;
let voteBoolean = false;
let drawBoolean = false;
const startButtons = document.querySelectorAll('.start');
const stopButtons = document.querySelectorAll('.end');

function selectDraw() {
    document.getElementsByClassName("select-vote-draw")[0].style.display = "none";
    document.getElementsByClassName("draw")[0].style.display = "block";
    document.getElementById("selected").innerText = "간편 추첨";
    let drawStartButton = Array.from(startButtons)[0];
    let drawStopButton = Array.from(stopButtons)[0];
    drawStartButton.className = "start-on";
    drawStopButton.className = "end-off";
}

function selectVote() {
    document.getElementsByClassName("select-vote-draw")[0].style.display = "none";
    document.getElementsByClassName("vote")[0].style.display = "block";
    document.getElementById("selected").innerText = "숫자 투표";
    let voteStartButton = Array.from(startButtons)[1];
    let voteStopButton = Array.from(stopButtons)[1];
    voteStartButton.className = "start-on";
    voteStopButton.className = "end-off";
}

function toggleSwitch() {
    let checkBox = document.querySelector('.switch input[type="checkbox"]');
    let slider = document.querySelector('.slider');
    let now = Array.from(document.getElementsByClassName('voting-now'));
    let percent = Array.from(document.getElementsByClassName('voting-percent'));
    let bar = Array.from(document.getElementsByClassName('proceeding-bar'));

    if (checkBox.checked) {
        slider.style.backgroundColor = "#2196F3";
        for (let i = 0; i < now.length; i++) {
            now[i].innerText = '? 명';
            percent[i].innerText = '? 명';
            bar[i].style.width = '0';
        }
    } else {
        slider.style.backgroundColor = "#ccc";
        for (let i = 0; i < now.length; i++) {
            now[i].innerText = voteUser[i].size+' 명';
            percent[i].innerText = voteUser[i].size+' 명';
            bar[i].style.width = Math.floor((voteUser[i].size / chatUser.size) * 100)+' 명';
        }
    }
}

function goHome() {
    document.getElementsByClassName("select-vote-draw")[0].style.display = "block";
    document.getElementsByClassName("vote")[0].style.display = "none";
    document.getElementsByClassName("draw")[0].style.display = "none";
    document.getElementById("selected").innerText = "";
    reload();
    document.getElementById("voteNick").innerHTML ='';
    document.getElementById("num").innerText = '0';
}

function reload() {
    chatUser = new Set();
    voteUser = [];
    voteUser.push(new Set());
    num = [];
    num[0] = 0;
    total = 0;
    voteBoolean = false;
    drawBoolean = false;
    //vote 부분
    let selectionInputs = document.querySelectorAll('.selection');

    if (selectionInputs.length > 1) {
        for (let i = 0; i < selectionInputs.length - 1; i++) {
            selectionInputs[i].remove();
        }
        selectionInputs[selectionInputs.length - 1].value = '';
        selectionInputs[selectionInputs.length - 1].style.display = 'block';
    }

    let voting = document.getElementsByClassName('voting')[0];

    while (voting.firstChild) {
        voting.removeChild(voting.firstChild);
    }

    voting.style.display = 'none';
    document.getElementById('selection').style.display = 'flex';

}

socket.onopen=function (){
    socket.send(sendMessage);
}

socket.onmessage = function (event) {
    let message = event.data;
    const messageObj = JSON.parse(message);
    if (messageObj.bdy&&Modal){
        winnerChats(message);
    }

    else if (messageObj.bdy&&voteBoolean){
        voteStart(message);
    }

    else if (messageObj.bdy&&drawBoolean){
        drawStart(message);
    }
}

function addSelection() {
    if (num.length >= 10) {
        return;
    }

    // 새로운 input 요소 생성
    let newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.className = 'selection';

    let voteDiv = document.querySelector('.vote');
    let inputs = voteDiv.querySelectorAll('input.selection');
    let lastInput = inputs[inputs.length - 1];
    lastInput.parentNode.insertBefore(newInput, lastInput.nextSibling);

    voteUser.push(new Set());
    num.push(0);
}

function deleteSelection() {
    let voteDiv = document.querySelector('.vote');
    let inputs = voteDiv.querySelectorAll('input.selection');

    // 마지막 input 요소 제거
    if (inputs.length>1){
        let lastInput = inputs[inputs.length - 1];
        lastInput.parentNode.removeChild(lastInput);
        voteUser.pop();
        num.pop();
    }
}

function startVote() {
    voteBoolean = true;
    let voteStartButton = Array.from(startButtons)[1];
    let voteStopButton = Array.from(stopButtons)[1];
    voteStartButton.className = "start-off";
    voteStopButton.className = "end-on";

    document.getElementById('selection').style.display = 'none';
    let selectionInputs = Array.from(document.getElementsByClassName('selection'));
    let votingElement = document.querySelector('.voting');
    let htmlToAdd = "";
    let checkBox = document.querySelector('.switch input[type="checkbox"]');
    let valueToShow = checkBox.checked ? '?' : '0';
    for (let i = 0; i < selectionInputs.length; i++) {
        htmlToAdd += '<div class="voting-selection-info">\n' +
            '        <p class="voting-num">' + (i+1) + '</p>\n' +
            '        <p class="voting-selection">' + selectionInputs[i].value + '</p>\n' +
            '        <p class="voting-now">' + valueToShow + ' 명</p>\n' +
            '    </div>\n' +
            '    <div class="voting-selection-bar">\n' +
            '        <div class="bar">\n' +
            '            <div class="proceeding-bar"></div>\n' +
            '        </div>\n' +
            '        <p class="voting-percent">' + valueToShow + ' %</p>\n' +
            '    </div>';
    }
    votingElement.innerHTML = htmlToAdd;


    Array.from(document.getElementsByClassName('voting'))[0].style.display = 'block';
    let selections = document.getElementsByClassName('selection');
    for (let i = 0; i < selections.length; i++) {
        selections[i].style.display = 'none';
    }

}

function startDraw() {
    drawBoolean = true;
    let drawStartButton = Array.from(startButtons)[0];
    let drawStopButton = Array.from(stopButtons)[0];
    drawStartButton.className = "start-off";
    drawStopButton.className = "end-on";
}

function stopVote() {
    voteBoolean = false;
    let voteStartButton = Array.from(startButtons)[1];
    let voteStopButton = Array.from(stopButtons)[1];
    voteStartButton.className = "start-on";
    voteStopButton.className = "end-off";
}

function stopDraw() {
    drawBoolean = false;
    let drawStartButton = Array.from(startButtons)[0];
    let drawStopButton = Array.from(stopButtons)[0];
    drawStartButton.className = "start-on";
    drawStopButton.className = "end-off";
}

function voteStart(message) {
    const messageObj = JSON.parse(message);
    const bdy = messageObj.bdy[0];
    const msg = bdy.msg; //채팅
    let checkBox = document.querySelector('.switch input[type="checkbox"]');
    let now =Array.from(document.getElementsByClassName('voting-now'));
    let percent =Array.from(document.getElementsByClassName('voting-percent'));
    let bar =Array.from(document.getElementsByClassName('proceeding-bar'));
    if (msg.startsWith("!투표 ")){
        const numberPart = msg.split(" ")[1];
        const number = parseInt(numberPart);//투표한 숫자
        const profile = JSON.parse(bdy.profile);
        const nickname = profile.nickname; //유저이름
        if (!chatUser.has(nickname)){
            chatUser.add(nickname);
            let newH4 = document.createElement("h4");
            newH4.textContent = nickname;
            document.getElementById("voteNick").appendChild(newH4);
            num[number-1]++;
            total++;
            voteUser[number-1].add(nickname);
            document.getElementById("num").innerText = total.toString();
            if (!checkBox.checked){
                now[number-1].innerHTML = voteUser[number-1].size+" 명"
                percent[number-1].innerHTML = voteUser[number-1].size+" 명"
                bar[number-1].style.width = Math.floor((voteUser[number-1].size / chatUser.size) * 100)+"%";
            }
        }
    }}

function drawStart(message) {
    console.log("drawStart")
    const messageObj = JSON.parse(message);
    const bdy = messageObj.bdy[0];
    const profile = JSON.parse(bdy.profile);
    const nickname = profile.nickname;
    if (!chatUser.has(nickname)){
        chatUser.add(nickname);
        let newH4 = document.createElement("h4");
        newH4.textContent = nickname;
        document.getElementById("voteNick").appendChild(newH4);
        total++;
        document.getElementById("num").innerText = total.toString();
    }
}
let Modal = false;
let winner = '';
function draw() {
    const chatUserArray = Array.from(chatUser);
    winner = chatUserArray[Math.floor(Math.random() * chatUserArray.length)];
    document.getElementById("winner-nick").innerText = winner;

    let modal = document.getElementById("winner-container");
    modal.style.display = "block";
    Modal = true;
}

function winnerChats(message) {
    let winnerChat = document.getElementById("winner-chat");
    const messageObj = JSON.parse(message);
    if (messageObj.bdy){
        const bdy = messageObj.bdy[0];
        const msg = bdy.msg; //채팅
        const profile = JSON.parse(bdy.profile);
        const nickname = profile.nickname; //유저이름

        if (winner === nickname) {
            let p = document.createElement("p");
            p.textContent = msg;
            winnerChat.appendChild(p);
        }}
}

function closeModal() {
    Modal = false;
    let modal = document.getElementById("winner-container");
    modal.style.display = "none";
    document.getElementById("winner-nick").innerText = '';
    document.getElementById("winner-chat").innerHTML='';
}