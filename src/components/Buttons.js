import React from 'react';
import styled, { css } from 'styled-components';
import Button from 'react-bootstrap/Button';

export const PrimaryBlueButton = styled(Button)<{ }>`
  background: #00004d;
  &:hover {
    background: #00004d;
    color: #ddddde;
  }
  &:disabled {
    background: #b0bec5;
    border-color: #b0bec5;
    &:hover {
      background: #b0bec5;
    }
  }
`;

export const SecondaryBlueButton = styled(Button)<{ }>`
  background: #0277bd;
  border-color: #0277bd;
  color: #ddddde;
  &:hover {
    background: #0277bd;
    color: #ddddde;
  }
  &:disabled {
    background: #b0bec5;
    border-color: #b0bec5;
    &:hover {
      background: #b0bec5;
    }
  }
`;
