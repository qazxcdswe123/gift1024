// A 7x11 matrix, each element is p button, and the element has p display value, internal value and clicked state
// the initial value will be set to 0
// the display value will be predefined by arrays
// the display value will not change
// click the element to update the internal value and change the background to pink
// Value Update Policy: the internal value of the 3x3 element around the clicked element will be added by 1
// click the element again to decrease the added internal value
// if the internal value match the display value, the element will be bold
// if the internal value doesn't match the display value, the text in element will be trivally gray


import './index.css';
import { useState } from 'react';

interface ElementProps {
  displayValue: number;
  elementStyle: string;
  handleClick: any;
}

export default function Game() {
  const displayValueRow1 = [1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1];
  const displayValueRow2 = [2, 3, 3, 4, 5, 4, 3, 3, 2, 4, 2];
  const displayValueRow3 = [3, 5, 5, 7, 8, 7, 5, 5, 3, 6, 3];
  const displayValueRow4 = [3, 5, 5, 8, 9, 8, 5, 5, 3, 6, 3];
  const displayValueRow5 = [3, 4, 3, 6, 7, 6, 3, 4, 4, 7, 4];
  const displayValueRow6 = [2, 2, 1, 3, 4, 3, 1, 2, 3, 5, 3];
  const displayValueRow7 = [1, 1, 0, 1, 1, 1, 0, 1, 2, 3, 2];
  const displayArray = [displayValueRow1, displayValueRow2, displayValueRow3, displayValueRow4, displayValueRow5, displayValueRow6, displayValueRow7];

  const [internalValue, setInternalValue] = useState(Array.from(Array(7), () => new Array(11).fill(0)));
  const [clicked, setClicked] = useState(Array.from(Array(7), () => new Array(11).fill(false)));
  console.log(internalValue);
  console.log(clicked);


  // Add 1 to the internal value when clicked
  // Or subtract 1 from the internal value when clicked again
  function handleClick(row: number, col: number) {
    if (clicked[row][col]) {
      const newClicked = clicked.map((rowArray, rowIndex) => {
        return rowArray.map((value, colIndex) => {
          if (rowIndex === row && colIndex === col) {
            return false;
          }
          return value;
        });
      });
      setClicked(newClicked);

      // if clicked, decrease the value by 1
      const newInternalValue = internalValue.map((rowArray, rowIndex) => {
        return rowArray.map((value, colIndex) => {
          for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
            for (let j = colIndex - 1; j <= colIndex + 1; j++) {
              if (i === row && j === col) {
                return value - 1;
              }
            }
          }

          return value;
        });
      });
      setInternalValue(newInternalValue);
    }
    else { // not clicked
      const newClicked = clicked.map((rowArray, rowIndex) => {
        return rowArray.map((value, colIndex) => {
          if (rowIndex === row && colIndex === col) {
            return true;
          }
          return value;
        });
      });
      setClicked(newClicked);

      // if not clicked, add 1 to the value
      const newInternalValue = internalValue.map((rowArray, rowIndex) => {
        return rowArray.map((value, colIndex) => {
          for (let i = rowIndex - 1; i <= rowIndex + 1; i++) {
            for (let j = colIndex - 1; j <= colIndex + 1; j++) {
              if (i === row && j === col) {
                return value + 1;
              }
            }
          }

          return value;
        });
      });
      setInternalValue(newInternalValue);
    }
  }

  function renderElement(displayValue: number, rowIndex: number, colIndex: number) {
    let elementStyle: string;
    if (internalValue[rowIndex][colIndex] === displayValue) {
      elementStyle = 'text-slate-800 font-bold px-2 cursor-default';
    }
    else {
      elementStyle = 'text-slate-500 px-2 cursor-default';
    }

    return (<Element
      handleClick={() => handleClick(rowIndex, colIndex)}
      displayValue={displayValue}
      elementStyle={elementStyle}
    />);
  }

  // i generally dont know why this true false thing not works as intended
  // but hey, it works
  const clickedTdColor: string = "element border border-black text-center h-5"
  const baseTdColor: string = "element border border-black text-center h-5 bg-red-500"

  function calculateAllBold(): boolean {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 11; j++) {
        if (internalValue[i][j] !== displayArray[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  return (
    <div>

      <div className='mt-10 flex flex-row justify-center'>

        <table className="container w-276">
          <tbody>
            {displayArray.map((row, i) => (
              <tr className="row" key={i}>
                {row.map((displayValue, j) => (
                  <td className={clicked[i][j] ? baseTdColor : clickedTdColor} key={j}>
                    {renderElement(displayValue, i, j)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

      </div>


      <p id='iloveyy' className='mt-10 flex flex-row justify-center text-lg'>
        {calculateAllBold() ? 'flag{I_Love_You_YY_And_Happy_1024}' : ''}
      </p>
    </div>
  )
}

function Element(props: ElementProps) {

  return (
    <button onClick={props.handleClick} className={props.elementStyle}>

      {props.displayValue}
    </button>
  )
}
