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
  CFormSelect,
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
  const [source, setSource] = useState('')
  const [imageModalvisible, setImageModalVisible] = useState(false)
  const [progress, setProgress] = useState(0)

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
      //product ain't selected, so add it
      setSelectedProductIds([...selectedProductIds, productId])
    }
  }

  // Function to generate and initiate CSV download
  const handleDownloadCSV = () => {
    // Filter the selected products from the scrapedData
    const selectedProducts = scrapedData.filter((item) =>
      selectedProductIds.includes(item.productId),
    )

    // Construct the CSV content
    const csvContent =
      'Product Title,Image URL,Product Descriptions\n' +
      selectedProducts
        .map((item) => {
          const descriptions = item.productDescriptions
            .map((desc) => desc.descriptionName)
            .join('\n')
          return `"${item.productTitle}","${item.imageURL}","${descriptions}"`
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

  //Send To The Endpoint
  const handleSearching = () => {
    Axios.post(DEV_URL + 'scraping/add/', {
      searchText,
      source,
    })
      .then((res) => {
        console.log(res)
        // if (res.status === 200) {
        //   window.location.reload()
        // }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    Axios.get(DEV_URL + 'scraping/get/').then((res) => {
      const data = res.data
      setScrapedData(data)
      //console.log(JSON.stringify(scrapedData))
    })
  }, [])

  //alert(JSON.stringify(scrapedData))
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
              width: '250px',
              height: '300px',
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
                          <CFormSelect
                            onChange={(e) => setSource(e.target.value)}
                            className="input-group-append"
                            aria-label="Default select example"
                          >
                            <option disabled>Select Source</option>
                            <option value="amazon">Amazon</option>
                            <option value="walmart">Walmart</option>
                            <option value="bestbuy">Best Buy</option>
                          </CFormSelect>
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
                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            <ul>
                              {item.productDescriptions.map((description, descIndex) => (
                                <li key={descIndex}>{description.descriptionName}</li>
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
                      {/* <CTableDataCell>
                        <CFormCheck
                          id="flexCheckDefault"
                          label=""
                          checked={selectedProductIds.includes(item.productId)}
                          onChange={() => handleSelectProduct(item.productId)}
                        />
                      </CTableDataCell> */}
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
