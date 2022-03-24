export const getCellId = (event: React.MouseEvent) => {
  const target = event.target as HTMLElement;
  const id = parseInt(target.id);
  return id;
};
