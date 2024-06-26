import { Button, Flex, Input, Text, VStack } from '@chakra-ui/react'
import React, { useState, useRef } from 'react'
import { TbDragDrop2 } from 'react-icons/tb';

const CreationForm = () => {
  const inputRef = useRef();
  const [files, setFiles] = useState(null);
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    console.log(Array.from(event.dataTransfer.files))
    setFiles(event.dataTransfer.files)
  };
  
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("Files", files);
    console.log(formData.getAll())
  };
  if (files) return (
    <VStack>
      <VStack>
        {Array.from(files).map((files, idx) => <li key={idx}>File</li> )}
      </VStack>
      <Flex>
        <Button onClick={() => setFiles(null)}>Cancel</Button>
        <Button onClick={handleUpload}>Upload</Button>
      </Flex>
    </VStack>
  );
  return (
    <>
    <Flex direction={'column'} gap={2}>
        <Text fontSize={'bold'}>Title of your creation</Text>
        <Input placeholder='Title'/>
        <Text fontSize={'bold'}>Category of your creation</Text>
        <Flex gap={2}>
          <Button w={'full'}>Addon</Button>
          <Button w={'full'}>World</Button>
          <Button w={'full'}>Skin</Button>
        </Flex>
        {/* PEMBELAH */}
        <Text fontSize={'bold'}>Thumbnail of your creation</Text>
        <Flex justifyContent={'center'} gap={1} p={25} border={"1px gray solid"} borderRadius={5} onDragOver={handleDragOver} onDrop={handleDrop} w={'full'}>
        <VStack>
        <Flex alignItems={"center"} gap={1}>
        <TbDragDrop2 size={25}/>
        <Text fontSize={15} userSelect={"none"}>Drag and Drop Files to Upload</Text>
        </Flex>
        <Flex gap={1}>
        <input 
        type='file' 
        multiple 
        onChange={(event) => setFiles(event.target.files)}
        hidden
        accept='image/png, image/jpeg, image/jpg'
        ref={inputRef}
        />
        <button onClick={() => inputRef.current.click()}>Select Files</button>
        </Flex>
        </VStack>
        </Flex>
        {/* PEMBELAH */}
        <Text fontSize={'bold'}>Describe your creation</Text>
        <Input placeholder='Description'/>
        {/* PEMBELAH */}
        <Text fontSize={'bold'}>Features of your creation</Text>
        <Input placeholder='Features'/>
        {/* PEMBELAH */}
        <Text fontSize={'bold'}>Specification your creation</Text>
        <Input placeholder='Specification'/>
        {/* PEMBELAH */}
        <Text fontSize={'bold'}>File of your creation</Text>
        <Flex justifyContent={'center'} gap={1} p={25} border={"1px gray solid"} borderRadius={5} onDragOver={handleDragOver} onDrop={handleDrop} w={'full'}>
        <VStack>
        <Flex alignItems={"center"} gap={1}>
        <TbDragDrop2 size={25}/>
        <Text fontSize={15} userSelect={"none"}>Drag and Drop Files to Upload</Text>
        </Flex>
        <Flex gap={1}>
        <input 
        type='file' 
        multiple 
        onChange={(event) => setFiles(event.target.files)}
        hidden
        accept='image/png, image/jpeg, image/jpg'
        ref={inputRef}
        />
        <button onClick={() => inputRef.current.click()}>Select Files</button>
        </Flex>
        </VStack>
        </Flex>
        <Button>Post It</Button>
    </Flex>
    </>
  )
}

export default CreationForm