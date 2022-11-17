// blackjack game

// function to return a random number between 4 and 21 inclusive
function initialDeal() {
    var max = 22; // max is exclusive
    var min = 4; // min is inclusive
    var number = Math.floor(Math.random() * (max - min) + min);
    return number;
}

// function to return a random number between 2 and 11
function deal() {
    var max = 12; // max is exclusive
    var min = 2; // min in inclusive
    var number = Math.floor(Math.random() * (max - min) + min);
    return number;
}

function checkScore(score) {
    if (score === 21) {
        return "won";
    } else if (score > 21) {
        return "bust";
    } else {
        return;
    }
}

function decideResult(playerScore, dealerScore) {

    // check if dealer bust
    if (dealerScore > 21) {
        keepPlaying = confirm(`Dealer busts, you won! Dealer scored ${dealerScore}, which is over 21. Your winning score was ${playerScore}. Great. So you wanna go again?`);
    } else if (dealerScore === 21) {
        keepPlaying = confirm(`Oh, bad luck, you lost! The dealer got exactly ${dealerScore} compared to your score of ${playerScore}. Unlucky. So you wanna go again?`);
    } else {

        // calculate difference in scores from 21
        var playerDifference = Math.abs(playerScore - 21);
        var dealerDifference = Math.abs(dealerScore - 21);

        if (playerDifference < dealerDifference) {
            keepPlaying = confirm(`Hey now, you won! Your score of ${playerScore} was closer to 21 than the dealer's score of ${dealerScore}. Great. So you wanna go again?`);
        } else if (playerDifference > dealerDifference) {
            keepPlaying = confirm(`Oh, bad luck, you lost! The dealer's score of ${dealerScore} was closer to 21 than your score of ${playerScore}. Unlucky. So you wanna go again?`);
        } else {
            keepPlaying = confirm(`Well, would you look at that, we have a tie! Your score of ${playerScore} was identical to dealer's score of ${dealerScore}. I think we should go again, what do you say?`);
        }
    }
}

// global variable
var keepPlaying = confirm("Let's Play Blackjack!");

while (keepPlaying) {

    // deal player
    var playerScore = initialDeal();

    // check if they've won on the first go
    if (checkScore(playerScore) === "won") {
        keepPlaying = confirm(`Wow, 21 on the first go! Congratulations! Play again?`);
        continue; // skips to next iteration of parent loop
    }

    // deal dealer
    var dealerScore = deal()

    // hit, bust or stay loop
    var bust = false;
    var stay = false;
    var won = false;
    while (!bust && !stay && !won) {

        // ask player if they want to hit or stay
        var hit = confirm(`Okay, your current score is ${playerScore}. Click OK to Hit, or Cancel to Stay.`);

        if (hit) {
            playerScore += deal();

            if (checkScore(playerScore) === "won") {
                won = true;
            } else if (checkScore(playerScore) === "bust") {
                bust = true;
            } else {
                continue;
            }
        } else {
            stay = true;
        }
    }

    // output result of game
    if (won) {
        keepPlaying = confirm(`Blackjack! You scored a perfect ${playerScore}! Play again?`);
        continue;
    } else if (bust) {
        keepPlaying = confirm(`Ouch, you've bust! Your score was ${playerScore}. Play again?`);
        continue;
    } else if (stay) {

        // deal to dealer's hand if their score is under 17
        while (dealerScore < 17) {
            dealerScore += deal();
        }

        decideResult(playerScore, dealerScore);
    }
}