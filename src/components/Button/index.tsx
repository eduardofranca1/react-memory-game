import * as C from "./styles";

interface Props {
  label: string;
  icon?: any;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

export default function Button({ label, icon, onClick }: Props) {
  return (
    <C.Container onClick={onClick}>
      {icon && (
        <C.IconArea>
          <C.Icon src={icon}></C.Icon>
        </C.IconArea>
      )}
      <C.Label>{label}</C.Label>
    </C.Container>
  );
}
