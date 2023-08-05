import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

import { createFileInDirectory } from "./createFile"

const options: vscode.QuickPickOptions = {
    canPickMany: true,
    placeHolder: '생성할 파일을 선택해주세요',
};

export function createDirectory(uri: vscode.Uri) {
    if (!uri || !uri.fsPath) {
        console.error('선택된 경로가 올바르지 않습니다.');
        return;
    }
    vscode.window.showInputBox({ prompt: '컴포넌트 이름을 입력해주세요:' }).then((fileName) => {
        if (!fileName) {
            console.error('선택된 경로가 올바르지 않습니다.');
            return;
        }
        const selectedPath = uri.fsPath;
        const newDirectoryName = fileName;
        const newDirectoryPath = path.join(selectedPath, newDirectoryName);
        fs.mkdir(newDirectoryPath, (err) => {
            if (err) {
                console.error('디렉토리 생성 오류:', err.message);
                return;
            }
            const items: vscode.QuickPickItem[] = [
                { label: 'story', description: 'Stroy' },
                { label: 'style', description: 'SCSS' },
                { label: 'test', description: 'Jest' }
            ];

            vscode.window.showQuickPick(items, options).then((selectedItems) => {
                createFileInDirectory(
                    {
                        directoryPath: newDirectoryPath,
                        type: "component",
                        componentName: fileName,
                    }
                );
                createFileInDirectory({
                    directoryPath: newDirectoryPath,
                    componentName: fileName,
                    type: "index",
                });
                if (!selectedItems) {
                    vscode.window.showInformationMessage('No items selected.');
                    return
                }
                const selectedArray = selectedItems as unknown as vscode.QuickPickItem[]
                const selectedLabels = selectedArray.map((item: vscode.QuickPickItem) => {
                    createFileInDirectory({
                        directoryPath: newDirectoryPath,
                        componentName: fileName,
                        type: item.label,
                    });
                    return item.label
                })
                vscode.window.showInformationMessage(`You selected: ${selectedLabels.join(', ')}`);

            });
        });
    });
}
