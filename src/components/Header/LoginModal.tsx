import { useEffect, useState } from "react";
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

import { writeToLocalStorage } from "../../utils/localStorageUtil";

interface LoginModalProps {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (isOpen: boolean) => void;
}

const LoginModal = ({ isLoginModalOpen, setIsLoginModalOpen }: LoginModalProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { userLoggedInHook, personalization } = useSalesforceInteractions();
  const setBannerImage = useBearStore((state) => state.setBannerImage);

  useEffect(() => {
    if (firstName && lastName && email) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [firstName, lastName, email]);

  const loginHandler = async () => {
    writeToLocalStorage("isAuthenticated", "true");
    writeToLocalStorage("user", {
      firstName,
      lastName,
      email,
      phoneNumber,
    });

    setIsLoginModalOpen(false);
    userLoggedInHook(firstName, lastName, email, phoneNumber);
    personalization(["EP_AI_BANNER"]);
    const bannerImage = await personalization(["bannerEP1"]);
    setBannerImage(bannerImage);
  };

  return (
    <DialogRoot
      open={isLoginModalOpen}
      placement="center"
      onOpenChange={() => {
        setIsLoginModalOpen(!isLoginModalOpen);
      }}
    >
      <DialogTrigger />
      <DialogContent bg="white">
        <DialogHeader>
          <DialogTitle color="black">Sign In!</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Field color="black" label="First name">
            <Input
              variant="outline"
              placeholder="First name..."
              _placeholder={{ color: "gray" }}
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
              placeholder="Last name..."
              _placeholder={{ color: "gray" }}
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
              placeholder="email@example.com"
              _placeholder={{ color: "gray" }}
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
              placeholder="+123456789"
              _placeholder={{ color: "gray" }}
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
          <Button colorPalette="purple" onClick={loginHandler} disabled={isButtonDisabled}>
            Sign in!
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default LoginModal;
