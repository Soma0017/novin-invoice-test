class User {
    private _username: string;
    private _fullName: string;
    private _loginDate: any;


    public constructor(
        username: string,
        fullName: string,
        loginDate: any,
    ) {
        this._username = username,
            this._fullName = fullName,
            this._loginDate = loginDate
    }


    public get fullName(): string {
        return this._fullName;
    }

    public get loginDate(): any {
        return this._loginDate;
    }

    public set loginDate(newDate: any) {
        this._loginDate = newDate;
    }

}


export default User
