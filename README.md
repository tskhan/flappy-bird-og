# Flappy Bird OG

A browser clone of the original Flappy Bird, in a single HTML file. No build step, no dependencies, no image or audio files.

## Run it

Open `index.html` in any modern browser. Keep `scores.js` in the same folder: the game loads it for the high-score logic.

## Tests

```bash
node --test
```

Runs `scores.test.js`, which covers the top-10 logic: sorting, the 10-entry limit, ties, who qualifies, and bad stored data.

## Controls

| Action | Keyboard | Touch |
|--------|----------|-------|
| Flap / start / restart | Space | Tap |
| Slow-motion | Hold S | Hold a second finger while the first is on screen |
| Enter initials | Type A-Z, arrows to change a letter, Backspace to go back, Enter to save | Tap a letter to cycle it, tap OK |

## Features

- Original-style look: sky, city skyline, bushes, drifting clouds, striped scrolling ground, green pipes.
- 17x12 pixel-art bird with a three-frame wing flap.
- Sound effects (flap, score, hit) generated in the browser with WebAudio. Sound starts after your first input, because browsers block audio before that.
- Arcade-style top 10: when your score makes the list you enter three initials, then the table is shown. Your new entry is highlighted.
- Slow-motion power: everything slows to 40% speed, with the same flap arc as normal. Speed eases in and out instead of snapping. A meter drains in about 3 seconds and refills in about 10. Once empty, it stays locked until the meter is back to a quarter.

## High scores

Scores are saved in the browser's `localStorage` under the key `flappyScores`. They stay on that browser and device only. Clearing site data erases them.

## Timing

The game steps at a fixed 60 times per second, so it plays the same on 30, 60 and 144 Hz screens.

## Tuning

Game constants sit near the top of the script in `index.html`: `GRAVITY`, `FLAP`, `GAP`, `SPEED`, `SLOW`, `SLOW_DRAIN` and `SLOW_RECHARGE`.

## Notes

This is a fan project for learning. It copies the look and feel of the original, not its code or assets.

## License

MIT, see `LICENSE`.
