import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, FlatList , Alert} from "react-native";
import Participant from "../../components/Participant";

import { styles } from "./styles";

export default function Home() {
    const [participants, setParticipants] = useState<string[]>([]);
    const [name, setName] = useState<string>("");
    
    const handleParticipantAdd = () => {
        if(participants.includes(name)) {
            return Alert.alert("Participante existe", `Já existe participante ${name}`);
        }

        setParticipants([...participants, name]);
    }

    const handleParticipantRemove = (name: string) => {
        console.log(`Participant removed ${name}`);

        Alert.alert("Participante removido", `Participante ${name} removido`, [
            { 
                text: "Sim", 
                onPress: () => setParticipants(participants.filter(p => p !== name)) 
            },
            { text: "Não" }
        ]);
    }

    return (
      <View style={styles.container}>
        <Text style={ styles.title }>Nome do evento</Text>
  
        <Text style={ styles.subtitle }>Sexta, 4 de Novembro de 2022</Text>
        
        <View style={styles.form}>
            <TextInput 
                style={ styles.input } 
                placeholder="Digite o nome do participante" 
                placeholderTextColor="#6B6B6B"
                onChangeText={text => setName(text)}
            />

            <TouchableOpacity style={ styles.button } onPress={handleParticipantAdd}>
                <Text style={ styles.buttonText }>
                    +
                </Text>
            </TouchableOpacity>
        </View>

        <FlatList
            data={participants}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
                <Participant 
                    key={item} 
                    name={item} 
                    onRemove={()=>handleParticipantRemove(item)} 
                />
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
                <Text style={styles.emptyText}>
                    Nenhum participante cadastrado!
                </Text>
            )}
            
        />
      </View>
    );
  }