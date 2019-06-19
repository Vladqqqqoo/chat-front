import {useState} from 'react'

export default function useFormInput(regExp) {
    const [field, setField] = useState({value: '', isValid: false, isInvalid: false});

    function handleChange(event) {
        setField({...field, value: event.target.value});
    }

    function handleBlur(event) {
        const value = event.target.value;
        if (value.match(regExp)) {
            setField({...field, isValid: true, isInvalid: false});
        } else {
            setField({...field, isValid: false, isInvalid: true});
        }
    }

    return {
        ...field,
        onChange: handleChange,
        onBlur: handleBlur,
    };
}
