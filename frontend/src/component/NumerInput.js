import { Input } from 'antd';

export const NumericInput = (props) => {
  const value = props.value;
  const onChange = props.onChange;
  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;
    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      onChange(inputValue);
    }
  };

  // '.' at the end or only '-' in the input box.
  const handleBlur = () => {
    let valueTemp = value;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1);
    }
    onChange(valueTemp.replace(/0*(\d+)/, '$1'));
  };

  return (
    <Input
    {...props}
    onChange={handleChange}
    onBlur={handleBlur}
    maxLength={16}
    />
  );
};