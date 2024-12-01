// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let terminal: vscode.Terminal | null = null;

	function copyToClipboard(text: string) {
		vscode.env.clipboard.writeText(text);
	}
	function sendCheckpointPaste(text?: string) {
		if (terminal === null) {
			vscode.window.showErrorMessage(`Terminal is not set, please run the command: ManimGL: Select Terminal`);
		}
		const toSend = `checkpoint_paste()` + (text ? ` ${text}` : '');
		terminal?.sendText(toSend, true);			
	}

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "manimvs" is now active!');


	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable_manim = vscode.commands.registerCommand('manimvs.onCursorCheckpointPaste', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const editor = vscode.window.activeTextEditor;
		if (editor?.selection.isEmpty) {
			if (terminal === null) {}
			const startPosition = editor.selection.active;

			const lineAtCursor = editor.document.lineAt(startPosition).text;
			if (!lineAtCursor.trim().startsWith("#")) {
				copyToClipboard(lineAtCursor);
				sendCheckpointPaste();
				return;
			}

			let endChar = 0;
			let end = startPosition.line;

			for (let i = startPosition.line; i < editor.document.lineCount; i++) {
				end = i;
				let l = editor.document.lineAt(i).text;
				if (i !== startPosition.line && l.trim().startsWith("#")) {
					break;
				}
				if (i === editor.document.lineCount - 1) {
					endChar = editor.document.lineAt(i).text.length;
				}
			}

			let sel = new vscode.Selection(new vscode.Position(startPosition.line, 0), new vscode.Position(end, endChar));
			copyToClipboard(editor.document.getText(sel));
			sendCheckpointPaste(lineAtCursor.substring(lineAtCursor.indexOf("#")));
		} else if (editor) {
			const selectedText = editor.document.getText(editor.selection);
			if (selectedText.startsWith("#")) {
				vscode.window.showWarningMessage("Checkpoint paste selection starting with comment: this may lead to unexpected behavior, be sure to understand how checkpoint_paste works");
			}
			copyToClipboard(selectedText);
			sendCheckpointPaste();
		}
	});

	const disposable_start = vscode.commands.registerCommand('manimvs.selectTerminal', async () => {
		const name = await vscode.window.showQuickPick(vscode.window.terminals.map(t => t.name),
		{
			placeHolder: 'Name of terminal in which you are already running `manimgl [s.py] [scene] -se [liineNumber]`',
		});
		const terminals = vscode.window.terminals.filter((t) => 
			t.name === name
		);
		if (terminals.length > 1) {
			vscode.window.showErrorMessage(`Multiple terminals with name ${name}, please make a terminal with a unique name`);
		} else if (terminals.length === 0) {
			vscode.window.showErrorMessage(`No terminal found with name ${name}, please make a terminal with a unique name`);
		}
		terminal = terminals[0];
	});
	context.subscriptions.push(disposable_manim);
	context.subscriptions.push(disposable_start);
}

// This method is called when your extension is deactivated
export function deactivate() {}
