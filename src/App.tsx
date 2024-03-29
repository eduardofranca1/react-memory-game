import { useEffect, useState } from "react";
import * as C from "./App.styles";
import logoImage from "./assets/devmemory_logo.png";
import RestartIcon from "./svgs/restart.svg";
import { InfoItem, Button, GridItem } from "./components";
import { GridItemType } from "./types/GridItemType";
import { items } from "./data/items";
import { formatTimeElapsed } from "./helpers/formatTimeElapsed";

const App = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  const resetAndCreateGrid = () => {
    // step 1 - reset the game
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);

    // step 2 - create grid
    // 2.1 create a empty grid
    let tempGrid: GridItemType[] = [];
    for (let i = 0; i < items.length * 2; i++) {
      tempGrid.push({
        item: null,
        show: false,
        permanentShown: false,
      });
    }
    // 2.2 - preencher the grid
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let position = -1;
        while (position < 0 || tempGrid[position].item !== null) {
          position = Math.floor(Math.random() * (items.length * 2));
        }
        tempGrid[position].item = i;
      }
    }

    // 2.3 put on state
    setGridItems(tempGrid);

    // step 3 - start the game
    setPlaying(true);
  };

  useEffect(() => resetAndCreateGrid(), []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) setTimeElapsed(timeElapsed + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  const handleItemClick = (index: number) => {
    if (playing && index !== null && shownCount < 2) {
      let tempGrid = [...gridItems];

      if (!tempGrid[index].permanentShown && !tempGrid[index].show) {
        tempGrid[index].show = true;
        setShownCount(shownCount + 1);
      }

      setGridItems(tempGrid);
    }
  };

  // verify if opened are equals
  useEffect(() => {
    if (shownCount === 2) {
      let opened = gridItems.filter((item) => item.show === true);
      if (opened.length === 2) {
        // verify 1 - if both are equals, make every "shown" permanent
        if (opened[0].item === opened[1].item) {
          let tempGrid = [...gridItems];
          for (let i in tempGrid) {
            if (tempGrid[i].show) {
              tempGrid[i].permanentShown = true;
              tempGrid[i].show = false;
            }
          }
          setGridItems(tempGrid);
          setShownCount(0);
        } else {
          // verify 2 - if they are not equal, close all "shown"
          setTimeout(() => {
            let tempGrid = [...gridItems];
            for (let i in tempGrid) {
              tempGrid[i].show = false;
            }
            setGridItems(tempGrid);
            setShownCount(0);
          }, 1000);
        }

        setMoveCount((moveCount) => moveCount + 1);
      }
    }
  }, [shownCount, gridItems]);

  // verify if game is over
  useEffect(() => {
    if (
      moveCount > 0 &&
      gridItems.every((item) => item.permanentShown === true)
    ) {
      setPlaying(false);
    }
  }, [moveCount, gridItems]);

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="">
          <img src={logoImage} width="200" alt=""></img>
        </C.LogoLink>
        <C.InfoArea>
          <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
          <InfoItem label="Movimentos" value={moveCount.toString()} />
        </C.InfoArea>
        <Button
          label="Reiniciar"
          icon={RestartIcon}
          onClick={resetAndCreateGrid}
        />
      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
};

export default App;
