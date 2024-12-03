import React, {useEffect, useState} from 'react'
import {View, Modal, Alert} from 'react-native'
import FormField from './FormField'
import CustomButton from './CustomButton'

function ItemModal({name, isVisible, handleAdd, handleChange, handleClose, initialValue, index}) {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  function handleConfirm() {
    if (!value.trim()) Alert.alert('Empty value', `${name} can't be empty!`)
    else {
      initialValue ? handleChange(value.trim(), index) : handleAdd(value.trim())
      handleClose()
      setValue('')
    }
  }

 return (
   <Modal
     animationType='fade'
     transparent={true}
     visible={isVisible}
     onRequestClose={() => {handleClose()}}
   >
     <View className='flex-1 justify-center items-center p-4 bg-backdrop' >
       <View className='w-full flex gap-4 p-4 rounded-xl bg-primary shadow-black shadow-xl'>
         <FormField
           title={null}
           value={value}
           placeholder={name}
           fieldStyles='h-36'
           multiline={true}
           handleChangeValue={(e) => setValue(e)}/>
         <CustomButton
           title={initialValue ? 'Change' : 'Add'}
           handlePress={() => handleConfirm()}
         />
         <CustomButton
           title='Cancel'
           handlePress={() => handleClose()}
         />
       </View>
     </View>
   </Modal>
 )}

export default ItemModal