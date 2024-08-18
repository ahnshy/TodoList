"use client";

import React, { useState } from "react";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";
import { CustomModalType, FocusedTodoType, Todo } from "@/types";
import {Input, Button, Popover, PopoverContent, PopoverTrigger, Spinner,
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure
} from "@nextui-org/react";

const CustomModal = ({ focusedTodo, modalType, onClose }: {
  focusedTodo: Todo,
  modalType: CustomModalType,
  onClose: () => void
}) => {

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
      <ModalHeader className="flex flex-col gap-1">{ modalType }</ModalHeader>
      <ModalBody>
        <p>
          Modify Modal
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
