import React from 'react'

interface InputProps {
  placeholder?: string
  value?: string
  type?: string
  disabled?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  type,
  disabled,
  onChange,
}) => {
  return (
    <input
      disabled={disabled}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      type={type}
      className="
        w-full
        p-4
        text-lg
        bg-globalDark
        border-2
        border-greyBorder
        rounded-xl
        outline-none
        text-textWhite
        focus:border-mainColorr
        focus:border-2
        transition
        disabled:bg-globalDark
        disabled:opacity-70
        disabled:cursor-not-allowed
      "
    />
  )
}

export default Input
