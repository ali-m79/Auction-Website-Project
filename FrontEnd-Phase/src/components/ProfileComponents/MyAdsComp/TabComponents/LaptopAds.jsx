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

function LaptopAds() {
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
          <Chip label="ایجاد مزایده در دسته لپتاپ" size="small" />
        </Divider>
      </Root>
    </Grid>
  );
}

export default LaptopAds;
const laptopInfo = {
  processor_options: [
    { id: 1, value: "intel_i3", name: "Intel Core i3" },
    { id: 2, value: "intel_i5", name: "Intel Core i5" },
    { id: 3, value: "intel_i7", name: "Intel Core i7" },
    { id: 4, value: "intel_i9", name: "Intel Core i9" },
    { id: 5, value: "amd_ryzen3", name: "AMD Ryzen 3" },
    { id: 6, value: "amd_ryzen5", name: "AMD Ryzen 5" },
    { id: 7, value: "amd_ryzen7", name: "AMD Ryzen 7" },
    { id: 8, value: "amd_ryzen9", name: "AMD Ryzen 9" },
    { id: 9, value: "other", name: "Other" },
  ],
  display_size_options: [
    { id: 1, value: "13inch", name: "13 inches" },
    { id: 2, value: "15inch", name: "15 inches" },
    { id: 3, value: "17inch", name: "17 inches" },
    { id: 4, value: "other", name: "Other" },
  ],
  operating_system_options: [
    { id: 1, value: "windows10", name: "Windows 10" },
    { id: 2, value: "windows11", name: "Windows 11" },
    { id: 3, value: "macos", name: "macOS" },
    { id: 4, value: "linux", name: "Linux" },
    { id: 5, value: "chromeos", name: "Chrome OS" },
    { id: 6, value: "other", name: "Other" },
  ],
  ram_options: [
    { id: 1, value: "4gb", name: "4 GB" },
    { id: 2, value: "8gb", name: "8 GB" },
    { id: 3, value: "16gb", name: "16 GB" },
    { id: 4, value: "32gb", name: "32 GB" },
    { id: 5, value: "64gb", name: "64 GB" },
    { id: 6, value: "other", name: "Other" },
  ],
  storage_options: [
    { id: 1, value: "128gb_ssd", name: "128 GB SSD" },
    { id: 2, value: "256gb_ssd", name: "256 GB SSD" },
    { id: 3, value: "512gb_ssd", name: "512 GB SSD" },
    { id: 4, value: "1tb_ssd", name: "1 TB SSD" },
    { id: 5, value: "1tb_hdd", name: "1 TB HDD" },
    { id: 6, value: "2tb_hdd", name: "2 TB HDD" },
    { id: 7, value: "other", name: "Other" },
  ],
  gpu_options: [
    { id: 1, value: "nvidia_gtx1650", name: "NVIDIA GTX 1650" },
    { id: 2, value: "nvidia_rtx3060", name: "NVIDIA RTX 3060" },
    { id: 3, value: "nvidia_rtx3070", name: "NVIDIA RTX 3070" },
    { id: 4, value: "nvidia_rtx3080", name: "NVIDIA RTX 3080" },
    { id: 5, value: "amd_rx5600m", name: "AMD RX 5600M" },
    { id: 6, value: "amd_rx5700m", name: "AMD RX 5700M" },
    { id: 7, value: "amd_rx6800m", name: "AMD RX 6800M" },
    { id: 8, value: "other", name: "Other" },
  ],
  brand_options: [
    { id: 1, value: "apple", name: "Apple" },
    { id: 2, value: "hp", name: "HP" },
    { id: 3, value: "dell", name: "Dell" },
    { id: 4, value: "lenovo", name: "Lenovo" },
    { id: 5, value: "asus", name: "Asus" },
    { id: 6, value: "acer", name: "Acer" },
    { id: 7, value: "msi", name: "MSI" },
    { id: 8, value: "huawei", name: "Huawei" },
    { id: 9, value: "surface", name: "Microsoft Surface" },
    { id: 10, value: "other", name: "Other" },
  ],
};
