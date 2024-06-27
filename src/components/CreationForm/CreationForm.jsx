import { Button, Flex, Input, Text, VStack } from '@chakra-ui/react';
import React, { useState, useRef } from 'react';
import { TbDragDrop2 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

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
    files: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, thumbnail: e.target.value });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files).map(file => URL.createObjectURL(file));
    setForm({ ...form, files });
  };

  const handleUpload = () => {
    const data = JSON.parse(localStorage.getItem('contents')) || [];
    const newContent = {
      ...form,
      id: uuidv4(), // Generate a unique ID
      date: new Date().toLocaleDateString(),
    };
    data.push(newContent);
    localStorage.setItem('contents', JSON.stringify(data));
    navigate(`/post/${newContent.id}`);
  };

  return (
    <Flex direction={'column'} gap={2}>
      <Text fontSize={'bold'}>Title of your creation</Text>
      <Input name='title' value={form.title} onChange={handleChange} placeholder='Title' />

      <Text fontSize={'bold'}>Category of your creation</Text>
      <Flex gap={2}>
        <Button w={'full'} onClick={() => setForm({ ...form, category: 'Addon' })}>Addon</Button>
        <Button w={'full'} onClick={() => setForm({ ...form, category: 'World' })}>World</Button>
        <Button w={'full'} onClick={() => setForm({ ...form, category: 'Skin' })}>Skin</Button>
      </Flex>

      <Text fontSize={'bold'}>Thumbnail URL</Text>
      <Input name='thumbnail' value={form.thumbnail} onChange={handleFileChange} placeholder='Thumbnail URL' />

      <Text fontSize={'bold'}>Describe your creation</Text>
      <Input name='description' value={form.description} onChange={handleChange} placeholder='Description' />

      <Text fontSize={'bold'}>Features of your creation</Text>
      <Input name='features' value={form.features} onChange={handleChange} placeholder='Features' />

      <Text fontSize={'bold'}>Specification your creation</Text>
      <Input name='specification' value={form.specification} onChange={handleChange} placeholder='Specification' />

      <Button onClick={handleUpload}>Post It</Button>
    </Flex>
  );
};

export default CreationForm;
