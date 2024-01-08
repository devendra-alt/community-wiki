import React from 'react';

export default function Logo({ setLogo }) {
  const handleImageUpload = async (file) => {
    const reader = new FileReader();
    const formData = new FormData();
    formData.append('files', file);
    const response = await postData(
      process.env.REACT_APP_UPLOAD_ENDPOINT,
      formData
    );
    reader.onload = () => {
      setLogo(response[0]);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <Grid item xs={12} align="center" spacing={2}>
      <Avatar src={userFormData.image?.url} sx={{ width: 100, height: 100 }} />
      <InputFileUpload onChange={handleImageUpload} />
    </Grid>
  );
}
