export interface CellProps {
  state?: string;
  id: string;
  setMove: (event: React.MouseEvent) => void;
}

export const Cell: React.FC<CellProps> = ({ state, id, setMove }) => {
  return (
    <div id={id} className="cell" onClick={setMove}>
      <div className={`${state}`}></div>
    </div>
  );
};
