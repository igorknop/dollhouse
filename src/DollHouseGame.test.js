import DollHouseGame from "./DollHouseGame"
import DollHouseBoard from "./DollHouseBoard";


it('should have a root room null on create', () => {
  const game = new DollHouseGame();
  expect(game.root).toBeNull();
});

it('should have a room list', () => {
  const game = new DollHouseGame();
  expect(Array.isArray(game.rooms)).toBeTruthy();
});

it('should add room to room list', () => {
  const game = new DollHouseGame();
  const room = {game:null, rooms:[]};
  expect(game.rooms.length).toBe(0);
  game.addRoom(room);
  expect(game.rooms.length).toBe(1);
  expect(room.game).toEqual(game);
});



it('should have the root set to firsto room added', () => {
  const game = new DollHouseGame();

  const roomA  = {l:9, c:0, w:10, h:10, rooms:[]};
  const roomB = {l:5, c:3, w:3, h:2, rooms:[]};
  game.addRoom(roomA);
  game.addRoom(roomB);
  expect(game.root).toBe(roomA);
});


it('should return true if room A is inside room B', () => {
  const game = new DollHouseGame();
  const roomA  = {l:9, c:0, w:10, h:10, rooms:[]};
  const roomB = {l:5, c:3, w:3, h:2, rooms:[]};
  const roomC = {l:5, c:9, w:3, h:2, rooms:[]};
  const roomD = {l:-2, c:0, w:3, h:2, rooms:[]};
  expect(DollHouseGame.isInside(roomB, roomA)).toBeTruthy();
  expect(DollHouseGame.isInside(roomA, roomB)).toBeFalsy();
  expect(DollHouseGame.isInside(roomC, roomB)).toBeFalsy();
  expect(DollHouseGame.isInside(roomD, roomB)).toBeFalsy();
});

it('should have the room added to container room', () => {
  const game = new DollHouseGame();

  const roomA  = {l:9, c:0, w:10, h:10, rooms:[]};
  const roomB = {l:5, c:3, w:3, h:2, rooms:[]};
  expect(roomA.rooms.length).toBe(0);
  game.addRoom(roomA);
  game.addRoom(roomB);
  expect(roomA.rooms.length).toBe(1);

  expect(game.root.rooms[0]).toBe(roomB);

});

it('should have the room added tree', () => {
  const game = new DollHouseGame();

  const roomA  = {l:9, c:0, w:10, h:10, rooms:[]};
  const roomB = {l:5, c:3, w:5, h:3, rooms:[]};
  const roomC = {l:5, c:3, w:3, h:2, rooms:[]};
  expect(roomA.rooms.length).toBe(0);
  game.addRoom(roomA);
  game.addRoom(roomB);
  game.addRoom(roomC);
  expect(roomA.rooms.length).toBe(1);
  expect(roomB.rooms.length).toBe(1);
  expect(roomC.rooms.length).toBe(0);
  expect(roomA.rooms[0]).toBe(roomB);
  expect(roomB.rooms[0]).toBe(roomC);
  expect(roomC.rooms.length).toBe(0);
  expect(roomA.container).toBeUndefined();
  expect(roomB.container).toBe(roomA);
  expect(roomC.container).toBe(roomB);

});

it('should have the room added tree with multiple rooms', () => {
  const game = new DollHouseGame();

  const roomA  = {l:9, c:0, w:10, h:10, rooms:[]};
  const roomB = {l:0, c:9, w:5, h:3, rooms:[]};
  const roomC = {l:5, c:9, w:5, h:3, rooms:[]};
  const roomD = {l:5, c:9, w:3, h:2, rooms:[]};
  game.addRoom(roomA);
  game.addRoom(roomB);
  game.addRoom(roomC);
  game.addRoom(roomD);
  expect(roomA.container).toBeUndefined();
  expect(roomB.container).toBe(roomA);
  expect(roomC.container).toBe(roomA);
  expect(roomD.container).toBe(roomC);

});


it('should have the room type setted if a typed room is inserted', () => {
  const game = new DollHouseGame();

  const roomA  = {l:9, c:0, w:10, h:10, rooms:[], type:undefined};
  const roomB = {l:0, c:9, w:5, h:3, rooms:[], type: "bathroom"};
  game.addRoom(roomA);
  game.addRoom(roomB);
  expect(roomA.container).toBeUndefined();
  expect(roomB.container).toBe(roomA);
  expect(roomB.type).toEqual(roomA.type);

  expect(roomA.type).toBe("bathroom");
});

