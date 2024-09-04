import React from 'react';
import "../../layout.scss";
const FooterBottom = () => {
  return (
    <>
    <div className="footer-bottom">
      <div className="secure-logo p-2" style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          <img src="https://wver.sprintstaticdata.com/v3/static/front/img/ssl.png" alt="SSL Logo" />
        </div>
        <div style={{ marginLeft: '8px' }}>
          <b>100% SAFE</b>
          <div>Protected connection and encrypted data.</div>
        </div>
      </div>
      <div style={{ display: 'inline-block' }}>
        <button className="btn" style={{ padding: 0, border: 'none', background: 'none' }}>
          <img src="https://versionobj.ecoassetsservice.com/v16/static/front/img/18plus.png" alt="18+ Logo" />
        </button>
        <a href="https://www.gamcare.org.uk/" target="_blank" rel="noopener noreferrer">
          <img src="https://versionobj.ecoassetsservice.com/v16/static/front/img/gamecare.png" alt="GamCare Logo" />
        </a>
        <a href="https://www.gamblingtherapy.org/" target="_blank" rel="noopener noreferrer">
          <img src="https://versionobj.ecoassetsservice.com/v16/static/front/img/gt.png" alt="Gambling Therapy Logo" />
        </a>
      </div>
    </div>
    <div className="footer-text"><p></p><p className="text-center">© Copyright 2024. All Rights Reserved. Powered by MAXBET07.</p></div>
    </>
  );
};

export default FooterBottom;
