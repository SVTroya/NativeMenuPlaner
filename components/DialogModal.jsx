import React from 'react'
import {Modal, Text, View} from 'react-native'
import CustomButton from './CustomButton'

function DialogModal({isVisible, dialogText, confirmButtonName, cancelButtonName, handleConfirm, handleCancel}) {

 return (
  <Modal
    animationType='fade'
    transparent={true}
    visible={isVisible}
    onRequestClose={() => {}}
  >
    <View className='flex-1 justify-center items-center p-4 bg-backdrop' >
      <View className='w-full flex items-center gap-4 p-4 rounded-xl bg-primary shadow-black shadow-xl'>
        <Text className='text-xl'>{dialogText}</Text>
        <View className='flex flex-row gap-6'>
          <CustomButton
            title={confirmButtonName ? confirmButtonName : 'Ok'}
            handlePress={() => handleConfirm()}
            containerStyles='px-4 min-w-20 rounded-3xl'
          />
          <CustomButton
            title={cancelButtonName ? cancelButtonName : 'Cancel'}
            handlePress={() => handleCancel()}
            containerStyles='px-4 min-w-20 h-4'
          />
        </View>
      </View>
    </View>
  </Modal>
 )}

export default DialogModal