import { Input } from '@chakra-ui/react'
import React, { useState } from 'react'

const EditableCell = ({getValue, row, column,table}:any) => {
  const [value, setvalue] = useState(getValue())
    const onBlur=()=>{
      table.options.meta?.updateData(row.index,column.id, value)
    }

  return (
    <Input
    onBlur={onBlur}
    value={value}
    onChange={e=>setvalue(e.target.value)}
      variant="filled"
      size="sm"
      w="85%"
   overflow={"hidden"}
   textOverflow={"ellipsis"}
   whiteSpace={"nowrap"}

    />
  )
}

export default EditableCell