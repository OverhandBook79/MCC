import { Button, Flex, Input, Text, VStack, Tag, TagLabel, HStack, List, ListItem } from '@chakra-ui/react';
import React, { useState, useRef } from 'react';
import { TbDragDrop2 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import JSZip from 'jszip';

const CreationForm = () => {
  const navigate = useNavigate();
  const inputRef = useRef();
  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    features: '',
    specification: '',
    thumbnail: '',
    files: [],
    compressedFiles: [],
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setForm({ ...form, files });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setForm({ ...form, files });
  };

  const compressFiles = async (files) => {
    const zip = new JSZip();
    files.forEach((file) => {
      zip.file(file.name, file);
    });
    let compressed = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 9 } });
    
    if (compressed.size > 5120) { // Check if the compressed file size exceeds 5KB
      const newZip = new JSZip();
      files.forEach((file) => {
        newZip.file(file.name, file.slice(0, 5120));
      });
      compressed = await newZip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 9 } });
    }
    
    return compressed;
  };

  const handleUpload = async () => {
    setError('');
    const compressedFile = await compressFiles(form.files);
    
    if (compressedFile.size > 5120) { // 5KB in bytes
      setError('The compressed file size exceeds 5KB.');
      return;
    }
    
    const newContent = {
      ...form,
      files: form.files.map(file => file.name), // Store file names
      compressedFile, // Store the compressed blob
      id: uuidv4(), // Generate a unique ID
      date: new Date().toLocaleDateString(),
    };
    const data = JSON.parse(localStorage.getItem('contents')) || [];
    data.push(newContent);
    localStorage.setItem('contents', JSON.stringify(data));
    navigate(`/post/${newContent.id}`);
  };

  const selectCategory = (category) => {
    setForm({ ...form, category });
  };

  return (
    <Flex direction={'column'} gap={2}>
      <Text fontSize={'bold'}>Title of your creation</Text>
      <Input name='title' value={form.title} onChange={handleChange} placeholder='Title' />

      <Text fontSize={'bold'}>Category</Text>
      <HStack spacing={4}>
        {['Addon', 'World', 'Skin'].map((category) => (
          <Tag
            size={'md'}
            key={category}
            borderRadius='full'
            variant={form.category === category ? 'solid' : 'outline'}
            colorScheme='teal'
            onClick={() => selectCategory(category)}
            cursor='pointer'
          >
            <TagLabel>{category}</TagLabel>
          </Tag>
        ))}
      </HStack>

      <Text fontSize={'bold'}>Thumbnail URL</Text>
      <Input name='thumbnail' value={form.thumbnail} onChange={handleChange} placeholder='Thumbnail URL' />

      <Text fontSize={'bold'}>Describe your creation</Text>
      <Input name='description' value={form.description} onChange={handleChange} placeholder='Description' />

      <Text fontSize={'bold'}>Features of your creation</Text>
      <Input name='features' value={form.features} onChange={handleChange} placeholder='Features' />

      <Text fontSize={'bold'}>Specification of your creation</Text>
      <Input name='specification' value={form.specification} onChange={handleChange} placeholder='Specification' />

      <Flex
        border='2px dashed gray'
        borderRadius='md'
        p={4}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        align='center'
        justify='center'
        direction='column'
      >
        <TbDragDrop2 size='48' />
        <Text>Drag & Drop your files here</Text>
        <Input type='file' multiple accept='.zip,.mcaddon,.mcpack,.mcskin' onChange={handleFileChange} style={{ display: 'none' }} ref={inputRef} />
        <Button onClick={() => inputRef.current.click()}>Select Files</Button>
      </Flex>

      {form.files.length > 0 && (
        <VStack align='start' mt={4}>
          <Text fontSize={'bold'}>Files to be uploaded:</Text>
          <List spacing={2}>
            {form.files.map((file, index) => (
              <ListItem key={index}>{file.name}</ListItem>
            ))}
          </List>
        </VStack>
      )}

      {error && <Text color='red.500'>{error}</Text>}

      <Button onClick={handleUpload}>Post It</Button>
    </Flex>
  );
};

export default CreationForm;
