"use client"

import React, { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search,ArrowUp, ArrowDown  } from "lucide-react"
import { useReactTable, getCoreRowModel, ColumnDef, flexRender,getPaginationRowModel,getSortedRowModel,SortingState } from "@tanstack/react-table";
import { DataTablePagination } from "@/components/admin/data-table-pagination"
import { SkeletonCard } from "@/components/SkeletonCart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"


  
interface Message{
  id: number;
  name: string;
  email:string;
  subject:string;
  message: string;
}




const MessageDashboard:React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredData, setFilteredData] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [pageSize, setPageSize] = useState(10);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();



  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => { 
      const value = event.target.value.toLowerCase();
      setSearchQuery(value);
    
      if (!value) {
        setFilteredData(messages); // Restore full data when search is cleared
        return;
      }
    
      const filtered = messages.filter((row) =>
        Object.values(row).some(
          (field) => field && String(field).toLowerCase().includes(value) // Check if field is not null
        )
      );
    
      setFilteredData(filtered);
    };

    useEffect(()=>{
      const fetchMessages = async()=>{
        try {

          const token = localStorage.getItem("adminToken");
          if (!token) {
            router.push("/login");
          }
          const res = await fetch("http://localhost:5000/api/admin/message",{
            method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              }

          })

          if (!res.ok) {
            if (res.status === 403) {
                localStorage.removeItem("adminToken");
                router.push("/login");
                return;
            }
            throw new Error("Failed to fetch data");
        }
          
          const data = await res.json();
          setMessages(data);
          setFilteredData(data);
          
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
        finally {
          setIsLoading(false);
      }
      }
          fetchMessages();

    },[]);


    const columns: ColumnDef<Message>[] = [
      {
        accessorFn: (row) => row.name,
        id: "name",
        header: "Name",
      },
      {
        accessorFn: (row) => row.email,
        id: "Email",
        header: "Email",
      },
      {
        accessorFn: (row) => row.subject,
        id: "subject",
        header: "Subject",
      },
      {
        accessorFn: (row) => row.message,
        id: "message",
        header: "Message",
      }
    ];

    const table = useReactTable({
      data: filteredData,
      columns,
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      state: {
        sorting,
      },  
      initialState: { pagination: { pageSize,pageIndex:0 } }, 
    });
    
  

  return (
    <div>
        <div className="ml-[20px] -mt-[30px] mb-[20px]">
          {isLoading ? <SkeletonCard height="h-[40px]" className="w-[40px]" />
            :
          <p className="text-[28px] text-[#000] dark:text-white mt-[5px] font-inter-bold">{messages.length}</p>
          }          
        </div>
        
        <div className="flex justify-end items-center mb-4 gap-4">
            <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#a2a1a1] w-[15px]" />
            <Input
                className="w-64 bg-white dark:bg-[#2C2D2F] font-inter-light"
                placeholder="Search message..."
                value={searchQuery}
                onChange={handleSearch}
            />
            </div>
          
        </div>

      

        <div className="flex justify-between items-center p-2">
          <span className="text-[#7f7f7f] text-[13px] font-inter-medium">Total: {messages.length}</span>
          <div className="flex items-center space-x-2">
            <span className="text-[#7f7f7f] text-[13px] font-inter-medium">Rows per page:</span>
            <Select
                value={pageSize === messages.length ? "all" : pageSize.toString()}
                onValueChange={(value) => {
                  const newSize = value === "all" ? messages.length : Number(value)
                  setPageSize(newSize)
                  table.setPageSize(newSize)
                }}
                defaultValue="10"
              >
              <SelectTrigger className="w-auto h-[25px] text-[13px] p-2 font-inter-semibold cursor-pointer">
                <SelectValue placeholder={pageSize === messages.length ? "All" : pageSize.toString()} />
              </SelectTrigger>
              <SelectContent side="top" className="dark:bg-[#111]">
                {[10, 15, 20, 25].map((size) => (
                  <SelectItem key={size} value={size.toString()} className="cursor-pointer dark:hover:bg-[#2C2D2F] dark:active:bg-[#2C2D2F] dark:focus:bg-[#2C2D2F]">
                    {size}
                  </SelectItem>
                ))}
                <SelectItem value="all" className="cursor-pointer">All</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

      <div className="bg-transparent rounded-lg border-2 border-[#d9d9d9] dark:border-[#2e2e2e]">
      {/* {loading ? (
        <p>Loading...</p>
      ) : ( */}
      <div className="overflow-auto rounded-md">
        <Table className="min-w-full">
          <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const isSorted = header.column.getIsSorted();
                    return (
                      <TableHead
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className="cursor-pointer select-none py-4 font-inter-medium"
                      >
                        <div className="flex flex-col items-center gap-1 justify-center relative float-start">
                        <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
                            {header.column.getCanSort() && (
                            <span className="absolute -bottom-3">
                            {isSorted === "asc" && <ArrowUp className="w-3 h-3" />}
                            {isSorted === "desc" && <ArrowDown className="w-3 h-3" />}
                            </span>
                            
                            )}
                        </div>
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
          <TableBody className="font-inter-medium">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {isLoading && <SkeletonCard height="h-[64px]" />}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* )} */}
      </div>
        <div className="mt-6">
          <DataTablePagination table={table} />
        </div>
    </div>
  )
}

export default MessageDashboard;

