function drawStats(stats) {
    const correctlySpan = document.getElementById("correctly")
    const attemptsSpan = document.getElementById("attempts")

    let sumCor = 0
    let sumAtt = 0
    stats.games.forEach(game => {
        sumCor += game.correct
        sumAtt += game.attempts
    })

    correctlySpan.innerText = sumCor
    attemptsSpan.innerText = sumAtt

    const tableBody = document.getElementById("stats-list-body")
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild)
    }

    stats.games.forEach(game => {
        let tr = document.createElement("TR")
        let th = document.createElement("TH")
        let scope = document.createAttribute("scope")
        scope.value = "row"
        th.attributes.setNamedItem(scope)
        th.innerText = game.gameId
        let tdCorr = document.createElement("TD")
        tdCorr.innerText = game.correct
        let tdAtte = document.createElement("TD")
        tdAtte.innerText = game.attempts
        tr.appendChild(th)
        tr.appendChild(tdCorr)
        tr.appendChild(tdAtte)

        tableBody.appendChild(tr)
    })
}

function loadStats() {
    return JSON.parse(storage.getItem("stats"))
}

function saveStats(stats) {
    storage.setItem("stats", JSON.stringify(stats))
}

function resetStats() {
    storage.removeItem("stats")
    saveStats({
        games: []
    })
    statNewGame()
}

function initStats() {
    if (loadStats() === null) {
        resetStats()
    }
    drawStats(loadStats())
}

function incCorrect() {
    incAttempts()
    let stats = loadStats()
    stats.games[stats.games.length-1].correct += 1;
    saveStats(stats)
    drawStats(loadStats())
}

function incAttempts() {
    let stats = loadStats()
    stats.games[stats.games.length-1].attempts += 1
    saveStats(stats)
    drawStats(loadStats())
}

function statNewGame() {
    let stats = loadStats()
    stats.games.push({
        gameId: stats.games.length + 1,
        correct: 0,
        attempts: 0
    })
    saveStats(stats)
    drawStats(loadStats())
}
