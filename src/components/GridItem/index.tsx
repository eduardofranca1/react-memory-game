import { GridItemType } from "../../types/GridItemType";
import * as C from "./styles";
import b7Svg from "../../svgs/b7.svg";
import { items } from "../../data/items";

interface Props {
  item: GridItemType;
  onClick: () => void;
}

export default function GridItem({ item, onClick }: Props) {
  return (
    <C.Container
      showBackground={item.permanentShown || item.show}
      onClick={onClick}
    >
      {!item.permanentShown && !item.show && (
        <C.Icon src={b7Svg} opacity={0.1} alt="" />
      )}
      {(item.permanentShown || item.show) && item.item !== null && (
        <C.Icon src={items[item.item].icon} alt="" />
      )}
    </C.Container>
  );
}
