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
        }else{
            this.addRoomToTree(room, this.root);
        }
    }

    isInside(a, b) {
        return ((a.c >= b.c) && (a.c + a.w - 1 <= b.c + b.w - 1)) && ((a.l <= b.l) && (a.l - a.h + 1 >= b.l - b.h + 1));
    }

    addRoomToTree(room, container){
        let child = null;
        container.rooms.forEach(childRoom => {
            if(this.isInside(room, childRoom)){
                child = childRoom;
            }
        });
        if(child === null){
            container.rooms.push(room);
            room.container = container;
        }else{
            this.addRoomToTree(room, child);
        }
    }
}