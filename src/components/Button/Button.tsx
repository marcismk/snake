interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = (props: Props) => (
  <button
    className="border-4 border-neutral-400 px-3 py-2 uppercase text-white font-bold bg-[#242424] hover:bg-neutral-700 cursor-pointer"
    {...props}
  >
    {props.children}
  </button>
);
