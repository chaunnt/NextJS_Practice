import { useEffect, memo } from "react";

const CommentsFacebook = (props) => {

  return (
    <React.Fragment>
      <div id="fb-root"></div>
      <div className="fb-customerchat"
        attribution="setup_tool"
        page_id="101522341775077"
        logged_in_greeting="Xin chào, Mình có thể giúp gì cho bạn ?"
        logged_out_greeting="Xin chào, Mình có thể giúp gì cho bạn ?"
      >
      </div>
    </React.Fragment>
  );
};

export default CommentsFacebook;
