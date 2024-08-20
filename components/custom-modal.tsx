"use client";

import React, { useEffect, useState } from "react";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";
import { CustomModalType, FocusedTodoType, Todo } from "@/types";
import {
  Input, Button, Popover, PopoverContent, PopoverTrigger, Spinner,
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Switch
} from "@nextui-org/react";
import { MailIcon } from "@nextui-org/shared-icons";
import { Link } from "@nextui-org/link";

const CustomModal = ({ focusedTodo, modalType, onClose }: {
  focusedTodo: Todo,
  modalType: CustomModalType,
  onClose: () => void
}) => {

  const [isDone, setIsDone] = useState<Boolean>(false);
  const [editedTodoInput, setEditedTodoInput] = useState<string>(focusedTodo.title);
  // const [editedTodoInput, setEditedTodoInput] = useState<string>(focusedTodo.title);과 같은 코드
  // useEffect(() => {
  //     setEditedTodoInput(focusedTodo.title);
  // }, []);


  const DetailModal = () => {
    return <>
        <ModalHeader className="flex flex-col gap-1">{ modalType }</ModalHeader>
        <ModalBody>
          <p>
              Detail Modal
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" onPress={onClose}>
            Ok
          </Button>
        </ModalFooter>
      </>
  }

  const ModifyModal = () => {
    return <>
      <ModalHeader className="flex flex-col gap-1">Modify</ModalHeader>
      <ModalBody>
        <p><span className="font-bold">ID : </span>{focusedTodo.id}</p>
        <p>입력 된 할일 : {editedTodoInput}</p>
        <Input
          autoFocus
          label="To do"
          placeholder="Enter to do message."
          variant="bordered"
          isRequired
          defaultValue={focusedTodo.title}
          value={editedTodoInput}
          onValueChange={setEditedTodoInput}
        />
        <div className="flex py-2 space-x-4">
          <span className="font-bold">Completed : </span>
          <Switch defaultSelected={focusedTodo.is_done}
          onValueChange={setIsDone}
          aria-lable="Automatic updates">
          </Switch>
        </div>
        <div className="flex py-2 space-x-4">
          <span className="font-bold">Created : </span>
          <p>{`${focusedTodo.create_at}`}</p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="flat" onPress={onClose}>
          Apply
        </Button>
        <Button color="primary" onPress={onClose}>
          Close
        </Button>
      </ModalFooter>
    </>
  }

  const DeleteModal = () => {
    return <>
      <ModalHeader className="flex flex-col gap-1">{ modalType }</ModalHeader>
      <ModalBody>
        <p>
          Delete Modal
        </p>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={onClose}>
          Close
        </Button>
        <Button color="primary" onPress={onClose}>
          Ok
        </Button>
      </ModalFooter>
    </>
  }

  const getModal = (type: CustomModalType) => {
    console.log(type);
    switch (type) {
      case 'detail':  return DetailModal();
      case 'modify':  return ModifyModal();
      case 'delete':  return DeleteModal();
      default: break;
    }
  }

  return (
    <>
      { getModal(modalType) }
    </>
  )
}

export default CustomModal;
