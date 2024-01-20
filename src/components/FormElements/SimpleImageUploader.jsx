import React from "react";
import classes from "./style.module.scss";
import { FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";

export default function SimpleImageUploader({
  control,
  name,
  required = false,
  rules,
  disabledHelperText = false,
  ...props
}) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: required ? "This is required field" : false,
        // ...rules,
      }}
      render={({ field: {onChange, value}, fieldState: { error } }) => (
        <>
        <label htmlFor="images" className={classes.drop__container} id="dropcontainer">
        <span className={classes.drop__title}>Drop files here</span>
  

        {console.log(value)}
          <input
            type="file"
            accept="image/*"
            name={name}
            id="images"
            required
            className={classes.simple__image__uploader}
            // value={value}
            onChange={(e) => onChange(e.target.files[0].name)}
            {...props}
          />
          </label>
          {!disabledHelperText && (
            <FormHelperText error>{error?.message ?? ""}</FormHelperText>
          )}
        </>
      )}
    />
  );
}
