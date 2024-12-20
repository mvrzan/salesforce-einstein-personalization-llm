import { useEffect, useState } from "react";
import useScript from "../../hooks/useScript";
import useBearStore from "@/hooks/useBearStore";
import useAgentforceScript from "@/hooks/useAgentforceScript";
import { readFromLocalStorage } from "@/utils/localStorageUtil";

import {
  DialogActionTrigger,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { HStack, Input, Tabs, Text } from "@chakra-ui/react";
import { Switch } from "@/components/ui/switch";

import { BsChatRightDots } from "react-icons/bs";
import { PiRobotLight } from "react-icons/pi";
import { LiaSalesforce } from "react-icons/lia";

interface SettingsModalProps {
  isSettingsModalOpen: boolean;
  setIsSettingsModalOpen: (isOpen: boolean) => void;
}

const SettingsModal = ({ isSettingsModalOpen, setIsSettingsModalOpen }: SettingsModalProps) => {
  const [scriptUrl, setScriptUrl] = useState("");
  const [agentforceOrgId, setAgentforceOrgId] = useState("");
  const [agentforceJavascript, setAgentforceJavascript] = useState("");
  const [agentforceSalesforceInstanceUrl, setAgentforceSalesforceInstanceUrl] = useState("");
  const [agentforceEmbeddingUrl, setAgentforceEmbeddingUrl] = useState("");
  const [agentforceEmbeddingApiName, setAgentforceEmbeddingApiName] = useState("");
  const [isAgentforceChatActive, setIsAgentforceChatActive] = useState(false);

  const configureScriptUrl = useScript();
  const configureAgentforceScriptUrl = useAgentforceScript();
  const setChatSelector = useBearStore((state) => state.setChatSelector);

  useEffect(() => {
    const existingScript = document.querySelector('script[src*="c360a.min.js"]');

    if (existingScript) {
      setScriptUrl(existingScript.getAttribute("src")!);
    }

    const existingAgentforceScript = document.querySelector('script[src*="assets/js/bootstrap.min.js"]');

    if (existingAgentforceScript) {
      const agentforceConfig = readFromLocalStorage("agentforceConfig");

      if (!agentforceConfig) return;

      const parsedAgentforceConfig = JSON.parse(agentforceConfig);

      setIsAgentforceChatActive(true);
      setAgentforceOrgId(parsedAgentforceConfig.orgId);
      setAgentforceJavascript(parsedAgentforceConfig.scriptUrl);
      setAgentforceSalesforceInstanceUrl(parsedAgentforceConfig.instanceUrl);
      setAgentforceEmbeddingUrl(parsedAgentforceConfig.embeddingUrl);
      setAgentforceEmbeddingApiName(parsedAgentforceConfig.embeddingApiName);
    }
  }, []);

  const saveChangesHandler = () => {
    setIsSettingsModalOpen(false);
    configureScriptUrl(scriptUrl);

    configureAgentforceScriptUrl(
      agentforceOrgId,
      agentforceJavascript,
      agentforceSalesforceInstanceUrl,
      agentforceEmbeddingUrl,
      agentforceEmbeddingApiName
    );
  };

  interface ChatToggleEvent {
    checked: boolean;
  }

  const chatToggleHandler = (e: ChatToggleEvent) => {
    if (e.checked) {
      window.embeddedservice_bootstrap.generateMarkup();
      setIsAgentforceChatActive(true);
    } else {
      window.embeddedservice_bootstrap.removeMarkup();
      setIsAgentforceChatActive(false);
    }
    setChatSelector(e.checked);
  };

  return (
    <DialogRoot
      open={isSettingsModalOpen}
      placement="center"
      onOpenChange={() => {
        setIsSettingsModalOpen(!isSettingsModalOpen);
      }}
      modal={false}
    >
      <DialogContent bg="white">
        <DialogHeader>
          <Tabs.Root defaultValue="data cloud">
            <Tabs.List>
              <Tabs.Trigger value="data cloud" color="black">
                <LiaSalesforce />
                Data Cloud
              </Tabs.Trigger>
              <Tabs.Trigger value="external chat" color="black">
                <BsChatRightDots />
                Chat widget settings
              </Tabs.Trigger>
              <Tabs.Trigger value="agentforce" color="black">
                <PiRobotLight />
                Agentforce
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="data cloud" color="black">
              <DialogTitle marginBottom="40px">Data Cloud Web SDK Settings</DialogTitle>
              <Field label="Data Cloud CDN Script URL">
                <Input
                  variant="outline"
                  placeholder="https://cdn.c360a.salesforce.com/..."
                  _placeholder={{ color: "gray" }}
                  onChange={(event) => {
                    setScriptUrl(event.target.value);
                  }}
                />
              </Field>
            </Tabs.Content>
            <Tabs.Content value="external chat" color="black">
              <DialogTitle marginBottom="40px">Select your web chat service</DialogTitle>
              <HStack>
                <Text fontWeight="bold">3rd party chat</Text>
                <Switch
                  checked={isAgentforceChatActive}
                  colorPalette="purple"
                  color="white"
                  onCheckedChange={chatToggleHandler}
                  trackLabel={{
                    on: <PiRobotLight />,
                    off: <BsChatRightDots />,
                  }}
                />
                <Text fontWeight="bold">Agentforce</Text>
              </HStack>
            </Tabs.Content>
            <Tabs.Content value="agentforce" color="black">
              <DialogTitle marginBottom="40px">Agentforce initialization settings</DialogTitle>
              <Field label="Salesforce Organization ID">
                <Input
                  variant="outline"
                  marginBottom="40px"
                  placeholder="Example: 00DKr00020AYCvN"
                  onChange={(event) => {
                    setAgentforceOrgId(event.target.value);
                  }}
                />
              </Field>
              <Field label="Agentforce Javascript URL">
                <Input
                  variant="outline"
                  marginBottom="40px"
                  placeholder="URL ending in: /assets/js/bootstrap.min.js"
                  onChange={(event) => {
                    setAgentforceJavascript(event.target.value);
                  }}
                />
              </Field>
              <Field label="Agentforce Salesforce Instance URL">
                <Input
                  variant="outline"
                  marginBottom="40px"
                  placeholder="URL ending in: salesforce-scrt.com"
                  onChange={(event) => {
                    setAgentforceSalesforceInstanceUrl(event.target.value);
                  }}
                />
              </Field>
              <Field label="Embedded Service Deployment URL">
                <Input
                  variant="outline"
                  marginBottom="40px"
                  placeholder="URL ending in: /ESWSDOEPAI21734550912345"
                  onChange={(event) => {
                    setAgentforceEmbeddingUrl(event.target.value);
                  }}
                />
              </Field>
              <Field label="Embedded Service API Name">
                <Input
                  variant="outline"
                  placeholder="Example: SDO_Demo"
                  onChange={(event) => {
                    setAgentforceEmbeddingApiName(event.target.value);
                  }}
                />
              </Field>
            </Tabs.Content>
          </Tabs.Root>
        </DialogHeader>
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
