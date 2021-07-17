function initButtonHandler() {
    const sectionContent = document.getElementById("sectionContent")
    const sectionStatistic = document.getElementById("sectionStatistic")
    const sectionSettings = document.getElementById("sectionSettings")

    const btnContent = document.getElementById("btnContent")
    const btnStatistic = document.getElementById("btnStatistic")
    const btnSettings = document.getElementById("btnSettings")

    const btnNewGame = document.getElementById("btnNewGame")

    const btnStatReset = document.getElementById("btnStatReset")

    const btnSettingsIncWords = document.getElementById("btnIncWords")
    const btnSettingsDecWords = document.getElementById("btnDecWords")

    const selLang1 = document.getElementById("comboLang1")
    const selLang2 = document.getElementById("comboLang2")

    btnContent.addEventListener("click", () => {
        disable(sectionStatistic)
        disable(sectionSettings)
        enable(sectionContent)

        unsetActive(btnStatistic)
        unsetActive(btnSettings)
        setActive(btnContent)
    })

    btnStatistic.addEventListener("click", () => {
        disable(sectionContent)
        disable(sectionSettings)
        enable(sectionStatistic)

        unsetActive(btnContent)
        unsetActive(btnSettings)
        setActive(btnStatistic)
    })

    btnSettings.addEventListener("click", () => {
        disable(sectionContent)
        disable(sectionStatistic)
        enable(sectionSettings)

        unsetActive(btnContent)
        unsetActive(btnStatistic)
        setActive(btnSettings)
    })

    btnNewGame.addEventListener("click", () => {
        newGame()
        statNewGame()
    })

    btnStatReset.addEventListener("click", () => {
        resetStats()
        drawStats(loadStats())
    })

    btnSettingsIncWords.addEventListener("click", () => {
        incWordsPerGame()
    })

    btnSettingsDecWords.addEventListener("click", () => {
        decWordsPerGame()
    })

    selLang1.addEventListener("change", () => {
        const config = loadConfig()
        config.language1 = selLang1.options[selLang1.selectedIndex].value
        saveConfig(config)
    })

    selLang2.addEventListener("change", () => {
        const config = loadConfig()
        config.language2 = selLang2.options[selLang2.selectedIndex].value
        saveConfig(config)
    })
}

function enable(element) {
    element.classList.remove("d-none")
    element.classList.add("d-flex")
}

function disable(element) {
    element.classList.remove("d-flex")
    element.classList.add("d-none")
}

function setActive(element) {
    element.classList.remove("text-muted")
    element.classList.add("active")
}

function unsetActive(element) {
    element.classList.remove("active")
    element.classList.add("text-muted")
}
