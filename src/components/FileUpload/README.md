# File Upload component

A reusable React component for upload multiple files with drag and drop feature.

# Usage:

```js
<FileUpload
 label = "Browse Files"
 max_files = 5
 imagePreview = false
 acceptedType={[
  "image/*",
  "audio/*",
  "video/*",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
  "application/pdf",
 ]}
 size_limit="10">
```

# **_Basic Props_**

- label (string):- Component title. Default:"Browse Files".
- max_files (number):- Maximum files to add, Default:5.
- imagePreview (boolean):- It is a flag to show imagw preview, Default:false.
- acceptedType (Array):- Accepted file type. for image file send ["image/*",],
  for audio file send ["audio/*",],for video file send ["video/*",],
  for word file send [".docx",".doc",".octet-stream",".msword",""],
  for excel file send [".xlsx",".xlsm",".xltx",".xltm",".xml",".xls",".xlt",".xls",".xlam",".xla",".xlw",".xlr",".csv","application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
  for pdf file send ["application/pdf",".pdf",],
  for powerpoint file send [".pptx","application/vnd.ms-powerpoint","application/vnd.openxmlformats-officedocument.presentationml.presentation"],
  for text file send ["text/plain",], , Default:All.
- size_limit (number):- Maximum size (in mb) for files to add. Default value 10MB.
