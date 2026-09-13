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

    test('sets prefix and then copies checkpoint block to clipboard', async () => {
        const config = vscode.workspace.getConfiguration('manimvs');
        const previousPrefix = config.get<string>('checkpointCommentPrefix');

        try {
            await config.update(
                'checkpointCommentPrefix',
                'try',
                vscode.ConfigurationTarget.Global
            );

            const document = await vscode.workspace.openTextDocument({
                language: 'python',
                content:
                    'scene.play(foo)\n' +
                    '# checkpoint 1\n' +
                    'scene.play(bar)\n' +
                    'scene.wait()\n' +
                    '# try checkpoint 2\n' +
                    'scene.play(baz)\n',
            });

            const editor = await vscode.window.showTextDocument(document);

            // Put cursor on "# checkpoint 1"
            let position = new vscode.Position(1, 2);
            editor.selection = new vscode.Selection(position, position);

            await vscode.commands.executeCommand(
                'manimvs.onCursorCheckpointPaste'
            );

            let clipboard = await vscode.env.clipboard.readText();

            // Not a real checkpoint: no prefix
            assert.strictEqual(
                clipboard,
                '# checkpoint 1'
            );

            position = new vscode.Position(4, 0);
            editor.selection = new vscode.Selection(position, position);

            await vscode.commands.executeCommand(
                'manimvs.onCursorCheckpointPaste'
            );

            clipboard = await vscode.env.clipboard.readText();

            assert.strictEqual(
                clipboard,
                '# try checkpoint 2\n' +
                'scene.play(baz)\n',
            );
        } finally {
            await config.update(
                'checkpointCommentPrefix',
                previousPrefix,
                vscode.ConfigurationTarget.Global
            );
        }
    });
});