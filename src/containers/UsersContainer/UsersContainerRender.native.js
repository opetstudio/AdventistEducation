import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  SectionList
} from 'react-native';
// import PropTypes from 'prop-types';
// import { fetchData } from '../../../actions/fetchData';
import UsersList from '../../components/UsersList/UsersList';

export default function () {
    return (
      <View>
        <Text>Members Page Desktop/Web</Text>
        <TouchableHighlight style={styles.button} onPress={() => { this._onPressButton(); }}>
          <Text style={styles.buttonText}>Load Data</Text>
        </TouchableHighlight>
        <UsersList title="Users">
          <SectionList
            sections={[
              { title: 'D', data: this.props.users.data },
              {
                title: 'J', data: this.props.users.data
              },
            ]}
            renderItem={({ item }) => <Text style={styles.item}>{item.name} ({item.age})</Text>}
            renderSectionHeader={
              ({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          />
          {
            // this.props.users.data.length ?
            // (
            //   this.props.users.data.map(
            //     (person, i) => (
            //       <View key={i} >
            //         <Text>Name: {person.name}</Text>
            //         <Text>Age: {person.age}</Text>
            //       </View>
            //     )
            //   )
            // ) : null
          }
        </UsersList>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100
  },
  text: {
    textAlign: 'center'
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)'
  },
  button: {
    height: 60,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b7eff'
  },
  buttonText: {
    color: 'white'
  },
  mainContent: {
    margin: 10,
  }
});


// UsersContainerRender.propTypes = {
//   users: PropTypes.arrayOf(PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     age: PropTypes.number.isRequired
//   })).isRequired
// };

// export default UsersContainerRender;
