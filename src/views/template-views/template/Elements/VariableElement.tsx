interface VariableElementProps {
  variable: any;
}
const VariableElement = ({ variable }: VariableElementProps) => {
  return <span>{variable}</span>;
};

export default VariableElement;