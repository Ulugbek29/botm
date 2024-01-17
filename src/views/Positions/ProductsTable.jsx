import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ButtonsPopover from "../../components/ButtonsPopover"
import {
  CTable,
  CTableBody,
  CTableCell,
  CTableHead,
  CTableHeadRow,
  CTableRow,
} from "../../components/CTable"
import productService from "../../services/productsService"
import { pageToOffset } from "../../utils/pageToOffset"
import productImageUrl from "../../assets/download.jpg"



const products = [
  {
    "category_id": "1",
    "company_id": "ABC123",
    "created_at": "2024-01-11T12:30:45Z",
    "description": "High-quality headphones with noise-canceling feature.",
    "id": "1",
    "name": "Premium Headphones",
    "photo_url": "https://example.com/headphones.jpg",
    "price": 129.99,
    "status": "available",
    "updated_at": "2024-01-11T15:45:22Z"
  },
  {
    "category_id": "2",
    "company_id": "XYZ456",
    "created_at": "2024-01-10T09:15:30Z",
    "description": "Stylish and durable backpack for daily use.",
    "id": "2",
    "name": "Urban Backpack",
    "photo_url": "https://example.com/backpack.jpg",
    "price": 49.99,
    "status": "available",
    "updated_at": "2024-01-10T14:20:18Z"
  },
  {
    "category_id": "3",
    "company_id": "DEF789",
    "created_at": "2024-01-09T18:55:10Z",
    "description": "Smartwatch with fitness tracking and heart rate monitor.",
    "id": "3",
    "name": "Fitness Smartwatch",
    "photo_url": "https://example.com/smartwatch.jpg",
    "price": 79.99,
    "status": "available",
    "updated_at": "2024-01-09T22:40:35Z"
  },
  {
    "category_id": "4",
    "company_id": "ABC123",
    "created_at": "2024-01-11T12:30:45Z",
    "description": "High-quality headphones with noise-canceling feature.",
    "id": "4",
    "name": "Premium Headphones",
    "photo_url": "https://example.com/headphones.jpg",
    "price": 129.99,
    "status": "available",
    "updated_at": "2024-01-11T15:45:22Z"
  },
  {
    "category_id": "5",
    "company_id": "XYZ456",
    "created_at": "2024-01-10T09:15:30Z",
    "description": "Stylish and durable backpack for daily use.",
    "id": "5",
    "name": "Urban Backpack",
    "photo_url": "https://example.com/backpack.jpg",
    "price": 49.99,
    "status": "available",
    "updated_at": "2024-01-10T14:20:18Z"
  },
  {
    "category_id": "6",
    "company_id": "DEF789",
    "created_at": "2024-01-09T18:55:10Z",
    "description": "Smartwatch with fitness tracking and heart rate monitor.",
    "id": "6",
    "name": "Fitness Smartwatch",
    "photo_url": "https://example.com/smartwatch.jpg",
    "price": 79.99,
    "status": "available",
    "updated_at": "2024-01-09T22:40:35Z"
  },
  {
    "category_id": "7",
    "company_id": "ABC123",
    "created_at": "2024-01-11T12:30:45Z",
    "description": "High-quality headphones with noise-canceling feature.",
    "id": "7",
    "name": "Premium Headphones",
    "photo_url": "https://example.com/headphones.jpg",
    "price": 129.99,
    "status": "available",
    "updated_at": "2024-01-11T15:45:22Z"
  },
  {
    "category_id": "8",
    "company_id": "XYZ456",
    "created_at": "2024-01-10T09:15:30Z",
    "description": "Stylish and durable backpack for daily use.",
    "id": "8",
    "name": "Urban Backpack",
    "photo_url": "https://example.com/backpack.jpg",
    "price": 49.99,
    "status": "available",
    "updated_at": "2024-01-10T14:20:18Z"
  },
  {
    "category_id": "9",
    "company_id": "DEF789",
    "created_at": "2024-01-09T18:55:10Z",
    "description": "Smartwatch with fitness tracking and heart rate monitor.",
    "id": "9",
    "name": "Fitness Smartwatch",
    "photo_url": "https://example.com/smartwatch.jpg",
    "price": 79.99,
    "status": "available",
    "updated_at": "2024-01-09T22:40:35Z"
  },
  {
    "category_id": "10",
    "company_id": "DEF789",
    "created_at": "2024-01-09T18:55:10Z",
    "description": "Smartwatch with fitness tracking and heart rate monitor.",
    "id": "10",
    "name": "Fitness Smartwatch",
    "photo_url": "https://example.com/smartwatch.jpg",
    "price": 79.99,
    "status": "available",
    "updated_at": "2024-01-09T22:40:35Z"
  },
  {
    "category_id": "11",
    "company_id": "DEF789",
    "created_at": "2024-01-09T18:55:10Z",
    "description": "Smartwatch with fitness tracking and heart rate monitor.",
    "id": "11",
    "name": "Fitness Smartwatch",
    "photo_url": "https://example.com/smartwatch.jpg",
    "price": 79.99,
    "status": "available",
    "updated_at": "2024-01-09T22:40:35Z"
  },
  {
    "category_id": "12",
    "company_id": "DEF789",
    "created_at": "2024-01-09T18:55:10Z",
    "description": "Smartwatch with fitness tracking and heart rate monitor.",
    "id": "12",
    "name": "Fitness Smartwatch",
    "photo_url": "https://example.com/smartwatch.jpg",
    "price": 79.99,
    "status": "available",
    "updated_at": "2024-01-09T22:40:35Z"
  },
  {
    "category_id": "13",
    "company_id": "DEF789",
    "created_at": "2024-01-09T18:55:10Z",
    "description": "Smartwatch with fitness tracking and heart rate monitor.",
    "id": "13",
    "name": "Fitness Smartwatch",
    "photo_url": "https://example.com/smartwatch.jpg",
    "price": 79.99,
    "status": "available",
    "updated_at": "2024-01-09T22:40:35Z"
  },
]


