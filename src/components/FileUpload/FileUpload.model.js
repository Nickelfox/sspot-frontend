export const useUploadFileModel = () => {
  const handleUploadFiles = (
    files,
    uploadedFiles,
    max_files,
    setFileLimit,
    setUploadedFiles
  ) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;

    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);

        if (uploaded.length === max_files) setFileLimit(true);
        if (uploaded.length > max_files) {
          alert(`You can only add a maximum of ${max_files} files`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });
    if (!limitExceeded) setUploadedFiles(uploaded);
  };
  return {
    handleUploadFiles,
  };
};
