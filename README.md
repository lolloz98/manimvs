# manimvs README

Yet another extension to add behavior that Grant used in the video regarding manimgGl

https://github.com/user-attachments/assets/9e03138e-11c3-4553-993c-0adc0ea7a8f5

## Features

- Select a terminal in vscode where you are running `manimgl [s.py] [scene] -se [liineNumber]`
- Copy things on your clipboard and run `checkpoint_paste()` on the selected terminal
    - if cursor on comment: copy everything up until next comment or EOF
    - if cursor has selection: copy first selection
    - if cursor is on any python line (NOT comment): copy that line

## How to use

This extension exports two commands (you can find them with `ctrl + shift + p` or `cmd + shift + p`)
- ManimGl: Select Terminal
- ManimGl: On cursor CheckpointPaste

Open a terminal with the vscode integrated terminal, run `manimgl [s.py] [scene] -se [liineNumber]`, then:
- `ctrl + shift + p` -> `ManimGl: select Terminal`: you will need to select the name of the terminal where you are running the above command
- go on a line of your code and run `ctrl + shift + p` -> `ManimGl: On cursor CheckpointPaste` to execute manim code

## Requirements

Install `manimgl` and run in a vscode managed terminal `manimgl [s.py] [scene] -se [liineNumber]`

## Extension Settings

It might be comfortable to setup a keybinding to run the checkpoint command, which is:
- manimvs.onCursorCheckpointPaste

## Known Issues

Please be sure to select a terminal within vscode which is already running `manimgl [s.py] [scene] -se [liineNumber]`

## Comments

If you want to contribute, the extension is incredibly small and easy to get into. To be honest, this has been a good excuse for me
to make my first vscode extension.
