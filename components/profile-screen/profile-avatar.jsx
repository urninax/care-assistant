import { TouchableOpacity } from 'react-native'
import { Image } from "expo-image";
import { useProfileAvatar } from "../../utils/useProfileAvatar";

export const ProfileAvatar = ({ containerStyle, imageStyle }) => {
const { imageSource, openMenu } = useProfileAvatar();

    return (
        <TouchableOpacity style={containerStyle} onPress={openMenu}>
            <Image source={imageSource} style={imageStyle} />
        {/* {avatarUri ? 
            <Image 
                source={{ uri: avatarUri }} 
                style={imageStyle} 
            />
            : 
            <Image 
                source={require("../../images/profile-pic-2.svg")} 
                style={imageStyle} 
            />
        } */}
        </TouchableOpacity>
    )
}
