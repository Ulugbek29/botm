import styles from "./style.module.scss"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import CancelButton from "../../components/Buttons/CancelButton"
import SaveButton from "../../components/Buttons/SaveButton"
import CBreadcrumbs from "../../components/CBreadcrumbs"
import Header from "../../components/Header"
import productsService from "../../services/productsService"
import ProductCreate from "./ProductCreate/ProductCreate"
import ProductUpdate from "./ProductUpdate/ProductUpdate"



const PositionsFormPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [btnLoader, setBtnLoader] = useState(false)
  const [loader, setLoader] = useState(true)
  const [singleDataObj, setSingleDataObj] = useState({
    id: "",
    name: "",
    price: null,
    category_id: "",
    company_id: "",
    description: "",
    photo_url: "",
    // status: "",
    // updated_at: "",
    // created_at: ""
  })


  const breadCrumbItems = [
    {
      label: 'Positions',
    },
    {
      label: id ? 'Update' : "Create"
    },
  ]

  const { control, register, handleSubmit, formState: {errors}, reset } = useForm()


  const getCurrentDate = (isUpdate = false)=> {
    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth()+1).padStart(2, '0')
    const date = String(currentDate.getDate()).padStart(2, "0")
    const hour = String(currentDate.getHours()).padStart(2, "0")
    const minutes = String(currentDate.getMinutes()).padStart(2, "0")
    const seconds = String(currentDate.getSeconds()).padStart(2, "0")

    if(isUpdate) {
      return`${year}-${month}-${date} ${hour}:${minutes}:${seconds}`
    }else {
      return `${year}-${month}-${date} ${hour}:${minutes}:${seconds}`
    }

    // return formattedDate
}



  useEffect(() => {
     fetchData()
  }, [])




  // Get Single data
  const fetchData = () => {
    console.log('id',id)
    if (!id) return setLoader(false)

    productsService
      .getById(id)
      .then((res) => {
        console.log(res)
        setSingleDataObj(res)
        reset(res)
      })
      .finally(() => setLoader(false))
  }

  // Handel Submit both Update && Create here
  const onSubmit = (values) => {
    
    const isUpdated = !!id;
    
    console.log(values.status)
    const data = {
      ...values,
      price: +values.price,
      status: values.status ? "active" : "Not-active"
      // created_at: getCurrentDate(),
      // updated_at: isUpdated ? getCurrentDate(true) : null
    }
    
    console.log("Values=>", data)
    if (id) return update(data)
    createProduct(data)
  }
  
  // console.log(singleDataObj)

 // Create new Product
const createProduct = (data) => {
  console.log(data)
  setBtnLoader(true)
  productsService.create(data)
    .then((res) => {
      console.log(res)
      navigate(`/products`)
    })
    .catch(err => console.log(err))
    .finally(() => setBtnLoader(false))

}


  // Update the product 
  const update = (data) => {
    console.log(data)
    setBtnLoader(true)
    productsService
      .update({
        ...data,
        id
      })
      .then((res) => {
        console.log(res)
        navigate(`/products`)
      })
      .finally(() => setBtnLoader(false))
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.handleSubmitForm}>
      <Header
        loader={loader}
        backButtonLink={'/positions'}
        title="Positions"
        extra={
          <>
            <CancelButton onClick={() => navigate(-1)} />
            <SaveButton type="submit" loading={btnLoader}  />
          </>
        }
      >
        <CBreadcrumbs withDefautlIcon items={breadCrumbItems} />
      </Header>
      <div className={styles.CreateUpdateContainer}>
      
      {
        id ? <ProductUpdate loader={loader} btnLoader={btnLoader} control={control}/> : <ProductCreate  loader={loader} btnLoader={btnLoader} control={control}/>
      }
      </div>

    </form>
  )
}

export default PositionsFormPage
