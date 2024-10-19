// import { Button, Form } from 'antd';
// import React, { useState } from 'react'

// import { UploadOutlined } from "@ant-design/icons";


// import { InboxOutlined } from '@ant-design/icons';
// import { message, Upload } from 'antd';
// const { Dragger } = Upload;


// const fileList = [
//   {
//     uid: '-1',
//     name: 'yyy.png',
//     status: 'pending',
//     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//   }
// ];

// function UploadImages() {

//   const onFinish = (values) => {
//     console.log('Success:', values);
//   };
//   const onFinishFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo);
//   };

//   const normFile = (e) => {
//     console.log('Upload event:', e);
//     if (Array.isArray(e)) {
//       return e;
//     }
//     return e?.fileList;
//   };





//   const [uploading, setUploading] = useState(false);
//   const handleUpload = () => {
//     const formData = new FormData();
//     fileList.forEach((file) => {
//       formData.append('files[]', file);
//     });
//     setUploading(true);
//     // You can use any AJAX library you like
//     fetch('https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload', {
//       method: 'POST',
//       body: formData,
//     })
//       .then((res) => res.json())
//       .then(() => {
//         setFileList([]);
//         message.success('upload successfully.');
//       })
//       .catch(() => {
//         message.error('upload failed.');
//       })
//       .finally(() => {
//         setUploading(false);
//       });
//   };

//   const props = {
//     name: 'file',
//     multiple: true,
//     // onChange(info) {
//     //   console.log("-------------> ", info);
//     //   const { status } = info.file;
//     //   if (status !== 'uploading') {
//     //     console.log(info.file, info.fileList);
//     //   }
//     //   if (status === 'done') {
//     //     message.success(`${info.file.name} file uploaded successfully.`);
//     //   } else if (status === 'error') {
//     //     message.error(`${info.file.name} file upload failed.`);
//     //   }
//     // },
//     onDrop(e) {
//       console.log('Dropped files', e.dataTransfer.files);
//     },
//     // onRemove: (file) => {
//     //   const index = fileList.indexOf(file);
//     //   const newFileList = fileList.slice();
//     //   newFileList.splice(index, 1);
//     //   setFileList(newFileList);
//     // },
//     // beforeUpload: (file) => {
//     //   setFileList([...fileList, file]);
//     //   return false;
//     // },
//     // fileList,
//   };
//   const customRequest = ({ file, onSuccess, onError }) => {
//     // Here you can handle the file upload manually or do nothing
//     // If you want to prevent any upload, simply don't call onSuccess or onError
//     console.log('File:', file);
//     message.info('File upload is prevented.');

//     // Simulate a successful upload (remove this if you don't want to simulate)
//     // onSuccess("ok");
//   };


//   return (
//     <>
//       <section className='addresses_area'>
//         <h2>UploadImages</h2>


//         <Dragger customRequest={customRequest} {...props} defaultFileList={[...fileList]} listType="picture">
//           <p className="ant-upload-drag-icon">
//             <InboxOutlined />
//           </p>
//           <p className="ant-upload-text">Click or drag file to this area to upload</p>
//           <p className="ant-upload-hint">
//             Support for a single or bulk upload. Strictly prohibited from uploading company data or other
//             banned files.
//           </p>

//         </Dragger>

//         {/* <Button
//           icon={<UploadOutlined />}
//           type="primary"
//           onClick={handleUpload}
//           disabled={fileList.length === 0}
//           loading={uploading}
//           style={{
//             marginTop: 16,
//           }}
//         >
//           {uploading ? 'Uploading' : 'Start Upload'}
//         </Button> */}
//       </section>
//     </>
//   )
// }

// export default UploadImages




// import React, { useState } from 'react';
// import { Upload, Button, message, Image } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';

// const UploadImages = () => {
//   const [fileList, setFileList] = useState([]);
//   const [previewImage, setPreviewImage] = useState(null);

//   const handleChange = (info) => {
//     if (info.file.status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully`);
//     } else if (info.file.status === 'error') {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   };

//   // const handlePreview = (file) => {
//   //   setPreviewImage(URL.createObjectURL(file.originFileObj));
//   // };

//   const handlePreview = (file) => {
//     const objectURL = URL.createObjectURL(file);
//     setPreviewImage(objectURL);
//   };

//   const handleUpload = () => {
//     if (fileList.length === 0) {
//       message.warning('Please upload an image first.');
//       return;
//     }

//     // Implement your upload logic here
//     // For example, you can send a request to your server with the file
//     message.success('Image uploaded successfully.');
//   };

//   return (
//     <div>
//       <Upload.Dragger
//         multiple={false}
//         showUploadList={false}
//         customRequest={({ file, onSuccess, onError }) => {
//           // Update file list and handle preview
//           setFileList([file]);
//           handlePreview(file);
//           // Simulate success
//           onSuccess();
//         }}
//         onChange={handleChange}
//         accept="image/*"
//       >
//         <p className="ant-upload-drag-icon">
//           <UploadOutlined />
//         </p>
//         <p className="ant-upload-text">Click or drag image to this area to upload</p>
//         <p className="ant-upload-hint">Support for a single image upload.</p>
//       </Upload.Dragger>

//       {previewImage && (
//         <div style={{ marginTop: 16 }}>
//           <Image
//             width={200}
//             src={previewImage}
//             alt="Image Preview"
//           />
//         </div>
//       )}

//       <Button
//         type="primary"
//         style={{ marginTop: 16 }}
//         onClick={handleUpload}
//       >
//         Upload
//       </Button>
//     </div>
//   );
// };

