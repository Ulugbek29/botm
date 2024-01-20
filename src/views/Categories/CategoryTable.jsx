import React, { useState, useEffect } from "react";
import classes from "./style.module.scss";

import {
  CTable,
  CTableBody,
  CTableCell,
  CTableHead,
  CTableHeadRow,
  CTableRow,
} from "../../components/CTable";

import CategoryService from "../../services/categoryServices";
import ButtonsPopover from "../../components/ButtonsPopover";

import defImage from "../../assets/download.jpg";

export default function CustomPaginationActionsTable() {
  const [categoryList, setCategoryList] = useState([]);
  const [loader, setLoader] = useState(true);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const columns = [
    {
      key: "image",
      title: "Photo",
      render: (itemObj) => (
        <img src={defImage} className={classes.categoryImage} alt="Category" />
      ),
    },
    { key: "name", title: "Name" },
    { key: "description", title: "Description" },
    { key: "status", title: "Status" },
    {
      key: "actions",
      title: "Actions",
      render: (itemObj) => (
        <ButtonsPopover
          id={itemObj.id}
          onEditClick={navigateToEditForm}
          onDeleteClick={deleteTableData}
        />
      ),
    },
  ];

  console.log(categoryList);

  useEffect(() => {
    getCategoryList();
  }, []);

  // Get all Categories
  const getCategoryList = () => {
    setLoader(true);
    CategoryService.getList()
      .then((res) => {
        setCategoryList(res.categories);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };

  // EditForm
  const navigateToEditForm = () => {};

  const deleteTableData = () => {};

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
          {columns.map((col) => (
            <CTableCell
              className={col.key === "image" ? classes.imageBox : ""} 
              key={col.key}
              align="center"
            >
              {col.title}
            </CTableCell>
          ))}
        </CTableHeadRow>
      </CTableHead>
      <CTableBody
        loader={loader}
        columnsCount={columns.length} // Use the correct number of columns
        dataLength={categoryList?.length || 0} // Handle undefined or null
      >
        {categoryList?.map((row, i) => (
          <CTableRow key={i}>
            {columns?.map((column, j) => (
              <CTableCell align="center" key={j}>
                {column.render ? column.render(row) : row[column.key]}
              </CTableCell>
            ))}
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
}
