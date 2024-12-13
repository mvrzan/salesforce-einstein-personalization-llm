import { useEffect, useRef, useState } from "react";
import useSalesforceInteractions from "@/hooks/useSalesforceInteractions";
import useBearStore from "@/hooks/useBearStore";

import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@chakra-ui/react";

import { writeToLocalStorage, readFromLocalStorage, deleteFromLocalStorage } from "../../utils/localStorageUtil";

interface LogoutModalProps {
  isLogoutModalOpen: boolean;
  setIsLogoutModalOpen: (isOpen: boolean) => void;
}

const LogoutModal = ({ isLogoutModalOpen, setIsLogoutModalOpen }: LogoutModalProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const userTitleName = useRef(firstName);
  const { userLoggedOutHook } = useSalesforceInteractions();
  const resetBannerImage = useBearStore((state) => state.resetBannerImage);

  useEffect(() => {
    const isAuthenticated = readFromLocalStorage("isAuthenticated");

    if (isAuthenticated === "true") {
      const user = JSON.parse(readFromLocalStorage("user") as string);

      setFirstName(user?.firstName);
      setLastName(user?.lastName);
      setEmail(user?.email);
      setPhoneNumber(user?.phoneNumber);

      userTitleName.current = user?.firstName;
    }
  }, [isLogoutModalOpen]);

  const logoutHandler = () => {
    writeToLocalStorage("isAuthenticated", "false");
    deleteFromLocalStorage("user");
    setIsLogoutModalOpen(false);
    userLoggedOutHook(firstName, lastName, email, phoneNumber);
    resetBannerImage();
  };

  return (
    <DialogRoot
      open={isLogoutModalOpen}
      placement="center"
      onOpenChange={() => {
        setIsLogoutModalOpen(!isLogoutModalOpen);
      }}
      modal={false}
    >
      <DialogTrigger />
      <DialogContent bg="white">
        <DialogHeader>
          <DialogTitle color="black">Hello {userTitleName.current}!</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Field color="black" label="First name">
            <Input
              autoFocus
              variant="outline"
              value={firstName}
              placeholder="First name..."
              _placeholder={{ color: "gray" }}
              _selection={{ background: "#9333ea", color: "white" }}
              borderColor="#9333ea"
              focusRingColor="purple"
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
          </Field>
          <Field color="black" label="Last name">
            <Input
              variant="outline"
              value={lastName}
              placeholder="Last name..."
              _placeholder={{ color: "gray" }}
              _selection={{ background: "#9333ea", color: "white" }}
              borderColor="#9333ea"
              focusRingColor="purple"
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
          </Field>
          <Field color="black" label="Email address">
            <Input
              variant="outline"
              value={email}
              placeholder="email@example.com"
              _placeholder={{ color: "gray" }}
              _selection={{ background: "#9333ea", color: "white" }}
              borderColor="#9333ea"
              focusRingColor="purple"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </Field>
          <Field color="black" label="Phone number">
            <Input
              variant="outline"
              value={phoneNumber}
              placeholder="+123456789"
              _placeholder={{ color: "gray" }}
              _selection={{ background: "#9333ea", color: "white" }}
              borderColor="#9333ea"
              focusRingColor="purple"
              onChange={(event) => {
                setPhoneNumber(event.target.value);
              }}
            />
          </Field>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button colorPalette="red">Cancel</Button>
          </DialogActionTrigger>
          <Button colorPalette="purple" onClick={logoutHandler}>
            Sign out
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default LogoutModal;
