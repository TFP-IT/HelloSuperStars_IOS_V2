import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import ApplyCertificateModal from '../../MODAL/ApplyCertificateModal';

const RequestPending = ({apply, setApply}) => {
    const [show, setShow] = useState(false);
  return (
    <>
    <TouchableOpacity
     onPress={() => setShow(true)}
     >
        <LinearGradient colors={['#FFAD00', '#E19A04' , '#FACF75' ]} style={styles.CardA}>
            <Text style={styles.CardTex}>Apply for the certificate</Text>
        </LinearGradient>
    </TouchableOpacity>
    <ApplyCertificateModal show={show} setShow={setShow} apply={apply} setApply={setApply} />
    </>
  )
}

export default RequestPending 