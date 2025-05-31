"use client";

import { Box, Button, Flex, ScrollArea, TextInput } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import UserMessage from "./UserMessageCard";
import BotMessage from "./BotMessage";
import { IconSend2 } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { PromptAPI } from "@/services/api/ChatAPIs";
import { useForm, yupResolver } from "@mantine/form";
import { chatValidationSchema } from "@/schemas/ChatSchema";

export default function ChatPageLayout() {
  const [messages, setMessages] = useState([]); // Array of chat messages
  const viewportRef = useRef(null);

  const { onSubmit, getInputProps, errors, setValues } = useForm({
    mode: "controlled",
    initialValues: {
      prompt: "",
    },
    validate: yupResolver(chatValidationSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: PromptAPI,
    onSuccess: (data) => {
      // Add bot response to messages
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: data.data.response },
      ]);
    },
  });

  const handleSubmit = async (values) => {
    const userPrompt = values.prompt;

    // Add user message to chat
    setMessages((prev) => [...prev, { type: "user", text: userPrompt }]);

    mutate({ body: { prompt: userPrompt } });

    setValues({ prompt: "" });
  };

  useEffect(() => {
    const el = viewportRef.current;
    if (el) {
      requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight;
      });
    }
  }, [messages, isPending]); // scroll when messages change

  return (
    <Flex direction="column" h="100%" style={{ flex: 1 }}>
      <ScrollArea style={{ flex: 1 }} viewportRef={viewportRef}>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "1rem 2rem",
          }}
        >
         {messages.map((msg, index) =>
  msg.type === "user" ? (
    <UserMessage key={index} text={msg.text} />
  ) : (
    <BotMessage key={index} text={msg.text} />
))}


{isPending && <BotMessage key="loading" isPending />}

        </Box>
      </ScrollArea>

      <form onSubmit={onSubmit(handleSubmit)}>
        <Box p="xl" style={{ borderTop: "1px solid white" }}>
          <Flex gap="10px">
            <TextInput
              placeholder="Ask about the weather (Mention City Important)..."
              style={{ flex: 1 }}
              radius="md"
              error={errors.prompt}
              {...getInputProps("prompt")}
            />
            <Button leftSection={<IconSend2 />} type="submit">
              Send
            </Button>
          </Flex>
        </Box>
      </form>
    </Flex>
  );
}
