import React from 'react';
import {
    ListView, Text, Row, Image,
    View, Subtitle, Caption, Heading
} from '@shoutem/ui';

// const Message = ({ msg }) => (
//     <Row>
//         {/* <Image
//           styleName="small-avatar top"
//           source={{ uri: msg.author.avatar }}
//         /> */}
//         <View styleName="vertical">
//             <Text styleName="multiline">{msg.message}</Text>
//         </View>
//     </Row>
// );
function renderRow(data) {
  return (
    <Row>
        {/* <Image
          styleName="small-avatar top"
          source={{ uri: msg.author.avatar }}
        /> */}
        <View styleName="vertical">
            <Text styleName="multiline">{data.message}</Text>
        </View>
    </Row>
  );
}

export default function () {
  console.log('Messages Render ====>>>', this.props);
  return (
    <View>
      <ListView
        data={() => this.props.messages}
        autoHideHeader={() => true}
        renderRow={renderRow}
      />
    </View>
  );
}
