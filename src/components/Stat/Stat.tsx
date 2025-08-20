interface Props {
  label: string;
  value: string | number;
}

export const Stat = ({ label, value }: Props) => {
  return (
    <div className="flex gap-1 align-center">
      <span className="uppercase font-bold">{label}</span>
      <span>{value}</span>
    </div>
  );
};
