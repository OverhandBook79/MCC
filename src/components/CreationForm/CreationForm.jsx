import { Button, Flex, Input, Text, VStack, Tag, TagLabel, TagCloseButton, Box, Image } from '@chakra-ui/react';
import React, { useState, useRef } from 'react';
import { TbDragDrop2 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

const CreationForm = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    features: '',
    specification: '',
    thumbnail: '',
    files: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFilesChange = (e) => {
    setForm({ ...form, files: e.target.files });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setForm({ ...form, files: event.dataTransfer.files });
  };

  const handleUpload = () => {
    const data = JSON.parse(localStorage.getItem('contents')) || [];
    const newContent = {
      ...form,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
    };
    data.push(newContent);
    localStorage.setItem('contents', JSON.stringify(data));
    navigate('/');
  };

  return (
    <Flex direction={'column'} gap={2}>
      <Text fontSize={'bold'}>Title of your creation</Text>
      <Input name='title' value={form.title} onChange={handleChange} placeholder='Title' />

      <Text fontSize={'bold'}>Category of your creation</Text>
      <Flex gap={2} wrap="wrap">
        {['Addon', 'World', 'Skin'].map((category) => (
          <Tag
            size="lg"
            key={category}
            borderRadius="full"
            variant="solid"
            colorScheme={form.category === category ? 'teal' : 'gray'}
            cursor="pointer"
            onClick={() => setForm({ ...form, category })}
          >
            <TagLabel>{category}</TagLabel>
            {form.category === category && (
              <TagCloseButton onClick={() => setForm({ ...form, category: '' })} />
            )}
          </Tag>
        ))}
      </Flex>

      <Text fontSize={'bold'}>Thumbnail URL of your creation</Text>
      <Input name='thumbnail' value={form.thumbnail} onChange={handleChange} placeholder='Thumbnail URL' />
      {form.thumbnail && (
        <Box
          width="100%"
          paddingTop="56.25%"
          position="relative"
          backgroundColor="gray.100"
          overflow="hidden"
          borderRadius="md"
        >
          <Image
            src={form.thumbnail}
            alt="Thumbnail preview"
            objectFit="contain"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            maxWidth="100%"
            maxHeight="100%"
          />
        </Box>
      )}

      <Text fontSize={'bold'}>Describe your creation</Text>
      <Input name='description' value={form.description} onChange={handleChange} placeholder='Description' />

      <Text fontSize={'bold'}>Features of your creation</Text>
      <Input name='features' value={form.features} onChange={handleChange} placeholder='Features' />

      <Text fontSize={'bold'}>Specification of your creation</Text>
      <Input name='specification' value={form.specification} onChange={handleChange} placeholder='Specification' />

      <Text fontSize={'bold'}>Upload your creation files (.mcaddon, .mcpack, .mcskin)</Text>
      <Flex justifyContent={'center'} gap={1} p={25} border={"1px gray solid"} borderRadius={5} onDragOver={handleDragOver} onDrop={handleDrop} w={'full'}>
        <VStack>
          <Flex alignItems={"center"} gap={1}>
            <TbDragDrop2 size={25} />
            <Text fontSize={15} userSelect={"none"}>Drag and Drop Files to Upload</Text>
          </Flex>
          <Flex gap={1}>
            <input
              type='file'
              multiple
              onChange={handleFilesChange}
              hidden
              accept='.mcaddon, .mcpack, .mcskin'
              ref={fileInputRef}
            />
            <button onClick={() => fileInputRef.current.click()}>Select Files</button>
          </Flex>
        </VStack>
      </Flex>
      {form.files && Array.from(form.files).map((file, idx) => <li key={idx}>{file.name}</li>)}

      <Button onClick={handleUpload}>Post It</Button>
    </Flex>
  );
};

export default CreationForm;
