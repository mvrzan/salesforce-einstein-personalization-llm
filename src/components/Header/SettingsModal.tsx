import { useEffect, useState } from "react";

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

import useScript from "../../hooks/useScript";

interface SettingsModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const SettingsModal = ({ isModalOpen, setIsModalOpen }: SettingsModalProps) => {
  const [scriptUrl, setScriptUrl] = useState("");
  const configureScriptUrl = useScript();

  useEffect(() => {
    const existingScript = document.querySelector('script[src*="c360a.min.js"]');
    if (existingScript) {
      setScriptUrl(existingScript.getAttribute("src")!);
      return;
    }
  }, []);

  const saveChangesHandler = () => {
    setIsModalOpen(false);
    configureScriptUrl(scriptUrl);
  };

  return (
    <DialogRoot
      open={isModalOpen}
      placement="center"
      onOpenChange={() => {
        setIsModalOpen(!isModalOpen);
      }}
    >
      <DialogTrigger />
      <DialogContent bg="white">
        <DialogHeader>
          <DialogTitle color="black">Web SDK Settings</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Field color="black" label="Data Cloud CDN Script URL">
            <Input
              variant="outline"
              placeholder="https://cdn.c360a.salesforce.com/..."
              _placeholder={{ color: "gray" }}
              onChange={(event) => {
                setScriptUrl(event.target.value);
              }}
            />
          </Field>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button colorPalette="red">Cancel</Button>
          </DialogActionTrigger>
          <Button colorPalette="purple" onClick={saveChangesHandler}>
            Save changes
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default SettingsModal;
