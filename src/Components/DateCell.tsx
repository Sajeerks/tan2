import { Box, Center, Icon } from '@chakra-ui/react';
import React, { forwardRef, useState } from 'react'
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";

import "react-datepicker/dist/react-datepicker.css";


const DateCell =  ({getValue, row, column,table}:any)  => {
    // const [startDate, setStartDate] = useState(new Date());
    const date =getValue() || null
    const {updateData} = table.options.meta

    const DataCustomInput = forwardRef(({value,onClick,clearDate}:any, ref:any)=>{
 return  (    <Center ref={ref}  onClick={onClick} cursor={"pointer"}>
          {value?<>
          
          {value}
         <Box
         position={"absolute"}
         right={2}
         fontSize={"md"}
         color="red.300"
         onClick={(e)=>{
            e.stopPropagation()
            clearDate()
         }
            
            }
         >
            &times;
            </Box> 
          </>:<Icon as={FaCalendarAlt} fontSize={'xl'}/>}
        </Center>)
    })
  return (
    <Box w={"100%"} overflow={"hidden"}>
     <DatePicker 
       wrapperClassName='date-wrapper'
    
    
     selected={date} onChange={(date) => updateData(row.index, column.id, date)}
     
     customInput={
        <DataCustomInput
         clearDate={()=>updateData(row.index, column.id, null)}
        
        />
     }
     
     />
    
    </Box>
  )
}

export default DateCell