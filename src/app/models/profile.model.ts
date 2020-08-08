import moment  from 'moment';

export class Profile {
    id: number;
    username: string;
    gamemode: string;
    selected: boolean;

    // Date Attributes
    checkedAt: string;
    checkedAtFull: string;
    lastChecked: string;
 
    constructor(info: any) {
      this.id = info.id;
      this.username = info.username;
      this.gamemode = info.gamemode;
      this.selected = info.selected;

      this.checkedAt = moment(info.checkedAt).format('MM-DD-YYYY');
      this.checkedAtFull = info.checkedAt;
      this.lastChecked = moment(info.checkedAt).fromNow();
    }

}