import { SxProps } from "@mui/material/styles";

export const containerStyles: SxProps = {
  my: 2,
  height: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
};

export const headerStyles: SxProps = {
  height: 45,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  background: "#2C2C2C",
};

export const typographyTitle: SxProps = {
  fontFamily: "Ubuntu",
  fontSize: 18,
  fontWeight: 700,
  letterSpacing: "0em",
  textAlign: "center",
  color: "#FFFFFF",
};

export const cardStyles: SxProps = {
  my: 1,
  width: 700,
  borderRadius: 2,
  maxWidth: 800,
};
