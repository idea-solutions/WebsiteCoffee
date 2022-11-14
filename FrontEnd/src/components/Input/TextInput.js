import React from 'react'

const TextInput = ({
  name,
  placeholder,
  onChange,
  type,
  className,
  required,
  defaultValue,
  disabled,
}) => {
  return (
    <input
      className={`${className}  border-outline-var border-style: solid rounded-full text-l2 mb-[16px] pt-[13px] px-[16px] pb-[13px] 
      hover:border-primary hover:rounded-[32px] focus:border-primary focus:rounded-[16px] focus:text-on-primary-cont focus:bg-primary-cont transition-all ease-in duration-300`}
      onChange={onChange}
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
      defaultValue={defaultValue}
      disabled={disabled}
    ></input>
  )
}

export default TextInput
