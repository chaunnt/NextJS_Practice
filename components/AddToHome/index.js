import * as React from "react";
import { useAddToHomescreenPrompt } from "./useAddToHomescreenPrompt";
import Modal from '@material-ui/core/Modal';

export default function ExampleComponent() {
  const [prompt, promptToInstall] = useAddToHomescreenPrompt();
  const [isVisible, setVisibleState] = React.useState(false);

  const hide = () => setVisibleState(false);

  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();

    return /iphone|ipad|ipod/.test(userAgent);
  }
  // Detects if device is in standalone mode
  const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);


  React.useEffect(
    () => {
      // Checks if should display install popup notification:
      // || (isIos() && !isInStandaloneMode())
      if (prompt) {
        setVisibleState(true);
      }

    },
    [prompt]
  );


  if (!isVisible) {
    return <div />;
  }

  return (
    <Modal
      open={true}
      onClose={hide}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={{
        position: 'absolute',
        width: 400,
        backgroundColor: '#fff',
        borderRadius: 20,
        left: '50%',
        top: '45%',
        marginLeft: '-200px',
        height: '150px',

        padding: '20px'
      }}>
        Xin chào! , Bạn có muốn thêm Hodace vào màn hình trang chủ?
        <div style={{ textAlign: 'center', width: '100%' }}>
          <button style={{ height: "30px", lineHeight: 'unset', marginTop: '10px' }} className="btn" onClick={promptToInstall}>Thêm</button>
          {/* {!(isIos() && !isInStandaloneMode()) ? <button style={{ height: "30px", lineHeight: 'unset', marginTop: '10px' }} className="btn" onClick={promptToInstall}>Thêm</button> : <div>
            Nhấn vào
                        <img
              src={'/static/images/AppleShare.png'}
              style={{ margin: "auto 4px 8px" }}
              className="uk-display-inline-block"
              alt="Add to homescreen"
              height="20"
              width="20"
            />
            &quot;Add to Home Screen&quot;</div>} */}
        </div>
      </div>
    </Modal>

  );
}