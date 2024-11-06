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

interface SettingsModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const SettingsModal = ({ isModalOpen, setIsModalOpen }: SettingsModalProps) => {
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
              _placeholder={{ color: "gray" }}
              placeholder="https://cdn.c360a.salesforce.com/..."
              variant="outline"
            />
          </Field>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button colorPalette="red">Cancel</Button>
          </DialogActionTrigger>
          <Button colorPalette="purple">Save changes</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default SettingsModal;
