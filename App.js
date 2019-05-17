
import React,{ Component } from 'react'
import { View, Text, StyleSheet, Linking } from 'react-native';
import { Permissions, Contacts } from 'expo'; 
export default class App extends React.Component{
  constructor(){
    super();
    this.state = {
      status: null,
    }
  }
  permissionFlowContact = async () => {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    this.setState({ status });

    if(status !=='granted'){
      Linking.openURL('app-settings:');
    }
    const { data } = await ContactsDisplay.getContactsAsync({ pageSize: 1});
  };

  permissionFlowCalender = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ status });

    if(status !=='granted'){
      Linking.openURL('app-settings:');
      return;
    }
    const { data } = await ContactsDisplay.getContactsAsync({ pageSize: 1});
    
  }
  render(){
    return(
      <View>
        <Text style={styles.permissionStyle} onPress={this.permissionFlowContact} > Contacts</Text>
        <Text style={styles.permissionStyle} onPress={this.permissionFlowCalender} > Camera </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  permissionStyle: {
    marginTop: 200,
    marginLeft: 200
  }
})
