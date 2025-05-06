import { useState, useEffect } from 'react';
import { Image, Video, File, Trash2 } from 'lucide-react';

export default function MediaGallery({ userId, refresh, setRefresh }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await fetch(`http://localhost:80/react-31/api/get_files.php?user_id=${userId}`);
        const data = await response.json();

        if (data.success) {
          setFiles(data.files);
        } else {
          setError(data.message || 'Failed to fetch files');
        }
      } catch (err) {
        setError('Network error. Please ensure XAMPP Apache is running on port 80.');
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [userId, refresh]);

  const handleDelete = async (fileId) => {
    try {
      const response = await fetch('http://localhost:80/react-31/api/delete_file.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file_id: fileId }),
      });
      const data = await response.json();

      if (data.success) {
        setFiles(files.filter(file => file.id !== fileId));
        setRefresh(Date.now());
      } else {
        setError(data.message || 'Failed to delete file');
      }
    } catch (err) {
      setError('Network error. Please ensure XAMPP Apache is running.');
    }
  };

  const handleFileClick = (file) => {
    if (file.file_type === 'pdf') {
      window.open(`http://localhost:80${file.file_path}`, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-blue-600 mb-6">Your Files</h3>

      {files.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No files found. Upload some files to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file) => (
            <div key={file.id} className="border rounded-lg overflow-hidden hover:shadow-md transition">
              <div className="relative cursor-pointer" onClick={() => handleFileClick(file)}>
                {file.file_type === 'image' && (
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <img
                      src={`http://localhost:80${file.file_path}`}
                      alt={file.file_name}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                      }}
                    />
                  </div>
                )}
                {file.file_type === 'video' && (
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <video
                      src={`http://localhost:80${file.file_path}`}
                      autoPlay
                      muted
                      loop
                      className="max-h-full max-w-full object-contain"
                      onError={() => setError(`Failed to load video: ${file.file_name}`)}
                    />
                  </div>
                )}
                {file.file_type === 'pdf' && (
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <div className="text-center p-4">
                      <File size={48} className="text-blue-500 mx-auto mb-2" />
                      <p className="text-sm font-medium truncate">{file.file_name}</p>
                      <p className="text-xs text-blue-600">Click to open</p>
                    </div>
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(file.id);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="p-3 bg-white">
                <p className="text-sm font-medium truncate">{file.file_name}</p>
                <p className="text-xs text-gray-500">
                  {new Date(file.uploaded_at).toLocaleDateString()} • 
                  {file.file_type.toUpperCase()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}