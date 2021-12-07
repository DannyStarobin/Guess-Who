var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;





function createQuestsTree() {
    gQuestsTree = loadFromStorage(gUserName)


    if (!gQuestsTree || !gQuestsTree.length) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
        gCurrQuest = gQuestsTree;
        gPrevQuest = null;
    }
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

// TODO: update the gPrevQuest, gCurrQuest global vars
function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest
    gCurrQuest = gCurrQuest[res]
}

// TODO: Create and Connect the 2 Quests to the quetsions tree
function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    var newQuest = createQuest(newQuestTxt)
    newQuest.yes = createQuest(newGuessTxt)
    newQuest.no = gCurrQuest
    gPrevQuest[gLastRes] = newQuest
    gCurrQuest = gPrevQuest
    _saveTreesToStorage()
}

function getCurrQuest() {
    return gCurrQuest
}

function _saveTreesToStorage() {
    saveToStorage(gUserName, gQuestsTree)
}