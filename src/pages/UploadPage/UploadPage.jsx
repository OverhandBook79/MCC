import { Flex, VStack } from '@chakra-ui/react'
import CreationForm from '../../components/CreationForm/CreationForm';

const UploadPage = () => {
  return (
    <>
    <Flex direction={'column'} p={2}>
    <CreationForm/>
    </Flex>
    </>
  )
}

export default UploadPage