it('should throw if room differend typed room is inserted', () => {
  const game = new DollHouseGame();

  const roomA  = {l:9, c:0, w:10, h:10, rooms:[], type:"permit"};
  const roomB = {l:0, c:9, w:5, h:3, rooms:[], type:"bathroom"};
  const roomC = {l:0, c:9, w:2, h:1, rooms:[], type:"kitchen"};
  const roomD = {l:0, c:9, w:2, h:1, rooms:[], type:"bathroom"};
  game.addRoom(roomA);
  game.addRoom(roomB);
  expect(()=>{
    game.addRoom(roomC);
  }).toThrow();
  game.addRoom(roomD);
  expect(roomA.container).toBeUndefined();
  expect(roomB.container).toBe(roomA);
  expect(roomD.container).toBe(roomB);
  expect(roomC.container).toBeUndefined();
  expect(game.rooms.indexOf(roomC)).toBe(-1);

});

it('should return true if room A collides with room B', () => {
  const game = new DollHouseGame();
  const roomA  = {l:9, c:0, w:10, h:10, rooms:[]};
  const roomB = {l:5, c:3, w:3, h:2, rooms:[]};
  const roomC = {l:6, c:3, w:3, h:2, rooms:[]};
  const roomD = {l:9, c:0, w:1, h:1, rooms:[]};
  expect(DollHouseGame.isCollided(roomB, roomA)).toBeTruthy();
  expect(DollHouseGame.isCollided(roomC, roomA)).toBeTruthy();
  expect(DollHouseGame.isCollided(roomD, roomA)).toBeTruthy();
  expect(DollHouseGame.isCollided(roomC, roomB)).toBeTruthy();
  expect(DollHouseGame.isCollided(roomD, roomB)).toBeFalsy();
  expect(DollHouseGame.isCollided(roomD, roomC)).toBeFalsy();
});

it('should throw if a room collided with a sibling', () => {
  const game = new DollHouseGame();

  const roomA  = {l:9, c:0, w:10, h:10, rooms:[], type:"permit"};
  const roomB = {l:0, c:0, w:5, h:3, rooms:[], type:"bathroom"};
  const roomC = {l:0, c:0, w:2, h:1, rooms:[], type:"bathroom"};
  const roomD = {l:0, c:1, w:2, h:1, rooms:[], type:"bathroom"};
  const roomE = {l:0, c:3, w:2, h:1, rooms:[], type:"bathroom"};
  game.addRoom(roomA);
  game.addRoom(roomB);
  game.addRoom(roomC);
  expect(()=>{
    game.addRoom(roomD);
  }).toThrow();
  game.addRoom(roomE);
  expect(roomA.container).toBeUndefined();
  expect(roomB.container).toBe(roomA);
  expect(roomC.container).toBe(roomB);
  expect(roomD.container).toBeUndefined();
  expect(roomE.container).toBe(roomB);
  expect(game.rooms.indexOf(roomD)).toBe(-1);

});

it('should count shared walls', () => {

  const roomA  = {l:9, c:0, w:10, h:10, rooms:[], type:"permit"};
  const roomB = {l:9, c:0, w:5, h:3, rooms:[], type:"bathroom"};
  const roomC = {l:9, c:0, w:2, h:1, rooms:[], type:"bathroom"};
  const roomD = {l:9, c:3, w:2, h:1, rooms:[], type:"bathroom"};
  const roomE = {l:0, c:5, w:2, h:2, rooms:[], type:"bathroom"};
  const roomF = {l:0, c:5, w:2, h:2, rooms:[], type:"bathroom"};
  expect(DollHouseGame.countSharedWalls(roomA, roomB)).toBe(2);
  expect(DollHouseGame.countSharedWalls(roomA, roomC)).toBe(2);
  expect(DollHouseGame.countSharedWalls(roomA, roomD)).toBe(1);
  expect(DollHouseGame.countSharedWalls(roomA, roomE)).toBe(0);
  expect(DollHouseGame.countSharedWalls(roomB, roomC)).toBe(2);
  expect(DollHouseGame.countSharedWalls(roomB, roomD)).toBe(2);
  expect(DollHouseGame.countSharedWalls(roomB, roomE)).toBe(0);
  expect(DollHouseGame.countSharedWalls(roomC, roomD)).toBe(1);
  expect(DollHouseGame.countSharedWalls(roomC, roomE)).toBe(0);
  expect(DollHouseGame.countSharedWalls(roomD, roomE)).toBe(0);
  expect(DollHouseGame.countSharedWalls(roomE, roomF)).toBe(4);

});
