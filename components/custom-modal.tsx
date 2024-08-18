"use client";

import React, { useState } from "react";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";
import { CustomModalType, FocusedTodoType, Todo } from "@/types";
import {
  Input, Button, Popover, PopoverContent, PopoverTrigger, Spinner,
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox
} from "@nextui-org/react";
import { MailIcon } from "@nextui-org/shared-icons";
import { Link } from "@nextui-org/link";

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
      <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
      <ModalBody>
        <Input
          autoFocus
          endContent={
            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          label="Email"
          placeholder="Enter your email"
          variant="bordered"
        />
        <Input
          // endContent={
          //   // <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          // }
          label="Password"
          placeholder="Enter your password"
          type="password"
          variant="bordered"
        />
        <div className="flex py-2 px-1 justify-between">
          <Checkbox
            classNames={{
              label: "text-small",
            }}
          >
            Remember me
          </Checkbox>
          <Link color="primary" href="#" size="sm">
            Forgot password?
          </Link>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="flat" onPress={onClose}>
          Close
        </Button>
        <Button color="primary" onPress={onClose}>
          Sign in
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
