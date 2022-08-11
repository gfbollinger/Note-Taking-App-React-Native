import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Layout, MenuItem, OverflowMenu, Icon } from '@ui-kitten/components';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import Loading from './UI/Loading';
import AvatarImg from '../assets/img/avatar.png'

const MenuIcon = (props) => (
  <Icon {...props} name='menu-outline'/>
);

const MenuNavigation = ({navigation, archiveAllNotes}) => {

  const [visible, setVisible] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  const onItemSelect = (index) => {
    setSelectedIndex(index);
    setVisible(false);
    /* console.log(index) */
    if (index.row === 0 ){
      navigation.navigate('About')
    } 
    else if (index.row === 1){
      archiveAllNotes()
    }
    /* else if (index.row === 1){

    } */
  };

  const onUsersPress = ({ index }) => {
    setSelectedTitle('Users');
    setVisible(false);
    /* navigation.navigate('AddNote') */
  };

  const renderToggleButton = () => (
    <View style={styles.buttonContainer}>
      <Image source={AvatarImg} style={styles.avatar}></Image>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={styles.menuButton}
        /* title="MENU" */
      >
        <Icon name="more-vertical-outline" fill="#111" style={{width: 27, height: 27 }} />
      </TouchableOpacity>
    </View>
  );

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <Layout style={styles.OverflowMenuContainer} level='1'>
      <OverflowMenu style={styles.overflowMenu}
        anchor={renderToggleButton}
        backdropStyle={styles.backdrop}
        visible={visible}
        selectedIndex={selectedIndex}
        onSelect={onItemSelect}
        onBackdropPress={() => setVisible(false)}
        /* placement="bottom end" */
      >
        <MenuItem title='About'/>
        <MenuItem title='Archive All Notes'/>

      </OverflowMenu>
    </Layout>
  );
};

export default MenuNavigation

const styles = StyleSheet.create({
  OverflowMenuContainer: {
    position: "relative"
  },
  overflowMenu: {
    position:"absolute",
    right: -25,
    top: 20
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttonContainer:{
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 5,
  },
  menuButton: {}
});