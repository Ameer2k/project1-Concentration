# Matching Pairs Game — Storyboard

## 1. Game idea

A single-player memory game with pirate emojis. The player flips two cards at a time and tries to find every matching pair. A timer records how long the player takes.

**Goal:** Match all pairs in the shortest time possible.

## 2. Screens and difficulty

The game has two screens: Home and Game. The winning message appears inside the Game screen.

| Difficulty | Pairs | Total cards | Grid layout |
| --- | --- | --- | --- |
| Easy | 4 | 8 | 4 columns × 2 rows |
| Medium | 6 | 12 | 4 columns × 3 rows |
| Hard | 12 | 24 | 4 columns × 6 rows |

## 3. Storyboard scenes

### Scene 1 — Home screen

**What the player sees:** A white rounded panel on a light blue background. The heading says “Welcome To My First Game”. Below it are a difficulty heading and three buttons: Easy, Medium, and Hard.

**Player action:** Click a difficulty button.

**Game response:** `startGame(level)` saves the number of pairs, resets the game, creates and shuffles the cards, and displays the Game screen.

**Next scene:** The card board is ready.

### Scene 2 — Board ready

**What the player sees:** A heading, “Time: 0”, a pairs counter starting at 0, and a grid of blue cards displaying question marks. Restart and Home buttons appear below the board.

**Player action:** Choose the first card.

**Game response:** The timer begins on the first valid card click. It does not begin when the difficulty is selected.

**Next scene:** One card is revealed.

### Scene 3 — First card revealed

**What the player sees:** The selected card shows a pirate emoji. Its background becomes pale orange and a flip animation plays for 0.5 seconds.

**Player action:** Choose a different, unmatched card.

**Game response:** The first card is stored in `firstCard`. Clicking it again does nothing. The next valid card is stored in `secondCard`, and the game compares their emojis.

**Next scene:** A match or a mismatch.

### Scene 4 — Matching pair

**What the player sees:** Both matching cards remain face up and turn pale green. The pairs counter increases by 1.

**Player action:** Continue choosing cards.

**Intended game response:** Mark the two cards as matched, clear the selection, and check whether all pairs have been found. Matched cards cannot be selected again.

**Next scene:** Another turn, or the winning message when every pair is matched.

### Scene 5 — Wrong pair

**What the player sees:** Two different emojis remain visible for 1 second, giving the player time to remember their positions.

**Player action:** Wait for the cards to hide.

**Game response:** `lock` blocks card clicks during this pause. After 1 second, both cards show question marks again, the selection is cleared, and clicking is enabled. The timer keeps running.

**Next scene:** The player chooses another first card.

### Scene 6 — Game complete

**What the player sees:** Every card is green and face up. A green message displays “You Win in [seconds] seconds”.

**Player action:** Click Restart to play again, or Home to choose another difficulty.

**Game response:** The timer stops. `gameWon` prevents further card flips.

### Scene 7 — Restart

**What the player sees:** A newly shuffled board at the same difficulty. The timer and pairs counter return to 0, and the winning message disappears.

**Player action:** Select a card to begin again.

**Game response:** `restartGame()` calls `startGame(pairs)`. Any running timer or pending mismatch timeout is cleared during reset.

### Scene 8 — Return home

**What the player sees:** The Home screen and its three difficulty buttons.

**Player action:** Choose a difficulty for a new game.

**Current code behavior:** `goHome()` first restarts the game, creating a fresh board, then hides it and displays Home. The timer stays at 0 until a valid card is clicked.

## 4. Visual design

| Element | Appearance |
| --- | --- |
| Page | Light blue background: `#f0f7ff` |
| Main panel | White, maximum width 650px, 20px rounded corners, soft shadow |
| Text | Arial; dark gray body text; blue main headings |
| Easy button | Pale green |
| Medium button | Pale yellow |
| Hard button | Pale pink |
| Hidden card | Blue background with a question mark |
| Revealed card | Pale orange background with an emoji |
| Matched card | Pale green background with an emoji |
| Restart button | Blue with white text |
| Home button | Light gray with dark text |
| Board spacing | Four equal columns with 10px gaps |

Buttons move upward slightly on hover. Keyboard-focused buttons have a blue outline. Cards use a square shape and 32px emoji text.

## 5. Game rules

1. Select a difficulty.
2. Flip two different cards.
3. Matching cards stay visible and increase the pairs counter.
4. Different cards hide again after 1 second.
5. Continue until all pairs are matched.
6. The timer counts upward in seconds; there is no time limit.

The supplied version has no computer opponent, separate score, or loss condition.

## 6. Main JavaScript functions

| Function | Purpose |
| --- | --- |
| `startGame(level)` | Set difficulty, reset state, prepare cards, and show the game |
| `resetGame()` | Clear selections, timers, board, counters, and message |
| `makePairs()` | Select emojis and duplicate them to create pairs |
| `shuffleCards()` | Rearrange the card array |
| `createCards()` | Build card elements and attach click events |
| `flipCard(card)` | Validate a click and reveal a card |
| `checkMatch()` | Compare the selected emojis |
| `correctMatch()` | Mark a pair and increase the counter |
| `wrongMatch()` | Pause briefly, then hide different cards |
| `checkWin()` | Stop the timer and show the winning message |
| `restartGame()` | Start again at the current difficulty |
| `goHome()` | Reset through a restart, then show Home |

## 7. Assets

- Pirate emojis: 🏴‍☠️, ⚔️, ⚓, ⛵, 🪙, ☠️, 🦜, 🌊, 🧭, 🗺️, 💥, 🦈.
- `gamemu.mp3`: looping background music. The HTML requests autoplay, but the browser may require user interaction before allowing playback.
- Animate.css: supplies the `flipInY` animation used by the `.flip` class.

## 8. Small corrections before presenting

### Fix the matching-pair error

In the supplied `correctMatch()`, `clearCards()` sets both selected cards to `null`. Calling `clearFlip()` afterward tries to read `classList` from `null`, which causes an error.

Move `clearFlip()` before `clearCards()`:

```js
function correctMatch() {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");

  matches++;
  matchText.textContent = matches;

  clearFlip();
  clearCards();
  checkWin();
}
