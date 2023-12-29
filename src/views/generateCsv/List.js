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
  cilCheckAlt,
  cilSearch,
  cilUser,
  cilUserFemale,
  cilPlus,
  cilArrowThickToBottom,
  cilPen,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import { Link } from 'react-router-dom'

const Scraping = () => {
  const DEV_URL = process.env.REACT_APP_DEV_URL
  const token = useSelector(selectToken)
  const [decodedToken, setDecodedToken] = useState(null)
  const [scrapedData, setScrapedData] = useState([])
  const [selectedProductIds, setSelectedProductIds] = useState([])
  const [imageURL, setImageURL] = useState('')
  const [imageModalvisible, setImageModalVisible] = useState(false)

  //Image Modal
  const openImageModal = (imageURL) => {
    setImageURL(imageURL)
    setImageModalVisible(true)
  }

  //Generate CSV
  const handleSelectProduct = (productId) => {
    if (selectedProductIds.includes(productId)) {
      //product already selected
      setSelectedProductIds(selectedProductIds.filter((id) => id != productId))
    } else {
      //product ain't selected
      setSelectedProductIds([...selectedProductIds, productId])
    }
  }

  // Function to generate and initiate CSV download
  const handleDownloadCSV = () => {
    //----- Including " " Qoutes ----
    const escapeCSVField = (text) => {
      if (text === null || text === undefined) {
        return ''
      }
      if (text.includes('"')) {
        return `${text.replace(/"/g, '""')}"`
      }
      return text
    }

    //----- Cleaning Other Stuff -----
    const cleanText = (text) => {
      if (text === null || text === undefined) {
        return ''
      }
      // Remove non-printable and non-ASCII characters
      return text.replace(/[^\x20-\x7E]/g, '')
    }

    // Filter the selected products from the scrapedData
    const selectedProducts = scrapedData.filter((item) =>
      selectedProductIds.includes(item.productId),
    )

    // Construct the CSV content
    const csvContent =
      'SOURCE,PRODUCT TITLE,MAIN IMAGE,ADDITIONAL IMAGES,PRODUCT DESCRIPTION,ASIN,MANUFACTURER,BRAND,ITEM WEIGHT,ITEM DIMENSION,ITEM MODEL NUMBER,MODEL YEAR,SPECIAL FEATURES,COLOR,SIZE,DATE FIRST AVAILABLE,BATTERY REQUIRED\n' +
      selectedProducts
        .map((item) => {
          const descriptions = item.productDescriptions
            .map((description) => escapeCSVField(cleanText(description.name)))
            .join('\n \n')

          const additionalImages = item.productImages
            .map((image) => escapeCSVField(cleanText(image.url)))
            .join('\n \n')

          return `"${cleanText(item.source)}","${escapeCSVField(
            cleanText(item.productTitle),
          )}","${cleanText(item.imageURL)}","${additionalImages}","${descriptions}","${cleanText(
            item.productAsin,
          )}","${cleanText(item.productManufacturer)}","${cleanText(
            item.productBrand,
          )}","${cleanText(item.productWeight)}","${cleanText(item.productDimension)}","${cleanText(
            item.productModalNumber,
          )}","${cleanText(item.productModelYear)}","${cleanText(
            item.productSpecailFeatures,
          )}","${cleanText(item.productColor)}","${cleanText(item.productSize)}","${cleanText(
            item.productDateFirstAvailable,
          )}","${cleanText(item.productBatteryRequired)}"`
        })
        .join('\n')

    // Create a Blob containing the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv' })

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob)

    // Create an anchor element to trigger the download
    const a = document.createElement('a')
    a.href = url
    a.download = 'product_csv.csv'

    // Trigger the download
    a.click()

    // Clean up by revoking the URL
    URL.revokeObjectURL(url)
  }

  //Get Token
  useEffect(() => {
    // Decode the JWT token
    if (token) {
      const decoded = jwtDecode(token)
      setDecodedToken(decoded)
    }
  }, [token])

  useEffect(() => {
    Axios.get(DEV_URL + 'scraping/get/', {
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      const data = res.data
      if (Array.isArray(data)) {
        setScrapedData(data)
      }
    })
  }, [])

  return (
    <>
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
                <h2>GENERATE CSV</h2>
              </div>

              <div className="d-flex flex-row-reverse">
                <CIcon icon={cilCloudDownload} size="xxl" onClick={handleDownloadCSV} />
              </div>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    {/* <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell> */}
                    <CTableHeaderCell>Select</CTableHeaderCell>
                    <CTableHeaderCell>Source</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Product Title</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Product Description</CTableHeaderCell>
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
                      <CTableRow
                        v-for="item in tableItems"
                        onClick={() => handleSelectProduct(item.productId)}
                        key={index}
                        style={{ cursor: 'pointer' }}
                      >
                        {/* <CTableDaitem.sourcetaCell className="text-center">
                        <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
                      </CTableDataCell> */}
                        <CTableDataCell>
                          <CFormCheck
                            id="flexCheckDefault"
                            label=""
                            checked={selectedProductIds.includes(item.productId)}
                            onChange={() => handleSelectProduct(item.productId)}
                            style={{ width: '30px', height: '30px' }}
                          />
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item.source}</div>
                          {/* <div className="small text-medium-emphasis">
                          <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                          {item.user.registered}
                        </div> */}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CIcon size="xl" icon={item.productTitle} title="" />
                          {item.productTitle}
                        </CTableDataCell>
                        <CTableDataCell style={{ whiteSpace: 'normal' }}>
                          <div className="clearfix">
                            <div className="float-start">
                              <ul style={{ whiteSpace: 'normal', margin: 0, padding: 0 }}>
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
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" title="" />
                        {''}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" title="" />
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
            <br />
            <div className="d-flex justify-content-center">
              <CIcon icon={cilCloudDownload} size="xxl" onClick={handleDownloadCSV} />
            </div>
            <br />
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Scraping
