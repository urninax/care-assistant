import * as ImagePicker from 'expo-image-picker'
import { Alert } from "react-native";
import { useContext } from "react";
import { SharedContext } from './shared-context';
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Linking } from 'react-native'

export function useProfileAvatar(){
    const { showActionSheetWithOptions } = useActionSheet();
    const { avatarUri, setAvatarUri } = useContext(SharedContext)

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
            setAvatarUri(uri);
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
            setAvatarUri(uri)
        }

    }

    const onDelete = () => {
        setAvatarUri('')
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

    const imageSource = avatarUri
        ? { uri: avatarUri }
        : require("../images/profile-pic-2.svg");


    return {
        imageSource,
        openMenu
    }
}