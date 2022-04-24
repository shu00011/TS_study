function add(n1: number, n2: number, showResult: boolean, phrase: string) {
    // JSで型チェックをする場合
    // if(typeof n1 !== 'number' || typeof n2 !== 'number') {
    //     throw new Error('入力値が正しくありません');
    // }
    const result = n1 + n2;
    if (showResult){
        console.log(phrase + result);
    } else {
        return result;

    }
}

const number1 = 5;
const number2 = 2.8;
const printResult = true;
const resultPhrase = 'Result: ';

add(number1, number2, printResult,resultPhrase);

// package.jsonを生成する→npm init→全部enter→defaultの設定のpackage.jsonができる
// (npm installでnode_modulesが生成される)
// npm install --save-dev（開発時だけに必要な依存関係であるというオプション）
// npm install --save-dev lite-server（開発用のWebサーバー）
// package.jsonにstartを追加→npm startでサーバーがたちあがる
// tsのコンパイルにはnpx tsc ファイル名
// watchモード→なにか変更されると自動的にコンパイルが走る
// npx tsc app.ts -w
// 複数のファイルを同時にコンパイルするには？
// フォルダを一つのプロジェクトだと認識させる→初めの初期化 npx tsc --init
// tsconfig.jsonを作成する．→フォルダの中身がtsによって管理されるようになる．
// npx tscで.tsの全てのファイルがjsにコンパイルされる．
// watchモード npx tsc -wもできる．