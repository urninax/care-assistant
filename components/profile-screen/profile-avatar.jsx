import { useActionSheet } from "@expo/react-native-action-sheet";
import { Platform, TouchableOpacity, Linking } from 'react-native'
import { Image } from "expo-image";
import * as ImagePicker from 'expo-image-picker'
import { useState } from "react";
import { Alert } from "react-native";

export const ProfileAvatar = ({ containerStyle, imageStyle }) => {
    const { showActionSheetWithOptions } = useActionSheet();
    const [imageUri, setImageUri] = useState('')

    const openAppSettings = () => {
        Linking.openSettings();
    }

    const onPick = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            exif: false
        });
          
        if (!result.canceled) {
            const uri = result.assets ? result.assets[0].uri : result.uri;
            setImageUri(uri);
        }
    }

    const onCamera = async () => {
        const {status, canAskAgain, granted} = await ImagePicker.requestCameraPermissionsAsync();

        console.log("Camera Permissions:", status, canAskAgain, granted)

        if (status != ImagePicker.PermissionStatus.GRANTED && !canAskAgain) {
            Alert.alert('Access needed', 'Please, grant access to the camera in settings', [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Settings', onPress: openAppSettings}
            ]);
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            cameraType: ImagePicker.CameraType.front,
            aspect: [1, 1],
            allowsEditing: true,
            exif: false
        });

        if(!result.canceled){
            const uri = result.assets ? result.assets[0].uri : result.uri;
            setImageUri(uri)
        }

    }

    const onDelete = () => {
        setImageUri('')
    }

    const openMenu = () => {
        const options = [
            'Choose from Gallery',
            'Take Photo',
            'Remove Profile Photo',
            'Cancel'
        ]
        const destructiveButtonIndex = 2
        const cancelButtonIndex = 3

        showActionSheetWithOptions(
            { options, cancelButtonIndex, destructiveButtonIndex },
            buttonIndex => {
                switch (buttonIndex) {
                    case 0: return onPick()
                    case 1: return onCamera()
                    case 2: return onDelete()
                }
            }
        )
    }

    return (
        <TouchableOpacity style={containerStyle} onPress={openMenu}>
        {imageUri ? 
            <Image 
                source={{ uri: imageUri }} 
                style={imageStyle} 
            />
            : 
            <Image 
                source={require("../../images/profile-pic-2.svg")} 
                style={imageStyle} 
            />
        }
        </TouchableOpacity>
    )
}
