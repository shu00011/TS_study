abstract class Department { // abstractクラスはインスタンス化できない．継承されるためだけのクラス．継承したクラスはインスタンス化可能．
    // クラスはオブジェクトの設計図

    // オブジェクトではない．初期値を設定することも可能．
    static fiscalYear = 2020;   // staticでないものからアクセスはできない．
    protected employees: string[] = [];   // privateオブジェクト内部からのみアクセス可能．デフォルトはpublic
    // protected private+継承したクラスからも参照可能．

    static createEmployee(name: string){
        return { name: name };
    }

    constructor(protected readonly id: string, public name: string) { // ここではpublicは明示的にかかなければならない
        console.log(Department.fiscalYear); // staticなものにアクセスしたいときはthisは使わない．constructorはstaticにはできない
    }

    // 抽象メソッド→継承先でのオーバーライドを強制する．戻り値をつける．
    abstract describe(this: Department): void; // {
    //     console.log(`Department(${this.id}): ${this.name}`);
    // }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

// 継承元クラス=ベースクラス
// 継承先クラス=サブクラス
// 継承は1つのクラスからしかできない．
class ITDepartment extends Department {
    constructor(id: string, private admins: string[]) {
        super(id,'IT'); // thisの前にsuperを実行する必要がある．superでベースクラスのコンストラクタを使えるようになる．
        this.admins = admins;
    }

    describe() {
        console.log("IT部門-ID:" + this.id);
    }
}

class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;

    get mostRecentReport() {    // 外部からgetterを使ってprivateにアクセスできる
        if (this.lastReport) {
            return this.lastReport;
        }

        throw new Error('レポートが見つかりません．');
    }

    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('正しい値を設定してください．');
        }
        this.addReport(value);
    }

    // constructorをprivateにするとnewできなくなる．
    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.reports = reports;
        this.lastReport = reports[0];
    }

    static getInstance() {  // staticの場合はthisはクラスを指す．そうでない場合はthisはobjectを指す．
        if(this.instance) { // またはAccountingDepartment.instance
            return this.instance;
        }
        this.instance = new AccountingDepartment('d2',[]);
        return this.instance;
    }

    describe() {
        console.log("会計部門-ID:" + this.id);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }

    addEmployee(employee: string): void {
        if(employee === 'Max') {
            return;
        }
        this.employees.push(employee);
    }
}

const it = new ITDepartment('d1',['Max']);
const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();

console.log(accounting, accounting2);

it.addEmployee('Max');
it.addEmployee('Manu');
it.describe();
it.printEmployeeInformation();

accounting.addReport('Something');
accounting.printReports();
accounting.addEmployee('Max');
accounting.addEmployee('Manu');
accounting.printEmployeeInformation();
accounting.describe();

// getterの読み込み方
console.log(accounting.mostRecentReport);

// setterの使い方
accounting.mostRecentReport = '通期会計レポート';

// static new（インスタンス化)しなくても直接クラスやメソッドにアクセスする
const employee1 = Department.createEmployee('Max');
console.log(employee1, Department.fiscalYear);