const languages = [
    {
        id: "english",
        name: "Englisch"
    },
    {
        id: "german",
        name: "Deutsch"
    },
    {
        id: "french",
        name: "Französisch"
    },
]

function initLangs() {
    const comboLang1 = document.getElementById("comboLang1")
    const comboLang2 = document.getElementById("comboLang2")

    const config = loadConfig()

    languages.forEach(lang => {
        let opt = new Option(lang.name, lang.id)
        comboLang1.add(opt, undefined)
        if (config.language1 === lang.id) {
            comboLang1.value = lang.id
        }

        opt = new Option(lang.name, lang.id)
        comboLang2.add(opt, undefined)
        if (config.language2 === lang.id) {
            comboLang2.value = lang.id
        }
    })
}