const PositionsTable = () => {
  const navigate = useNavigate()

  const [tableData, setTableData] = useState(null)
  const [loader, setLoader] = useState(true)
  const [pageCount, setPageCount] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    fetchTableData()
  }, [])



  // Fetch all data
  const fetchTableData = () => {
    setLoader(true)
    productService
      .getList({
        limit: 10,
        offset: pageToOffset(currentPage),
      })
      .then((res) => {
        setTableData(res.products)
        setPageCount(Math.ceil(res?.count / 10))
      })
      .finally(() => setLoader(false))
  }


  // Delete data quiery
  const deleteTableData = (e, id) => {
    setLoader(true)
    console.log(id)
    productService
      .delete(id)
      .then(res => {
        fetchTableData()
      })
      .catch(() => setLoader(false))
  }


  // Navigate to the Edit page 
  const navigateToEditForm = (e, id) => {
    console.log(id)
    navigate(`/products/${id}`)
  }

  

  console.log(tableData)

  return (
    <CTable
      count={pageCount}
      page={currentPage}
      setCurrentPage={setCurrentPage}
      columnsCount={4}
      loader={loader}
    >
      <CTableHead>
        <CTableHeadRow>
          <CTableCell width={50}>No</CTableCell>
          <CTableCell width={200}>Image</CTableCell>
          <CTableCell >Name</CTableCell>
          <CTableCell >Company Id</CTableCell>
          <CTableCell>Price</CTableCell>
          <CTableCell >Status</CTableCell>
          <CTableCell>Actions</CTableCell>
        </CTableHeadRow>
      </CTableHead>
      {
        <CTableBody loader={loader} columnsCount={3} dataLength={tableData?.length} >  {/*dataLength={tableData?.length}*/}
          {tableData?.map((data, index) => (
            <>

            {console.log(data)}
            <CTableRow
              key={data.id}
              // onClick={() => navigate(`/projects/${data.id}/backlog`)}
            >
              <CTableCell>{index + 1}</CTableCell>
              <CTableCell><img src={productImageUrl} /></CTableCell>
              <CTableCell>{data.name}</CTableCell>
               <CTableCell>{data.company_id}</CTableCell>
              <CTableCell>{data.price}</CTableCell>
              <CTableCell>{data.status === "active" ? "True" : "False"}</CTableCell>
              <CTableCell>
                <ButtonsPopover id={data.id} onEditClick={navigateToEditForm} onDeleteClick={deleteTableData} />
              </CTableCell>
            </CTableRow>
            </>
          ))}
        </CTableBody>
      }
    </CTable>
  )
}

export default PositionsTable
