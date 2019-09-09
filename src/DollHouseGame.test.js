import DollHouseGame from "./DollHouseGame"


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
  const room = {game:null};
  expect(game.rooms.length).toBe(0);
  game.addRoom(room);
  expect(game.rooms.length).toBe(1);
  expect(room.game).toEqual(game);
});



it('should have the root set to firsto room added', () => {
  const game = new DollHouseGame();

  const roomA  = {l:9, c:0, w:10, h:10};
  const roomB = {l:5, c:3, w:3, h:2};
  game.addRoom(roomA);
  game.addRoom(roomB);
  expect(game.root).toBe(roomA);
});


it('should return true if room A is inside room B', () => {
  const game = new DollHouseGame();
  const roomA  = {l:9, c:0, w:10, h:10};
  const roomB = {l:5, c:3, w:3, h:2};
  const roomC = {l:5, c:9, w:3, h:2};
  const roomD = {l:-2, c:0, w:3, h:2};
  expect(game.isInside(roomB, roomA)).toBeTruthy();
  expect(game.isInside(roomA, roomB)).toBeFalsy();
  expect(game.isInside(roomC, roomB)).toBeFalsy();
  expect(game.isInside(roomD, roomB)).toBeFalsy();
});

