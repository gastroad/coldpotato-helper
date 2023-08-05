import * as vscode from 'vscode';

export const items: vscode.QuickPickItem[] = [
    { label: 'story', description: 'Stroy' },
    { label: 'style', description: 'SCSS' },
    { label: 'test', description: 'Jest' }
];

export const options: vscode.QuickPickOptions = {
    canPickMany: true,
    placeHolder: '생성할 파일을 선택해주세요',
};