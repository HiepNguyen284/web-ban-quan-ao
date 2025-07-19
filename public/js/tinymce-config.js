tinymce.init({
  selector: 'textarea',
  plugins: 'image',
  toolbar: 'image',
  images_upload_url: '/uploads', // nếu có upload
  file_picker_types: 'image',
  file_picker_callback: function (callback, value, meta) {
    if (meta.filetype === 'image') {
      // Mở trình quản lý file của bạn ở đây (hoặc custom code)
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');

      input.onchange = function () {
        const file = this.files[0];
        const reader = new FileReader();
        reader.onload = function () {
          callback(reader.result, { alt: file.name });
        };
        reader.readAsDataURL(file); // upload local file dưới dạng base64
      };

      input.click();
    }
  }
});
