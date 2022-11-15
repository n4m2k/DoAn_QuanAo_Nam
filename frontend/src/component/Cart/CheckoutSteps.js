import { StepLabel, Typography, Stepper, Step } from "@mui/material";
import React, { Fragment } from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import "./CheckoutSteps.css";
const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Chi tiết đơn hàng</Typography>,
      icon: <LocalShippingIcon></LocalShippingIcon>,
    },
    {
      label: <Typography>Xác nhận đơn hàng</Typography>,
      icon: <LibraryAddCheckIcon></LibraryAddCheckIcon>,
    },
    {
      label: <Typography>Thanh toán</Typography>,
      icon: <AccountBalanceIcon></AccountBalanceIcon>,
    },
  ];
  const stepStyles = {
    boxSizing: "border-box",
  };
  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "#0089ff" : "rgba(0,0,0,0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
