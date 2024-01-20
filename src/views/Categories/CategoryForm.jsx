import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import CancelButton from "../../components/Buttons/CancelButton";
import SaveButton from "../../components/Buttons/SaveButton";
import CBreadcrumbs from "../../components/CBreadcrumbs";
import Header from "../../components/Header";
import CategoryService from "../../services/categoryServices";
import CategoryCreate from "./CategoryCreate/CategoryCreate";
import CategoryUpdate from "./CategoryUpdate/CategoryUpdate";

export default function CategoryForm() {
  const { control, handleSubmit } = useForm();
  const { id } = useParams();
  const [btnLoader, setBtnLoader] = useState(false);
  const [loader, setLoader] = useState(true);

  const breadCrumbItems = [
    {
      label: "Category",
    },
    {
      label: id ? "Update" : "Create",
    },
  ];

  const onSubmit = (value) => {
    console.log(value);

    const data ={
      ...value,
    }

    if(id) return updateCategory(data)
    createCategory(data)
  };


  // Create new category
  const createCategory = (data) => {
    CategoryService.create(data)
    .then(res => console.log("Values", res))
    .catch(err => console.log(err))
  }



  // Update new Category

  const updateCategory = (data) => {
    CategoryService.update({
      ...data,
      id
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Header
        // loader={loader}
        backButtonLink={"/category"}
        title="Category"
        extra={
          <>
            <CancelButton onClick={() => navigate(-1)} />
            <SaveButton type="submit" loading={btnLoader}/>
          </>
        }
      >
        <CBreadcrumbs withDefautlIcon items={breadCrumbItems} />
      </Header>

        {id ? <CategoryUpdate control={control}/> 
        : <CategoryCreate control={control}/>}
        

    </form>
  );
}
