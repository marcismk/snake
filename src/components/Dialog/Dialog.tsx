import clsx from "clsx";

interface Props {
  open: boolean;
  title: string;
  children: React.ReactNode;
}

export const Dialog = ({ open, title, children }: Props) => {
  return (
    <div
      className={clsx("absolute top-1/3 left-1/3 w-[300px]", {
        hidden: !open,
      })}
    >
      <div className="relative">
        <h1 className="absolute z-10 top-[-10px] left-3 text-[24px] uppercase font-bold text-yellow-400 text-shadow-[4px_4px_3px_black] bg-neutral-600 px-2 py-0 m-0 leading-none">
          {title}
        </h1>
        <div className="flex flex-col gap-2 bg-neutral-600 p-6 border-4 border-neutral-400 drop-shadow-lg text-black">
          {children}
        </div>
      </div>
    </div>
  );
};
