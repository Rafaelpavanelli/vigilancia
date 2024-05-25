import {
  Button,
  ButtonText,
  Center,
  Heading,
  Modal,
  ModalBackdrop,
  ModalCloseButton,
  ModalHeader,
} from '@gluestack-ui/themed'
import { useRef, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'

export function RegisterNeighborhoodModal() {
  const [showModal, setShowModal] = useState(false)
  const ref = useRef(null)
  return (
    <Center height={300}>
      <Button onPress={() => setShowModal(true)} ref={ref}>
        <ButtonText>Cadastrar Bairro</ButtonText>
      </Button>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        finalFocusRef={ref}
      >
        <ModalBackdrop />
        <ModalHeader>
          <Heading>Cadastrar Bairro</Heading>
          <ModalCloseButton>
            <AntDesign name="closecircleo" size={24} color="black" />
          </ModalCloseButton>
        </ModalHeader>
      </Modal>
    </Center>
  )
}
