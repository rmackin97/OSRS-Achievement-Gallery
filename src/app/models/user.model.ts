export class User {
    userId: string;
    verified: boolean;
 
    constructor(info: any) {
      this.userId = info.userId;
      this.verified = info.verified;
    }

}