// export default UploadImages;










import React, { useState } from 'react';
import { Upload, Button, message, Image, Row, Col, Popconfirm, Form, Input, Select } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { addImages, embedImageVideo } from '../../ContextAPI/APIs/api';
import { Alert } from '../../ContextAPI/Components/notify';

const UploadImages = () => {
  const [external, setExternal] = useState(false)
  const [fileList, setFileList] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [formData, setFormData] = useState({
    image_url: "",
    source: "",
    type: "",
  })



  const fileEmbed = async () => {
    try {
      const response = await embedImageVideo(formData)
      if (response.success) {
        Alert(response.message, response.success)
      }
    } catch (error) {
      console.log(error)
      Alert(error.message, false)
    }
  }

  const handleChange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handlePreview = (file) => {
    console.log(file);
    const objectURL = URL.createObjectURL(file);
    setPreviewImages(prev => [...prev, objectURL]);
  };

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.warning('Please upload at least one image.');
      return;
    }

    // Implement your upload logic here
    // For example, you can send a request to your server with the files


    const myForm = new FormData()

    console.log("fileList", fileList);

    for (const file of fileList) {
      console.log(file);
      myForm.append("images", file)
    }

    const res = await addImages(myForm)
    if (res.success) message.success('Images uploaded successfully.');
    else message.error('Error in Image upload.');



  };

  const handleRemove = (fileToRemove) => {
    console.log(fileToRemove);
    console.log("previewImages", previewImages);

    console.log(previewImages.filter((e, i) => fileToRemove != e))

    setPreviewImages(previewImages.filter((e, i) => fileToRemove != e));
    setFileList(previewImages.filter((e, i) => fileToRemove != e));
    // Revoke the object URL to free up memory
    URL.revokeObjectURL(fileToRemove.preview);
  };

  return (
    <>
      <section className='addresses_area'>
        <div>
          {/* <Upload.Dragger
            multiple
            showUploadList={false}
            customRequest={({ file, onSuccess, onError }) => {
              setFileList(prev => [...fileList, file]);
              handlePreview(file);
              onSuccess();
            }}
            // onChange={handleChange}
            accept="image/*"
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">Click or drag image(s) to this area to upload</p>
            <p className="ant-upload-hint">Support for multiple image uploads.</p>


          </Upload.Dragger> */}

          <Upload.Dragger
            multiple
            showUploadList={false}
            customRequest={({ file, onSuccess, onError }) => {
              // Check if file type is allowed
              const isImage = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg";

              if (!isImage) {
                onError("Only JPEG, JPG, and PNG images are allowed.");
                return;
              }

              // If file is valid, proceed
              setFileList(prev => [...prev, file]);
              handlePreview(file);
              onSuccess();
            }}
            accept=".jpeg,.jpg,.png" // Accept only JPEG, JPG, and PNG formats
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">Click or drag image(s) to this area to upload</p>
            <p className="ant-upload-hint">Support for multiple image uploads in JPEG, JPG, or PNG format.</p>
          </Upload.Dragger>

          <Button type="primary" style={{ marginTop: 16 }} onClick={handleUpload}> Upload </Button>
          <Button type="primary" style={{ marginTop: 16 }} onClick={() => setExternal(true)}> Embed </Button>

          {
            external === true ?
              <Form
                name="basic"
                layout='horizontal'
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: "100%" }}
                initialValues={{ remember: true }}
                onFinish={fileEmbed}
                onFinishFailed={(errorInfo) => console.log('Failed:', errorInfo)}
                autoComplete="off"
              >
                <Form.Item
                  label="URL"
                  name="name"
                  rules={[{ required: true, message: 'Please input your product name!' }]}
                >
                  <Input
                    type='text'
                    placeholder='Enter URL'
                    className='form_input'
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  />
                </Form.Item>


                <Form.Item label="Source" name="source">
                  <Select


                    optionFilterProp="label"
                    defaultValue={formData.source}
                    value={formData.source}

                    onChange={(value) => setFormData({ ...formData, source: value })}

                  >
                    <Select.Option disabled>Select</Select.Option>
                    <Select.Option value={"vimeo"}>Vimeo</Select.Option>
                    <Select.Option value={"Youtube"}>Youtube</Select.Option>
                    <Select.Option value={"external-image"}>External Image </Select.Option>
                  </Select>

                </Form.Item>
                <Form.Item label="Type" name="type">
                  <Select


                    optionFilterProp="label"
                    defaultValue={formData.type}
                    value={formData.type}

                    onChange={(value) => setFormData({ ...formData, type: value })}

                  >
                    <Select.Option disabled>Select</Select.Option>
                    <Select.Option value={"external-image"}>external-image</Select.Option>
                    <Select.Option value={"video"}>video</Select.Option>
                  </Select>

                </Form.Item>





                <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                  Embed
                </Button>
              </Form>
              :
              <></>
          }

          {previewImages.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <Row gutter={16}>
                {previewImages.map((file, index) => (
                  <Col xs={12} sm={12} md={9} lg={6} xl={4} className='col' key={index} style={{ position: 'relative' }}>
                    <div className='upload_images'>
                      <Image width="100%" height="100%" src={file} alt={`Image Preview ${index}`} style={{ marginBottom: 16 }} />
                      <Popconfirm title="Are you sure you want to delete this image?" onConfirm={() => handleRemove(file)} >
                        <Button type="link" icon={<DeleteOutlined />} style={{ position: 'absolute', top: 0, right: 0, zIndex: 1, backgroundColor: 'white' }} />
                      </Popconfirm>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default UploadImages;