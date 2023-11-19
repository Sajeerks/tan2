import React, { useEffect, useState } from 'react'
import DATA, { STATUSES } from '../data'
import { Box, Button, ButtonGroup, HStack, Icon, Input, Menu, MenuButton, MenuItem, MenuList, Text, filter } from '@chakra-ui/react'
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import EditableCell from './EditableCell'
import StatusCell from './StatusCell'
import DateCell from './DateCell'
import { AiFillCaretDown } from "react-icons/ai";
import { FaSortAmountDown } from "react-icons/fa";



const ReactTable = () => {

function statusFilterFunctin (row:any, columId:string, filtervalue:string[]){
  console.log({filtervalue});

  if(columId ==="status"){
    if(filtervalue.length===0) return true
    if( row.original.status){
      console.log("row.original.status==",row.original.status);
      let test:boolean = false
      // filtervalue.forEach(singleVal=>{
      //   test = row.original.status.name.toString().includes(singleVal)
      // })
      test = filtervalue.includes(row.original.status.name)
        
      
      console.log({test});
      return test?true:false
    }else{
       return false
    }
   
    
  }else{
    return false
  }
 
}


  const [data, setData] = useState(DATA) 
   const [taskfilter, settaskfilter] = useState("")
   const [noteFilter, setnoteFilter] = useState("")
   const [statusFilter, setstatusFilter] = useState<string[]>([])



  const columns =[
    {
      accessorKey:"task",
      header:"tack",
      size:200,
      // cell:(props:any)=><p>{props.getValue()}</p>
      cell:EditableCell,


    },
    {
      accessorKey:"status",
      header:"status",
      // cell:(props:any)=>{
      //   // console.log(props);
      //   // console.log(props.getValue());
      //   let valueOFGetValue = props.getValue()
      //   if(valueOFGetValue===null){
      //     return (<p>no value </p>)
      //   }else{
      //     return (<p>{valueOFGetValue.name}</p>)
      //   }
        
      // }
      cell:StatusCell,
      filterFn:statusFilterFunctin,
      enableColumnFilter:false,
      enableGlobalFilter:false
    },
    {
      accessorKey:"due",
      header:"Due",
      // cell:(props:any)=>{
      //   // console.log(props.getValue()?.toLocaleDateString('en-US'))
      //   return(<p>{props.getValue()?.toLocaleDateString('en-US')}</p>)
      // }
      cell:DateCell,
  
    },
    {
      accessorKey:"notes",
      header:"nostes",
      // cell:(props:any)=><p>{props.getValue()}</p>
    cell:  EditableCell

    },
  ]


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel:getCoreRowModel(),
    columnResizeMode:"onChange",
    meta:{
      updateData:(rowIndex:number, columIndex:string,value:any)=>setData(

        prev=>prev.map((row, index)=>      
             index===rowIndex?  {...prev[rowIndex],[columIndex]:value}:row

    )

      )        

      
    },
    getFilteredRowModel:getFilteredRowModel(),
    getSortedRowModel:getSortedRowModel(),
    getPaginationRowModel:getPaginationRowModel(),


  })
console.log(data);
  // console.log(table.getHeaderGroups());

  useEffect(() => {
    table.getHeaderGroups().map(headerArr=>{
      headerArr.headers.map(columnObj=>{
         if(columnObj.column.id === "task"){
          columnObj.column.setFilterValue(taskfilter)
         }
         if(columnObj.column.id === "notes"){
          columnObj.column.setFilterValue(noteFilter)
         }
         if(columnObj.column.id === "status"){
          console.log({statusFilter});
          columnObj.column.setFilterValue(statusFilter)
         }
      })
    })
  
  }, [taskfilter,noteFilter,statusFilter])
  
  return (
    <Box key="main" className='main' >
      <HStack flexDirection={"row"}  w="80%" >
      <Input value={taskfilter} w="40%"
      placeholder='enter task for seaRCHING...'
       onChange={e=>{
        settaskfilter(e.target.value)
        
      }} />

<Input value={noteFilter} w="40%"
      placeholder=' note for seaRCHING...'
       onChange={e=>{
        setnoteFilter(e.target.value)
        
      }} />


<Box>
<Menu>
  <MenuButton as={Button} rightIcon={<AiFillCaretDown />}>
   status= {statusFilter.join(", ")}
  </MenuButton>

  
  <MenuList >
  <MenuItem   onClick={e=>setstatusFilter([])}   key={"sss"} value={""}>Blank Status</MenuItem>
    {STATUSES.map(status=>(
 <MenuItem   onClick={e=>
  
 
  setstatusFilter(prev=>{
    if(statusFilter.includes(status.name)){
      return prev
    }  
   return  [...prev].concat(status.name)
  })}  
  bg={statusFilter.includes(status.name)?"gray.800":"transparent"}
  key={status.id} value={status.name}>{status.name}</MenuItem>
    ))}
   
   
  </MenuList>
</Menu>
</Box>


      </HStack>
       
    <Box className='table' w={table.getTotalSize()} >
           {table.getHeaderGroups().map(headerGroup=><Box className='tr' key={headerGroup.id}>
                   {headerGroup.headers.map((header)=>
               (  <Box className='th' key={header.id} w={header.getSize()}>
                {/* {"ddddd"} */}
                        {header.column.columnDef.header!==null?header.column.columnDef.header?.toString():"no val"}
                        {header.column.getCanSort() && <Icon as={FaSortAmountDown } mx={3} 
                         fontSize={14}
                         onClick={header.column.getToggleSortingHandler()}
                         
                        />}
                       
                        {
                        
                          {desc:"^✔", asc:"‖😍"}[header.column.getIsSorted() as string]
                        }
                        
                        <Box
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={`resizer ${header.column.getIsResizing()?"isResizing":''}`}
                        >



                        </Box>

                   </Box>) 
                    )}
            </Box>
            )}
             {table.getRowModel().rows.map((row) => (
          <Box className="tr" key={row.id}>
            {row.getVisibleCells().map((cell) => (
        
              <Box className="td" w={cell.column.getSize()} key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())
       
                }
              </Box>
            ))}
          </Box>
        ))}

    </Box>
  <Text mb={2}>
    Page {table.getState().pagination.pageIndex+1} of {" "} {table.getPageCount()}
  </Text>
  <ButtonGroup size={"sm"} isAttached variant={"outline"}>
    <Button 
    onClick={()=>table.previousPage()}
    isDisabled={!table.getCanPreviousPage()}
    >
{"<<"}
    </Button>

    <Button 
    onClick={()=>table.nextPage()}
    isDisabled={!table.getCanNextPage()}
    >
{">>"}
    </Button>
  </ButtonGroup>
    </Box>
  )
}

export default ReactTable