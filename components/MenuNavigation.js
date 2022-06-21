import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Layout, MenuItem, OverflowMenu, Icon, Spinner } from '@ui-kitten/components';

const MenuIcon = (props) => (
  <Icon {...props} name='menu-outline'/>
);

const MenuNavigation = ({navigation}) => {

  const [visible, setVisible] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const onItemSelect = (index) => {
    setSelectedIndex(index);
    setVisible(false);
    console.log(index)
    if (index.row === 0 ){
      navigation.navigate('About')
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
      <Button
        /* appearance='ghost'
        status='primary'
        accessoryRight={MenuIcon} */
        onPress={() => setVisible(true)}
        style={styles.menuButton}
        /* size='large' */
        title="MENU"
      >
      </Button>
    </View>
  );

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
        <MenuItem title='(No link)'/>

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
    paddingRight: 20
  },
  menuButton: {}
});