"use client";

import {
  Button,
  Input,
  Title,
  Stack,
  FileInput,
  Paper,
  Text,
  Skeleton,
  Group,
  rem,
} from "@mantine/core";
import { Center } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconHeadphones, IconUpload, IconX } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { TranscribeAPI } from "@/services/api/TranscribeAPI";
import { useState } from "react";
import { storage } from "@/utils/firebase.js"; 
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Dropzone } from "@mantine/dropzone";
export default function TranscribePageLayout() {
  const [audio, setAudio] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [audioPlaceholder, setAudioPlaceholder] = useState("Attach audio file");
  const [response, setResponse] = useState("");

const handleAudioUpload = (file, setPlaceholder, setFileState) => {
  const storageRef = ref(storage, `audios/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setPlaceholder(`Upload is ${progress.toFixed(0)}% done`);
    },
    (error) => {
      console.error(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setPlaceholder("Uploaded");
        setFileState(downloadURL);
        setAudioURL(downloadURL);
      });
    }
  );
};
const handleAudio = (file) => {
      setAudio(file);
      handleAudioUpload(file, setAudioPlaceholder, setAudio);
    
};



  const { mutate , isPending } = useMutation({
    mutationFn: TranscribeAPI,
    onSuccess: (data) => {
      setResponse(data.data.response);
    },
  });

  const handleClick = async () => {
    mutate({ body: {
      audioURL: audioURL,
    } });
  };

  return (
    <Center w="100vw" h="100vh">
      <Stack align="center" spacing="lg">
        <Title>Speech to Text Converter</Title>
        <Dropzone
          onDrop={(files) => {
            setAudio(files[0]);
            handleAudio(files[0]);
          }}
          onReject={(files) => ("rejected files", files)}
          maxSize={5 * 1024 ** 2}
          accept={"audio/*"}
          mt={"lg"}
        >
          <Group
            justify="center"
            gap="xl"
            mih={220}
            style={{ pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <IconUpload
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-blue-6)",
                }}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-red-6)",
                }}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconHeadphones
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-dimmed)",
                }}
                stroke={1.5}
              />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Drag audio here or click to select audio files
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                {audioPlaceholder}
              </Text>
            </div>
          </Group>
        </Dropzone>
        <Button onClick={handleClick} mt={"lg"}>Transcribe</Button>
        {response ||isPending === true ? (
          <Paper withBorder p="md" radius="md" mt="md" w={"90%"}>
            {isPending ? (
              <>
                <Skeleton w={"100%"} h={"10px"}/>
                <Skeleton w={"100%"} h={"10px"} mt={"10px"}/>
                <Skeleton w={"100%"} h={"10px"} mt={"10px"}/>
                <Skeleton w={"100%"} h={"10px"} mt={"10px"}/>
                <Skeleton w={"100%"} h={"10px"} mt={"10px"}/>
                <Skeleton w={"100%"} h={"10px"} mt={"10px"}/>
                <Skeleton w={"100%"} h={"10px"} mt={"10px"}/>
                <Skeleton w={"100%"} h={"10px"} mt={"10px"}/>
                <Skeleton w={"100%"} h={"10px"} mt={"10px"}/>
                <Skeleton w={"100%"} h={"10px"} mt={"10px"}/>
              </>
            ) : (
              <Text>{response}</Text>
            )}
          </Paper>
        ) : (
          ""
        )}
      </Stack>
    </Center>
  );
}
