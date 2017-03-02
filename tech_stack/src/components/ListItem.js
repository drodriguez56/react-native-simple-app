import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation
} from 'react-native';
import { CardSection } from './common';
import * as actions from '../actions';

class ListItem extends Component {
  componentWillUpdate(){
    LayoutAnimation.easeInEaseOut();
  }
    
  renderDescription(){
    const { item, expanded } = this.props;
    if (expanded) {
      return (
          <CardSection>
            <Text style={styles.descriptionStyle}>{item.description}</Text>
          </CardSection>
        );
    }
  }

  render(){
    const { title, description, id } = this.props.item;
    const { titleStyle } = styles;

    return(
      <TouchableWithoutFeedback onPress={() => this.props.selectLibrary(id)}>
        <View>
          <CardSection >
            <Text style={titleStyle}>{title}</Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const expanded = ownProps.item.id === state.selectedLibraryId; 

  return { expanded };
}
const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  },
  descriptionStyle: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15
  }
}

export default connect(mapStateToProps, actions )(ListItem);
