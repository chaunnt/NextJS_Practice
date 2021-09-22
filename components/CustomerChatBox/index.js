import React from 'react';
import { fb } from '../../utils/fb';

class CustomerChat extends React.PureComponent {
  componentDidMount() {
    this.timeout = setTimeout(() => {
      fb(FB => this.timeout && FB.XFBML.parse());
    }, 2000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    delete this.timeout;
  }

  render() {
    return (
      // 100641361527939 , 111527927224117, 584290798338084
      <div
        className="fb-customerchat"
        attribution="setup_tool"
        page_id={"101522341775077"}
        logged_in_greeting="Xin chào, Mình có thể giúp gì cho bạn ?"
        logged_out_greeting="Xin chào, Mình có thể giúp gì cho bạn ?"
        // theme_color="..."
        // logged_in_greeting="..."
        // logged_out_greeting="..."
        greeting_dialog_display="hide"

      // minimized="false"
      // ref="..."
      />

    );
  }
}

export default CustomerChat;