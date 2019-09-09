import DollHouseBoard from "./DollHouseBoard";

export default class DollHouseGame {
    constructor() {
        this.rooms = [];
        this.root = null;
    }

    addRoom(room) {
        if(room.rooms === undefined){
            room.rooms = [];
        }
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

    static isInside(a, b) {
        return ((a.c >= b.c) && (a.c + a.w - 1 <= b.c + b.w - 1)) && ((a.l <= b.l) && (a.l - a.h + 1 >= b.l - b.h + 1));
    }
    static isCollided(a, b) {
        if (a.c > b.c + b.w - 1) return false;
        if (a.c + a.w - 1 < b.c) return false;
        if (a.l < b.l - b.h + 1) return false;
        if (a.l - a.h + 1 > b.l) return false;
        return true;
    }

    addRoomToTree(room, container) {
        let child = null;
        let isCollided = false;
        container.rooms.forEach(childRoom => {
            if (DollHouseGame.isCollided(room, childRoom)) {
                isCollided = true;
            }
            if (DollHouseGame.isInside(room, childRoom)) {
                child = childRoom;
            }
        });
        if (child === null) {
            if (isCollided) {
                throw new Error(`Cannot add a room colliding with another one!`);
            }
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

    static countSharedWalls(a, b) {
        let sharedWalls = 0;
        if (a.c === b.c) sharedWalls++;
        if (a.l === b.l) sharedWalls++;
        if (a.c + a.w - 1 === b.c + b.w - 1) sharedWalls++;
        if (a.l - a.h + 1 === b.l - b.w + 1) sharedWalls++;
        return sharedWalls;
    }

}