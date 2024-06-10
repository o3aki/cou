import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import Image from 'next/image'

interface ImageUploadProps {
  onChange: (base64: string) => void
  label: string
  value?: string
  disabled?: boolean
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  disabled,
  value,
  label,
}) => {
  const [base64, setBase64] = useState(value)

  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64)
    },
    [onChange]
  )

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0]
      const reader = new FileReader()

      reader.onload = (e: any) => {
        setBase64(e.target.result)
        handleChange(e.target.result)
      }

      reader.readAsDataURL(file)
    },
    [handleChange]
  )

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
  })

  return (
    <div
      {...getRootProps({
        className:
          'w-full p-4 text-textWhite text-center border-2 border-dotted rounded-xl border-greyDark',
      })}
    >
      <input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center justify-center">
          <Image src={base64} height="100" width="100" alt="Uploaded image" />
        </div>
      ) : (
        <p className="text-textWhite">{label}</p>
      )}
    </div>
  )
}

export default ImageUpload
