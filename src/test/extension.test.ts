import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Checkpoint Paste', () => {
    test('copies checkpoint block to clipboard', async () => {
        const document = await vscode.workspace.openTextDocument({
            language: 'python',
            content:
                'scene.play(foo)\n' +
                '# checkpoint 1\n' +
                'scene.play(bar)\n' +
                'scene.wait()\n' +
                '# checkpoint 2\n' +
                'scene.play(baz)\n',
        });

        const editor = await vscode.window.showTextDocument(document);

        // Put cursor on "# checkpoint 1"
        const position = new vscode.Position(1, 2);
        editor.selection = new vscode.Selection(position, position);

        await vscode.commands.executeCommand(
            'manimvs.onCursorCheckpointPaste'
        );

        const clipboard = await vscode.env.clipboard.readText();

        assert.strictEqual(
            clipboard,
            '# checkpoint 1\nscene.play(bar)\nscene.wait()\n'
        );
    });
});