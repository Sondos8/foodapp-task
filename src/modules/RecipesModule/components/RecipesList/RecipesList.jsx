import React, { useEffect, useState } from 'react'
import Header from '../../../SharedModules/components/Header/Header'
import header from '../../../../assets/images/header.png'
import axios from 'axios';
import NoData from '../../../SharedModules/components/NoData/NoData';
import nodata from '../../../../assets/images/no-data.png'
import DeleteData from '../../../SharedModules/components/DeleteData/DeleteData';
import Modal from 'react-bootstrap/Modal';

export default function RecipesList() {

  const [recipesList, setRecipesListList] = useState([]);
  const [catId, setCatId] = useState('');

  const [showDelelte, setShowDelete] = useState(false);
  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = (id) => { 
    setCatId(id)
    setShowDelete(true); 
  }

  const onDeleteSubmit = async () => {
    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${catId}`,
        {
          headers: { Authorization: `Bearer ${ localStorage.getItem("token")}` }
        }
      );
      handleDeleteClose()
      getRecipesList()
      // console.log(response);
    }
    catch(error) {
      console.log(error);
    }
  }

  const getRecipesList = async () => {
    try {
      let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=1',
      {
        headers: { Authorization: `Bearer ${ localStorage.getItem("token")}` }
      }
    );
    // console.log(response);
    setRecipesListList(response.data.data);
    }
    catch(error) {
      console.log(error);
    }
  } 

  useEffect(() => {
    getRecipesList();
  }, [])


  return (
    <>
    <Header 
      title={'Recipe Itmes!'}
      description={'You can now add your items that any user can order it from the Application and you can edit'} 
      imgUrl={header} 
    /> 

    <Modal show={showDelelte} onHide={handleDeleteClose}>
      <Modal.Header closeButton>
          <h3>Delete Category</h3>
      </Modal.Header>
      <Modal.Body>
        <DeleteData deleteItem={'Recipe'} />
        </Modal.Body>
        <div className='d-flex justify-content-end m-3'>
          <button className='btn btn-danger p-2' onClick={onDeleteSubmit}>
            Delete this item
          </button>
        </div>
    </Modal>

<div className="m-4 p-1">
      <div className="row">
        <div className="col-md-6">
          <h3>Recipe Table Details</h3>
          <span className='color-3'>You can check all details</span>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <button className='btn-c border-0 rounded-3'>Add New Item</button>
        </div>
      </div>
      <table className="table table-borderless color-3 table-striped rounded-5">
        <thead className='rounded-3 w-100'>
            <tr className='rounded-3'>
              <th className='bg-secondary-subtle p-3 rounded-start-4'>Name</th>
              <th className='bg-secondary-subtle p-3'>Image</th>
              <th className='bg-secondary-subtle p-3'>Price</th>
              <th className='bg-secondary-subtle p-3'>Description</th>
              <th className='bg-secondary-subtle p-3'>tag</th>
              <th className='bg-secondary-subtle p-3'>Category</th>
              <th className='bg-secondary-subtle p-3 rounded-end-4 text-end'>Actions</th>

            </tr>
          </thead>
        <tbody>
          {recipesList?.length > 0 ?  recipesList.map((item) => (
            <tr className='color-3r' key={item.id}>
              <td className='text-start'>{item.name}</td>
              <td>
                {item.imagePath ? 
                <div className='w-50'>
                  <img src={"https://upskilling-egypt.com:3006/" + item.imagePath} alt='' className='w-25 rounded-2' />
                </div>
                : 
                <div className='rounded-2 w-50'>
                  <img src={nodata} alt='no image' className='w-25' />
                </div>
              }
              </td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>{item?.tag.name}</td>
              <td>
              </td>
              <td className='text-end'>
                <i
                  className='fa fa-edit color-2 me-3 mouse'
                  aria-hidden="true"
                  ></i>
                <i
                  onClick={() => handleDeleteShow(item.id)} 
                  className='fa fa-trash color-2 mouse me-2'
                  aria-hidden="true"
                  ></i>
              </td>
            </tr>
            )) : <NoData />}
        </tbody>
      </table>
    </div>


    </>
  )
}
