import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
    Box,
  } from '@chakra-ui/react'
import React from 'react'
import { AiFillCaretDown } from "react-icons/ai";
import { STATUSES } from '../data';


const ColorIcon =({color,...props}:any)=>(<Box w="12px" h="12px" bg={color} {...props}/>)
const StatusCell = ({getValue, row, column,table}:any) => {
    let name:string ="" ,color:string =""
    if(getValue()){
     name =getValue().name
     color =getValue().color
     
    }
    const {updateData} = table.options.meta

  return (
    <Menu
     isLazy
     offset={[0,0]}
     flip={false}
     autoSelect={false}
    
    
    >
    <MenuButton h="100%" w="100%"  as={Button}
    textAlign={"left"}
    p={3.5}
    bg={color || "transparent"}
    color={"gray.900"}

     
    rightIcon={<AiFillCaretDown />}>
      {name}
    </MenuButton>
    <MenuList
     
    
    >

    <MenuItem
      onClick={()=>updateData(row.index, column.id, null)}
      >
        <ColorIcon color={"red.400"} mr={3}/>
     None
      
      </MenuItem>


        {STATUSES.map(status=>
      <MenuItem key={status.id}
      onClick={()=>updateData(row.index, column.id, status)}
      >
        <ColorIcon color={status.color} mr={3}/>
      {" "}  {status.name}
      
      </MenuItem>
     
            
            )}
 
    </MenuList>
  </Menu>
  )
}

export default StatusCell