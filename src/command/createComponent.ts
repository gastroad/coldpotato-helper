import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

import { createFileInDirectory } from "../utils/createComponent";
import { items, options } from '../constants/createComponent';

export function createComponent(uri: vscode.Uri) {
    if (!uri || !uri.fsPath) return vscode.window.showErrorMessage("선택된 경로가 올바르지 않습니다.")
    vscode.window.showInputBox({ prompt: '컴포넌트 이름을 입력해주세요:' }).then((fileName) => {
        if (!fileName) return vscode.window.showErrorMessage("컴포넌트 이름이 입력되지 않았습니다.");

        const selectedPath = uri.fsPath;
        const newDirectoryName = fileName;
        const newDirectoryPath = path.join(selectedPath, newDirectoryName);

        fs.mkdir(newDirectoryPath, (err) => {
            if (err) return vscode.window.showErrorMessage('디렉토리 생성 오류:', err.message);

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

                if (!selectedItems) return vscode.window.showInformationMessage('선택된 아이탬이 없습니다.')

                const selectedArray = selectedItems as unknown as vscode.QuickPickItem[]
                const selectedLabels = selectedArray.map((item: vscode.QuickPickItem) => {
                    createFileInDirectory({
                        directoryPath: newDirectoryPath,
                        componentName: fileName,
                        type: item.label,
                    });
                    return item.label
                })

                return vscode.window.showInformationMessage(`선택된 파일: ${selectedLabels.join(', ')}`);
            });
        });
    });
}
