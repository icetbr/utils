const vscode = require('vscode');
const { inspect } = require('util');

const compact = o => require('util').inspect(o, { depth: Infinity, maxArrayLength: Infinity, breakLength: 120, sorted: true });

// const x = `[
//       {
//          date: '2017-01-01',
//          schedule: undefined,
//          shift: undefined
//       },
//       {
//          date: '2017-01-02',
//          schedule: undefined,
//          shift: undefined
//       },
// ]`
// console.log(doCompact(x))
// console.log(eval(x))
/**
 * FooMacro
 */
function fooFunc() {
   // const editor = vscode.window.activeTextEditor;
   // if (!editor) {
   //    // Return an error message if necessary.
   //    return 'Editor is not opening.';
   // }
   // const document = editor.document;
   // const selection = editor.selection;
   // const text = document.getText(selection);
   // if (text.length > 0) {
   //    editor.edit(editBuilder => {
   //       // To surround a selected text in double quotes(Multi selection is not supported).
   //       editBuilder.replace(selection, `"${text}"`);
   //    });
   // }
}

function compact() {
   const editor = vscode.window.activeTextEditor;
   const text = editor.document.getText(editor.selection);
   editor.edit(editBuilder => {
      // vscode.window.showInformationMessage(text);
      editBuilder.replace(editor.selection, eval(text));
   });
}

/**
 * BarMacro(asynchronous)
 */
async function barFunc() {
   await vscode.window.showInformationMessage('Hello VSCode Macros!');
   // Returns nothing when successful.
}

module.exports.macroCommands = {
   FooMacro: { no: 2, func: fooFunc },
   Compact: { no: 1, func: compact },
};
