import * as React from "react";
import { useState, useEffect, useRef, useContext } from "react";

//Style
import "./StyleTabComponents/ActionAdsStyle.css";

import { IP } from "../../../../App.jsx";
import axios from "axios";
import AuthContext from "../../../../AuthService.jsx";
import { LinearColor } from "../../HistoryBuyComp/HistoryBuyComponent.jsx";

//Mui Components

//MUI Icons
import InfoIcon from "@mui/icons-material/Info";
import ErrorIcon from "@mui/icons-material/Error";

//Manual Components
import {
  successMessage,
  errorMessage,
  defaultMessage,
  infoMessage,
  warningMessage,
} from "../../../Toast/ToastCustom";

function ActiveAds() {
  const [information, setInformation] = useState(undefined);

  if (information === undefined) {
    return <LinearColor />;
  }
  return <div></div>;
}

export default ActiveAds;
