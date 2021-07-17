let pair = []

function newGame() {
    const vocCol1 = document.getElementById("vocCol1")
    const vocCol2 = document.getElementById("vocCol2")

    const words = getWords() // select random words out of word-pool
    const shufWords1 = shuffleArray(words.slice()) // shuffle the words
    const shufWords2 = shuffleArray(words.slice()) // shuffle the words

    const h2Lang1 = document.getElementById("lang1")
    const h2Lang2 = document.getElementById("lang2")

    const config = loadConfig() // get the current configuration
    h2Lang1.innerText = languages.filter(l => l.id === config.language1)[0].name
    h2Lang2.innerText = languages.filter(l => l.id === config.language2)[0].name

    while (vocCol1.firstChild) { // Remove all child elements of column 1
        vocCol1.removeChild(vocCol1.firstChild)
    }

    while (vocCol2.firstChild) { // Remove all child elements of column 2
        vocCol2.removeChild(vocCol2.firstChild)
    }

    for (let i = 0; i < shufWords1.length; i++) { // insert the words for language 1
        const word = shufWords1[i]
        const wordLang = word.words.filter(w => w.languageId === loadConfig().language1)[0].word
        createWordButton(i, word.id, 1, wordLang, vocCol1)
    }

    for (let i = 0; i < shufWords2.length; i++) { // insert the words for language 2
        const word = shufWords2[i]
        const wordLang = word.words.filter(w => w.languageId === loadConfig().language2)[0].word
        createWordButton(i, word.id, 2, wordLang, vocCol2)
    }
}

function createWordButton(i, id, col, word, list) {
    const el = document.createElement("DIV")
    el.classList.add("col-12")

    const btn = document.createElement("DIV")
    btn.classList.add("btn-voc")
    btn.classList.add("border")
    btn.classList.add("border-5")
    btn.classList.add("border-primary")
    btn.id = `voc${i}Col${col}`
    btn.appendChild(document.createTextNode(word))
    const att = document.createAttribute("value")
    att.value = id
    btn.attributes.setNamedItem(att)

    el.appendChild(btn)

    btn.addEventListener("click", () => {
        if (btn.classList.contains("border-primary")) {
            btn.classList.remove("border-primary")
            btn.classList.add("border-secondary")
            pair.push(btn.id)
        } else {
            btn.classList.remove("border-secondary")
            btn.classList.add("border-primary")
            pair.splice(pair.findIndex(p => p === btn.id))
        }

        if (pair.length >= 2) {
            checkPair()
        }
    })

    list.appendChild(el)
}

function getWords() {
    const words = vocabulary.slice()
    for (let i = words.length; i > loadConfig().words; i--) {
        const ri = Math.floor(Math.random() * words.length)
        words.splice(ri, 1)
    }
    return words
}

function checkPair() {
    const btn1 = document.getElementById(pair[0])
    const btn2 = document.getElementById(pair[1])

    if (btn1.getAttribute("value") === btn2.getAttribute("value")) {
        btn1.classList.remove("border-secondary")
        btn1.classList.add("border-success")

        btn2.classList.remove("border-secondary")
        btn2.classList.add("border-success")

        incCorrect()

        setTimeout(() => {
            btn1.classList.remove("border-success")
            btn1.classList.add("border-primary")
            btn2.classList.remove("border-success")
            btn2.classList.add("border-primary")

            btn1.parentNode.removeChild(btn1)
            btn2.parentNode.removeChild(btn2)
        }, 2000)
    } else {
        btn1.classList.remove("border-secondary")
        btn1.classList.add("border-danger")

        btn2.classList.remove("border-secondary")
        btn2.classList.add("border-danger")

        incAttempts()

        setTimeout(() => {
            btn1.classList.remove("border-danger")
            btn1.classList.add("border-primary")
            btn2.classList.remove("border-danger")
            btn2.classList.add("border-primary")
        }, 2000)
    }

    pair = []
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}
