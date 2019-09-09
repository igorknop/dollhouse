export default class DollHouseGame {
    constructor() {
        this.rooms = [];
        this.root = null;
    }

    addRoom(room) {
        if (this.root == null) {
            this.root = room;
            this.rooms.push(room);
            room.game = this;
        } else {
            this.addRoomToTree(room, this.root);
            this.rooms.push(room);
            room.game = this;
        }
    }

    isInside(a, b) {
        return ((a.c >= b.c) && (a.c + a.w - 1 <= b.c + b.w - 1)) && ((a.l <= b.l) && (a.l - a.h + 1 >= b.l - b.h + 1));
    }

    addRoomToTree(room, container) {
        let child = null;
        container.rooms.forEach(childRoom => {
            if (this.isInside(room, childRoom)) {
                child = childRoom;
            }
        });
        if (child === null) {
            if (container.type === undefined) {
                container.type = room.type;
            }
            if (container.type !== "permit" && container.type !== room.type) {
                throw new Error(`Cannot add a ${room.type} to ${container.type}`);
            }
            container.rooms.push(room);
            room.container = container;
        } else {
            this.addRoomToTree(room, child);
        }
    }
}