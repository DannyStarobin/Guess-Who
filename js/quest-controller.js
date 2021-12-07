'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;
var gUserName = 'Anonymous'
$(document).ready(init);

function init() {
    console.log('Started...');
    createQuestsTree();
    // $('.btn-start').click(onStartGuessing);
    $('.btn-start').click(onUserdata);
    $('.btn-add-guess').click(onAddGuess);
    $('.btn-yes').click({ ans: 'yes' }, onUserResponse);
    $('.btn-no').click({ ans: 'no' }, onUserResponse);
    $('.quit-game-btn').click(openModal);
    $('.btn-dont-save-game').click(onQuitGame);
    $('.btn-save-game').click(onQuitGame);
    $('.btn-save-game').click(_saveTreesToStorage);

}

function onUserdata() {
    gUserName = $('#userName').val();
    if (!gUserName) return

    onStartGuessing()
}


function onStartGuessing() {
    // TODO: hide the game-start section
    $('.game-start').hide('slow');

    renderQuest();
    // TODO: show the quest section
    $('.quest').show('slow')
}

function renderQuest() {
    // TODO: select the <h2> inside quest and update
    // its text by the currQuest text
    var currQuest = getCurrQuest()
    $('.quest h2').text(currQuest.txt)



}

function onUserResponse(ev) {
    var res = ev.data.ans;
    // console.log('res:', res);
    console.log(gQuestsTree);
    // If this node has no children
    if (isChildless(getCurrQuest())) {

        if (res === 'yes') {
            $('.quest').hide('slow')
            openModal()
                // alert('Yes, I knew it!');
                // TODO: improve UX
        } else {
            alert('I dont know...teach me!');

            // TODO: hide and show new-quest section
            $('.quest').hide('slow')
            $('.new-quest').show('slow')
        }

    } else {
        // TODO: update the lastRes global var
        gLastRes = res

        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess(ev) {
    ev.preventDefault();
    var newGuess = $('#newGuess').val();
    var newQuest = $('#newQuest').val();
    // TODO: Get the inputs' values
    // TODO: Call the service addGuess
    addGuess(newQuest, newGuess)

    var newGuess = $('#newGuess').val(' ');
    var newQuest = $('#newQuest').val(' ');

    onRestartGame();
}

function onRestartGame() {
    $('.new-quest').hide();
    $('.game-start').show();
    gLastRes = null;
}


function openModal() {
    $('.new-quest').hide();
    $('.modal').show();
    $('.modal h2').text(`Hi ${gUserName}`)
    $('.modal h3').text('Want to save your TREE?')
}


function onQuitGame() {
    $('.modal').hide();
    $('.new-quest').hide();
    $('.game-start').show();
    gLastRes = null;


}