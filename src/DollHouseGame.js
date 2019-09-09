export default class DollHouseGame {
    constructor() {
        this.rooms = [];
        this.root = null;
    }

    addRoom(room) {
        this.rooms.push(room);
        room.game = this;
        if(this.root == null){
            this.root = room;
        }
    }

    isInside(a, b) {
        return ((a.c >= b.c) && (a.c + a.w - 1 <= b.c + b.w - 1)) && ((a.l <= b.l) && (a.l - a.h + 1 >= b.l - b.h + 1));
    }
}