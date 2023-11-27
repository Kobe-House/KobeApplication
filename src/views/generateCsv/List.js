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

const Scraping = () => {
  const DEV_URL = process.env.REACT_APP_DEV_URL
  const [searchText, setSearchText] = useState('')
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
    // Filter the selected products from the scrapedData
    const selectedProducts = scrapedData.filter((item) =>
      selectedProductIds.includes(item.productId),
    )

    // Construct the CSV content
    const csvContent =
      'SOURCE,PRODUCT TITLE,MAIN IMAGE,ADDITIONAL IMAGES,PRODCUT DESCRIPTION,ASIN,MANUFACTURER,BRAND,ITEM WEIGHT,ITEM DIMENSION,ITEM MODEL NUMBER,SPECIAL FEATURES,COLOR,SIZE\n' +
      selectedProducts
        .map((item) => {
          const descriptions = item.productDescriptions
            .map((description) => description.name)
            .join('\n \n')

          const additionalImages = item.productImages.map((image) => image.url).join(', ')

          return `"${item.source}","${item.productTitle}","${item.imageURL}","${additionalImages}","${descriptions}","${item.productAsin}","${item.productManufacturer}","${item.productBrand}","${item.productWeight}","${item.productDimension}","${item.productModalNumber}","${item.productSpecailFeatures}","${item.productColor}","${item.productSize}"`
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

  useEffect(() => {
    Axios.get(DEV_URL + 'scraping/get/').then((res) => {
      const data = res.data
      setScrapedData(data)
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
                {/* <CButton
                  onClick={handleDownloadCSV}
                  style={{ backgroundColor: '#3C4B64', color: 'white' }}
                >
                  {' '} */}
                <CIcon icon={cilCloudDownload} size="xxl" onClick={handleDownloadCSV} />
                {/* </CButton> */}
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
                    <CTableHeaderCell className="text-center">Special Features</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Color</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Size</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {scrapedData.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
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
