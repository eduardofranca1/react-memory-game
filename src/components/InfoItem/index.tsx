import * as C from "./styles";

interface Props {
  label: string;
  value: string;
}

export default function InfoItem({ label, value }: Props) {
  return (
    <C.Container>
      <C.Label>{label}</C.Label>
      <C.Value>{value}</C.Value>
    </C.Container>
  );
}
