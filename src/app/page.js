"use client";

import { useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";

const width = 10;
const height = 16;
const speed = 1000;

export default function Home() {
  const [tetris, setTetris] = useState(
    Array(height).fill(Array(width).fill(0))
  );

  const [color, setColor] = useState(1);
  const [fallingBlocks, setFallingBlocks] = useState([
    [1, 0],
    [2, 0],
    [3, 0],
    [3, 1],
  ]);

  useInterval(() => {
    gameLoop();
  }, speed);

  function gameLoop() {
    goDown();
  }

  function goDown() {
    const newFallingBlocks = JSON.parse(JSON.stringify(fallingBlocks));

    for (let i = 0; i < newFallingBlocks.length; i++) {
      newFallingBlocks[i][0] = newFallingBlocks[i][0] + 1;
    }

    placeMinoToTetris(newFallingBlocks);
    setFallingBlocks(newFallingBlocks);
  }

  function goRight() {
    const newFallingBlocks = JSON.parse(JSON.stringify(fallingBlocks));

    for (let i = 0; i < newFallingBlocks.length; i++) {
      newFallingBlocks[i][1] = newFallingBlocks[i][1] + 1;
    }

    placeMinoToTetris(newFallingBlocks);
    setFallingBlocks(newFallingBlocks);
  }

  function goLeft() {
    const newFallingBlocks = JSON.parse(JSON.stringify(fallingBlocks));

    for (let i = 0; i < newFallingBlocks.length; i++) {
      newFallingBlocks[i][1] = newFallingBlocks[i][1] - 1;
    }

    placeMinoToTetris(newFallingBlocks);
    setFallingBlocks(newFallingBlocks);
  }

  function placeMinoToTetris(newFallingBlocks) {
    const newTetris = JSON.parse(
      JSON.stringify(Array(height).fill(Array(width).fill(0)))
    );

    for (let i = 0; i < newFallingBlocks.length; i++) {
      const [x, y] = newFallingBlocks[i];
      newTetris[x][y] = color;
    }

    setTetris(newTetris);
  }

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      switch (e.code) {
        case "ArrowRight": {
          goRight();
          break;
        }
        case "ArrowLeft": {
          goLeft();
          break;
        }
      }
    });
  });

  return (
    <>
    <div className="flex flex-col items-center p-16">
      {tetris.map((row, rowIndex) => (
        <div className="flex" key={rowIndex}>
          {row.map((block, blockIndex) => (
            <Block key = {blockIndex} colorIndex = {block}/>
          ))}
        </div>
      ))}
    </div>
    </>
  )
}

const colors = ["bg-slate-500", "bg-yellow-500", "bg-red-500", "bg-blue-500"];

function Block({ colorIndex }) {
  return <div className={`w-5 h-5 rounded ${colors[colorIndex]}`}></div>
}
