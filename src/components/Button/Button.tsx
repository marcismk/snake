import classes from "./Button.module.css";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = (props: Props) => (
  <button className={classes.button} {...props}>
    {props.children}
  </button>
);
