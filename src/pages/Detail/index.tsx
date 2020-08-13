import React, {useEffect,useState} from 'react';
import { View, TouchableOpacity, Image,Text, SafeAreaView} from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { Feather as Icon,FontAwesome} from '@expo/vector-icons';
import {RectButton} from 'react-native-gesture-handler';

const Detail = () => {
    const navigation = useNavigation();

    function handleNavigateBack(){
        navigation.goBack();
    }
    return (
        <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
            <TouchableOpacity onPress={handleNavigateBack}>
                <Icon name="arrow-left" size={24} color="#34cb79"/>
            </TouchableOpacity>

            <Image style={styles.pointImage} source={{
                uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR9gf-WfOqdAGzavJxsnFkL7vye0h-I8aRgZ5pBm5h0m1S_Pt7l&usqp=CAU"
            }} width={225} height={225}/>
            <Text style={styles.pointName}>Seu Zé</Text>
            <Text style={styles.pointItems}>Eletricista</Text>
            <View style={styles.address}>
            <Text style={styles.addressTitle}>Serviços</Text>
            <Text style={styles.addressContent}>Instalações elétricas em geral</Text>

            </View>
            </View>
            <View style={styles.footer}>
            <RectButton style={styles.button} onPress={()=>{}}>
        <View style={styles.buttonText}>
         
         <FontAwesome name="whatsapp" color="#fff" size={24}/> 
         </View>
        <Text style={styles.buttonText}>Whatsapp</Text>
      
          
    </RectButton>
    <RectButton style={styles.button} onPress={()=>{}}>
        <View style={styles.buttonText}>
         
         <Icon name="mail" color="#fff" size={24}/> 
         </View>
        <Text style={styles.buttonText}>Email</Text>
      
          
    </RectButton>
            </View>

</SafeAreaView>
     
    )
};

export default Detail;