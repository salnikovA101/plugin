import * as vscode from 'vscode'; // стандартный модуль
import * as fs from 'fs'; // модуль для работы с файлами
import * as path from 'path'; // модуль для пути файла

export function activate(context: vscode.ExtensionContext) { // аналог main в C++
	let disposable = vscode.commands.registerCommand('extension.createCppFile', async () => { // аналог функции в C++
		const fileName = await vscode.window.showInputBox({  // запрос имя файла у пользователя через inputbox
			placeHolder: 'Введите имя файла (без расширения)', // надпись в нем
		});

		if (!fileName) {
			vscode.window.showErrorMessage("Имя файла не может быть пустым.");
			return;
		} // аналог cerr в c++, те если файл не ввели, то ошибка с сообщением

		const filePath = path.join(vscode.workspace.rootPath || '', `${fileName}.cpp`); // путь к новому файлу

		const content = '#include <iostream>\n\nint main() {\n	\n	\n	\n	\n	return 0;\n}\n'; // содержимое файла

		fs.writeFile(filePath, content, (err) => { // запись в уже созданный файл
			if (err) {
				vscode.window.showErrorMessage("Ошибка при создании файла: " + err.message); // cerr 
				return;
			}
			vscode.window.showInformationMessage('Файл ' + `${fileName}.cpp` + ' успешно создан!'); // сообщение об успешном создании
			vscode.workspace.openTextDocument(filePath).then(doc => { // открытие созданного файла
				vscode.window.showTextDocument(doc);
			});
		});
	});

	context.subscriptions.push(disposable); // аналог Delete
}

export function deactivate() {} // завершение программы
