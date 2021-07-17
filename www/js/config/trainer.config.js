const std_config = {
    words: 5,
    language1: "english",
    language2: "german"
}

function drawConfig(config) {
    const spanWordsPerGame = document.getElementById("wordsPerGame")

    spanWordsPerGame.innerText = config.words
}

function loadConfig() {
    return JSON.parse(storage.getItem("config"))
}

function saveConfig(config) {
    storage.setItem("config", JSON.stringify(config))
}

function resetConfig() {
    storage.removeItem("config")
    saveConfig(std_config)
}

function initConfig() {
    if (loadConfig() === null) {
        resetConfig()
    }
    drawConfig(loadConfig())
}

function incWordsPerGame() {
    let config = loadConfig()
    if (config.words < 10) {
        config.words += 1
    }
    saveConfig(config)
    drawConfig(loadConfig())
}

function decWordsPerGame() {
    let config = loadConfig()
    if (config.words > 5) {
        config.words -= 1
    }
    saveConfig(config)
    drawConfig(loadConfig())
}
