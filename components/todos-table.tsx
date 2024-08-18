"use client";

import React, { useState } from "react";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";
import { Todo } from "@/types"
import {Input, Button, Popover, PopoverContent, PopoverTrigger, Spinner } from "@nextui-org/react";
import { Simulate } from "react-dom/test-utils";
import { useRouter } from "next/navigation";
import change = Simulate.change;

const TodosTable = ( { todos } : { todos:Todo[] }) => {

  // add possible todo
  const [todoAddEnable, setTodoAddEnable] = useState(false);

  // inputed to do
  const [newTodoInput, setNewTodoInput] = useState('');

  // Status Loading
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const router = useRouter();
  const addTodoHandler = async (title: string) => {
    if (!todoAddEnable) { return }

    setTodoAddEnable(false);
    setIsLoading(true);

    await new Promise(f => setTimeout(f, 600));

    await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/todos`, {
      method: 'post',
      body: JSON.stringify({
        title: title
      }),
      cache: 'no-store'
    });

    setNewTodoInput('');
    router.refresh();
    setIsLoading(false);
    setTodoAddEnable(false);
    //console.log(`new to do job success: ${newTodoInput}`);
  }

  const DisabledTodoAddButton = () => {
    return
    // <Button color="default" className="h-14">Enter</Button>
    <Popover placement="top" showArrow={true}>
      <PopoverTrigger>
        <Button color="default" className="h-14">Enter</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">Notice</div>
          <div className="text-tiny">Empty to do. input new things to do</div>
        </div>
      </PopoverContent>
    </Popover>
  }
  const TodoRow = (item: Todo) => {
    return <TableRow key={item.id}>
            <TableCell>{item.id.slice(0, 4)}</TableCell>
            <TableCell>{item.title}</TableCell>
            {/*<TableCell>{item.is_done ? "&#xU+2705;" : "&#128204;"}</TableCell>*/}
            <TableCell>{item.is_done ? "Done" : "Progess"}</TableCell>
            <TableCell>{`${item.create_at}`}</TableCell>
    </TableRow>
  }

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input type="text" label="새로운 할 일" placeholder="Enter new things to do"
               value={newTodoInput}
               onValueChange={(changedInput) => {
                 setNewTodoInput(changedInput);
                 setTodoAddEnable(changedInput.length > 0);
               }}
        />
        {
          todoAddEnable ?
            <Button color="warning" className="h-14"
                    onPress={async ()=> {
                      await addTodoHandler(newTodoInput)
                    }}
            >Enter</Button>
          :
            DisabledTodoAddButton()
        }
      </div>
      <div className="h-6">
        { isLoading && <Spinner size="sm" color="warning" /> }
      </div>

      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>TODO</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>CREATED AT</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"There are no items to show."}>
          {todos && todos.map((item: Todo) => (
            TodoRow(item)
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TodosTable;
