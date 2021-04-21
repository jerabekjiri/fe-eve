import MaskedInput from 'react-text-mask';

const LPMask = (props) => {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={ref => {inputRef(ref ? ref.inputElement : null)}}
        mask={[/[A-ZA-z0-9]/, /[A-ZA-z0-9]/, /[A-ZA-z0-9]/, ' ', /[A-ZA-z0-9]/, /[A-ZA-z0-9]/, /[A-ZA-z0-9]/, /[A-ZA-z0-9]/]}
        placeholderChar={'\u2000'}
      />
    );
  }
export default LPMask 