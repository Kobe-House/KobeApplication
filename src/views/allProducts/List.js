import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
  CFormCheck,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CFormTextarea,
  CForm,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilSearch,
  cilUser,
  cilUserFemale,
  cilPlus,
  cilTrash,
  cilPen,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

const Scraping = () => {
  const DEV_URL = process.env.REACT_APP_DEV_URL
  const [searchText, setSearchText] = useState('')
  const [scrapedData, setScrapedData] = useState([])
  const [selectedProductIds, setSelectedProductIds] = useState([])
  const [imageURL, setImageURL] = useState('')
  const [deleteProduct, setDeleteProduct] = useState('')
  const [imageModalvisible, setImageModalVisible] = useState(false)
  const [editProductModalVisible, setEditProductModalVisible] = useState(false)
  const [editedProduct, setEditedProduct] = useState({
    productId: '',
    productTitle: '',
    productDescriptions: [],
  })

  const openEditModal = (product) => {
    setEditedProduct({
      productId: product.productId,
      productTitle: product.productTitle,
      productDescriptions: [...product.productDescriptions],
    })
    setEditProductModalVisible(true)
  }

  //Image Modal
  const openImageModal = (imageURL) => {
    setImageURL(imageURL)
    setImageModalVisible(true)
  }

  //Handle Product Edit
  const handleEditProduct = () => {
    //Close the modal
    setEditProductModalVisible(false)

    //costruct data to send
    const dataToSend = {
      productId: editedProduct.productId,
      productTitle: editedProduct.productTitle,
      productDescriptions: editedProduct.productDescriptions,
    }

    Axios.post(DEV_URL + 'scraping/update/', { dataToSend })
      .then((res) => {
        if (res.status === 200) {
          window.location.reload()
        }
      })
      .catch((err) => {
        console.log(err, 'Error Occured While Updating')
      })
  }

  useEffect(() => {
    Axios.get(DEV_URL + 'scraping/get/').then((res) => {
      const data = res.data
      setScrapedData(data)
    })
  }, [])

  return (
    <>
      {/* Modal Product Edit*/}
      <CModal
        visible={editProductModalVisible}
        onClose={() => setEditProductModalVisible(false)}
        aria-labelledby="EditProductModal"
      >
        <CModalHeader onClose={() => setEditProductModalVisible(false)}>
          <CModalTitle id="EditProductModal">Edit Product</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3">
            <CCol xs={12}>
              <CFormTextarea
                id="editProductName"
                label="Product Name"
                value={editedProduct.productTitle}
                onChange={(e) =>
                  setEditedProduct({ ...editedProduct, productTitle: e.target.value })
                }
                rows={3}
              ></CFormTextarea>
            </CCol>
            <CCol xs={12}>
              <CFormTextarea
                id="editProductDescription"
                label="Product Description"
                value={editedProduct.productDescriptions
                  .map((description) => description.descriptionName)
                  .join('\n')}
                onChange={(e) => {
                  const inputDescriptions = e.target.value.split('\n')
                  const descriptions = editedProduct.productDescriptions.map(
                    (description, index) => {
                      return {
                        productDescriptionId: description.productDescriptionId,
                        descriptionName:
                          index < inputDescriptions.length
                            ? inputDescriptions[index]
                            : description.descriptionName,
                      }
                    },
                  )

                  // Check if there are additional lines in the input that don't have corresponding descriptions
                  if (inputDescriptions.length > descriptions.length) {
                    for (let i = descriptions.length; i < inputDescriptions.length; i++) {
                      descriptions.push({
                        productDescriptionId: '', // Set the productDescriptionId for the new description
                        descriptionName: inputDescriptions[i],
                      })
                    }
                  }

                  setEditedProduct({ ...editedProduct, productDescriptions: descriptions })
                }}
                rows={8}
              ></CFormTextarea>
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            style={{ backgroundColor: '#3C4B64', color: 'white' }}
            onClick={handleEditProduct}
          >
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Modal Product Image View*/}
      <CModal
        fullscreen="md"
        visible={imageModalvisible}
        onClose={() => setImageModalVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader onClose={() => setImageModalVisible(false)}></CModalHeader>
        <CModalBody
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <img src={imageURL} alt="Image here" />
        </CModalBody>
      </CModal>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <div className="d-flex justify-content-center">
                <h2>ALL PRODUCTS</h2>
              </div>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    {/* <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell> */}
                    <CTableHeaderCell>Action</CTableHeaderCell>
                    <CTableHeaderCell>Source</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Product Title</CTableHeaderCell>
                    <CTableHeaderCell>Product Description</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Image</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Additional Images</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">ASIN</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Manufacturer</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Brand</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Weight</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Dimension</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Model Number</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Special Features</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Color</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Size</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {scrapedData.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      {/* <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell> */}
                      <CTableDataCell>
                        <CIcon
                          icon={cilPen}
                          size="xl"
                          style={{ '--ci-primary-color': '#303C54', cursor: 'pointer' }}
                          onClick={() => openEditModal(item)}
                        />
                        <CIcon
                          icon={cilTrash}
                          size="xl"
                          style={{ '--ci-primary-color': '#303C54', cursor: 'pointer' }}
                        //onChange = {() => setDeleteProduct(item.productId)}
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>
                          {/* {item.source} */}
                          Amazon
                        </div>
                        {/* <div className="small text-medium-emphasis">
                          <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                          {item.user.registered}
                        </div> */}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.productTitle} title="" />
                        {item.productTitle}
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            <ul>
                              {item.productDescriptions.map((description, descIndex) => (
                                <li key={description.id}>{description.name}</li>
                              ))}
                            </ul>
                          </div>
                          {/* <div className="float-end">
                            <small className="text-medium-emphasis">{item.usage.period}</small>
                          </div> */}
                        </div>
                        {/* <CProgress thin color={item.usage.color} value={item.usage.value} /> */}
                      </CTableDataCell>
                      <CTableDataCell
                        className="text-center"
                        onClick={() => openImageModal(item.imageURL)}
                      >
                        <img
                          src={item.imageURL}
                          alt=""
                          style={{
                            height: '100px',
                            cursor: 'pointer',
                          }}
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            <ul>
                              {item.productImages.map((image) => (
                                <li key={image.id}>{image.url}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.productAsin} title="" />
                        {item.productAsin}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.productManufacturer} title="" />
                        {item.productManufacturer}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.productBrand} title="" />
                        {item.productBrand}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.productWeight} title="" />
                        {item.productWeight}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.productDimension} title="" />
                        {item.productDimension}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.productModalNumber} title="" />
                        {item.productModalNumber}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.productSpecailFeatures} title="" />
                        {item.productSpecailFeatures}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.productColor} title="" />
                        {item.productColor}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.productSize} title="" />
                        {item.productSize}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Scraping
