import styles from "./style.module.scss";
import React from "react";
import FormCard from "../../../components/FormCard";
import FRow from "../../../components/FormElements/FRow";
import HFSelect from "../../../components/FormElements/HFSelect";
import HFTextField from "../../../components/FormElements/HFTextField";
import HFDateTimePicker from "../../../components/FormElements/HFDateTimePicker";
import HFSwitch from "../../../components/FormElements/HFSwitch";
import SaveButton from "../../../components/Buttons/SaveButton";
import CancelButton from "../../../components/Buttons/CancelButton";
import HFInputField from "../../../components/FormElements/HFInputField";
import HFTextArea from "../../../components/FormElements/HFTextArea";
import Switcher from "../../../components/FormElements/Switch"
// import HFImageUpload from "../../../components/FormElements/HFImageUpload";
import { useNavigate } from "react-router-dom";

const foodOptions = [
  { label: "Fruits", value: "fruits" },
  { label: "Vegetables", value: "vegetables" },
  { label: "Dairy Products", value: "dairy" },
  { label: "Grains", value: "grains" },
  { label: "Proteins", value: "proteins" },
  { label: "Sweets", value: "sweets" },
];

const currencyCategories = [
  { label: "USD", value: "USD" },
  { label: "UZS", value: "UZS" },
  { label: "EUR", value: "EUR" },
];

export default function ProductCreate({ loader, control, btnLoader }) {

  const navigate = useNavigate()

  return (
    <div className={styles.flex}>
      <div className={styles.createLeftSide}>
        <FormCard visible={!loader} title="Main info">
          <div className={styles.flex}>
            <FRow required label="Product Name">
              <HFTextField
                fullWidth
                control={control}
                name="name"
                required
                rules={{}}
              />
            </FRow>
            <FRow required label="Price">
            <HFTextField
                type="number"
                fullWidth
                control={control}
                name="price"
                required
                rules={{}}
              />
            </FRow>
          </div>
          <div className={styles.flex}>
            <FRow required label="Select Category">
              <HFSelect
                fullWidth
                control={control}
                name="category_id"
                label="Select Category"
                options={foodOptions}
                required
                rules={{}}
              />
            </FRow>
          </div>
          <div className={styles.flex}>
            {/* <FRow required label="Quantity"> */}
              {/* <HFTextField fullWidth control={control} name="quantity" /> */}
              {/* <HFInputField
                fullWidth
                type="number"
                control={control}
                name="quantity"
                label="Quantity"
                required
                rules={{}}
              /> */}
            {/* </FRow> */}
            <FRow required label="Company Id">
              <HFTextField
                fullWidth
                control={control}
                name="company_id"
                required
                rules={{}}
              />
            </FRow>
          </div>
  
          <FRow label="Description">
            <HFTextArea
              control={control}
              className={styles.description}
              label="Message"
              name="description"
              // required
              // rules={{}}
            />
          </FRow>

          <FRow label="Image Upload">
            {/* <HFImageUpload fullWidth control={control}  label="Image Upload" name="imageUpload" /> */}
            <HFTextField
                fullWidth
                control={control}
                name="photo_url"
                required
                rules={{}}
              />
          </FRow>
        </FormCard>
      </div>

      <div className={styles.createRightSide}>
        <FormCard title="Product">
          <div className={styles.flex}>
            <FRow label="Status Available">
              {/* <HFSwitch control={control} name="status" /> */}

              <Switcher 
                name="status"
                control={control}
                label="Toggle Switch"
                color="primary"
              />

            </FRow>
            {/* <FRow label="Discount Available">
              <HFSwitch control={control} name="discount_available" />
            </FRow> */}
          </div>

          {/* <div className={styles.saveAndCancelContainer}>
            <SaveButton type="submit" loading={btnLoader} />
            <CancelButton onClick={() => navigate(-1)} />
          </div> */}
        </FormCard>
      </div>
    </div>
  );
}
