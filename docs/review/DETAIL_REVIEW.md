# Paper Archive Retro Dock Review Notes

## Current Baseline

The portfolio uses a retro computer as the Home visual anchor. The opening terminal reads the retro screen position from the DOM and docks toward that screen instead of using hard-coded coordinates.

## Terminal Dock

The terminal state machine now supports a staged dock: typing, preparing-dock, docking, absorbing, docked, and skipped. The large terminal remains visually connected to the mini terminal through the final screen absorb phase.

## Page Structure

```text
01 Home
02 Projects
03 Photos
04 About
05 Contact
```

## Visual Direction

- realistic desktop terminal window
- beige paper archive desk
- dossier drawer projects
- polaroid travel board
- 4:5 portrait archive frame
- terminal receipt contact card
- restrained blue ink annotation in English only

## Validation Focus

1. The opening terminal should feel like it enters the retro screen, not like it fades away.
2. Projects should read as file folders and dossier cards.
3. Photos should enter without heavy blur or first-scroll jank.
4. Mobile widths should not overflow horizontally.
5. Decorative generated assets should not block reading.
