import { useState } from 'react'

function useInput(validateValue) {
    const [validation, setValidation] = useState({
        touched: false,
        value: '',
    })

    const isValid = validateValue(validation.value);
    const hasError = !isValid;
    const onInputBlurHandler = (event) => {
        setValidation(prevState => {
            return { ...prevState, touched: true }
        })
    };

    const onInputChangeHandler = (event) => {
        setValidation(prevState => {
            return { ...prevState, value: event.target.value }
        })
    };

    const resetInput = () => {
        setValidation({
            touched: false,
            value: '',
        })
    }

    return {
        value: validation.value,
        touched: validation.touched,
        hasError,
        isValid,
        onInputChangeHandler,
        onInputBlurHandler,
        resetInput

    }
}

export default useInput