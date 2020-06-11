const Person = () => {
  return {
    position: {x: Math.random() * GRID_SIZE - (GRID_SIZE/2), y: Math.random() * GRID_SIZE - (GRID_SIZE/2), z: 0},
    state: WELL,
    direction: Math.random() * TWO_PI
  }
}
