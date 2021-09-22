import React from 'react';

const ContactPage = (props) => {
  return (
    <div className="contact">
      <a title="Liên hệ Zalo" className="contact__facebook" target="_blank" href="https://zalo.me/1525463065982785123">
        <img src="https://cdn.tgdd.vn/Files/2020/07/21/1272550/unnamed_800x480.png"loading="eager" />
      </a>
      <a title="Liên hệ facebook" className="contact__zalo" target="_blank" href="http://m.me/Hodace.Network">
        <img src="https://www.nexusmediaworks.com/wp-content/uploads/2017/09/media.png" loading="eager" />
      </a>
      <a title="Gọi Điện"className="contact__phone" target="_blank" href="tel:0343902960">
        <img src="https://w7.pngwing.com/pngs/69/409/png-transparent-iphone-computer-icons-telephone-call-phone-electronics-leaf-text.png" loading="eager" />
      </a>
    </div>
  );
};

export default ContactPage;
