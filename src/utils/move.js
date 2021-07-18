export const move = (
  source,
  destination,
  droppableSource,
  droppableDestination
) => {
  const [removed] = source.splice(droppableSource.index, 1);

  destination.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = source;
  result[droppableDestination.droppableId] = destination;

  return result;
};
