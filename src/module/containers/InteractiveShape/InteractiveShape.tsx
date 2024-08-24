import React from "react";
import { useEffect, useState } from "react";
import "./shape.css";

const Box = ({
  show,
  highlight = false,
  updater = () => {},
  allow,
  ...rest
}: {
  show: boolean;
  highlight: any;
  updater: any;
  allow: any;
} & any) => {
  console.log("rest", rest);
  return (
    <div
      className={`box ${highlight ? "highlight" : "default"} ${
        show ? "show" : null
      } ${allow && show ? "hover" : null}`}
      onClick={show ? updater : null}
    >
      <text>{highlight ? rest.tracker : null}</text>
    </div>
  );
};

const BOX_DATA = [
  [1, 1, 1],
  [1, 1, 1],
  [1, 1, 1],
];

const InteractiveShape = () => {
  const [boxesMax, SetBoxesMax] = useState(0);
  const getDefaultData = () => {
    let max = 0;
    const data = BOX_DATA.map((row) => {
      return row.map((col) => {
        if (col) {
          max++;
        }
        return {
          highlight: false,
          tracker: 0,
          show: col,
        };
      });
    });
    SetBoxesMax(max);
    setBoxtracker(data as any);
    setTrackerCount(1);
    setAllow(true);
  };
  useEffect(() => {
    getDefaultData();
  }, []);

  const [boxTracker, setBoxtracker] = useState([]);
  const [trackerCount, setTrackerCount] = useState(1);
  const [allow, setAllow] = useState(true);

  const fireFade = (boxTracker: any) => {
    let finder = 1;
    const fire = (data: any) => {
      setTimeout(() => {
        let row: any = null;
        let col: any = null;
        boxTracker.forEach((rowL: any, rowLIdx: any) => {
          if (row === null && col === null) {
            rowL.forEach((colL: any, colIdx: any) => {
              if (row === null && col === null) {
                if (colL.tracker === finder) {
                  row = rowLIdx;
                  col = colIdx;
                }
              } else {
                return;
              }
            });
          } else {
            return;
          }
        });
        let copyBoxTracker = [...data];
        let rowCopyBoxTracker = [...copyBoxTracker[row]];
        rowCopyBoxTracker[col] = { tracker: 0, highlight: false, show: true };
        copyBoxTracker[row] = [...rowCopyBoxTracker];
        const updatedBoxTracker = [...copyBoxTracker];
        setBoxtracker(updatedBoxTracker as any);
        finder++;
        if (finder <= boxesMax) {
          fire(updatedBoxTracker);
        } else {
          setAllow(false);
          getDefaultData();
        }
      }, 200);
    };
    fire(boxTracker);
  };
  const updater = (row: any, col: any) => {
    let copyBoxTracker: any = [...boxTracker];
    let rowCopyBoxTracker: any = [...copyBoxTracker[row]];
    rowCopyBoxTracker[col] = { tracker: trackerCount, highlight: true };
    copyBoxTracker[row] = rowCopyBoxTracker;
    const updatedBoxTracker = [...copyBoxTracker];
    if (trackerCount >= boxesMax) {
      setBoxtracker(updatedBoxTracker as any);
      fireFade(updatedBoxTracker);
    } else {
      setTrackerCount((trackerCount) => trackerCount + 1);
      setBoxtracker(updatedBoxTracker as any);
    }
    setAllow(true);
  };
  return (
    <div className="container column">
      {boxTracker.map((row, rowIdx) => {
        return (
          <div className="row">
            {(row as any).map((col: any, colIdx: any) => (
              <Box
                highlight={col.highlight}
                show={col.show}
                allow={allow}
                {...col}
                updater={() => {
                  setAllow(false);
                  return updater(rowIdx, colIdx);
                }}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};
export default InteractiveShape;
