import * as React from "react";
import { useState, useEffect, useRef, useContext } from "react";

//Style
import "./StyleTabComponents/AddAdsStyle.css";

import { IP } from "../../../../App.jsx";
import axios from "axios";
import AuthContext from "../../../../AuthService.jsx";
import { LinearColor } from "../../HistoryBuyComp/HistoryBuyComponent.jsx";

//Mui Components
import { Grid, Divider, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";

//MUI Icons
import InfoIcon from "@mui/icons-material/Info";
import ErrorIcon from "@mui/icons-material/Error";

//Manual Components
import { ChipAndContent } from "../../PersonalInformation/PersonalInfoComp.jsx";
import {
  successMessage,
  errorMessage,
  defaultMessage,
  infoMessage,
  warningMessage,
} from "../../../Toast/ToastCustom";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));
function ConsoleAds() {
  return (
    <Grid
      item
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        gap: { xs: "10px" },
        padding: { xs: "2px", sm: "4px", md: "6px", lg: "8px", xl: "10px" },
      }}
      className="main-parent-ads"
      xs={12}
      sm={10}
      md={8}
      lg={6}
      xl={5}
    >
      <Root>
        <Divider className="custome_divider">
          <Chip label="ایجاد مزایده در دسته کنسول بازی" size="small" />
        </Divider>
      </Root>
    </Grid>
  );
}

export default ConsoleAds;

const consoleInfo = {
  manufacturer_options: [
    { id: 1, value: "sony", name: "Sony" },
    { id: 2, value: "microsoft", name: "Microsoft" },
    { id: 3, value: "nintendo", name: "Nintendo" },
    { id: 4, value: "other", name: "Other" },
  ],
  console_type_options: [
    { id: 1, value: "playstation", name: "PlayStation" },
    { id: 2, value: "xbox", name: "Xbox" },
    { id: 3, value: "nintendo_switch", name: "Nintendo Switch" },
    { id: 4, value: "other", name: "Other" },
  ],
  storage_options: [
    { id: 1, value: "500gb", name: "500 GB" },
    { id: 2, value: "1tb", name: "1 TB" },
    { id: 3, value: "2tb", name: "2 TB" },
    { id: 4, value: "4tb", name: "4 TB" },
    { id: 5, value: "other", name: "Other" },
  ],
  resolution_options: [
    { id: 1, value: "1080p", name: "1080p Full HD" },
    { id: 2, value: "4k", name: "4K Ultra HD" },
    { id: 3, value: "other", name: "Other" },
  ],
  gpu_options: [
    { id: 1, value: "amd_rx5700", name: "AMD RX 5700" },
    { id: 2, value: "nvidia_rtx2060", name: "NVIDIA RTX 2060" },
    { id: 3, value: "amd_rdna2", name: "AMD RDNA 2" },
    { id: 4, value: "nvidia_ampere", name: "NVIDIA Ampere" },
    { id: 5, value: "other", name: "Other" },
  ],
  ram_options: [
    { id: 1, value: "8gb", name: "8 GB" },
    { id: 2, value: "16gb", name: "16 GB" },
    { id: 3, value: "32gb", name: "32 GB" },
    { id: 4, value: "64gb", name: "64 GB" },
    { id: 5, value: "other", name: "Other" },
  ],
  region_options: [
    { id: 1, value: "north_america", name: "North America" },
    { id: 2, value: "europe", name: "Europe" },
    { id: 3, value: "asia", name: "Asia" },
    { id: 4, value: "other", name: "Other" },
  ],
  controller_options: [
    { id: 1, value: "1_controller", name: "1 Controller" },
    { id: 2, value: "2_controllers", name: "2 Controllers" },
    { id: 3, value: "3_controllers", name: "3 Controllers" },
    { id: 4, value: "4_controllers", name: "4 Controllers" },
    { id: 5, value: "other", name: "Other" },
  ],
  generation_options: [
    { id: 1, value: "gen_8", name: "8th Generation" },
    { id: 2, value: "gen_9", name: "9th Generation" },
    { id: 3, value: "gen_10", name: "10th Generation" },
    { id: 4, value: "gen_11", name: "11th Generation" },
    { id: 5, value: "other", name: "Other" },
  ],
};
