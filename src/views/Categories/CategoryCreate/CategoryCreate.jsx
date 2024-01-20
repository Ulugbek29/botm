import classes from "./style.module.scss"
import React from 'react'
import FormCard from '../../../components/FormCard'
import FRow from "../../../components/FormElements/FRow"
import HFTextField from "../../../components/FormElements/HFTextField"
import HFTextArea from "../../../components/FormElements/HFTextArea"
import HFSelect from "../../../components/FormElements/HFSelect"

import SimpleImageUploader from "../../../components/FormElements/SimpleImageUploader"
import Switcher from "../../../components/FormElements/Switch"

const companyIds = [
  { value: "company1", label: "Company 1" },
  { value: "company2", label: "Company 2" },
  { value: "company3", label: "Company 3" },
  // Add more company IDs as needed
];

export default function CategoryCreate({control}) {
  return (
    <div className={classes.create__container}>
      <FormCard maxWidth= "700px" title="Category create">
      <FRow required label="Category Name">
              <HFTextField
                fullWidth
                control={control}
                name="name"
                required
                rules={{}}
              />
            </FRow>
            <FRow label="Description">
            <HFTextArea
              control={control}
              className={classes.description}
              label="Description"
              name="description"
              // required
              // rules={{}}
            />
          </FRow>
          <FRow required label="Select Company Id">
              <HFSelect
                fullWidth
                control={control}
                name="company_id"
                label="Select Company Id"
                options={companyIds}
                required
                rules={{}}
              />
            </FRow>
      </FormCard>

      <FormCard maxWidth= "500px">
          <SimpleImageUploader
            control={control}
            required
            name="photo_url"
           />

           <FRow label="Status Available">
              {/* <HFSwitch control={control} name="status" /> */}

              <Switcher 
                name="status"
                control={control}
                label="Toggle Switch"
                color="primary"
              />

            </FRow>
      </FormCard>
    </div>
  )
}
