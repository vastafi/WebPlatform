import PropTypes from "prop-types";

import Card from "@mui/material/Card";

import MDBox from "components/MDBox";

function Header({ children }) {

  return (
    <MDBox position="relative" mb={5}>
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 0,
          py: 0,
          px: 2,

        }}
      >
        {children}
      </Card>
    </MDBox>
  );
}

Header.defaultProps = {
  children: "",
};

Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
