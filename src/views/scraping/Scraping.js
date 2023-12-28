import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { useSelector } from 'react-redux'
import { selectToken } from '../../redux/slices/authSlice'
import { jwtDecode } from 'jwt-decode'
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
  CFormSelect,
  CSpinner,
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
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Scraping = () => {
  const DEV_URL = process.env.REACT_APP_DEV_URL

  const token = useSelector(selectToken)
  const [decodedToken, setDecodedToken] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [scrapedData, setScrapedData] = useState([])
  const [imageURL, setImageURL] = useState('')
  const [imageModalvisible, setImageModalVisible] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)

  //Get Data at page rendering
  useEffect(() => {
    fetchData()
  }, [])

  //Get Token
  useEffect(() => {
    // Decode the JWT token
    if (token) {
      const decoded = jwtDecode(token)
      setDecodedToken(decoded)
    }
  }, [token])

  //Image Modal
  const openImageModal = (imageURL) => {
    setImageURL(imageURL)
    setImageModalVisible(true)
  }

  //Send To The Endpoint
  const handleSearching = () => {
    //start the spinner
    setShowSpinner(true)

    Axios.post(
      DEV_URL + 'scraping/add/',
      {
        searchText,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((res) => {
        if (res.status === 200 || res.status === 504) {
          toast.info('Scraped Successfully!', {
            position: toast.POSITION.TOP_RIGHT,
          })
          setTimeout(() => {
            // Get Data after success adding
            fetchData()
          }, 2000)
        }
      })
      .finally(() => {
        setShowSpinner(false)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  //F(x) to get data
  const fetchData = () => {
    Axios.get(DEV_URL + 'scraping/get/', {
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const data = res.data
        if (Array.isArray(data)) {
          setScrapedData(data)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <>
      {/*Show Toast*/}
      <ToastContainer />
      {/*Product Image View Modal*/}
      <CModal
        visible={imageModalvisible}
        onClose={() => setImageModalVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader onClose={() => setImageModalVisible(false)}>
          {/* <CModalTitle id="LiveDemoExampleLabel">Modal title</CModalTitle> */}
        </CModalHeader>
        <CModalBody>
          <img
            src={imageURL}
            alt="Image here"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </CModalBody>
      </CModal>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <div className="d-flex justify-content-center">
                <h2>SCRAPING</h2>
              </div>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol>
                  <div className="container mt-5">
                    <div className="row justify-content-center">
                      <div className="col-md-12 text-center">
                        <div className="input-group">
                          <CFormInput
                            type="text"
                            className="form-control-lg"
                            placeholder="Paste your url here......."
                            aria-label="lg input example"
                            onChange={(e) => setSearchText(e.target.value)}
                          />
                          <div className="input-group-append">
                            <span className="input-group-text">
                              <CIcon
                                onClick={handleSearching}
                                style={{ height: '2.6rem' }}
                                size="lg"
                                icon={cilSearch}
                              />
                            </span>
                          </div>
                          {showSpinner && (
                            <div className="input-group-append">
                              <span>
                                <CSpinner
                                  color="dark"
                                  size="sm"
                                  style={{ width: '3rem', height: '3rem' }}
                                  className="mx-2 mb-2"
                                />
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CCol>
              </CRow>

              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    {/* <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell> */}
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
                    <CTableHeaderCell className="text-center">Model Year</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Special Features</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Color</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Size</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">
                      Date First Available
                    </CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Battery Required</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {scrapedData.length > 0 ? (
                    scrapedData.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index}>
                        {/* <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell> */}
                        <CTableDataCell>
                          <div style={{ textTransform: 'uppercase' }}>{item.source}</div>
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
                          {/* <CIcon size="xl" icon={} /> */}
                          <img
                            src={item.imageURL}
                            alt=""
                            style={{
                              height: '100px',
                              cursor: 'pointer',
                              widht: '100%',
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
                          <CIcon size="xl" icon={item.productModelYear} title="" />
                          {item.productModelYear}
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
                        <CTableDataCell className="text-center">
                          <CIcon size="xl" title="" />
                          {item.productDateFirstAvailable}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CIcon size="xl" title="" />
                          {item.productBatteryRequired}
                        </CTableDataCell>
                        {/* <CTableDataCell>
                        <CFormCheck
                          id="flexCheckDefault"
                          label=""
                          checked={selectedProductIds.includes(item.productId)}
                          onChange={() => handleSelectProduct(item.productId)}
                        />
                      </CTableDataCell> */}
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow v-for="item in tableItems" key={''}>
                      {/* <CTableDataCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell> */}
                      <CTableDataCell>
                        <div style={{ textTransform: 'uppercase' }}>{''}</div>
                        {/* <div className="small text-medium-emphasis">
                          <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                          {item.user.registered}
                        </div> */}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={''} title="" />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            <ul></ul>
                          </div>
                          {/* <div className="float-end">
                            <small className="text-medium-emphasis">{item.usage.period}</small>
                          </div> */}
                        </div>
                        {/* <CProgress thin color={item.usage.color} value={item.usage.value} /> */}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {/* <CIcon size="xl" icon={} /> */}
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            <ul></ul>
                          </div>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={''} title="" />
                        {''}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={''} title="" />
                        {'No Products yet....'}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={''} title="" />
                        {''}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={''} title="" />
                        {''}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={''} title="" />
                        {''}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={''} title="" />
                        {''}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={''} title="" />
                        {''}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={''} title="" />
                        {''}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={''} title="" />
                        {''}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={''} title="" />
                        {''}
                      </CTableDataCell>
                      {/* <CTableDataCell>
                        <CFormCheck
                          id="flexCheckDefault"
                          label=""
                          checked={selectedProductIds.includes(item.productId)}
                          onChange={() => handleSelectProduct(item.productId)}
                        />
                      </CTableDataCell> */}
                    </CTableRow>
                  )}
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
