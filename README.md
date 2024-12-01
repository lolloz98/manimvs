# manimvs README

Yet another extension to add behavior that Grant used in the video regarding manimgGl

## Features

- Select a terminal in vscode where you are running `manimgl [s.py] [scene] -se [liineNumber]`
- Copy things on your clipboard and run `checkpoint_paste()` on the selected terminal
    - if cursor on comment: copy everything up until next comment or EOF
    - if cursor has selection: copy first selection
    - if cursor is on any python line (NOT comment): copy that line

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