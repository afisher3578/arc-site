import React from "react";

import { FormFieldType, ValidationType } from "config/types";

export interface IProps {
  label?: string;
  value: number | string;
  type?: FormFieldType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  invalid: ValidationType;
  disabled: boolean;
  placeholder?: string;
  endText?: string;
  error?: string | null;
  testingCtx?: string;
}
