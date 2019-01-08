import React from 'react';
import { Button, Image, View } from 'react-native';
import { ImagePicker,Permissions } from 'expo';

export default class ImagePcker extends React.Component {
  state = {
    image: null,
  };

  registerForImagePermission = async() => {
    //Check for existing Permissions
    const {status} = await Permissions.getAsync(Permissions.CAMERA_ROLL,Permissions.CAMERA);
    let finalStatus = status;

    //If no existing permission, ask user for Permissions
    if(status != 'granted') {
      const {status} = Permissions.askAsync(Permissions.CAMERA_ROLL,Permissions.CAMERA);
      finalStatus = status;
    }

    //if no permission , exit the function
    if(finalStatus != 'granted'){return;}
  }

  componentWillMount() {
    this.registerForImagePermission();
  }

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}
