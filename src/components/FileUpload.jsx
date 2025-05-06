import { useState, useRef } from 'react';
import { Upload, Loader2, Check, X } from 'lucide-react';

export default function FileUpload({ userId, setRefresh, fileType }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const fileInputRef = useRef(null);

  // Define allowed MIME types based on fileType prop
  const acceptTypes = {
    image: 'image/*',
    video: 'video/*',
    pdf: 'application/pdf',
  };

  // Validate files based on fileType or allow all if fileType is not specified
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).filter((file) => {
      const type = file.type.includes('image')
        ? 'image'
        : file.type.includes('video')
        ? 'video'
        : file.type.includes('pdf')
        ? 'pdf'
        : null;
      // If fileType is specified, only allow matching type; otherwise, allow all supported types
      return type && (!fileType || fileType === type) && file.size <= 10 * 1024 * 1024; // Max 10MB
    });
    setFiles(selectedFiles);
    if (selectedFiles.length !== e.target.files.length) {
      setUploadStatus({
        success: false,
        message: `Some files were rejected (invalid type${fileType ? ` for ${fileType}` : ''} or >10MB)`,
      });
    } else {
      setUploadStatus(null); // Clear status if all files are valid
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setUploadStatus(null);

    try {
      for (const file of files) {
        const reader = new FileReader();

        await new Promise((resolve, reject) => {
          reader.onload = async (event) => {
            try {
              const fileData = event.target.result.split(',')[1];
              const fileTypeToUpload = fileType || // Use prop if specified, else determine from file
                (file.type.includes('image')
                  ? 'image'
                  : file.type.includes('video')
                  ? 'video'
                  : 'pdf');

              const response = await fetch('companyportal.great-site.net/upload.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  user_id: userId,
                  file_data: fileData,
                  file_name: file.name,
                  file_type: fileTypeToUpload,
                }),
              });

              const data = await response.json();
              if (!data.success) {
                throw new Error(data.message || 'Upload failed');
              }
              resolve();
            } catch (error) {
              reject(error);
            }
          };
          reader.onerror = () => reject(new Error('File reading failed'));
          reader.readAsDataURL(file);
        });
      }

      setUploadStatus({ success: true, message: 'All files uploaded successfully!' });
      setFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setRefresh(Date.now()); // Trigger gallery refresh
    } catch (error) {
      setUploadStatus({ success: false, message: error.message || 'Upload failed' });
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-blue-600 mb-4">
        Upload {fileType ? fileType.charAt(0).toUpperCase() + fileType.slice(1) : 'Files'}
      </h3>

      <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center mb-4">
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="text-blue-500" size={40} />
          <p className="text-gray-600">
            Drag & drop {fileType || 'files'} here or click to browse
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            accept={fileType ? acceptTypes[fileType] : 'image/*,video/*,application/pdf'}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Select {fileType ? fileType.charAt(0).toUpperCase() + fileType.slice(1) : 'Files'}
          </label>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-2">Selected Files:</h4>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <span className="truncate flex-1">{file.name}</span>
                <span className="text-xs text-gray-500 mx-2">
                  {(file.size / 1024).toFixed(2)} KB
                </span>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {uploadStatus && (
        <div
          className={`p-3 rounded-md mb-4 ${
            uploadStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          <div className="flex items-center">
            {uploadStatus.success ? (
              <Check className="mr-2" size={18} />
            ) : (
              <X className="mr-2" size={18} />
            )}
            {uploadStatus.message}
          </div>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={files.length === 0 || uploading}
        className={`w-full py-2 px-4 rounded-md flex items-center justify-center ${
          files.length === 0 || uploading
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        } transition`}
      >
        {uploading ? (
          <>
            <Loader2 className="animate-spin mr-2" size={18} />
            Uploading...
          </>
        ) : (
          'Upload Files'
        )}
      </button>

      <div className="mt-4 text-sm text-gray-500">
        <p>
          Supported formats:{' '}
          {fileType
            ? fileType === 'image'
              ? 'JPG, PNG, GIF'
              : fileType === 'video'
              ? 'MP4'
              : 'PDF'
            : 'JPG, PNG, GIF, MP4, PDF'}
        </p>
        <p>Max file size: 10MB</p>
      </div>
    </div>
  );
}
