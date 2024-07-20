import { Button, Flex, Input, Text, VStack, Tag, TagLabel, HStack, Image } from '@chakra-ui/react';
import React, { useState, useRef } from 'react';
import { TbDragDrop2 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { firestore, storage } from '../../firebase/firebase';
import useAuthStore from '../../store/authStore';

const CreationForm = () => {
  const authUser = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const inputRef = useRef();
  const [inputs, setInputs] = useState({
    title: '',
    category: '',
    description: '',
    features: '',
    specification: '',
    thumbnail: '',
    thumbnailFile: null,
    files: [],
    likes: [],
    dislikes: [],
    comments: [],
    createdAt: Date.now(),
    createdBy: authUser.uid,
  });
  const [error, setError] = useState('');
  const [thumbnailPreview, setThumbnailPreview] = useState('');

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.size <= 2048); // 2KB = 2048 bytes
    if (validFiles.length !== files.length) {
      setError('Some files are larger than 2KB and were not added.');
    } else {
      setError('');
    }
    setInputs({ ...inputs, files: validFiles });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInputs({ ...inputs, thumbnailFile: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const validFiles = files.filter(file => file.size <= 2048); // 2KB = 2048 bytes
    if (validFiles.length !== files.length) {
      setError('Some files are larger than 2KB and were not added.');
    } else {
      setError('');
    }
    setInputs({ ...inputs, files: validFiles });
  };

  const uploadFile = async (postId, file) => {
    const fileRef = ref(storage, `posts/${postId}/${file.name}`);
    await uploadBytes(fileRef, file);
    const filePath = `posts/${postId}/${file.name}`; // Relative path
    const fileUrl = await getDownloadURL(fileRef);
    return { filePath, fileUrl };
  };  

  const handleUpload = async () => {
    if (!authUser) {
      setError('You need to be logged in to make a post.');
      return;
    }
  
    setError('');
  
    try {
      const newContent = {
        title: inputs.title,
        category: inputs.category,
        description: inputs.description,
        features: inputs.features,
        specification: inputs.specification,
        thumbnail: '',
        files: [],
        likes: [],
        dislikes: [],
        comments: [],
        createdAt: serverTimestamp(),
        createdBy: authUser.uid,
      };
  
      const docRef = await addDoc(collection(firestore, 'posts'), newContent);
      const postId = docRef.id;
  
      let thumbnailURL = '';
      if (inputs.thumbnailFile) {
        const thumbnailRef = ref(storage, `posts/${postId}/${postId}.thumbnail`);
        await uploadBytes(thumbnailRef, inputs.thumbnailFile);
        thumbnailURL = await getDownloadURL(thumbnailRef);
      }
  
      const filePaths = [];
      for (const file of inputs.files) {
        const fileRef = ref(storage, `posts/${postId}/${file.name}`);
        await uploadBytes(fileRef, file);
        filePaths.push(`posts/${postId}/${file.name}`);
      }
  
      await updateDoc(doc(firestore, 'posts', postId), { 
        thumbnail: thumbnailURL, 
        files: filePaths 
      });
  
      navigate(`/post/${postId}`);
    } catch (error) {
      console.error('Error uploading post:', error);
      setError('Failed to upload post. Please try again.');
    }
  };
  

  const selectCategory = (category) => {
    setInputs({ ...inputs, category });
  };

  return (
    <Flex direction={'column'} gap={2}>
      <Text fontSize={'bold'}>Title of your creation</Text>
      <Input name='title' value={inputs.title} onChange={handleChange} placeholder='Title' />
      <Text fontSize={'bold'}>Category</Text>
      <HStack spacing={4}>
        {['Addon', 'World', 'Skin', 'Server'].map((category) => (
          <Tag
            size={'md'}
            key={category}
            borderRadius='full'
            variant={inputs.category === category ? 'solid' : 'outline'}
            colorScheme='teal'
            onClick={() => selectCategory(category)}
            cursor='pointer'
          >
            <TagLabel>{category}</TagLabel>
          </Tag>
        ))}
      </HStack>

      <Text fontSize={'bold'}>Thumbnail</Text>
      <Input type='file' accept='image/*' onChange={handleThumbnailChange} />
      {thumbnailPreview && (
        <Image src={thumbnailPreview} alt='Thumbnail Preview'
          minW="340px"
          minH="180px"
          maxW="340px"
          maxH="180px" borderRadius={'md'} mt={2} />
      )}

      <Text fontSize={'bold'}>Describe your creation</Text>
      <Input name='description' value={inputs.description} onChange={handleChange} placeholder='Description' />

      <Text fontSize={'bold'}>Features of your creation</Text>
      <Input name='features' value={inputs.features} onChange={handleChange} placeholder='Features' />

      <Text fontSize={'bold'}>Specification of your creation</Text>
      <Input name='specification' value={inputs.specification} onChange={handleChange} placeholder='Specification' />

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

      {inputs.files.length > 0 && (
        <VStack align='start' mt={4}>
          <Text fontSize={'bold'}>Files to be uploaded:</Text>
          {inputs.files.map((file, index) => (
            <Text key={index}>{file.name}</Text>
          ))}
        </VStack>
      )}

      {error && <Text color='red.500'>{error}</Text>}

      <Button onClick={handleUpload}>Post It</Button>
    </Flex>
  );
};

export default CreationForm;
