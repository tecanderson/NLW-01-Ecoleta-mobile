import React, { useState,useEffect} from 'react';
import { View, Text ,Image, Alert} from 'react-native';
import styles from './styles';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import {Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import {SvgUri} from 'react-native-svg';
import api from '../../services/api';
import * as Location from 'expo-location';

interface Item{
    id:number,
    title:string,
    image_url:string

}
interface Points{
    id:number,
    image:string,
    name:string,
    latitude:number,
    longitude:number,
   
}

const Points = () => {
    const [itens,setItens]=useState<Item[]>([]);
    const [selectedItems,setSelectedItems]=useState<number[]>([]);
    const [points,setPoints]=useState<Points[]>([]);
    const [initialPosition, setInitialPosition] = useState<[number,number]>([0,0]);
    function handeleSelectedItem(id:number){
        const alreadySelected = selectedItems.findIndex(item => item === id );

        if(alreadySelected>=0)
        {
            const filtredItems = selectedItems.filter( item => item !== id);
            setSelectedItems(filtredItems);
        }else{
            setSelectedItems([...selectedItems,id]);
        }
       
    }
    useEffect(()=>{
async function loadPosicion(){
    const { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted'){
        Alert.alert('Oooops','Precisamos de sua permissão para obter a localização');
        return;

        
    }
    const location = await Location.getCurrentPositionAsync();
        const {longitude,latitude} = location.coords;
        
        setInitialPosition([latitude,longitude]);


}
loadPosicion();

    },[]);

    useEffect(()=>{
        api.get('points/',{
            params:{
                city:"Ilheus",
                uf:"BA",
                items:[2,1]

            }
        }).then(response=>{
                setPoints(response.data);
        })
    },[])
    useEffect(()=>{
        api.get('itens').then(response=>{
            setItens(response.data);
        });
    },[]); 
    const navigation = useNavigation();
    function handleNavigateBack(){
        navigation.goBack();
    }
    function handleNavigateToDetail(){
        navigation.navigate('Detail');
    }

    return (
        <>
        <View style={styles.container}>
            
            <TouchableOpacity  onPress={handleNavigateBack} >
           
            <Icon name="arrow-left" size={24} color="#34cb79" />
            <Text style={styles.title}>Bem Vindo.</Text>
              
            </TouchableOpacity>
            <Text style={styles.description}>Encontre no mapa um prestador de serviço.</Text>
            
            <View style={styles.mapContainer}>
                {initialPosition[0] !== 0 && (
                    <MapView style={styles.map}
                    initialRegion={{
         latitude:initialPosition[0],
         longitude:initialPosition[1],
         latitudeDelta:0.0014,
         longitudeDelta:0.0014
     }}
     >
       {
           points.map(
               point =>(
                <Marker 
                key={point.id}
                coordinate={{
                    latitude:point.latitude,
                    longitude:point.longitude,
         
                }}
                style={styles.mapMarker}  
                onPress={handleNavigateToDetail}
                >
                    <View style={styles.mapMarkerContainer}>
                    <Image source={{
                        uri:point.image
                    }} style={styles.mapMarkerImage}
                    width={48} height={48}
                    />
                    <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                    </View>
                </Marker>
               )
           )
       }

     </MapView>
                )}
            </View>
            
        </View>
        <View style={styles.itemsContainer}>
            <ScrollView horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal:20}}
            >
            {
                itens.map(item=>(
                    <TouchableOpacity key={String(item.id)} 
                    style={[styles.item,selectedItems.includes(item.id)?styles.selectedItem:{}]} 
                    onPress={()=>handeleSelectedItem(item.id)}
                    activeOpacity={0.6}
                    >
                    <SvgUri width={32} height={32} uri={item.image_url} />
                <Text style={styles.itemTitle}>{item.title}</Text>
                    </TouchableOpacity> 
                ))
            }
            
            </ScrollView>
        </View>

     </>
    )
};

export default Points;